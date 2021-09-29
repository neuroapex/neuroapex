import React, { useContext, useState } from "react"
import { Layout } from "~/components/Layout"
import { SearchContext } from "~/context/SearchContext"
import SubmitModal from "~/components/SubmitModal"
import TagCloud from "~/components/TagCloud"
import Card from "~/components/Card"
import { Dataset } from "~/model/dataset"

export const DatasetsPage = ({ hideControls = false }) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const {
    datasets,
    tagsDatasets,
    activeTagDatasets,
    setActiveTagDatasets,
    clearTagDatasets,
    searchInputDatasets,
    setSearchDatasets,
  } = useContext(SearchContext)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="text-center">
          <div className="pr-4 pb-12 pt-4 flex flex-row justify-end"></div>
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            NeuroAPEX: the Datasets
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a knowledge base of reference, normative, and disease datasets for neuroimage analysis 
          </p>
          {!hideControls && (
            <>
              <div className="py-5 mx-auto">
                <TagCloud
                  tags={tagsDatasets}
                  activeTag={activeTagDatasets}
                  toggleTag={setActiveTagDatasets}
                  clearTag={clearTagDatasets}
                />
              </div>
              <div className="px-4 md:px-12 mx-auto flex flex-col md:flex-row">
                <input
                  value={searchInputDatasets}
                  onChange={e => setSearchDatasets(e.target.value)}
                  placeholder="Search..."
                  className="border rounded shadow p-2 flex-grow mr-2 text-lg bg-theme-dark text-theme-white font-bold"
                />
              </div>
            </>
          )}
        </header>

        <main className="mx-auto">
          <div className="justify-center flex flex-col sm:flex-row flex-nowrap sm:flex-wrap mt-12">
            {datasets.map((dataset: Dataset, index: number) => {
              return (
                <Card
                  key={`${dataset.name.replace(" ", "-")}-${index}`}
                  title={dataset.name}
                  description={dataset.description}
                  url={dataset.url}
                  tags={dataset.tags}
                  activeTag={activeTagDatasets}
                  slug={dataset.slug}
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

export default DatasetsPage 