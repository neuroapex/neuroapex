import React, { useState } from "react"
import Footer from "./Footer"
import { Head } from "./Head"

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  return (<>
    <Head />
    {children}
    <Footer />
  </>)
}
