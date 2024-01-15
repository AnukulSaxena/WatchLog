import React, { useState } from 'react';
import './styles.css';
import { useSelector } from 'react-redux';

const MovieCard = ({ data }) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className=" w-48 relative">
            <div className="w-auto">
                <img className="rounded-xl" src={posterUrl} alt={data.poster_path} />
            </div>
            <p className="truncate text-center mt-3 text-lg font-serif">
                {data.title || data.name}
            </p>
            <div className="checkbox-wrapper-10 absolute bottom-7 mx-auto">
                <input
                    className="tgl tgl-flip"
                    id={`cb${data.id}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxToggle}
                />
                <label
                    className="tgl-btn"
                    data-tg-off="UnWatched"
                    data-tg-on="Watched"
                    htmlFor={`cb${data.id}`}
                ></label>
            </div>
        </div>
    );
};

export default MovieCard;
