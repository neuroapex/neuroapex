import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import CloseIcon from "../images/icons/Close";
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3";
import { Link, graphql } from "gatsby";
import { Head } from "../components/Head";
import Footer from "../components/Footer";
import RelatedCard from "../components/RelatedCard";
import {getPathPrefix} from "../helpers/resourceTypeLookup";

const Template = ({ data }) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        <>
          {!modal && <Head />}
          <div className={`p-8 ${!modal && "container mx-auto"}`}>
            <div className="flex flex-row pb-4 items-center">
              <h1 className="text-4xl font-bold text-theme-white">
                {data.mdx.frontmatter.name}
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
                href={data.mdx.frontmatter.url}
              >
                {data.mdx.frontmatter.url}
              </a>
            </h3>
            <p className="text-xl pb-4 text-theme-white">
              {data.mdx.frontmatter.description}
            </p>
            <p className="pb-4">
              {data.mdx.frontmatter.tags.map((tag) => (
                <button className="shadow rounded-lg py-1 px-3 m-1 bg-theme-white">
                  {tag}
                </button>
              ))}
            </p>
            <p className="text-lg text-theme-white">
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </p>
            <div>
              <h3 className="text-2xl font-bold pb-4 text-theme-white">
                Related Resources
              </h3>
              <div className="flex flex-col md:flex-row -m-2">
                {data.related.nodes.map((resource) => (
                  <RelatedCard
                    tags={resource.frontmatter.tags}
                    title={resource.frontmatter.name}
                    slug={getPathPrefix(resource.frontmatter.type) + resource.slug}
                    url={resource.frontmatter.url}
                  />
                ))}
              </div>
            </div>
          </div>
          {!modal && <Footer />}
        </>
      )}
    </ModalRoutingContext.Consumer>
  );
};

export default Template;

export const pageQuery = graphql`
  query($slug: String!, $collection: String!) {
    mdx(slug: { eq: $slug }) {
      slug
      frontmatter {
        name
        type
        collection
        description
        url
        tags
      }
      body
    }
    related: allMdx(
      filter: { slug: {ne: $slug}, frontmatter: { collection: { eq: $collection } } }
      limit: 3
    ) {
      nodes {
        slug
        frontmatter {
          name
          type
          collection
          description
          url
          tags
        }
      }
    }
  }
`;
