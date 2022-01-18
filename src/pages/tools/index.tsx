import React, { useContext, useState } from "react";
import { Layout } from "~/components/Layout";
import { SearchContext } from "~/context/SearchContext";
import SubmitModal from "~/components/SubmitModal";
import TagCloud from "~/components/TagCloud";
import Card from "~/components/Card";
import { Tool } from "~/model/tool";

export const ToolsPage = ({ hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    tools,
    tagsTools,
    activeTagTools,
    setActiveTagTools,
    clearTagTools,
    searchInputTools,
    setSearchTools,
    setSortTools
  } = useContext(SearchContext);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="text-center">
          <div className="pr-4 pb-12 pt-4 flex flex-row justify-end"></div>
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            NeuroAPEX: the Tools
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a knowledge base of individual software tools for neuroimage
            analysis
          </p>
          {!hideControls && (
            <>
              <div className="py-5 mx-auto">
                <TagCloud
                  tags={tagsTools}
                  activeTag={activeTagTools}
                  toggleTag={setActiveTagTools}
                  clearTag={clearTagTools}
                />
              </div>
              <div className="px-4 md:px-12 mx-auto flex flex-col md:flex-row">
                <input
                  value={searchInputTools}
                  onChange={(e) => setSearchTools(e.target.value)}
                  placeholder="Search..."
                  className="ring-1 ring-white rounded shadow p-2 flex-grow mr-2 text-sm bg-theme-dark text-theme-white font-bold h-12 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div>
                  <select
                    onChange={(e) => setSortTools(e.target.value)}
                    className="bg-theme-dark text-theme-white text-sm p-2 ring-1 ring-white rounded h-12 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="name">Sorted by name</option>
                    <option value="date">Sorted by date</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </header>

        <main className="mx-auto">
          <div className="justify-center flex flex-col sm:flex-row flex-nowrap sm:flex-wrap mt-12">
            {tools.map((tool: Tool, index: number) => {
              return (
                <Card
                  key={`${tool.name.replace(" ", "-")}-${index}`}
                  title={tool.name}
                  description={tool.description}
                  url={tool.url}
                  tags={tool.tags}
                  activeTag={activeTagTools}
                  slug={tool.slug}
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

export default ToolsPage;
