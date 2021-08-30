import React from "react"

const Footer: React.FC = () => (
  <footer>
    <div className="py-4 flex flex-col justify-center items-center">
      <p className="text-sm font-bold text-theme-white py-2">
        <a className="text-theme-blue hover:underline"
          href="https://neuroapex.io">&nbsp;
          neuroapex.io </a>
        is developed by &nbsp;
        <a className="text-theme-blue hover:underline"
          href="https://cabeen.io">Ryan Cabeen</a> and&nbsp;
        <a className="text-theme-blue hover:underline"
          href="http://gaain.org/">GAAIN</a>.
        Copyright © 2021&nbsp;
        <a className="text-theme-blue hover:underline"
          href="https://usc.edu/">University of Southern California</a>
      </p>
    </div>
  </footer>
)

export default Footer
