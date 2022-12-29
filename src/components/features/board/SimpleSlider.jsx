import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React, { Component } from "react";
import styled from "styled-components";

export default class SimpleSlider extends Component {
  render() {
    return (
      <div>
        <Slider {...settings}>
          <CarouselBox>
            <CarouselImg src="/assets/img1.png" />
            {/* <CarouselTitle>1</CarouselTitle>
            <CarouselContent>1번 본문</CarouselContent> */}
          </CarouselBox>
          <CarouselBox>
            <CarouselImg src="/assets/img2.png" />
            {/* <CarouselTitle>2</CarouselTitle>
            <CarouselContent>2번 본문</CarouselContent> */}
          </CarouselBox>
          <CarouselBox>
            <CarouselImg src="/assets/img3.png" />
            {/* <CarouselTitle>3</CarouselTitle>
            <CarouselContent>3번 본문</CarouselContent> */}
          </CarouselBox>
        </Slider>
      </div>
    );
  }
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: "0px",
  centerMode: true,
};

const CarouselBox = styled.div`
  /* border: 2px solid black; */
`;

const CarouselImg = styled.img`
  width: 100%;
  height: 400px;
`;

const CarouselTitle = styled.h3`
  font-size: 25px;
  text-align: center;
`;

const CarouselContent = styled.h3`
  font-size: 16px;
  text-align: center;
`;
