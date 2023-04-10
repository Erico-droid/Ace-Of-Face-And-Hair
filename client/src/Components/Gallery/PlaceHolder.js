import React from 'react'
import ContentLoader from 'react-content-loader'

const ImageGrid = props => (
  <ContentLoader
    // width={1250}
    // height={485}
    viewBox="0 0 1350 505"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <rect x="537" y="9" rx="2" ry="2" width="140" height="10" /> */}
    {/* <rect x="14" y="30" rx="2" ry="2" width="667" height="11" /> */}
    <rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
    <rect x="240" y="57" rx="2" ry="2" width="211" height="211" />
    <rect x="467" y="56" rx="2" ry="2" width="211" height="211" />
    <rect x="694" y="55" rx="2" ry="2" width="211" height="211" />
    <rect x="921" y="54" rx="2" ry="2" width="211" height="211" />
    <rect x="1148" y="53" rx="2" ry="2" width="211" height="211" />
    <rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
    <rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
    <rect x="468" y="279" rx="2" ry="2" width="211" height="211" />
    <rect x="696" y="277" rx="2" ry="2" width="211" height="211" />
    <rect x="924" y="275" rx="2" ry="2" width="211" height="211" />
    <rect x="1152" y="273" rx="2" ry="2" width="211" height="211" />
  </ContentLoader>
)

ImageGrid.metadata = {
  name: 'Hassan Tijani.A',
  github: 'surepeps',
  description: 'Image Grid with Pagination',
  filename: 'ImageGrid',
}

export default ImageGrid