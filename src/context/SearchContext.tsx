import { graphql, useStaticQuery } from "gatsby"
import React, { createContext, useEffect, useState } from "react"
import { Tag } from "~/model/tag"
import { Tool } from "~/model/tool"
import { Dataset } from "~/model/dataset"

interface SearchContext {
  tools: Tool[]
  tagsTools: Tag[]
  searchInputTools: string
  activeTagTools: Tag | null
  setSearchTools: (term: string) => void
  setActiveTagTools: (tag: Tag) => void
  clearSearchTools: () => void
  clearTagTools: () => void
  datasets: Dataset[]
  tagsDatasets: Tag[]
  searchInputDatasets: string
  activeTagDatasets: Tag | null
  setSearchDatasets: (term: string) => void
  setActiveTagDatasets: (tag: Tag) => void
  clearSearchDatasets: () => void
  clearTagDatasets: () => void
}

const _filterOnSearchTermTools = (tools: Tool[], searchTerm: string): Tool[] => {
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

const _getTagsWithCountsTools = (data: Tool[]): Tag[] => {

  const _getCountsTools = (allTags: string[]) => {
    let countsTools = {}

    allTags.forEach((item: string) => {
      const countForItem = countsTools[item as keyof typeof countsTools]
        ? countsTools[item as keyof typeof countsTools] + 1
        : 1
      countsTools = {
        ...countsTools,
        [item]: countForItem,
      }
    })

    return countsTools
  }

  const allTagsTools = data.reduce((acc: string[], item: Tool) => {
    return [...acc, ...item.tags]
  }, [])

  const tagCountsTools = _getCountsTools(allTagsTools)

  const uniqueTagsWithCountsTools = [...new Set(allTagsTools)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsTools[item as keyof typeof tagCountsTools],
        },
      ]
    },
    []
  )
  return uniqueTagsWithCountsTools
}

const _filterOnSearchTermDatasets = (datasets: Tool[], searchTerm: string): Tool[] => {
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

const _getTagsWithCountsDatasets = (data: Tool[]): Tag[] => {

  const _getCountsDatasets = (allTags: string[]) => {
    let countsDatasets = {}

    allTags.forEach((item: string) => {
      const countForItem = countsDatasets[item as keyof typeof countsDatasets]
        ? countsDatasets[item as keyof typeof countsDatasets] + 1
        : 1
      countsDatasets = {
        ...countsDatasets,
        [item]: countForItem,
      }
    })

    return countsDatasets
  }

  const allTagsDatasets = data.reduce((acc: string[], item: Tool) => {
    return [...acc, ...item.tags]
  }, [])

  const tagCountsDatasets = _getCountsDatasets(allTagsDatasets)

  const uniqueTagsWithCountsDatasets = [...new Set(allTagsDatasets)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsDatasets[item as keyof typeof tagCountsDatasets],
        },
      ]
    },
    []
  )
  return uniqueTagsWithCountsDatasets
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
  const [allTagsTools, _setAllTagsTools] = useState<Tag[]>([])
  const [searchInputTools, _setSearchInputTools] = useState<string>("")
  const [activeTagTools, _setActiveTagTools] = useState<Tag | null>(null)
  const [filteredDatasets, _setFilteredDatasets] = useState<Dataset[]>([])
  const [allTagsDatasets, _setAllTagsDatasets] = useState<Tag[]>([])
  const [searchInputDatasets, _setSearchInputDatasets] = useState<string>("")
  const [activeTagDatasets, _setActiveTagDatasets] = useState<Tag | null>(null)

  // Set the tags from the data
  useEffect(() => {
    const tags = _getTagsWithCountsTools(tools)
    _setAllTagsTools(tags)
    _setFilteredTools(tools)
  }, [])

  useEffect(() => {
    if (searchInputTools) {
      const filteredTools = _filterOnSearchTermTools(tools, searchInputTools)
      _setFilteredTools(filteredTools)
      _setActiveTagTools(null)
    } else {
      _setFilteredTools(tools)
      _setFilteredDatasets(datasets)
    }
  }, [searchInputTools])

  useEffect(() => {
    if (activeTagTools) {
      const filteredTools = tools.filter(tool =>
        tool.tags.includes(activeTagTools.name)
      )
      _setFilteredTools(filteredTools)
    } else {
      _setFilteredTools(tools)
    }
  }, [activeTagTools])

  useEffect(() => {
    const tags = _getTagsWithCountsDatasets(datasets)
    _setAllTagsDatasets(tags)
    _setFilteredDatasets(datasets)
  }, [])

  useEffect(() => {
    if (searchInputDatasets) {
      const filteredDatasets = _filterOnSearchTermDatasets(datasets, searchInputDatasets)
      _setFilteredDatasets(filteredDatasets)
      _setActiveTagDatasets(null)
    } else {
      _setFilteredDatasets(datasets)
      _setFilteredDatasets(datasets)
    }
  }, [searchInputDatasets])

  useEffect(() => {
    if (activeTagDatasets) {
      const filteredDatasets = datasets.filter(dataset =>
        dataset.tags.includes(activeTagDatasets.name)
      )
      _setFilteredDatasets(filteredDatasets)
    } else {
      _setFilteredDatasets(datasets)
    }
  }, [activeTagDatasets])

  const setSearchTools = (newValue: string) => _setSearchInputTools(newValue)
  const setActiveTagTools = (newTag: Tag) => _setActiveTagTools(newTag)
  const clearSearchTools = () => _setSearchInputTools("")
  const clearTagTools = () => _setActiveTagTools(null)

  const setSearchDatasets = (newValue: string) => _setSearchInputDatasets(newValue)
  const setActiveTagDatasets = (newTag: Tag) => _setActiveTagDatasets(newTag)
  const clearSearchDatasets = () => _setSearchInputDatasets("")
  const clearTagDatasets = () => _setActiveTagDatasets(null)

  const value: SearchContext = {
    tools: filteredTools,
    datasets: filteredDatasets,
    tagsTools: allTagsTools,
    searchInputTools,
    activeTagTools,
    setSearchTools,
    setActiveTagTools,
    clearSearchTools,
    clearTagTools,
    tagsDatasets: allTagsDatasets,
    searchInputDatasets,
    activeTagDatasets,
    setSearchDatasets,
    setActiveTagDatasets,
    clearSearchDatasets,
    clearTagDatasets,
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}