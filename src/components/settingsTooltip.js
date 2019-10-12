import React, { useContext } from "react"
import SettingOption from "../components/settingOption"
import { SettingsContext } from "../hooks/useData"
const SettingsTooltip = () => {
  const {
    includeEliminatedTeams,
    includePlayIns,
    darkTheme,
    toggleIncludeEliminatedTeams,
    toggleIncludePlayIns,
    toggleDarkTheme,
  } = useContext(SettingsContext)

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        right: "40px",
        backgroundColor: "#fff",
        color: "#000",
        padding: "10px 20px",
        borderRadius: "10px",
        textAlign: "right",
      }}
    >
      <SettingOption>
        Include eliminated teams{" "}
        <input
          type="checkbox"
          checked={includeEliminatedTeams}
          onChange={toggleIncludeEliminatedTeams}
        />
      </SettingOption>
      <SettingOption>
        Include Play-ins{" "}
        <input
          type="checkbox"
          checked={includePlayIns}
          onChange={toggleIncludePlayIns}
        />
      </SettingOption>
    </div>
  )
}
export default SettingsTooltip
