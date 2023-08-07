import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slideshow.css';

const Slideshow = ({ movies }) => {
  const sliderRef = useRef(null);

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings} ref={sliderRef}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="image-container">
              <img src={movie.imageUrl} alt={movie.title} />  
            </div>
          </div>
        ))}
      </Slider>
      <div className="slideshow-controls">
        <button className="prev-button" onClick={goToPrevSlide}>
          &lt;
        </button>
        <button className="next-button" onClick={goToNextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
