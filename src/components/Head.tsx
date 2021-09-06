
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import {Link} from 'gatsby'
import MyImage from "../../static/logo.png"

interface Props {
  hideControls?: boolean
}

const siteName = "NeuroAPEX"
const siteUrl = "https://neuroapex.io"
const siteImage = "https://neuroapex.io/twitter-card.png"
const siteLocale = "en_US"
const siteDescription =
  "NeuroAPEX: a neuroimaging analytics platform for expert guidance"


export const Head: React.FC<Props> = ({ children, hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const linkStyle = `hover:opacity-70 text-sm sm:text-lg`
  const logoStyle=`text-white sm:text-base text-sm`

  return (
    <>
      <Helmet>
        <title>NeuroAPEX</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content={siteDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={siteName} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:locale" content={siteLocale} />

        {/* Twitter */}
        <meta property="twitter:card" content="website" />
        <meta property="twitter:creator" content="@_glvn" />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:title" content={siteName} />
        <meta property="twitter:image" content={siteImage} />
        <meta property="twitter:image:alt" content={siteName} />
      </Helmet>
      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-4">
          <Link to="/">
            <img src={MyImage} alt="NeuroApex Logo" width="75px"/>
          </Link>
        </div>
        <div class="flex items-center flex-shrink-0 text-white mr-8">
          <Link to="/">
            <span class="font-bold text-2xl tracking-tight">NeuroAPEX</span>
          </Link>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="w-full font-bold block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="lg:flex-grow">
            <div class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
            <Link to="/tools">Tools</Link></div>
            <div class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
            <Link to="/tools">Datasets</Link></div>
            <div class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
            <Link to="/tools">Publications</Link></div>
            <div class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
            <Link to="/tools">Tutorials</Link></div>
            <div class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200">
            <Link to="/">About</Link></div>
          </div>
        </div>
      </nav>
    </>
  )
}