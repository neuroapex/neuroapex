import React from "react"

const Footer: React.FC = () => (
  <div className="py-4 flex flex-col justify-center items-center">
    <p className="text-sm font-bold text-theme-white py-2">
      Made with &nbsp;❤️&nbsp;&nbsp; by&nbsp;
      <a
        className="text-theme-yellow hover:underline"
        href="https://cabeen.io"
      >
        Ryan Cabeen 
      </a>
    </p>
    <p className="text-sm font-bold text-theme-white py-2">
      View the{" "}
      <a
        className="text-theme-yellow hover:underline"
        href="https://github.com/cabeen/neuroapex"
      >
        Source on Github
      </a>
    </p>
    <p className="text-sm font-bold text-theme-white py-2">
      Copyright © 2021&nbsp;
      <a
        className="text-theme-yellow hover:underline"
        href="https://neuroapex.io"
      >
        neuroapex.io
      </a>
    </p>
  </div>
)

export default Footer
