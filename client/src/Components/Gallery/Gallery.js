import React, {useEffect} from 'react'
import "./Gallery.css";

export default function Gallery() {

  useEffect(() => {
    
  }, [])

  return (
      <div class="gridywrap">
        <div class="gridy-2 gridyhe-1">
          <div class="gridimg" style={{backgroundImage: "url(https://ununsplash.imgix.net/photo-1415302199888-384f752645d0?q=75&fm=jpg&s=823bdcc1b7ad955f5180efd352561016)"}}>&nbsp;</div>
          
          <div class="gridinfo">
            <h3>Item Title</h3>
            <div class="gridmeta">
              <p class="gridwhen"><i class="fa fa-clock-o"></i> 17:22 17th Feb 2015</p>
              <p class="gridwho"><i class="fa fa-user"></i> Bruce Wayne</p>
            </div>
            <p class="gridexerpt">Lorem ipsum dolor set amet, some dummy content..</p>
            <a href="#" class="grid-btn grid-more"><span>More</span> <i class="fa fa-plus"></i></a>
          </div>
        </div>
        <div class="gridy-1 gridyhe-1">
          <div class="gridimg" style={{backgroundImage: "url(https://unsplash.imgix.net/photo-1417722009592-65fa261f5632?q=75&fm=jpg&s=553e7d8a753f4d7b2a4161dcbe9d9801)"}}>&nbsp;</div>
          
          <div class="gridinfo">
            <h3>Item Title</h3>
            <div class="gridmeta">
              <p class="gridwhen"><i class="fa fa-clock-o"></i> 17:22 17th Feb 2015</p>
              <p class="gridwho"><i class="fa fa-user"></i> Harvey Dent</p>
            </div>
            <p class="gridexerpt">Lorem ipsum dolor set amet, some dummy content..</p>
            <a href="#" class="grid-btn grid-more"><span>More</span> <i class="fa fa-plus"></i></a>
          </div>
        </div>
        <div class="gridy-1 gridyhe-2">
          <div class="gridimg" style={{backgroundImage: "url(https://ununsplash.imgix.net/photo-1416934625760-d56f5e79f6fe?q=75&fm=jpg&s=032ca37757b3dc1851661856b956a24c)"}}>&nbsp;</div>
          
          <div class="gridinfo">
            <h3>Item Title</h3>
            <div class="gridmeta">
              <p class="gridwhen"><i class="fa fa-clock-o"></i> 17:22 17th Feb 2015</p>
              <p class="gridwho"><i class="fa fa-user"></i> Clark Kent</p>
            </div>
            <p class="gridexerpt">Lorem ipsum dolor set amet, some dummy content..</p>
            <a href="#" class="grid-btn grid-more"><span>More</span> <i class="fa fa-plus"></i></a>
          </div>
        </div>
        <div class="gridy-2 gridyhe-1">
          <div class="gridimg" style={{backgroundImage: "url(https://unsplash.imgix.net/uploads/1412862685615b0212e3d/5fcb0a55?q=75&fm=jpg&s=e003fb9a4e39e3c07e4a94f7e0ef3db8)"}}>&nbsp;</div>
          
          <div class="gridinfo">
            <h3>Item Title</h3>
            <div class="gridmeta">
              <p class="gridwhen"><i class="fa fa-clock-o"></i> 17:22 17th Feb 2015</p>
              <p class="gridwho"><i class="fa fa-user"></i> Tony Stark</p>
            </div>
            <p class="gridexerpt">Lorem ipsum dolor set amet, some dummy content..</p>
            <a href="#" class="grid-btn grid-more"><span>More</span> <i class="fa fa-plus"></i></a>
          </div>
        </div>
        <div class="gridy-1 gridyhe-1">
          <div class="gridimg" style={{backgroundImage: "url(https://ununsplash.imgix.net/photo-1418227165283-1595d13726cd?q=75&fm=jpg&s=cace1590a29be6d4d6db13c3ebd1ba72)"}}>&nbsp;</div>
          <div class="gridinfo">
            <h3>Item Title</h3>
            <div class="gridmeta">
              <p class="gridwhen"><i class="fa fa-clock-o"></i> 17:22 17th Feb 2015</p>
              <p class="gridwho"><i class="fa fa-user"></i> Steve Rogers</p>
            </div>
            <p class="gridexerpt">Lorem ipsum dolor set amet, some dummy content..</p>
            <a href="#" class="grid-btn grid-more"><span>More</span> <i class="fa fa-plus"></i></a>
          </div>
        </div>
        <div class="gridy-1 gridyhe-1">
          <div class="gridimg" style={{backgroundImage: "url(https://unsplash.imgix.net/uploads/1411589183965bdf6e141/5f468e98?q=75&fm=jpg&s=007333c388fb36767cbd152600bea6b8)"}}>&nbsp;</div>
          
          <div class="gridinfo">
            <h3>Item Title</h3>
            <div class="gridmeta">
              <p class="gridwhen"><i class="fa fa-clock-o"></i> 17:22 17th Feb 2015</p>
              <p class="gridwho"><i class="fa fa-user"></i> Natasha Romanoff</p>
            </div>
            <p class="gridexerpt">Lorem ipsum dolor set amet, some dummy content..</p>
            <a href="#" class="grid-btn grid-more"><span>More</span> <i class="fa fa-plus"></i></a>
          </div>
        </div>
      </div>
  )
}
