import puppeteer, { Page } from 'puppeteer-core';
import { getOptions } from './chromiumOptions';

let _page: Page | null;

// criar um browser e criar uma página em branco
async function getPage(isDev: boolean) { 
  if (_page) { // Se essistir
    return _page;
  }

  // se não ele cria uma nova
  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);

  _page = await browser.newPage(); // página em branco no chrome

  return _page;
}

export async function getScreenshot(
  html: string,
  isDev: boolean,
): Promise<Buffer> {
  const page = await getPage(isDev);

  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html);

  const file = await page.screenshot({ type: 'png' });

  return file;
}