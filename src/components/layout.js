/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
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
  const [includePlayIns, setIncludePlayIns] = useState(false)
  useEffect(() => {
    setIncludeEliminatedTeams(
      window.localStorage.getItem("includeEliminatedTeams") === "true"
        ? true
        : false
    )
    setIncludePlayIns(
      window.localStorage.getItem("includePlayIns") === "true" ? true : false
    )
  }, [])
  const toggleIncludeEliminatedTeams = e => {
    e.stopPropagation()
    window.localStorage.setItem(
      "includeEliminatedTeams",
      !includeEliminatedTeams
    )
    setIncludeEliminatedTeams(!includeEliminatedTeams)
  }
  const toggleIncludePlayIns = e => {
    e.stopPropagation()
    window.localStorage.setItem("includePlayIns", !includePlayIns)
    setIncludePlayIns(!includePlayIns)
  }

  return (
    <SettingsContext.Provider
      value={{
        includeEliminatedTeams,
        includePlayIns,
        toggleIncludeEliminatedTeams,
        toggleIncludePlayIns,
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
        <div>
          <h3>Feedback</h3>
          <p>
            Are you satisfied with the page?
            <br />
            Do you want to suggest something to improve?
            <br />
            Mail me at{" "}
            <a href="mailto:wachowiakf@gmail.com">wachowiakf@gmail.com</a>
          </p>
        </div>
        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/filipw01"
              target="_blank"
              rel="noopener noreferrer"
            >
              Filip Wachowiak
            </a>
          </div>
          <div style={{ marginLeft: "20px" }}>
            Worlds Stats was created under Riot Games' "Legal Jibber Jabber"
            policy using assets owned by Riot Games. Riot Games does not endorse
            or sponsor this project.
          </div>
        </footer>
      </div>
    </SettingsContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
