import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <div className="slider">

      <Swiper autoplay={{ delay: 3000 }} loop modules={[Autoplay]}>

        <SwiperSlide>
          <div className="slide">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" />
            <div className="overlay">
              <h1>Professional Interior Painting</h1>
              <p>Perfect finishing for your dream home</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" />
            <div className="overlay">
              <h1>Exterior Protection Painting</h1>
              <p>Durable & weather resistant solutions</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide">
            <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498c" />
            <div className="overlay">
              <h1>Luxury Texture Design</h1>
              <p>Modern wall finishing styles</p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default HeroSlider;