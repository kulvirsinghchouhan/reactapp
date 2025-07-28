import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./Banner.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:1337/api/home-sliders?populate=image&sort=order:asc")
            .then((res) => {
                setSlides(res.data.data);
            })
            .catch((err) => console.error("Slider fetch error:", err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="hero-slider-container">
            <Slider {...settings}>
                {slides.map((slide) => {
                    const imageUrl = slide?.image?.url
                        ? `http://localhost:1337${slide.image.url}`
                        : "";

                    return (
                        <div className="hero-slide" key={slide.id}>
                            <img src={imageUrl} alt={slide.Title} className="slide-img" />
                            <div className="slide-content">
                                <h2>{slide.Title}</h2>
                                <p>{slide.subtitle}</p>
                                {slide.buttonUrl && (
                                    <a href={slide.buttonUrl} className="slide-btn">
                                        {slide.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default Banner;
