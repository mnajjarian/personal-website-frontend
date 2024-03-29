import React, { useContext } from 'react'
import { extractFromDraft, formatDateAndTime } from '../../Helper'
import { DataContext } from '../../contexts/dataContext'
import { BlogInterface } from 'reducers/dataReducer'

type BlockType = {
  block: BlogInterface
}
export function BlockCard({ block }: BlockType): JSX.Element {
  return (
    <div key={block.id} className="block__items">
      <time className="block__time">{formatDateAndTime(block.createdAt)}</time>
      <a
        className="block__link"
        target="_blank"
        rel="noopener noreferrer"
        href={`/blog/${extractFromDraft(block.content)
          .title.split(' ')
          .join('-')}`}
      >
        {extractFromDraft(block.content).title}
      </a>
    </div>
  )
}

export function PostBlock(): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)
  const sortPosts = blogs.slice(1)
  return (
    <div className="block">
      <h2 className="block__title">Latest Posts</h2>
      <div className="block__content">
        {sortPosts.map((block: BlogInterface) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
