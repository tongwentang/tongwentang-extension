const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebextensionPlugin = require('webpack-webextension-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

module.exports = function (env, argv) {
  const isProd = argv.mode === 'production';
  const vendor = env.vendor || 'firefox';

  /**
   * @type {import('webpack').Configuration}
   */
  const config = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    devtool: isProd ? false : 'source-map',

    watch: !isProd,

    performance: {
      maxEntrypointSize: 1024000,
    },

    entry: {
      background: './src/background/main.ts',
      content: './src/content/main.ts',
      options: './src/options/index.tsx',
    },

    output: {
      path: path.resolve(__dirname, 'dist', vendor),
      filename: '[name].js',
    },

    module: {
      rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: [/node_modules/] }],
    },

    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        cleanAfterEveryBuildPatterns: [],
      }),
      new WebextensionPlugin({ vendor, autoreload: false }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/_locales/', to: '_locales/', toType: 'dir' },
          { from: './node_modules/spectre.css/dist/spectre.min.css' },
          { from: './node_modules/spectre.css/dist/spectre-icons.min.css' },
          { from: './node_modules/spectre.css/dist/spectre-exp.min.css' },
          { from: './src/icons', to: 'icons' },
          {
            from: './dict/**/*',
            to: 'dictionaries/[name][ext]',
          },
        ],
      }),
      new HtmlWebpackPlugin({
        filename: 'options.html',
        template: './src/options/index.html',
        chunks: ['options'],
      }),
      ...(isProd
        ? []
        : [
            new WebpackShellPlugin({
              onBuildEnd: {
                scripts: [`npm run we:${vendor}`],
                blocking: false,
                parallel: true,
              },
            }),
          ]),
    ],
  };

  return config;
};
