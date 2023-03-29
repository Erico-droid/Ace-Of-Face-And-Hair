import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder = (props) => (
  <ContentLoader
      // height={854}
      // width={320}
      // viewBox="0 0 320 54"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="57" cy="49" r="38" />
      <rect x="133" y="23.5" rx="3" ry="3" width="1100" height="40" />
      {/* <rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="67" y="30" rx="3" ry="3" width="74" height="10" /> */}
      {/* <circle cx="305" cy="27" r="8" /> */}
      <rect x="0" y="97" rx="0" ry="0" width="1240" height="3" />
      {/* <rect x="219" y="146" rx="0" ry="0" width="0" height="0" /> */}
    </ContentLoader>
)

export default Placeholder