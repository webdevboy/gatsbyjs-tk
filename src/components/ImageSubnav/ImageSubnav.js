import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageSubnav.scss';

export default function ImageSubnav({ imageSubnav }) {
    const settings = {
        arrows: false,
        infinite: false,
        slidesToShow: imageSubnav.length,
        speed: 1500,
        accessibility: true,
        initialSlide: 1,
        adaptiveHeight: true,
        afterChange: function() {
            let activeSlideLink = document.querySelector('.image-subnav .slick-active a');
            if (activeSlideLink.getAttribute('href') == window.location.pathname) return;
            activeSlideLink.click();
        },
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    centerPadding: "27%",
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="image-subnav">
            <Slider {...settings}>
                {imageSubnav && imageSubnav.map((item, i) => (
                    <div key={i} className="group">
                        {item.article.subNavigationImage && (
                            <div className="img-container">
                                <a href={item.article.uri} className="">
                                    <img
                                        className="carousel-img"
                                        src={item.article.subNavigationImage.subNavigationImage.sourceUrl}
                                        alt={item.article.subNavigationImage.subNavigationImage.altText || `Slide Image ${i}`}
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>
            <span className="arrow-down"></span>
        </div>
    );
}