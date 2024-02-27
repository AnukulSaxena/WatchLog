import React from "react";
import Img from "./Img";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FakeImage from "../MovieCard/FakeImage";

function Avatar({ item }) {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  let imgUrl = url.backdrop + item.profile_path;

  function handleClick() {
    navigate(`/credits/${item.id}/${item.known_for_department}`);
  }

  return (
    <div
      key={item.id}
      className="text-center min-w-20 max-w-20 md:min-w-32  text-white"
    >
      <div
        onClick={handleClick}
        className="md:w-32  min-h-32 md:min-h-48 relative  hover:cursor-pointer overflow-hidden mb-3"
      >
        <FakeImage className={`absolute inset-0`} />
        {item?.profile_path && <Img src={imgUrl} className={"rounded-xl "} />}
      </div>
      <p className="truncate text-center mt-3 md:text-xl text-zinc-300">
        {item.name}
      </p>
      <div className="truncate text-center mt-1 px-2 md:px-5 text-md text-zinc-400">
        {item.character || item.job}
      </div>
    </div>
  );
}

export default Avatar;
