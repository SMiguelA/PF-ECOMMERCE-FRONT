import { AiOutlineStar } from 'react-icons/ai';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import style from './Starts.module.css';

const Starts = ({rating}) => {

    const ratingStart = Array.from({length:5}, (element, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {
                    rating >= index +1 
                    ? (<FaStar className={style.icon} />)
                    : rating >= number 
                    ? <FaStarHalfAlt className={style.icon} />
                    : <AiOutlineStar  className={style.iconVoid} />
                }
            </span>
        )
    })

    return(
        <div className={style.containerStarts}>
            <h1>{rating}</h1>
            <div className={style.iconContainer}>
                {ratingStart}
            </div>
        </div>
    );
};

export default Starts;