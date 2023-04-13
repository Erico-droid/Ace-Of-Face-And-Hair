import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder = (props) => (
  <ContentLoader 
  viewBox="0 0 1360 600" 
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  // height={900} 
  // width={1360} 
  {...props}>
  <rect x="550" y="40" rx="4" ry="4" width="343" height="58" />
  <rect x="550" y="105" rx="4" ry="4" width="343" height="58" />
  <rect x="250" y="200" rx="8" ry="8" width="200" height="400" />
  <rect x="470" y="200" rx="8" ry="8" width="200" height="400" />
  <rect x="690" y="200" rx="8" ry="8" width="200" height="400" />
  <rect x="910" y="200" rx="8" ry="8" width="200" height="400" />
</ContentLoader>
)

export default Placeholder
