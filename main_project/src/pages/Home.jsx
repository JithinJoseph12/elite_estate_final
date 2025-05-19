import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import img_cover from '../assets/img_cover.png';
import resort1 from '../assets/resort-1.jpg';
import resort2 from '../assets/resort-2.avif';
import resort3 from '../assets/resort-3.jpg';
import roomImage from '../assets/room-image.png'
import chairImage from '../assets/chair-image.png'

const Home = () => {
  
      const images = [resort1, resort2, resort3];

  return (
    <div>
      {/* Hero Section */}
      <div
        id="home"
        className="min-vh-100 d-flex align-items-center"
        style={{
          backgroundImage: `url(${img_cover})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderBottomLeftRadius: '290px',
        }}
      >
        <div className="container  text-xl-start text-start">
          <div className="row justify-content-start">
            <div className="col-10 col-sm-8 col-lg-6">
              <h1 className="fw-bold display-5">
                Find your next perfect <br />
                <span className="text-secondary">place with ease..</span>
              </h1>
              <p className="mt-3">
                Elite Estate is the best place to find your next perfect place to live.
                <br />
                We have a wide range of properties for you to choose from.
              </p>
              <Link to="/search">
                <button className="btn btn-dark mt-3 px-4 py-2">
                  Let's get started...
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Swiper Carousel */}
     <Swiper
        navigation
        modules={[Navigation, Autoplay]} // ✅ Add Autoplay here
        autoplay={{
          delay: 2000,       // 1 seconds between slides
          disableOnInteraction: false, // keep autoplay after user interaction
          pauseOnMouseEnter: true,     // optional: pause on hover
        }}
        loop={true} // ✅ Loop slides infinitely
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '500px' }}
            >
              <img
                src={img}
                alt={`Resort ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
