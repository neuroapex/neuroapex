import React from "react"

const Footer: React.FC = () => (
  <footer>
    <div className="py-4 flex flex-col justify-center items-center">
      <p className="text-sm font-bold text-theme-white py-2">
        Made by&nbsp;
        <a className="text-theme-yellow hover:underline"
          href="https://cabeen.io">
          Ryan Cabeen
        </a> and <a className="text-theme-yellow hover:underline"
          href="http://gaain.org/">
          GAAIN</a>,&nbsp;
        View the{" "}
        <a className="text-theme-yellow hover:underline"
          href="https://github.com/cabeen/neuroapex">
          Source on Github </a>, Copyright © 2021
        <a className="text-theme-yellow hover:underline"
          href="https://neuroapex.io">&nbsp;
          neuroapex.io </a>
      </p>
    </div>
  </footer>
)

export default Footer
