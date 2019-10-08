import React from "react"

const EliminatedBadge = () => {
  return (
    <div style={{ 
        position: "absolute", 
        top: "20px", 
        right: 0, 
        zIndex: "-1",
        background: "#940f0f", 
        transform: "rotate(40deg) translate(155px, 0px)",
        width: "400px", 
        height: "60px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        }}>
      Eliminated
    </div>
  )
}

export default EliminatedBadge
