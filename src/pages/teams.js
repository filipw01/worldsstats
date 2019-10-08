import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const uniqueTeams = []
  for (const teamData of data.allDataJson.edges) {
    const isNewTeam =
      uniqueTeams.filter(team => team === teamData.node.name).length === 0
    if (isNewTeam) {
      uniqueTeams.push(teamData.node.name)
    }
  }
  const uniqueTeamsImages = {
    CG:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/5/5b/Clutch_Gaminglogo_square.png/123px-Clutch_Gaminglogo_square.png?version=3ef20d15a5fb2a152a723f9a59e84491",
    UOL:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/a/a9/Unicorns_Of_Lovelogo_square.png/123px-Unicorns_Of_Lovelogo_square.png?version=9b263c5e912269ebfd160780cb9540dd",
    DFM:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/d/dd/DetonatioN_Gaminglogo_square.png/123px-DetonatioN_Gaminglogo_square.png?version=1b758088250ef1b8d7675d0db760c80a",
    SPY:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/9/9e/Splycelogo_square.png/123px-Splycelogo_square.png?version=baa64f14065460b11eec1630754f2922",
    MMM:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/8/8e/MAMMOTHlogo_square.png/123px-MAMMOTHlogo_square.png?version=7db1485c9b59924a8a3b9ed78717cfaa",
    ISG:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/5/52/Isurus_Gaminglogo_square.png/123px-Isurus_Gaminglogo_square.png?version=08ca81606b3cb34dd81e76b0c83ccafa",
    RYL:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/1/10/Royal_Youthlogo_square.png/123px-Royal_Youthlogo_square.png?version=afcc101723b5c12a82fb0ddee6e7c29b",
    DWG:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/6/6d/DAMWON_Gaminglogo_square.png/123px-DAMWON_Gaminglogo_square.png?version=184ddb0821092592497d409e0330566b",
    MG:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/0/07/MEGAlogo_square.png/123px-MEGAlogo_square.png?version=c1e3647f02d340059ab283aed5b335d2",
    HKA:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/4/47/Hong_Kong_Attitudelogo_square.png/123px-Hong_Kong_Attitudelogo_square.png?version=7b24dc9d970f287f705d338d58c7a3d6",
    FLA:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/1/14/Flamengo_eSportslogo_square.png/123px-Flamengo_eSportslogo_square.png?version=231f39a245733275ae204bfc9f108b75",
    LK:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/3/30/Lowkey_Esportslogo_square.png/123px-Lowkey_Esportslogo_square.png?version=c5eecf6a2bd9cb1e206abcb01ed3ed5d",
  }
  return (
    <Layout>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {uniqueTeams.map(uniqueTeam => (
          <Link
            key={uniqueTeam}
            style={{
              margin: "20px",
              color: "#000",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
            }}
            to={`/${uniqueTeam.toLowerCase()}/`}
          >
            <img
              src={uniqueTeamsImages[uniqueTeam]}
              alt=""
              style={{ height: "50px", marginRight: "15px" }}
            />
            {uniqueTeam}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allDataJson {
      totalCount
      edges {
        node {
          name
        }
      }
    }
  }
`

export default IndexPage
