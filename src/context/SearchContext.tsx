import { graphql, useStaticQuery } from "gatsby"
import React, { createContext, useEffect, useState } from "react"
import { Tag } from "~/model/tag"
import { Tool } from "~/model/tool"
import { Dataset } from "~/model/dataset"
import { Paper } from "~/model/paper"
import { Tutorial } from "~/model/tutorial"

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
  papers: Paper[]
  tagsPapers: Tag[]
  searchInputPapers: string
  activeTagPapers: Tag | null
  setSearchPapers: (term: string) => void
  setActiveTagPapers: (tag: Tag) => void
  clearSearchPapers: () => void
  clearTagPapers: () => void
  tutorials: Tutorial[]
  tagsTutorials: Tag[]
  searchInputTutorials: string
  activeTagTutorials: Tag | null
  setSearchTutorials: (term: string) => void
  setActiveTagTutorials: (tag: Tag) => void
  clearSearchTutorials: () => void
  clearTagTutorials: () => void
}

// *************
// *** TOOLS ***
// *************

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

// ****************
// *** DATASETS ***
// ****************

const _filterOnSearchTermDatasets = (datasets: Dataset[], searchTerm: string): Dataset[] => {
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

const _getTagsWithCountsDatasets = (data: Dataset[]): Tag[] => {

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

  const allTagsDatasets = data.reduce((acc: string[], item: Dataset) => {
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

// **************
// *** PAPERS ***
// **************

const _filterOnSearchTermPapers = (papers: Paper[], searchTerm: string): Paper[] => {
  const regex = new RegExp(String.raw`${searchTerm}`)
  return papers.filter(paper => {
    if (paper.name.match(regex) || paper.name.toLowerCase().match(regex)) {
      return paper
    }
    if (
      paper.description.match(regex) ||
      paper.description.toLowerCase().match(regex)
    ) {
      return paper
    }
    if (paper.url.match(regex)) {
      return paper
    }
    if (paper.tags.filter(tag => tag.toLowerCase().match(regex)).length > 0) {
      return paper
    }
  })
}

const _getTagsWithCountsPapers = (data: Paper[]): Tag[] => {

  const _getCountsPapers = (allTags: string[]) => {
    let countsPapers = {}

    allTags.forEach((item: string) => {
      const countForItem = countsPapers[item as keyof typeof countsPapers]
        ? countsPapers[item as keyof typeof countsPapers] + 1
        : 1
      countsPapers = {
        ...countsPapers,
        [item]: countForItem,
      }
    })

    return countsPapers
  }

  const allTagsPapers = data.reduce((acc: string[], item: Paper) => {
    return [...acc, ...item.tags]
  }, [])

  const tagCountsPapers = _getCountsPapers(allTagsPapers)

  const uniqueTagsWithCountsPapers = [...new Set(allTagsPapers)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsPapers[item as keyof typeof tagCountsPapers],
        },
      ]
    },
    []
  )
  return uniqueTagsWithCountsPapers
}

// *****************
// *** TUTORIALS ***
// *****************

const _filterOnSearchTermTutorials = (tutorials: Tutorial[], searchTerm: string): Tutorial[] => {
  const regex = new RegExp(String.raw`${searchTerm}`)
  return tutorials.filter(tutorial => {
    if (tutorial.name.match(regex) || tutorial.name.toLowerCase().match(regex)) {
      return tutorial
    }
    if (
      tutorial.description.match(regex) ||
      tutorial.description.toLowerCase().match(regex)
    ) {
      return tutorial
    }
    if (tutorial.url.match(regex)) {
      return tutorial
    }
    if (tutorial.tags.filter(tag => tag.toLowerCase().match(regex)).length > 0) {
      return tutorial
    }
  })
}

const _getTagsWithCountsTutorials = (data: Tutorial[]): Tag[] => {

  const _getCountsTutorials = (allTags: string[]) => {
    let countsTutorials = {}

    allTags.forEach((item: string) => {
      const countForItem = countsTutorials[item as keyof typeof countsTutorials]
        ? countsTutorials[item as keyof typeof countsTutorials] + 1
        : 1
      countsTutorials = {
        ...countsTutorials,
        [item]: countForItem,
      }
    })

    return countsTutorials
  }

  const allTagsTutorials = data.reduce((acc: string[], item: Tutorial) => {
    return [...acc, ...item.tags]
  }, [])

  const tagCountsTutorials = _getCountsTutorials(allTagsTutorials)

  const uniqueTagsWithCountsTutorials = [...new Set(allTagsTutorials)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsTutorials[item as keyof typeof tagCountsTutorials],
        },
      ]
    },
    []
  )
  return uniqueTagsWithCountsTutorials
}

// ***************
// *** CONTEXT ***
// ***************

export const SearchContext = createContext<SearchContext>({} as SearchContext)

export const SearchContextProvider: React.FC = ({ children }) => {
  const markdownPages = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            name
            description
            tags
            url
            type
          }
        }
      }
    }
  `)

  let tools: Tool[] = [];
  let datasets: Dataset[] = [];
  let tutorials: Tutorial[] = [];
  let papers: Paper[] = [];

  markdownPages.allMdx.nodes.forEach((page : any) => {
    switch (page.frontmatter.type) {
      case "dataset":
        datasets.push({...page.frontmatter});
        return;
      case "tool":
        tools.push({...page.frontmatter});
        return;
      case "tutorial":
        tutorials.push({...page.frontmatter});
        return;
      case "paper":
        papers.push({...page.frontmatter});
        return;
      default:
        return;
    }
  })
  
  // *************
  // *** TOOLS ***
  // *************

  const [filteredTools, _setFilteredTools] = useState<Tool[]>([])
  const [allTagsTools, _setAllTagsTools] = useState<Tag[]>([])
  const [searchInputTools, _setSearchInputTools] = useState<string>("")
  const [activeTagTools, _setActiveTagTools] = useState<Tag | null>(null)

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

  const setSearchTools = (newValue: string) => _setSearchInputTools(newValue)
  const setActiveTagTools = (newTag: Tag) => _setActiveTagTools(newTag)
  const clearSearchTools = () => _setSearchInputTools("")
  const clearTagTools = () => _setActiveTagTools(null)

  // ****************
  // *** DATASETS ***
  // ****************

  const [filteredDatasets, _setFilteredDatasets] = useState<Dataset[]>([])
  const [allTagsDatasets, _setAllTagsDatasets] = useState<Tag[]>([])
  const [searchInputDatasets, _setSearchInputDatasets] = useState<string>("")
  const [activeTagDatasets, _setActiveTagDatasets] = useState<Tag | null>(null)

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

  useEffect(() => {
    const tags = _getTagsWithCountsDatasets(datasets)
    _setAllTagsDatasets(tags)
    _setFilteredDatasets(datasets)
  }, [])

  const setSearchDatasets = (newValue: string) => _setSearchInputDatasets(newValue)
  const setActiveTagDatasets = (newTag: Tag) => _setActiveTagDatasets(newTag)
  const clearSearchDatasets = () => _setSearchInputDatasets("")
  const clearTagDatasets = () => _setActiveTagDatasets(null)

  // **************
  // *** PAPERS ***
  // **************

  const [filteredPapers, _setFilteredPapers] = useState<Paper[]>([])
  const [allTagsPapers, _setAllTagsPapers] = useState<Tag[]>([])
  const [searchInputPapers, _setSearchInputPapers] = useState<string>("")
  const [activeTagPapers, _setActiveTagPapers] = useState<Tag | null>(null)

  useEffect(() => {
    const tags = _getTagsWithCountsPapers(papers)
    _setAllTagsPapers(tags)
    _setFilteredPapers(papers)
  }, [])

  useEffect(() => {
    if (searchInputPapers) {
      const filteredPapers = _filterOnSearchTermPapers(papers, searchInputPapers)
      _setFilteredPapers(filteredPapers)
      _setActiveTagPapers(null)
    } else {
      _setFilteredPapers(papers)
    }
  }, [searchInputPapers])

  useEffect(() => {
    if (activeTagPapers) {
      const filteredPapers = papers.filter(paper =>
        paper.tags.includes(activeTagPapers.name)
      )
      _setFilteredPapers(filteredPapers)
    } else {
      _setFilteredPapers(papers)
    }
  }, [activeTagPapers])

  useEffect(() => {
    const tags = _getTagsWithCountsPapers(papers)
    _setAllTagsPapers(tags)
    _setFilteredPapers(papers)
  }, [])

  const setSearchPapers = (newValue: string) => _setSearchInputPapers(newValue)
  const setActiveTagPapers = (newTag: Tag) => _setActiveTagPapers(newTag)
  const clearSearchPapers = () => _setSearchInputPapers("")
  const clearTagPapers = () => _setActiveTagPapers(null)

  // *****************
  // *** TUTORIALS ***
  // *****************

  const [filteredTutorials, _setFilteredTutorials] = useState<Tutorial[]>([])
  const [allTagsTutorials, _setAllTagsTutorials] = useState<Tag[]>([])
  const [searchInputTutorials, _setSearchInputTutorials] = useState<string>("")
  const [activeTagTutorials, _setActiveTagTutorials] = useState<Tag | null>(null)

  useEffect(() => {
    const tags = _getTagsWithCountsTutorials(tutorials)
    _setAllTagsTutorials(tags)
    _setFilteredTutorials(tutorials)
  }, [])

  useEffect(() => {
    if (searchInputTutorials) {
      const filteredTutorials = _filterOnSearchTermTutorials(tutorials, searchInputTutorials)
      _setFilteredTutorials(filteredTutorials)
      _setActiveTagTutorials(null)
    } else {
      _setFilteredTutorials(tutorials)
    }
  }, [searchInputTutorials])

  useEffect(() => {
    if (activeTagTutorials) {
      const filteredTutorials = tutorials.filter(tutorial =>
        tutorial.tags.includes(activeTagTutorials.name)
      )
      _setFilteredTutorials(filteredTutorials)
    } else {
      _setFilteredTutorials(tutorials)
    }
  }, [activeTagTutorials])

  useEffect(() => {
    const tags = _getTagsWithCountsTutorials(tutorials)
    _setAllTagsTutorials(tags)
    _setFilteredTutorials(tutorials)
  }, [])

  const setSearchTutorials = (newValue: string) => _setSearchInputTutorials(newValue)
  const setActiveTagTutorials = (newTag: Tag) => _setActiveTagTutorials(newTag)
  const clearSearchTutorials = () => _setSearchInputTutorials("")
  const clearTagTutorials = () => _setActiveTagTutorials(null)

  // ***************
  // *** CONTEXT ***
  // ***************

  const value: SearchContext = {
    tools: filteredTools,
    datasets: filteredDatasets,
    papers: filteredPapers,
    tutorials: filteredTutorials,
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
    tagsPapers: allTagsPapers,
    searchInputPapers,
    activeTagPapers,
    setSearchPapers,
    setActiveTagPapers,
    clearSearchPapers,
    clearTagPapers,
    tagsTutorials: allTagsTutorials,
    searchInputTutorials,
    activeTagTutorials,
    setSearchTutorials,
    setActiveTagTutorials,
    clearSearchTutorials,
    clearTagTutorials,
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}