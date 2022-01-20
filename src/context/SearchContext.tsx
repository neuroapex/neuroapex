import { graphql, useStaticQuery } from "gatsby";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Tag } from "~/model/tag";
import { Tool } from "~/model/tool";
import { Dataset } from "~/model/dataset";
import { Paper } from "~/model/paper";
import { Tutorial } from "~/model/tutorial";
import * as JsSearch from "js-search";

interface SearchContext {
  tools: Tool[];
  tagsTools: Tag[];
  searchInputTools: string;
  activeTagTools: Tag | null;
  setSearchTools: (term: string) => void;
  setActiveTagTools: (tag: Tag) => void;
  clearSearchTools: () => void;
  clearTagTools: () => void;
  setSortTools: (value: string) => void;
  datasets: Dataset[];
  tagsDatasets: Tag[];
  searchInputDatasets: string;
  activeTagDatasets: Tag | null;
  setSearchDatasets: (term: string) => void;
  setActiveTagDatasets: (tag: Tag) => void;
  clearSearchDatasets: () => void;
  clearTagDatasets: () => void;
  setSortDatasets: (value: string) => void;
  papers: Paper[];
  tagsPapers: Tag[];
  searchInputPapers: string;
  activeTagPapers: Tag | null;
  setSearchPapers: (term: string) => void;
  setActiveTagPapers: (tag: Tag) => void;
  clearSearchPapers: () => void;
  clearTagPapers: () => void;
  setSortPapers: (value: string) => void;
  tutorials: Tutorial[];
  tagsTutorials: Tag[];
  searchInputTutorials: string;
  activeTagTutorials: Tag | null;
  setSearchTutorials: (term: string) => void;
  setActiveTagTutorials: (tag: Tag) => void;
  clearSearchTutorials: () => void;
  clearTagTutorials: () => void;
  setSortTutorials: (value: string) => void;
}

// *************
// *** TOOLS ***
// *************

const _getTagsWithCountsTools = (data: Tool[]): Tag[] => {
  const _getCountsTools = (allTags: string[]) => {
    let countsTools = {};

    allTags.forEach((item: string) => {
      const countForItem = countsTools[item as keyof typeof countsTools]
        ? countsTools[item as keyof typeof countsTools] + 1
        : 1;
      countsTools = {
        ...countsTools,
        [item]: countForItem,
      };
    });

    return countsTools;
  };

  const allTagsTools = data.reduce((acc: string[], item: Tool) => {
    return [...acc, ...item.tags];
  }, []);

  const tagCountsTools = _getCountsTools(allTagsTools);

  const uniqueTagsWithCountsTools = [...new Set(allTagsTools)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsTools[item as keyof typeof tagCountsTools],
        },
      ];
    },
    []
  );
  return uniqueTagsWithCountsTools;
};

// ****************
// *** DATASETS ***
// ****************

const _getTagsWithCountsDatasets = (data: Dataset[]): Tag[] => {
  const _getCountsDatasets = (allTags: string[]) => {
    let countsDatasets = {};

    allTags.forEach((item: string) => {
      const countForItem = countsDatasets[item as keyof typeof countsDatasets]
        ? countsDatasets[item as keyof typeof countsDatasets] + 1
        : 1;
      countsDatasets = {
        ...countsDatasets,
        [item]: countForItem,
      };
    });

    return countsDatasets;
  };

  const allTagsDatasets = data.reduce((acc: string[], item: Dataset) => {
    return [...acc, ...item.tags];
  }, []);

  const tagCountsDatasets = _getCountsDatasets(allTagsDatasets);

  const uniqueTagsWithCountsDatasets = [...new Set(allTagsDatasets)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsDatasets[item as keyof typeof tagCountsDatasets],
        },
      ];
    },
    []
  );
  return uniqueTagsWithCountsDatasets;
};

// **************
// *** PAPERS ***
// **************

const _getTagsWithCountsPapers = (data: Paper[]): Tag[] => {
  const _getCountsPapers = (allTags: string[]) => {
    let countsPapers = {};

    allTags.forEach((item: string) => {
      const countForItem = countsPapers[item as keyof typeof countsPapers]
        ? countsPapers[item as keyof typeof countsPapers] + 1
        : 1;
      countsPapers = {
        ...countsPapers,
        [item]: countForItem,
      };
    });

    return countsPapers;
  };

  const allTagsPapers = data.reduce((acc: string[], item: Paper) => {
    return [...acc, ...item.tags];
  }, []);

  const tagCountsPapers = _getCountsPapers(allTagsPapers);

  const uniqueTagsWithCountsPapers = [...new Set(allTagsPapers)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence: tagCountsPapers[item as keyof typeof tagCountsPapers],
        },
      ];
    },
    []
  );
  return uniqueTagsWithCountsPapers;
};

// *****************
// *** TUTORIALS ***
// *****************

const _getTagsWithCountsTutorials = (data: Tutorial[]): Tag[] => {
  const _getCountsTutorials = (allTags: string[]) => {
    let countsTutorials = {};

    allTags.forEach((item: string) => {
      const countForItem = countsTutorials[item as keyof typeof countsTutorials]
        ? countsTutorials[item as keyof typeof countsTutorials] + 1
        : 1;
      countsTutorials = {
        ...countsTutorials,
        [item]: countForItem,
      };
    });

    return countsTutorials;
  };

  const allTagsTutorials = data.reduce((acc: string[], item: Tutorial) => {
    return [...acc, ...item.tags];
  }, []);

  const tagCountsTutorials = _getCountsTutorials(allTagsTutorials);

  const uniqueTagsWithCountsTutorials = [...new Set(allTagsTutorials)].reduce(
    (acc: Tag[], item: string) => {
      return [
        ...acc,
        {
          name: item,
          occurrence:
            tagCountsTutorials[item as keyof typeof tagCountsTutorials],
        },
      ];
    },
    []
  );
  return uniqueTagsWithCountsTutorials;
};

// ***************
// *** CONTEXT ***
// ***************

export const SearchContext = createContext<SearchContext>({} as SearchContext);

export const SearchContextProvider: React.FC = ({ children }) => {
  const didMount = useRef(false);
  const markdownPages = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          slug
          frontmatter {
            name
            description
            tags
            url
            type
            header
            createdAt
          }
        }
      }
    }
  `);

  let tools: Tool[] = [];
  let datasets: Dataset[] = [];
  let tutorials: Tutorial[] = [];
  let papers: Paper[] = [];

  let toolsIndex = new JsSearch.Search("id");
  toolsIndex.sanitizer = new JsSearch.LowerCaseSanitizer();
  toolsIndex.addIndex("name");
  toolsIndex.addIndex("description");
  toolsIndex.addIndex("tags");

  let datasetsIndex = new JsSearch.Search("id");
  datasetsIndex.sanitizer = new JsSearch.LowerCaseSanitizer();
  datasetsIndex.addIndex("name");
  datasetsIndex.addIndex("description");
  datasetsIndex.addIndex("tags");

  let tutorialsIndex = new JsSearch.Search("id");
  tutorialsIndex.sanitizer = new JsSearch.LowerCaseSanitizer();
  tutorialsIndex.addIndex("name");
  tutorialsIndex.addIndex("description");
  tutorialsIndex.addIndex("tags");

  let papersIndex = new JsSearch.Search("id");
  papersIndex.sanitizer = new JsSearch.LowerCaseSanitizer();
  papersIndex.indexStrategy = new JsSearch.PrefixIndexStrategy();
  papersIndex.addIndex("name");
  papersIndex.addIndex("description");
  papersIndex.addIndex("tags");
  papersIndex.addIndex("abstract");

  markdownPages.allMdx.nodes.forEach((page: any) => {
    switch (page.frontmatter.type) {
      case "dataset":
        datasets.push({
          id: page.id,
          slug: "/datasets/" + page.slug,
          ...page.frontmatter,
        });
        return;
      case "tool":
        tools.push({
          id: page.id,
          slug: "/tools/" + page.slug,
          ...page.frontmatter,
        });
        return;
      case "tutorial":
        tutorials.push({
          id: page.id,
          slug: "/tutorials/" + page.slug,
          ...page.frontmatter,
        });
        return;
      case "paper":
        papers.push({
          id: page.id,
          slug: "/papers/" + page.slug,
          ...page.frontmatter,
        });
        return;
      default:
        return;
    }
  });

  tools.sort((a, b) => a.name.localeCompare(b.name));
  papers.sort((a, b) => a.name.localeCompare(b.name));
  datasets.sort((a, b) => a.name.localeCompare(b.name));
  tutorials.sort((a, b) => a.name.localeCompare(b.name));

  toolsIndex.addDocuments(tools);
  datasetsIndex.addDocuments(datasets);
  tutorialsIndex.addDocuments(tutorials);
  papersIndex.addDocuments(papers);

  // *************
  // *** TOOLS ***
  // *************

  const [filteredTools, _setFilteredTools] = useState<Tool[]>([]);
  const [allTagsTools, _setAllTagsTools] = useState<Tag[]>([]);
  const [searchInputTools, _setSearchInputTools] = useState<string>("");
  const [activeTagTools, _setActiveTagTools] = useState<Tag | null>(null);
  const [sortInputTools, _setSortInputTools] = useState<string>("name");

  useEffect(() => {
    const tags = _getTagsWithCountsTools(tools);
    _setAllTagsTools(tags);
    _setFilteredTools(tools);
    didMount.current = true;
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    if (searchInputTools) {
      const filteredTools = toolsIndex.search(searchInputTools);
      _setFilteredTools(filteredTools);
      _setActiveTagTools(null);
    } else {
      _setFilteredTools(tools);
    }
  }, [searchInputTools]);

  useEffect(() => {
    if (!didMount.current) return;
    if (activeTagTools) {
      _setFilteredTools((oldFilteredTools) =>
        oldFilteredTools.filter((tool) =>
          tool.tags.includes(activeTagTools.name)
        )
      );
    } else {
      _setFilteredTools(tools);
    }
  }, [activeTagTools]);

  useEffect(() => {
    if (!didMount.current) return;
    if (sortInputTools) {
      _setFilteredTools((oldFilteredTools) =>
        oldFilteredTools.sort((a, b) => {
          switch (sortInputTools) {
            case "name":
              return a.name.localeCompare(b.name);
            case "date":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            default:
              return 0;
          }
        })
      );
    } else {
      _setFilteredTools(tools);
    }
  }, [sortInputTools]);

  const setSearchTools = (newValue: string) => _setSearchInputTools(newValue);
  const setActiveTagTools = (newTag: Tag) => _setActiveTagTools(newTag);
  const clearSearchTools = () => _setSearchInputTools("");
  const clearTagTools = () => _setActiveTagTools(null);
  const setSortTools = (newValue: string) => _setSortInputTools(newValue);

  // ****************
  // *** DATASETS ***
  // ****************

  const [filteredDatasets, _setFilteredDatasets] = useState<Dataset[]>([]);
  const [allTagsDatasets, _setAllTagsDatasets] = useState<Tag[]>([]);
  const [searchInputDatasets, _setSearchInputDatasets] = useState<string>("");
  const [activeTagDatasets, _setActiveTagDatasets] = useState<Tag | null>(null);
  const [sortInputDatasets, _setSortInputDatasets] = useState<string>("name");

  useEffect(() => {
    const tags = _getTagsWithCountsDatasets(datasets);
    _setAllTagsDatasets(tags);
    _setFilteredDatasets(datasets);
    didMount.current = true;
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    if (searchInputDatasets) {
      const filteredDatasets = datasetsIndex.search(searchInputDatasets);
      _setFilteredDatasets(filteredDatasets);
      _setActiveTagDatasets(null);
    } else {
      _setFilteredDatasets(datasets);
    }
  }, [searchInputDatasets]);

  useEffect(() => {
    if (!didMount.current) return;
    if (activeTagDatasets) {
      _setFilteredDatasets((oldFilteredDatasets) =>
        oldFilteredDatasets.filter((dataset) =>
          dataset.tags.includes(activeTagDatasets.name)
        )
      );
    } else {
      _setFilteredDatasets(datasets);
    }
  }, [activeTagDatasets]);

  useEffect(() => {
    if (!didMount.current) return;
    if (sortInputDatasets) {
      _setFilteredDatasets((oldFilteredDatasets) =>
        oldFilteredDatasets.sort((a, b) => {
          switch (sortInputDatasets) {
            case "name":
              return a.name.localeCompare(b.name);
            case "date":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            default:
              return 0;
          }
        })
      );
    } else {
      _setFilteredDatasets(datasets);
    }
  }, [sortInputDatasets]);

  const setSearchDatasets = (newValue: string) =>
    _setSearchInputDatasets(newValue);
  const setActiveTagDatasets = (newTag: Tag) => _setActiveTagDatasets(newTag);
  const clearSearchDatasets = () => _setSearchInputDatasets("");
  const clearTagDatasets = () => _setActiveTagDatasets(null);
  const setSortDatasets = (newValue: string) => _setSortInputDatasets(newValue);

  // **************
  // *** PAPERS ***
  // **************

  const [filteredPapers, _setFilteredPapers] = useState<Paper[]>([]);
  const [allTagsPapers, _setAllTagsPapers] = useState<Tag[]>([]);
  const [searchInputPapers, _setSearchInputPapers] = useState<string>("");
  const [activeTagPapers, _setActiveTagPapers] = useState<Tag | null>(null);
  const [sortInputPapers, _setSortInputPapers] = useState<string>("name");

  useEffect(() => {
    const tags = _getTagsWithCountsPapers(papers);
    _setAllTagsPapers(tags);
    _setFilteredPapers(papers);
    didMount.current = true;
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    if (searchInputPapers) {
      const searchPapers = papersIndex.search(searchInputPapers);
      console.log(searchInputPapers);
      console.log(searchPapers);
      _setFilteredPapers(searchPapers);
      _setActiveTagPapers(null);
    } else {
      _setFilteredPapers(papers);
    }
  }, [searchInputPapers]);

  useEffect(() => {
    if (!didMount.current) return;
    if (activeTagPapers) {
      _setFilteredPapers((oldFilteredPapers) =>
        oldFilteredPapers.filter((paper) =>
          paper.tags.includes(activeTagPapers.name)
        )
      );
    } else {
      _setFilteredPapers(papers);
    }
  }, [activeTagPapers]);

  useEffect(() => {
    if (!didMount.current) return;
    if (sortInputPapers) {
      _setFilteredPapers((oldFilteredPapers) =>
        oldFilteredPapers.sort((a, b) => {
          switch (sortInputPapers) {
            case "name":
              return a.name.localeCompare(b.name);
            case "date":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            default:
              return 0;
          }
        })
      );
    } else {
      _setFilteredPapers(papers);
    }
  }, [sortInputPapers]);

  const setSearchPapers = (newValue: string) => _setSearchInputPapers(newValue);
  const setActiveTagPapers = (newTag: Tag) => _setActiveTagPapers(newTag);
  const clearSearchPapers = () => _setSearchInputPapers("");
  const clearTagPapers = () => _setActiveTagPapers(null);
  const setSortPapers = (newValue: string) => _setSortInputPapers(newValue);

  // *****************
  // *** TUTORIALS ***
  // *****************

  const [filteredTutorials, _setFilteredTutorials] = useState<Tutorial[]>([]);
  const [allTagsTutorials, _setAllTagsTutorials] = useState<Tag[]>([]);
  const [searchInputTutorials, _setSearchInputTutorials] = useState<string>("");
  const [activeTagTutorials, _setActiveTagTutorials] = useState<Tag | null>(
    null
  );
  const [sortInputTutorials, _setSortInputTutorials] = useState<string>("name");

  useEffect(() => {
    const tags = _getTagsWithCountsTutorials(tutorials);
    _setAllTagsTutorials(tags);
    _setFilteredTutorials(tutorials);
    didMount.current = true;
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    if (searchInputTutorials) {
      const filteredTutorials = tutorialsIndex.search(searchInputTutorials);
      _setFilteredTutorials(filteredTutorials);
      _setActiveTagTutorials(null);
    } else {
      _setFilteredTutorials(tutorials);
    }
  }, [searchInputTutorials]);

  useEffect(() => {
    if (!didMount.current) return;
    if (activeTagTutorials) {
      _setFilteredTutorials((oldFilteredTutorials) =>
        oldFilteredTutorials.filter((tutorial) =>
          tutorial.tags.includes(activeTagTutorials.name)
        )
      );
    } else {
      _setFilteredTutorials(tutorials);
    }
  }, [activeTagTutorials]);

  useEffect(() => {
    if (!didMount.current) return;
    if (sortInputTutorials) {
      _setFilteredTutorials((oldFilteredTutorials) =>
        oldFilteredTutorials.sort((a, b) => {
          switch (sortInputTutorials) {
            case "name":
              return a.name.localeCompare(b.name);
            case "date":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            default:
              return 0;
          }
        })
      );
    } else {
      _setFilteredTutorials(tutorials);
    }
  }, [sortInputTutorials]);

  const setSearchTutorials = (newValue: string) =>
    _setSearchInputTutorials(newValue);
  const setActiveTagTutorials = (newTag: Tag) => _setActiveTagTutorials(newTag);
  const clearSearchTutorials = () => _setSearchInputTutorials("");
  const clearTagTutorials = () => _setActiveTagTutorials(null);
  const setSortTutorials = (newValue: string) =>
    _setSortInputTutorials(newValue);

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
    setSortTools,
    tagsDatasets: allTagsDatasets,
    searchInputDatasets,
    activeTagDatasets,
    setSearchDatasets,
    setActiveTagDatasets,
    clearSearchDatasets,
    clearTagDatasets,
    setSortDatasets,
    tagsPapers: allTagsPapers,
    searchInputPapers,
    activeTagPapers,
    setSearchPapers,
    setActiveTagPapers,
    clearSearchPapers,
    clearTagPapers,
    setSortPapers,
    tagsTutorials: allTagsTutorials,
    searchInputTutorials,
    activeTagTutorials,
    setSearchTutorials,
    setActiveTagTutorials,
    clearSearchTutorials,
    clearTagTutorials,
    setSortTutorials,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
