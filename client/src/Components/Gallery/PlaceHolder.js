import React from 'react'
import ContentLoader from 'react-content-loader'


const ImageGrid = props => (
  <ContentLoader
    // width={1250}
    // height={485}
    
    viewBox="0 0 1350 805"
    {...props}
  >
    <rect x="550" y="90" rx="4" ry="4" width="343" height="58" />
    <rect x="550" y="165" rx="4" ry="4" width="343" height="58" /> 
    <rect x="12" y="258" rx="2" ry="2" width="211" height="211" />
    <rect x="240" y="257" rx="2" ry="2" width="211" height="211" />
    <rect x="467" y="256" rx="2" ry="2" width="211" height="211" />
    <rect x="694" y="255" rx="2" ry="2" width="211" height="211" />
    <rect x="921" y="254" rx="2" ry="2" width="211" height="211" />
    <rect x="1148" y="253" rx="2" ry="2" width="211" height="211" />
    <rect x="12" y="483" rx="2" ry="2" width="211" height="211" />
    <rect x="240" y="481" rx="2" ry="2" width="211" height="211" />
    <rect x="468" y="479" rx="2" ry="2" width="211" height="211" />
    <rect x="696" y="477" rx="2" ry="2" width="211" height="211" />
    <rect x="924" y="475" rx="2" ry="2" width="211" height="211" />
    <rect x="1152" y="473" rx="2" ry="2" width="211" height="211" />
    <rect x="250" y="723" rx="4" ry="4" width="300" height="58" />
    <rect x="750" y="723" rx="4" ry="4" width="300" height="58" /> 
  </ContentLoader>
)

ImageGrid.metadata = {
  name: 'Erc Kabira',
  github: 'Erico-Droid',
  description: 'Image Grid with Pagination',
  filename: 'ImageGrid',
}

export default ImageGrid