import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.scss';

export default function Carousel({ carousel }) {
    const settings = {
        arrows: false,
        centerMode: true,
        infinite: false,
        centerPadding: "30%",
        slidesToShow: 1,
        speed: 1500,
        autoplaySpeed: 7000,
        accessibility: true,
        initialSlide: 1,
        autoplay: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                centerPadding: "20%",
              }
            },
            {
              breakpoint: 767,
              settings: {
                centerPadding: "17%",
              }
            }
          ]
    };

    return (
        <div className="carousel-wrapper">
            <Slider {...settings}>
                {carousel && carousel.map((item, i) => (
                    <div key={i} className="group">
                        <div className="headline-wrapper">
                            {item.smallHeadline && <span className="headline small" dangerouslySetInnerHTML={{ __html: item.smallHeadline }} />}
                            {item.largeHeadline && <span className="headline large" dangerouslySetInnerHTML={{ __html: item.largeHeadline }} />}
                        </div>
                        {item.carouselImage && (
                            <div className="img-container">
                                <img
                                    className="carousel-img"
                                    src={item.carouselImage.sourceUrl}
                                    alt={item.carouselImage.altText || `Slide Image ${i}`}
                                />
                            </div>
                        )}
                        
                        <div className="info-wrapper">
                            {item.buttonCopy && <a href={item.article.uri}
                                className="carousel-btn">
                                    {item.buttonCopy}
                            </a>}

                            {item.copy && <div
                                className="copy"
                                dangerouslySetInnerHTML={{ __html: item.copy && item.copy.replace && item.copy.replace('<tab>', '<tab />') }}
                            />}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}