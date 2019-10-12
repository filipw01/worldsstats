import { useStaticQuery, graphql } from "gatsby"
import { createContext } from "react"

const useData = ({ includeEliminatedTeams, includePlayIns }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          totalCount
          nodes {
            name
            players {
              name
            }
          }
        }
        allPlayInsJson {
          totalCount
          nodes {
            name
            players {
              name
            }
          }
        }
      }
    `
  )
  let gamesToCompute = data.allMainEventJson.nodes
  if (includePlayIns) {
    gamesToCompute = [...gamesToCompute, ...data.allPlayInsJson.nodes]
  }

  const eliminatedTeams = ["UOL", "DFM", "MMM", "ISG", "RYL", "MG", "FLA", "LK"]
  const uniqueTeams = []
  for (const teamData of gamesToCompute) {
    const isNewTeam =
      uniqueTeams.filter(team => team === teamData.name).length === 0
    if (
      isNewTeam &&
      (includeEliminatedTeams || !eliminatedTeams.includes(teamData.name))
    ) {
      uniqueTeams.push(teamData.name)
    }
  }

  const uniquePlayers = []
  for (const teamData of gamesToCompute) {
    for (const playerData of teamData.players) {
      const isNewPlayer =
        uniquePlayers.filter(player => player.name === playerData.name)
          .length === 0
      if (
        isNewPlayer &&
        (includeEliminatedTeams || !eliminatedTeams.includes(teamData.name))
      ) {
        uniquePlayers.push({ name: playerData.name, team: teamData.name })
      }
    }
  }

  const uniqueTeamImages = {
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
    RNG:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/e/eb/Royal_Never_Give_Uplogo_square.png/246px-Royal_Never_Give_Uplogo_square.png?version=146826fc62b083972f20cc4ca603238e",
    FPX:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/b/b1/FunPlus_Phoenixlogo_square.png/246px-FunPlus_Phoenixlogo_square.png?version=59f03e4dc123c53ea1b1dcfc0e5e51b5",
    G2:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/7/77/G2_Esportslogo_square.png/246px-G2_Esportslogo_square.png?version=46f8bd541c056356584b6209379cf7a9",
    SKT:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/5/59/SK_Telecom_T1logo_square.png/246px-SK_Telecom_T1logo_square.png?version=b598737af202b10e6d515e5d05b837dd",
    TL:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/f/f4/Team_Liquidlogo_square.png/246px-Team_Liquidlogo_square.png?version=8512c61e9d78715b323da1a987548819",
    AHQ:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/6/6b/Ahq_e-Sports_Clublogo_square.png/246px-Ahq_e-Sports_Clublogo_square.png?version=f925ff29ff1db6a3796a28d907ae6574",
    C9:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/8/88/Cloud9logo_square.png/246px-Cloud9logo_square.png?version=cf6cfc032cf4716cc08d8afd0cffc17c",
    FNC:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/f/fc/Fnaticlogo_square.png/246px-Fnaticlogo_square.png?version=9477e5c3a79a48189a095aa0b6ee3e8b",
    GAM:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/e/eb/Adonis_Marineslogo_square.png/246px-Adonis_Marineslogo_square.png?version=a5fd8e482cce4e17a1ba7a3282a32ffa",
    GRF:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/6/6a/Griffinlogo_square.png/246px-Griffinlogo_square.png?version=14eea28788c7bb4085355ecd425e71da",
    IG:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/e/e4/Invictus_Gaminglogo_square.png/246px-Invictus_Gaminglogo_square.png?version=e60d852a5148fef54c67dc2b1e4b2f6f",
    JT:
      "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/f/fa/J_Teamlogo_square.png/246px-J_Teamlogo_square.png?version=4f6614f4b293d4c0027a39a445b9e5ed",
  }

  return { uniqueTeams, uniquePlayers, uniqueTeamImages, eliminatedTeams }
}

export default useData

export const SettingsContext = createContext({
  includeEliminatedTeams: true,
  includePlayIns: true,
})
