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
        <div className="pr-4 pb-2 pt-2 flex flex-row justify-center">
            <img src={logo} alt="NeuroApex Logo" />
        </div>
        <div className="pr-4 pb-2 pt-2 flex flex-row justify-center text-5xl font-bold pb-5 text-theme-blue">
            NeuroAPEX
        </div>
        <div className="pr-4 pb-2 pt-2 flex flex-row justify-center text-lg text-theme-white font-bold">
            a neuroimaging analytics platform for expert guidance
        </div>

      <div className="flex flex-col p-4 container mx-auto">
        <div className="p-8">
          <h1 className="text-4xl pb-4 font-bold text-theme-white">
            What is NeuroAPEX? 
          </h1>
          <div className="text-lg text-theme-white">
            NeuroAPEX is an web resource for helping neuroscientists better
            understand and assess how they can analyze neuroimaging datasets.
            There is a great variety of publicly available tools for image
            analytics, and while they each have their unique and important uses,
            these overwhelming options pose a challenge for neuroscientists who
            have imaging data but are unsure how to best use these tools in
            practice.  NeuroAPEX was created to help bridge this gap between 
            the developers of computational imaging methods and the
            neuroscientists seeking to use them.
          </div>
          <br></br>
          <div className="text-lg text-theme-white">
            NeuroAPEX collects, curates, links a variety of neuroimage analysis
            resources, including software packages, reference datasets,
            publications, and tutorials.  Taken together, this is meant to
            capture the collective practical expertise of the community,
            something which more often shared informally through channels such
            as lab meetings, collaborations occuring from chance encounters,
            water cooler conversation, etc.  We aim for NeuroAPEX to provide an
            open and accessible route to reach this expertise, with flexibily
            for growing along with the field and with additions from the
            community itself.
          </div>
        </div>

        <div className="p-8 ">
          <h1 className="text-4xl font-bold pb-4 text-theme-white">
            Who develops NeuroAPEX? 
          </h1>
          <p className="text-lg text-theme-white">
              NeuroAPEX was created and maintained by <a className="text-theme-blue
              hover:underline" href="https://cabeen.io"> Ryan P. Cabeen </a>
              along with the <a className="text-theme-blue hover:underline"
              href="http://gaain.org/">The Global Alzheimer's Association
              Interactive Network (GAAIN)</a> team, with support from the <a
              className="text-theme-blue hover:underline"
              href="https://www.alzheimersdata.org/"> Alzheimer's Disease Data
              Initiative (ADDI)</a>. Ultimately though, this is meant to be an
              open resource for the broader neuroimaging community.  Reseachers
              who develop new tools or other resources can share them here, and
              neuroscientists can share their own best-practices and related
              resources here as well.
          </p>

        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold pb-4 text-theme-white">
            How can I contribute? 
          </h1>
          <p className="text-lg text-theme-white">
            You can submit your own resources via the <span
            className="text-theme-blue text-bold">Submit a new resource </span>
            button at the bottom of the page for each type of resource.  You can also
            submit a pull request on the <a className="text-theme-blue
            hover:underline" href="https://github.com/cabeen/neuroapex"> 
            NeuroAPEX GitHub repository</a>.
          </p>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold pb-4 text-theme-white">
            How can I use it? 
          </h1>
          <p className="text-lg text-theme-white">
            In this section, we will have a statement about any limitations on
            how it can be used and that this is a research tool that is not for
            clinical decision making. 
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
