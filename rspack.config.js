// @ts-check
const path = require('path');
const { spawn, exec } = require('child_process');
const { watch } = require('fs');
const rspack = require('@rspack/core');

/**
 * @type {(env: Record<string, string>, argv: Record<string, string>) => import('@rspack/cli').Configuration}
 */
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const vendor = (process.env.vendor = env.vendor || 'firefox');
  const distPath = (process.env.distPath = path.resolve(__dirname, 'dist', vendor));

  return {
    context: __dirname,
    devtool: isProd ? false : 'source-map',
    watch: !isProd,
    entry: {
      background: './src/background/main.ts',
      content: './src/content/main.ts',
      options: './src/options/index.tsx',
    },
    output: {
      path: distPath,
      filename: '[name].js',
    },
    resolve: { extensions: ['.ts', '.tsx', '.js', 'jsx'] },
    module: {
      rules: [
        { test: /\.svg$/, type: 'asset' },
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript' },
            },
          },
          type: 'javascript/auto',
        },
        {
          test: /\.[jt]sx$/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: { syntax: 'typescript', jsx: true },
                transform: {
                  react: {
                    runtime: 'automatic',
                    throwIfNamespace: true,
                    development: false,
                    useBuiltins: false,
                  },
                },
              },
            },
          },
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      new rspack.HtmlRspackPlugin({
        filename: 'options.html',
        template: './src/options/index.html',
        chunks: ['options'],
      }),
      new rspack.CopyRspackPlugin({
        patterns: [
          { from: './src/_locales/', to: '_locales/', toType: 'dir' },
          { from: './node_modules/spectre.css/dist/spectre.min.css' },
          { from: './node_modules/spectre.css/dist/spectre-icons.min.css' },
          { from: './node_modules/spectre.css/dist/spectre-exp.min.css' },
          { from: './src/icons', to: 'icons' },
          { from: './node_modules/tongwen-dict/dist/*.min.json', to: 'dictionaries/[name][ext]' },
        ],
      }),
      compiler => {
        const state = { manifest: false, webExt: false };

        function writeManifest() {
          exec('node ./src/manifest/main.js', (error, stdout, stderr) => {
            console.log('write manifest:');
            error || stderr ? console.log(`error - ${error || stderr}`) : console.log(stdout || 'done');
          });
        }

        compiler.hooks.done.tap('generate manifest.json', () => {
          if (state.manifest) return;
          state.manifest = true;

          writeManifest();

          if (isProd) return;

          watch(path.resolve(__dirname, 'src', 'manifest', 'main.js'), event => {
            if (event !== 'change') return;
            writeManifest();
          });
        });

        if (isProd) return;

        compiler.hooks.afterDone.tap('start web-ext', () => {
          if (state.webExt) return;
          state.webExt = true;

          const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
          const webext = spawn(npm, ['run', `we:${vendor}`], { cwd: __dirname, env: process.env, shell: true });

          webext.stdout.on('data', data => {
            console.log(`WebExt: ${data}`);
          });

          webext.stderr.on('data', data => {
            console.error(`WebExt Error: ${data}`);
          });

          webext.on('close', code => {
            console.log(`WebExt process exited with code ${code}`);
          });
        });
      },
    ],
  };
};
