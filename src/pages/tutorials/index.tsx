import React, { useContext, useState } from "react";
import { Layout } from "~/components/Layout";
import { SearchContext } from "~/context/SearchContext";
import SubmitModal from "~/components/SubmitModal";
import TagCloud from "~/components/TagCloud";
import Card from "~/components/Card";
import { Tutorial } from "~/model/tutorial";

export const TutorialsPage = ({ hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    tutorials,
    tagsTutorials,
    activeTagTutorials,
    setActiveTagTutorials,
    clearTagTutorials,
    searchInputTutorials,
    setSearchTutorials,
    setSortTutorials,
  } = useContext(SearchContext);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="text-center">
          <div className="pr-4 pb-12 pt-4 flex flex-row justify-end"></div>
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            NeuroAPEX: the Tutorials
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a knowledge base of tutorials for neuroimage analysis
          </p>
          {!hideControls && (
            <>
              <div className="py-5 mx-auto">
                <TagCloud
                  tags={tagsTutorials}
                  activeTag={activeTagTutorials}
                  toggleTag={setActiveTagTutorials}
                  clearTag={clearTagTutorials}
                />
              </div>
              <div className="px-4 md:px-12 mx-auto flex flex-col md:flex-row">
                <input
                  value={searchInputTutorials}
                  onChange={(e) => setSearchTutorials(e.target.value)}
                  placeholder="Search..."
                  className="ring-1 ring-white rounded shadow p-2 flex-grow mr-2 text-sm bg-theme-dark text-theme-white font-bold h-12 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div>
                  <select
                    onChange={(e) => setSortTutorials(e.target.value)}
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
            {tutorials.map((tutorial: Tutorial, index: number) => {
              return (
                <Card
                  key={`${tutorial.name.replace(" ", "-")}-${index}`}
                  title={tutorial.name}
                  description={tutorial.description}
                  url={tutorial.url}
                  tags={tutorial.tags}
                  activeTag={activeTagTutorials}
                  slug={tutorial.slug}
                  header={tutorial.header}
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

export default TutorialsPage;
