import React from "react"

const SettingOption = ({ children }) => {
  return (
    <div
      style={{
        padding: "10px 0",
      }}
    >
      <label>{children}</label>
    </div>
  )
}
export default SettingOption
