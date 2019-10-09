/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { SettingsContext } from "../hooks/useData"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [includeEliminatedTeams, setIncludeEliminatedTeams] = useState(true)
  const [includePlayIns, setIncludePlayIns] = useState(true)
  const [darkTheme, setDarkTheme] = useState(true)
  const toggleIncludeEliminatedTeams = () =>
    setIncludeEliminatedTeams(!includeEliminatedTeams)
  const toggleIncludePlayIns = () => setIncludePlayIns(!includePlayIns)
  const toggleDarkTheme = () => setDarkTheme(!darkTheme)

  return (
    <SettingsContext.Provider
      value={{
        includeEliminatedTeams,
        includePlayIns,
        darkTheme,
        toggleIncludeEliminatedTeams,
        toggleIncludePlayIns,
        toggleDarkTheme,
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `110px auto 0`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/filipw01"
            target="_blank"
            rel="noopener noreferrer"
          >
            Filip Wachowiak
          </a>
        </footer>
      </div>
    </SettingsContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
