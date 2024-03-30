import React, { useState } from "react";
import { Spinner } from "../../components";
import { useEffect } from "react";

import PlaylistForm from "./PlaylistForm/PlaylistForm";
import PlaylistCard from "./PlaylistForm/PlaylistCard";
import playlistService from "../../express/playlistConfig";
function Playlist() {
  const [isClicked, setIsClicked] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);
  function handleCreate() {
    setIsClicked((prev) => !prev);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    playlistService
      .getUserPlaylists()
      .then((response) => {
        setPlaylistData(response);
      })
      .finally(setLoading(false));
    return () => {
      setLoading(true);
      setPlaylistData([]);
    };
  }, [isClicked]);
  return (
    <div className=" min-h-screen pt-20 px-5 bg-neutral-700 text-white w-full text-center">
      <button
        onClick={handleCreate}
        className="filters-button bg-neutra-700 text-white px-6 md:px-10 rounded-md border border-gray-100 hover:bg-neutral-600 text-lg"
      >
        New
      </button>
      {isClicked && <PlaylistForm handleClose={handleCreate} />}
      {!loading ? (
        <div className="flex mt-5 flex-wrap gap-3 justify-center sm:gap-5">
          {playlistData.map((item, index) => (
            <PlaylistCard key={item.name + index} data={item} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Playlist;
