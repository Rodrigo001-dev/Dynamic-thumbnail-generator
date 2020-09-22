// esse arquivo vai fazer todas as configurações necessárias para ter o chrome
// rodando tanto em ambiente em desenvolvimento quanto rodando numa serverless function

import chrome from 'chrome-aws-lambda';

const chromeExecPaths = {
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const exePath = chromeExecPaths[process.platform];

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean; // abre ou não abre o chrome
}

export async function getOptions(isDev: boolean): Promise<Options> {
  let options: Options;

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    }
  }

  return options;
}