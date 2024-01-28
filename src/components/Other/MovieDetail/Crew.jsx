import React from "react";

import Avatar from "../Avatar";

const Crew = ({ data, loading }) => {

    return (
        <div className="">
            <div className="text-center  text-4xl font-extrabold leading-none tracking-tight  md:text-4xl text-white">Top Crew</div>
            <hr className="h-px my-10  border-0 bg-gray-400"></hr>
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
