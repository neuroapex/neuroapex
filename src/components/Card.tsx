import classNames from "classnames";
import { Link } from "gatsby";
import React, { useContext } from "react";
import { SearchContext } from "~/context/SearchContext";
import { Tag } from "../model/tag";

interface Props {
  title: string;
  url: string;
  description: string;
  tags: string[];
  activeTag: Tag | null;
  slug: string;
  header: string | null;
  expanded: boolean | null;
}

const Card: React.FC<Props> = ({
  title,
  url,
  description,
  tags,
  activeTag,
  slug,
  header,
  expanded,
}) => {
  function getTagClassnames(item: string) {
    const active = item === activeTag?.name;
    return classNames("shadow", "rounded-lg", "py-1", "px-3", "m-1", {
      "bg-theme-blue": active,
      "bg-theme-white": !active,
    });
  }

  return (
    <div className="border shadow rounded-lg m-2 sm:w-72 overflow-hidden">
      {header && (
        <Link state={{ modal: true }} to={slug}>
          <div className="h-48 overflow-hidden inline-block">
            <img
              src={header}
              className="w-full relative top-1/2 transform -translate-y-1/2"
            />
          </div>
        </Link>
      )}
      <div className="p-4 overflow-hidden">
        <Link state={{ modal: true }} to={slug}>
          <h1 className="text-lg font-bold text-theme-white">{title}</h1>
        </Link>
        <a href={url} className="text-sm text-theme-blue hover:underline w-72">
          {url}
        </a>
        {expanded && (
          <>
            <p className="py-2 text-theme-white">{description}</p>
            <div className="flex flex-row flex-wrap py-4">
              {tags.map((item) => {
                const buttonClasses = getTagClassnames(item);
                return (
                  <button onClick={() => {}} className={buttonClasses}>
                    <p className="text-xs text-theme-light font-bold">{item}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
