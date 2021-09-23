import * as React from 'react'
import { Layout } from "~/components/Layout"
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const TutorialPage = ({ data }) => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="p-8">
          <h1 className="text-4xl font-bold pb-4 text-theme-white">
            Tutorial Name: {data.mdx.frontmatter.name}
          </h1> 
          <h1 className="text-4xl font-bold pb-4 text-theme-white">
          Tutorial Website: <a className="text-theme-blue
            hover:underline" href={data.mdx.frontmatter.url}> 
            {data.mdx.frontmatter.url}</a>
          </h1> 
          <h1 className="text-4xl font-bold pb-4 text-theme-white">
           Tutorial Description:
          </h1> 
          <p className="text-lg text-theme-white">
            <MDXRenderer>
              {data.mdx.body}
            </MDXRenderer>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}, frontmatter: {type: {eq: "tutorial"}}) {
      frontmatter {
        name
        description
        url
      }
      body
    }
  }
`

export default TutorialPage