import React from "react"

const Footer: React.FC = () => (
  <footer>
    <div className="py-4 flex flex-col justify-center items-center">
      <p className="text-sm font-bold text-theme-white py-2">
        Contact us with any questions or concerns 
        <a className="text-theme-blue hover:underline"
          href="mailto:neuroapex@ini.usc.edu"> via e-mail at neuroapex@ini.usc.edu</a>
        <br></br>
        Copyright © 2021&nbsp;
        <a className="text-theme-blue hover:underline"
          href="https://usc.edu/">University of Southern California</a>
      </p>
    </div>
  </footer>
)

export default Footer
