import browser, { Events } from 'webextension-polyfill';
import { CommandType } from './type';

export namespace commands {
  export const onCommand = browser.commands.onCommand as Events.Event<(command: CommandType) => void>;
}
