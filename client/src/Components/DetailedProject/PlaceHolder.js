import React from 'react'
import ContentLoader from 'react-content-loader'


const width = window.innerWidth -14;
const height = window.innerHeight - 140;

const PlaceHolder = props => {
  return (
    <ContentLoader viewBox="0 0 1300 500" height={height} width={width} {...props}>
      <rect x="10" y="0" rx="5" ry="0" width="1260" height="130" />
      <rect x="10" y="140" rx="5" ry="5" width="260" height="140" />
      <rect x="280" y="140" rx="5" ry="5" width="260" height="280" />
      <rect x="550" y="140" rx="5" ry="5" width="260" height="140" />
      <rect x="820" y="140" rx="5" ry="5" width="260" height="140" />
      <rect x="1090" y="140" rx="5" ry="5" width="180" height="280" />
      <rect x="10" y="290" rx="5" ry="5" width="260" height="280" />
      <rect x="820" y="290" rx="5" ry="5" width="260" height="280" />
      <rect x="280" y="430" rx="5" ry="5" width="260" height="140" />
      <rect x="1090" y="430" rx="5" ry="5" width="180" height="140" />
      <rect x="550" y="290" rx="5" ry="5" width="260" height="280" />
    </ContentLoader>
  )
}

PlaceHolder.metadata = {
  name: 'Eric Kabira',
  github: 'Erico-droid',
  description: 'Three column grid layout',
  filename: 'PlaceHolder',
}

export default PlaceHolder