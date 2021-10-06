import classNames from "classnames"
import { Link } from "gatsby"
import React, { useContext } from "react"
import { SearchContext } from "~/context/SearchContext"
import { Tag } from "../model/tag"

interface Props {
  title: string
  url: string
  description: string
  tags: string[]
  activeTag: Tag | null,
  slug: string;
}

const Card: React.FC<Props> = ({ title, url, description, tags , activeTag, slug}) => {

  function getTagClassnames(item: string) {
    const active = item === activeTag?.name
    return classNames("shadow", "rounded-lg", "py-1", "px-3", "m-1", {
      "bg-theme-blue": active,
      "bg-theme-white": !active,
    })
  }

  return (
    <div className="border shadow rounded-lg h-128 w-80 p-4 m-2 overflow-hidden">
      <Link state={{ modal: true}} to={slug}><h1 className="text-lg font-bold text-theme-white">{title}</h1></Link>
      <a href={url} className="text-sm text-theme-blue hover:underline w-72">
        {url}
      </a>
      <p className="py-2 text-theme-white">{description}</p>
      <div className="flex flex-row flex-wrap py-4">
        {tags.map(item => {
          const buttonClasses = getTagClassnames(item)
          return (
            <button
              onClick={() => {}}
              className={buttonClasses}>
              <p className="text-xs text-theme-light font-bold">{item}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Card
