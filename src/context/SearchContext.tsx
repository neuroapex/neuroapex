import { graphql, useStaticQuery } from "gatsby"
import React, { createContext, useEffect, useState } from "react"
import { Tag } from "~/model/tag"
import { Tool } from "~/model/tool"
import { Dataset } from "~/model/dataset"

const _filterToolsOnSearchTerm = (tools: Tool[], searchTerm: string): Tool[] => {
  const regex = new RegExp(String.raw`${searchTerm}`)
  return tools.filter(tool => {
    if (tool.name.match(regex) || tool.name.toLowerCase().match(regex)) {
      return tool
    }
    if (
      tool.description.match(regex) ||
      tool.description.toLowerCase().match(regex)
    ) {
      return tool
    }
    if (tool.url.match(regex)) {
      return tool
    }
    if (tool.tags.filter(tag => tag.toLowerCase().match(regex)).length > 0) {
      return tool
    }
  })
}

const _filterDatasetsOnSearchTerm = (datasets: Dataset[], searchTerm: string): Dataset[] => {
  const regex = new RegExp(String.raw`${searchTerm}`)
  return datasets.filter(dataset => {
    if (dataset.name.match(regex) || dataset.name.toLowerCase().match(regex)) {
      return dataset
    }
    if (
      dataset.description.match(regex) ||
      dataset.description.toLowerCase().match(regex)
    ) {
      return dataset
    }
    if (dataset.url.match(regex)) {
      return dataset
    }
    if (dataset.tags.filter(tag => tag.toLowerCase().match(regex)).length > 0) {
      return dataset
    }
  })
}

const _getTagsWithCounts = (data: Tool[]): Tag[] => {
  const _getCounts = (allTags: string[]) => {
    let counts = {}

    allTags.forEach((item: string) => {
      const countForItem = counts[item as keyof typeof counts]
        ? counts[item as keyof typeof counts] + 1
        : 1
      counts = {
        ...counts,
        [item]: countForItem,
      }
    })

    return counts
  }

  const allTags = data.reduce((acc: string[], item: Tool) => {
    return [...acc, ...item.tags]
  }, [])

  const tagCounts = _getCounts(allTags)

  const uniqueTagsWithCounts = [...new Set(allTags)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCounts[item as keyof typeof tagCounts],
        },
      ]
    },
    []
  )
  return uniqueTagsWithCounts
}

interface SearchContext {
  tools: Tool[]
  datasets: Dataset[]
  tags: Tag[]
  searchInput: string
  activeTag: Tag | null
  setSearch: (term: string) => void
  setActiveTag: (tag: Tag) => void
  clearSearch: () => void
  clearTag: () => void
}

export const SearchContext = createContext<SearchContext>({} as SearchContext)

export const SearchContextProvider: React.FC = ({ children }) => {
  const query = useStaticQuery<{
    staticJson: {
      tools: Tool[]
      datasets: Dataset[]
    }
  }>(graphql`
    query {
      staticJson {
        tools {
          name
          description
          url
          tags
        }
        datasets {
          name
          description
          url
          tags
        }
      }
    }
  `)

  const { tools, datasets } = query.staticJson
  const [filteredTools, _setFilteredTools] = useState<Tool[]>([])
  const [filteredDatasets, _setFilteredDatasets] = useState<Dataset[]>([])
  const [allTags, _setAllTags] = useState<Tag[]>([])
  const [searchInput, _setSearchInput] = useState<string>("")
  const [activeTag, _setActiveTag] = useState<Tag | null>(null)

  // Set the tags from the data
  useEffect(() => {
    const tags = _getTagsWithCounts(tools)
    _setAllTags(tags)
    _setFilteredTools(tools)
    _setFilteredDatasets(datasets)
  }, [])

  useEffect(() => {
    if (searchInput) {
      const filteredTools = _filterToolsOnSearchTerm(tools, searchInput)
      _setFilteredTools(filteredTools)

      const filteredDatasets = _filterDatasetsOnSearchTerm(datasets, searchInput)
      _setFilteredDatasets(filteredDatasets)

      _setActiveTag(null)
    } else {
      _setFilteredTools(tools)
      _setFilteredDatasets(datasets)
    }
  }, [searchInput])

  useEffect(() => {
    if (activeTag) {
      const filteredTools = tools.filter(tool =>
        tool.tags.includes(activeTag.name)
      )
      _setFilteredTools(filteredTools)

      const filteredDatasets = datasets.filter(dataset =>
        dataset.tags.includes(activeTag.name)
      )
      _setFilteredDatasets(filteredDatasets)
    } else {
      _setFilteredTools(tools)
      _setFilteredDatasets(datasets)
    }
  }, [activeTag])

  const setSearch = (newValue: string) => _setSearchInput(newValue)

  const setActiveTag = (newTag: Tag) => _setActiveTag(newTag)

  const clearSearch = () => _setSearchInput("")

  const clearTag = () => _setActiveTag(null)

  const value: SearchContext = {
    tools: filteredTools,
    datasets: filteredDatasets,
    tags: allTags,
    searchInput,
    activeTag,
    setSearch,
    setActiveTag,
    clearSearch,
    clearTag,
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}