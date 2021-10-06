import React, { useContext, useState } from "react"
import { Layout } from "~/components/Layout"
import { SearchContext } from "~/context/SearchContext"
import SubmitModal from "~/components/SubmitModal"
import TagCloud from "~/components/TagCloud"
import Card from "~/components/Card"
import { Paper } from "~/model/paper"

export const PapersPage = ({ hideControls = false }) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const {
    papers,
    tagsPapers,
    activeTagPapers,
    setActiveTagPapers,
    clearTagPapers,
    searchInputPapers,
    setSearchPapers,
  } = useContext(SearchContext)

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
            <>
              <div className="py-5 mx-auto">
                <TagCloud
                  tags={tagsPapers}
                  activeTag={activeTagPapers}
                  toggleTag={setActiveTagPapers}
                  clearTag={clearTagPapers}
                />
              </div>
              <div className="px-4 md:px-12 mx-auto flex flex-col md:flex-row">
                <input
                  value={searchInputPapers}
                  onChange={e => setSearchPapers(e.target.value)}
                  placeholder="Search..."
                  className="border rounded shadow p-2 flex-grow mr-2 text-lg bg-theme-dark text-theme-white font-bold"
                />
              </div>
            </>
          )}
        </header>

        <main className="mx-auto">
          <div className="justify-center flex flex-col sm:flex-row flex-nowrap sm:flex-wrap mt-24">
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
                />
              )
            })}
          </div>
        </main>

        <div className="pr-4 pb-12 pt-4 flex flex-row justify-center">
          <button onClick={() => setModalOpen(true)}
            className="py-2 px-4 mt-2 md:mt-0 rounded shadow bg-theme-blue text-theme-dark font-bold text-sm md:text-md lg:text-lg">
            Submit a new resource 
          </button>
        </div>
        <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Layout>
  )
}

export default PapersPage 