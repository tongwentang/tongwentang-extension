import browser from 'webextension-polyfill';
import { CommandType } from './type';

export namespace commands {
  export const onCommand = browser.commands.onCommand as WebExtEvent<(command: CommandType) => void>;
}
