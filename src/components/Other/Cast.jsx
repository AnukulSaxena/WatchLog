import React from "react";
import { useSelector } from "react-redux";
import Img from "./Img";
import Avatar from "./Avatar";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);




    return (


        < div className="" >
            <div className="">Top Cast</div>
            {
                !loading && (
                    <div className="flex gap-5 overflow-x-scroll no-scrollbar">
                        {data?.map((item, index) => {
                            let imgUrl = url.backdrop + item.profile_path;
                            return (
                                <Avatar
                                    key={index}
                                    imgUrl={imgUrl}
                                    item={item}
                                />
                            );
                        })}
                    </div>

                )
            }
        </div >
    );
};

export default Cast;
