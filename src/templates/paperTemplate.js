import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import CloseIcon from "../images/icons/Close";
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3";
import { Link } from "gatsby";
import { Head } from "../components/Head";
import Footer from "../components/Footer";

const PaperTemplate = ({ pageContext: { frontmatter, body } }) => {
  console.log(frontmatter);
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        <>
          {!modal && <Head />}
          <div className={`p-8 ${!modal && "container mx-auto"}`}>
            <div className="flex flex-row pb-4 items-center">
              <h1 className="text-4xl font-bold text-theme-white">
                {frontmatter.name}
              </h1>
              {modal && (
                <Link
                  to={closeTo}
                  state={{ noScroll: true }}
                  className="ml-auto"
                >
                  <span className="text-xl text-theme-white">
                    <CloseIcon />
                  </span>
                </Link>
              )}
            </div>
            <h3 className="text-xl pb-4 text-theme-white">
              <a
                className="text-theme-blue
          hover:underline"
                href={frontmatter.url}
              >
                {frontmatter.url}
              </a>
            </h3>
            <p className="text-xl pb-4 text-theme-white">
              {frontmatter.description}
            </p>
            <p className="pb-4">
              {frontmatter.tags.map((tag) => (
                <button className="shadow rounded-lg py-1 px-3 m-1 bg-theme-white">
                  {tag}
                </button>
              ))}
            </p>
            <p className="text-lg text-theme-white">
              <MDXRenderer>{body}</MDXRenderer>
            </p>
          </div>
          {!modal && <Footer />}
        </>
      )}
    </ModalRoutingContext.Consumer>
  );
};

export default PaperTemplate;
