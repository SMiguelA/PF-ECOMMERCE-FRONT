import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Galery.css';
import defaultImg from '../../../img/default.jpg';


const Galery = ({imgs}) => {

    const [thumbsSwiper, setThumsSwiper] = useState(null);

    return(
        <div className='container'>
            <Swiper
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs, FreeMode]}
                style={{
                    "--swiper-navigation-color":"#fff",
                }}
                thumbs={{ swiper: thumbsSwiper }}
                className='mySwiper2'
            >
                {
                    imgs?.map((imgen, index) => {
                        return (
                            <SwiperSlide key={index}>
                                {
                                    typeof imgen === 'string' && imgen.endsWith('.jpg') || imgen.endsWith('.jpeg') || imgen.endsWith('.gif') || imgen.endsWith('.png')
                                    ? <img src={imgen} alt={index} />
                                    : <img src={defaultImg} alt={index} />
                                }
                                
                            </SwiperSlide> 
                        )
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='mySwiper'
            >
                {
                    imgs?.map((imgen, index) => {
                        return (
                            <SwiperSlide key={index}>
                                {
                                    typeof imgen === 'string' && imgen.endsWith('.jpg') || imgen.endsWith('.jpeg') || imgen.endsWith('.gif') || imgen.endsWith('.png')
                                    ? <img src={imgen} alt={index} />
                                    : <img src={defaultImg} alt={index} />
                                }
                            </SwiperSlide> 
                        )
                    })
                }
            </Swiper>
        </div>
    );
}

export default Galery;