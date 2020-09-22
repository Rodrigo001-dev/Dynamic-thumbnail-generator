// arquivo vai retornar a thumbnail

import { NextApiRequest, NextApiResponse } from "next";
import { getScreenshot } from "./_lib/chromium";
import getThumbnailTemplate from "./_lib/thumbTemplate";

// região da AWS que a função serverless ta rodando, ou seja, se 
const isDev = !process.env.AWS_REGION; // essa variavel: process.env.AWS_REGION não tiver presente quer dizer que eu estou em ambiente de desenvolvimento

export default async function (request: NextApiRequest, response: NextApiResponse) {
  try {
    const title = String(request.query.title) // pegar titulo

    if (!title) {
      throw new Error('Title is required');
    }

    const html = getThumbnailTemplate(title);

    const file = await getScreenshot(html, isDev);



    response.setHeader('Content-Type', 'image/png'); // retorna somente a imagem
    response.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000');

    return response.end(file);
  } catch(err) {
    console.error(err);

     // 500 internal server error
     return response.status(500).send('Internal server error');
  }
}