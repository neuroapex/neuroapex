import React, { useContext } from "react"
import { useState } from "react"
import { Layout } from "~/components/Layout"
import Card from "~/components/Card"
import { Tool } from "~/model/tool"
import { SearchContext } from "~/context/SearchContext"
import { AboveFold } from "../components/AboveFold"
import SubmitModal from "../components/SubmitModal"

interface Props {
  hideControls?: boolean
}

export const IndexPage: React.FC<Props> = ({ children, hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { tools } = useContext(SearchContext)

  return (
    <Layout>

      <div className="max-w-7xl mx-auto">
        <AboveFold hideControls={hideControls} openModal={() => setModalOpen(true)} />
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
            />
          )
        })}
      </div>
      </main>
      <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
    </Layout>
  )
}

export default IndexPage
