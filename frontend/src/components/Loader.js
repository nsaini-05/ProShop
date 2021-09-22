import React, { useState } from "react"
import { Spinner } from "react-bootstrap"
const Loader = () => {
  const [margin, setMargin] = useState("auto")

  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: margin,
          display: "block",
        }}
      />
      <span class="sr-only">Loading...</span>
    </div>
  )
}

export default Loader
