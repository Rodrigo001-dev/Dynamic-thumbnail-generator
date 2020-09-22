import matter from 'gray-matter'
import marked from 'marked'

export async function getAllPosts() {
  const context = require.context('../../_posts', false, /\.md$/)
  const posts = []

  for (const key of context.keys()){
    const post = key.slice(2)
    const content = await import(`../../_posts/${post}`)
    const meta = matter(content.default)

    posts.push({
      slug: post.replace('.md', ''),
      title: meta.data.title
    })
  }

  return posts
}

export async function getPostBySlug(slug: any) {
  const fileContent = await import(`../../_posts/${slug}.md`)

  const meta = matter(fileContent.default)
  const content = marked(meta.content)   

  // Se eu estiver em ambiente de desenvolvimento a baseUrl vai ser http://localhost:3000
  // Se não, se estiver online vai ser a URL que o site em que eu hospedei gerou
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    :  'https://serverless-thumb-xi.vercel.app';

  const thumbnailUrl = `${baseUrl}/api/thumbnail.png?title=${meta.data.title}`

  return {
    title: meta.data.title, 
    description: meta.data.description, 
    thumbnailUrl,
    content,
  }
}