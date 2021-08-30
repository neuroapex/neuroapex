import React, { useContext } from "react"
import { SearchContext } from "~/context/SearchContext"
import { NeuroAPEX } from "./icons/NeuroAPEX"
import TagCloud from "./TagCloud"
import MyImage from "../../static/logo.png"

interface Props {
  openModal: () => void
  hideControls?: boolean
}

export const AboveFold: React.FC<Props> = ({
  openModal,
  hideControls = false,
}) => {
  const {
    tags,
    activeTag,
    setActiveTag,
    clearTag,
    searchInput,
    setSearch,
  } = useContext(SearchContext)
  return (
    <header className="text-center">
      <div className="pr-4 pb-12 pt-4 flex flex-row justify-end">
        <button onClick={openModal}
          className="py-2 px-4 mt-2 md:mt-0 rounded shadow bg-theme-yellow text-theme-dark font-bold text-sm md:text-md lg:text-lg">
          Submit a new entry
        </button>
      </div>
      <div className="mx-auto w-72">
      <img src={MyImage} alt="NeuroApex Logo" />
      </div>
      <h1 className="text-5xl font-bold pb-5 text-theme-yellow">
        NeuroAPEX
      </h1>
      <p className="text-lg text-theme-white font-bold">
        a neuroimaging analytics platform for expert guidance
      </p>
      {!hideControls && (
        <>
          <div className="py-5 mx-auto">
            <TagCloud
              tags={tags}
              activeTag={activeTag}
              toggleTag={setActiveTag}
              clearTag={clearTag}
            />
          </div>
          <div className="px-4 md:px-12 mx-auto flex flex-col md:flex-row">
            <input
              value={searchInput}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="border rounded shadow p-2 flex-grow mr-2 text-lg bg-theme-dark text-theme-white font-bold"
            />
          </div>
        </>
      )}
    </header>
  )
}
