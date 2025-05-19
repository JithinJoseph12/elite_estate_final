import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'animate.css';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.avif';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.webp';
import img6 from '../assets/img6.jpg';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="container-fluid px-0"
      style={{
        backgroundColor: 'rgba(165, 172, 172, 0.678)',
        marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'
      }}
    >
      {/* Centered Heading Above Both Columns */}
      <h3 className="text-center fw-bold mb-5 animate__animated animate__heartBeat text-black">
     Discover Your Dream Home with Elite Estates
    </h3>


      <div className="row w-100 m-0">
       {/* Left Half - About Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center p-4">
          <p className="mb-3" style={{ color: '#333333', textAlign: 'justify' }}>
            <span className='text-black fw-bold'>Elite Estates</span> is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
          </p>
          <p className="mb-3" style={{ color: '#333333', textAlign: 'justify' }}>
            Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market.
          </p>
          <p className="mb-0" style={{ color: '#333333', textAlign: 'justify' }}>
            Our team of agents has a wealth of experience and knowledge in the real estate industry. We are committed to making your experience exciting and rewarding.
          </p>
        </div>


        {/* Right Half - Gallery Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center py-3">
          <div className="d-flex justify-content-around w-100 px-10">
            {/* Column 1 */}
            <div className="d-flex flex-column align-items-center">
              <img data-aos="fade-right" src={img1} alt="img1" style={{ width: '150px', height: '200px', marginBottom: '10px' }} />
              <img data-aos="fade-right" src={img2} alt="img2" style={{ width: '150px', height: '100px' }} />
            </div>

            {/* Column 2 */}
            <div className="d-flex flex-column align-items-center">
              <img data-aos="flip-up" src={img3} alt="img3" style={{ width: '150px', height: '100px', marginBottom: '10px' }} />
              <img data-aos="flip-down" src={img4} alt="img4" style={{ width: '150px', height: '200px' }} />
            </div>

            {/* Column 3 */}
            <div className="d-flex flex-column align-items-center">
              <img data-aos="fade-left" src={img5} alt="img5" style={{ width: '150px', height: '200px', marginBottom: '10px' }} />
              <img data-aos="fade-left" src={img6} alt="img6" style={{ width: '150px', height: '100px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
