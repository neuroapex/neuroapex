import React, { useState } from "react"
import Footer from "./Footer"
import { Head } from "./Head"

import { AboveFold } from "./AboveFold"

import SubmitModal from "./SubmitModal"

interface Props {
  hideControls?: boolean
}

export const Layout: React.FC<Props> = ({ children, hideControls = false }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (<>
    <Head />
    <div className="max-w-7xl mx-auto">
      <AboveFold hideControls={hideControls} openModal={() => setModalOpen(true)} />
      <main className="mx-auto">{children}</main>
      <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    <Footer />
  </>)
}
