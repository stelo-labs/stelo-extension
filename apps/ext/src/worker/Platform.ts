// Lovingly copied from here https://github.com/MetaMask/metamask-extension/blob/23e3f52a04e5fa03590238d481a47a9294b7953a/app/scripts/platforms/extension.js

import browser from "webextension-polyfill";

export type WindowId = number;

type onRemoveListener = (windowId: WindowId) => void;

//https://github.com/MetaMask/metamask-extension/blob/23e3f52a04e5fa03590238d481a47a9294b7953a/app/scripts/lib/util.js#L105
function checkForError() {
  const { lastError } = browser.runtime;
  if (!lastError) {
    return undefined;
  }
  // if it quacks like an Error, its an Error

  //@ts-ignore
  if (lastError.stack && lastError.message) {
    return lastError;
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message);
}

export default class Platform {
  openWindow(
    options: browser.Windows.CreateCreateDataType
  ): Promise<browser.Windows.Window> {
    return new Promise((resolve, reject) => {
      browser.windows.create(options).then((newWindow) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(newWindow);
      });
    });
  }
  addOnRemovedListener(listener: onRemoveListener) {
    browser.windows.onRemoved.addListener(listener);
  }
  focusWindow(windowId: WindowId) {
    return new Promise((resolve, reject) => {
      browser.windows.update(windowId, { focused: true }).then(() => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(undefined);
      });
    });
  }
  getLastFocusedWindow(): Promise<browser.Windows.Window> {
    return new Promise((resolve, reject) => {
      browser.windows.getLastFocused().then((windowObject) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(windowObject);
      });
    });
  }
  updateWindowPosition(windowId: WindowId, left: number, top: number) {
    return new Promise((resolve, reject) => {
      browser.windows.update(windowId, { left, top }).then(() => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(undefined);
      });
    });
  }
  getAllWindows(): Promise<browser.Windows.Window[]> {
    return new Promise((resolve, reject) => {
      browser.windows.getAll().then((windows) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(windows);
      });
    });
  }
}
