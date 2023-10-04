  require("babel-register")({
    presets: ["es2015", "react"]
  });
  const proxy = require('./proxy.json')
   
  const router = require("./sitemap-routes").default;
  const Sitemap = require("react-router-sitemap").default;
  
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build(proxy["react-proxy"])
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();