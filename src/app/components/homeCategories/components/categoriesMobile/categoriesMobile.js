import React from "react";
import Slider from "react-slick";

import "./categoriesMobile.css";

const defaultSettings = {
  dots: true,
  speed: 200,
  arrows: false,
  lazyLoad: true,
  infinite: false,
  centerMode: true,
  swipeToSlide: true,
  focusOnSelect: true,
  className: "center",
  customPaging: i => <div className="dots">{i + 1}</div>,
  appendDots: dots => (
    <ul style={{ margin: "0px auto", padding: "0", bottom: "-17px" }}>
      {dots.map(dot =>
        dot.props.className === "slick-active" ? (
          <div className={"slick-active active"} key={dot.key}></div>
        ) : (
          dot
        )
      )}
    </ul>
  )
};

export default ({ components, settings }) => (
  <div>
    {console.log(components)}
    <Slider {...{ ...defaultSettings, ...settings }}>
      {components && components}
    </Slider>
  </div>
);
