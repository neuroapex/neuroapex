import classNames from "classnames"
import { Link } from "gatsby"
import React from "react"
import { Tag } from "../model/tag"

interface Props {
  title: string
  url: string
  description: string
  slug: string;
}

const RelatedCard: React.FC<Props> = ({ title, url, description, slug}) => {
  return (
    <div className="border shadow rounded-lg h-128 md:w-72 p-4 m-2 overflow-hidden">
      <Link state={{ modal: true}} to={slug}><h1 className="text-lg font-bold text-theme-white">{title}</h1></Link>
      <a href={url} className="text-sm text-theme-blue hover:underline w-72">
        {url}
      </a>
      <p className="py-2 text-theme-white">{description}</p>
    </div>
  )
}

export default RelatedCard
