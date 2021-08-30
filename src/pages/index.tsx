import React, { useContext } from "react"
import { useState } from "react"
import { Layout } from "~/components/Layout"
import Card from "~/components/Card"
import { Tool } from "~/model/tool"
import { SearchContext } from "~/context/SearchContext"
import { AboveFold } from "../components/AboveFold"
import SubmitModal from "../components/SubmitModal"
import logo from "../../static/logo.png"

interface Props {
  hideControls?: boolean
}

export const IndexPage: React.FC<Props> = ({ children, hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { tools } = useContext(SearchContext)

  return (
    <Layout>
        <div className="pr-4 pb-12 pt-4 flex flex-row justify-center">
          <div className="mx-auto w-72">
            <img src={logo} alt="NeuroApex Logo" />
          </div>
        </div>
        <div className="pr-4 pb-12 pt-4 flex flex-row justify-center">
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            NeuroAPEX
          </h1>
        </div>
        <div className="pr-4 pb-12 pt-4 flex flex-row justify-center">
          <p className="text-lg text-theme-white font-bold">
            a neuroimaging analytics platform for expert guidance
          </p>
        </div>
    </Layout>
  )
}

export default IndexPage
