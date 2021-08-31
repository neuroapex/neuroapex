import React from "react"

const Footer: React.FC = () => (
  <footer>
    <div className="py-4 flex flex-col justify-center items-center">
      <p className="text-sm font-bold text-theme-white py-2">
        <a className="text-theme-blue hover:underline"
          href="mailto:rcabeen@loni.usc.edu">Contact us with any questions or concerns via e-mail</a>,&nbsp;
        Copyright © 2021&nbsp;
        <a className="text-theme-blue hover:underline"
          href="https://usc.edu/">University of Southern California</a>
      </p>
    </div>
  </footer>
)

export default Footer
