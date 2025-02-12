import pic1 from '../../assets/pic1.png';
import pic2 from '../../assets/pic2.png';
import pic3 from '../../assets/pic3.png';
import pic4 from '../../assets/pic4.png';
import pic5 from '../../assets/pic5.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const images = [pic1, pic2, pic3, pic4, pic5];

const AutoCarousel = ({ items }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="w-full h-full"
        >
           {images.map((image, index) => (
             <SwiperSlide key={index}>
                <img
                    className="w-full h-auto object-cover"
                    src={image}
                    alt="Hero"
                />
             </SwiperSlide>
           ))}
        </Swiper>
    );
};

export default AutoCarousel;