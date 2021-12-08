import React, { useContext, useState } from "react";
import { Layout } from "~/components/Layout";
import { SearchContext } from "~/context/SearchContext";
import SubmitModal from "~/components/SubmitModal";
import TagCloud from "~/components/TagCloud";
import Card from "~/components/Card";
import { Paper } from "~/model/paper";
import Minimize from "~/images/icons/Minimize";
import Maximize from "~/images/icons/Maximize";

export const PapersPage = ({ hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cardsExpanded, setCardsExpanded] = useState<boolean>(true);

  const {
    papers,
    tagsPapers,
    activeTagPapers,
    setActiveTagPapers,
    clearTagPapers,
    searchInputPapers,
    setSearchPapers,
    setSortPapers,
  } = useContext(SearchContext);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="text-center">
          <div className="pr-4 pb-12 pt-4 flex flex-row justify-end"></div>
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            NeuroAPEX: the Papers
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a knowledge base of important papers for neuroimage analysis
          </p>
          {!hideControls && (
            <div className="px-4 md:px-12">
              <div className="py-5 mx-auto">
                <TagCloud
                  tags={tagsPapers}
                  activeTag={activeTagPapers}
                  toggleTag={setActiveTagPapers}
                  clearTag={clearTagPapers}
                />
              </div>
              <div className="mb-2">
                <input
                  value={searchInputPapers}
                  onChange={(e) => setSearchPapers(e.target.value)}
                  placeholder="Search..."
                  className="border border-theme-white rounded shadow p-2 flex-grow mr-2 text-sm bg-transparent text-theme-white h-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex flex-row">
                <div className="flex items-center mr-4">
                  <span className="text-theme-white text-sm text-bold mr-2">
                    View
                  </span>
                  <div className="items-center justify-center inline-block h-12">
                    <button
                      className="text-theme-white bg-transparent border-l border-t border-b border-theme-white active:bg-purple-600 font-bold text-xs px-4 py-2 rounded-l outline-none focus:outline-none h-full"
                      type="button"
                      onClick={() => setCardsExpanded(true)}
                    >
                      <Maximize />
                    </button>
                    <button
                      className="text-theme-white bg-transparent border border-theme-white active:bg-purple-600 font-bold text-xs px-4 py-2 rounded-r outline-none focus:outline-none h-full"
                      type="button"
                      onClick={() => setCardsExpanded(false)}
                    >
                      <Minimize />
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-theme-white text-sm text-bold mr-2">
                    Sort
                  </span>
                  <select
                    onChange={(e) => setSortPapers(e.target.value)}
                    className="bg-theme-dark text-theme-white text-sm p-2 border border-theme-white rounded h-12 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="name">By name</option>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="mx-auto">
          <div className="justify-center flex flex-col sm:flex-row flex-nowrap sm:flex-wrap mt-12">
            {papers.map((paper: Paper, index: number) => {
              return (
                <Card
                  key={`${paper.name.replace(" ", "-")}-${index}`}
                  title={paper.name}
                  description={paper.description}
                  url={paper.url}
                  tags={paper.tags}
                  activeTag={activeTagPapers}
                  slug={paper.slug}
                  expanded={cardsExpanded}
                />
              );
            })}
          </div>
        </main>

        <div className="pr-4 pb-12 pt-4 flex flex-row justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="py-2 px-4 mt-2 md:mt-0 rounded shadow bg-theme-blue text-theme-dark font-bold text-sm md:text-md lg:text-lg"
          >
            Submit a new resource
          </button>
        </div>
        <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Layout>
  );
};

export default PapersPage;
