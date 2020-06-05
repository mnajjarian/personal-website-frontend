import React, { useContext } from 'react'
import { DataContext } from 'contexts/dataContext'
import { extractFromDraft, formatDate } from 'Helper'

export function LatestPost(): JSX.Element {
  const { data } = useContext(DataContext)

  const blogs = data.blogs.filter(blog => blog.draft !== false).slice(0, 3)
  if (blogs.length < 1) {
    return <div />
  }
  return (
    <section className="latest col-sm-12 col-md-10">
      <h1>the latest blog posts</h1>
      {blogs.map(blog => (
        <div key={blog.id} className="latest__card">
          <div className="latest__card__title">
            <a
              href={`/blog/${extractFromDraft(blog.content)
                .title.split(' ')
                .join('-')}`}
            >
              {extractFromDraft(blog.content).title}
            </a>
          </div>
          <p>{extractFromDraft(blog.content).p.substring(0, 250)}...</p>
          <div className="latest__card__date">
            <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
          </div>
        </div>
      ))}
    </section>
  )
}
