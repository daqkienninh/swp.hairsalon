import React, { useState } from "react";
import Slider from "react-slick/lib/slider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { banner, banner1, banner2 } from "../../assets/images";

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        <div>
          <img src={banner} alt="hair salon" />
        </div>
        <div>
          <img src={banner1} alt="hair harmony" />
        </div>
        <div>
          <img src={banner2} alt="services" />
        </div>
      </Slider>
    </div>
  );
};
export default Banner;
