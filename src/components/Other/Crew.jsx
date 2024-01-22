import React from "react";
import { useSelector } from "react-redux";
import Img from "./Img";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Crew = ({ data, loading }) => {

    return (
        <div className="">
            <div className="text-center  text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Top Crew</div>
            <hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-400"></hr>
            {!loading && (
                <div className="flex gap-5 overflow-x-scroll no-scrollbar">
                    {data?.map((item, index) => {

                        return (
                            <Avatar
                                key={index}

                                item={item}
                            />
                        );
                    })}
                </div>

            )}
        </div>
    );
};

export default Crew;
