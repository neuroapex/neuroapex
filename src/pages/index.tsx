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
     <div className="flex flex-col justify-center mt-auto">
          <div className="p-4 justify-center">
              <img width="250px" src={logo} alt="NeuroApex Logo" />
          </div>
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            Welcome to NeuroAPEX
          </h1>
          <p className="text-2xl text-theme-white font-bold">
            a neuroimaging analytics platform for expert guidance
          </p>
      </div>

      <div className="flex flex-col p-4 container mx-auto">
        <div className="p-4">
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            What is NeuroAPEX? 
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a neuroimaging analytics platform for expert guidance
          </p>
        </div>

        <div className="p-4">
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            Who develops NeuroAPEX? 
          </h1>
          <p className="text-lg text-theme-white font-bold">
            <a className="text-theme-blue hover:underline"
              href="https://neuroapex.io">&nbsp;
              neuroapex.io </a>
            is developed by &nbsp;
            <a className="text-theme-blue hover:underline"
              href="https://cabeen.io">Ryan Cabeen</a> and&nbsp;
            <a className="text-theme-blue hover:underline"
              href="http://gaain.org/">GAAIN</a>.
          </p>
        </div>

        <div className="p-4">
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            How can I contribute? 
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a neuroimaging analytics platform for expert guidance
          </p>
        </div>

        <div className="p-4">
          <h1 className="text-5xl font-bold pb-5 text-theme-blue">
            How can I use it? 
          </h1>
          <p className="text-lg text-theme-white font-bold">
            a neuroimaging analytics platform for expert guidance
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
