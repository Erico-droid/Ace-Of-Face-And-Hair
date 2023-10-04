import React from 'react';
import { Helmet } from 'react-helmet';
import mainImage from '../../Assets/untitled-6.jpg'

const Seo = ({ title, description }) => {


const keywordsArray = [
  "makeup artistry", 
  "hair styling", 
  "Kenya", 
  "best makeup company", 
  "best hair company",
  "Best makeup artists in Kenya",
  "Top hair stylists Nairobi",
  "Beauty services in Nairobi",
  "Professional makeup Kenya",
  "Bridal makeup Nairobi",
  "Special effects makeup Kenya",
  "Editorial hair and makeup",
  "Fashion makeup artists Nairobi",
  "Celebrity makeup artists Kenya",
  "Makeup courses in Kenya",
  "Hair and makeup for film and TV",
  "Wedding hair and makeup Nairobi",
  "Creative makeup artists Kenya",
  "Event makeup and hairstyling",
  "Makeup for photoshoots Nairobi",
  "Makeup studio in Kenya",
  "Makeup and hair portfolio",
  "Hair and makeup transformations",
  "African beauty specialists",
  "Best makeup products Kenya"
]

const keywordsContent = keywordsArray.join(", ");

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Ace of Face and Hair" />
      <meta name="keywords" content={keywordsContent} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="geo.position" content="-1.2097244791600448,2036.65186665857499" />
      <meta name="og:title" content="Ace of Face and Hair - Best Makeup and Hair Company in Kenya" />
      <meta name="og:image" content={mainImage} />
    </Helmet>
  );
};


export default Seo;