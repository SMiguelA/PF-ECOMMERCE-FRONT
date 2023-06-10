import { Link } from 'react-router-dom';
import { A11y, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import defaultImg from '../../../img/default.jpg';
import style from './Card.module.css';

const Card = ({data}) => {
    const {id} = data
    const formattedPrice = data.price.toLocaleString();
    return(
        <Link to={`detail/${id}`} style={{textDecoration: 'none'}}>

        <div className={style.container} key={data.id}>
            <div className={style.containerImgs}>
                <Swiper 
                className={style.tamano}
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50} 
                slidesPerView={1} 
                pagination={{ clickable: true }}
                // onSlideChange={() => console.log('slide change')} 
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        data.pictures.map((picture) => (
                            <SwiperSlide key={picture}>
                              {typeof picture === 'string' && picture.endsWith('.jpg') || picture.endsWith('.jpeg') || picture.endsWith('.gif') || picture.endsWith('.png') ? (
                                <img className={style.imgs} src={picture} alt={data.name} />
                              ) : (
                                <img className={style.imgs} src={defaultImg} alt={data.name} />
                              )}
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className={style.info}>
                <h2>{data.name}</h2>
                <h3 className={style.price}>${formattedPrice}</h3>
            </div>
            <div className={style.infoSecundaria}>
                <article>
                    <p>Category: </p>
                    <p>{data.category}</p>
                </article>
                <hr />
                <article className={style.stock}>
                    <p>Stock: </p>
                    <p>{data.stock}</p>
                </article>
            </div>


        </div>
        </Link>
    );
};

export default Card;