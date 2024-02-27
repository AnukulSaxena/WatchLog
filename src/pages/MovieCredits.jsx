import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { MovieCard, CreditSwitcher } from "../components";
import { useSelector, useDispatch } from "react-redux";

function MovieCredits() {
  const { id, knownFor } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const { mediaType } = useSelector((state) => state.home);
  const [loading, setLoading] = useState(true);

  function handleChangeCredit() {
    setIsChecked((prev) => !prev);
  }

  async function initialStatus() {
    try {
      const response = await fetchDataFromApi(
        `/person/${id}/${mediaType}_credits`
      );
      if (isChecked) {
        setMovieData(response.cast);
      } else {
        setMovieData(response.crew);
      }
      setLoading(false);
    } catch (error) {
      console.error("MovieCredits :: initialStatus :: Error", error);
    }
  }

  useEffect(() => {
    if (knownFor !== "Acting") setIsChecked(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialStatus();

    return () => {
      setLoading(true);
    };
  }, [isChecked, mediaType]);
  return (
    <div className="min-h-screen pt-10 bg-neutral-700">
      <CreditSwitcher
        isChecked={isChecked}
        className={"w-full flex justify-center mt-10"}
        handleChangeCredit={handleChangeCredit}
      />
      {!loading && (
        <div className=" mt-2 flex flex-wrap justify-center gap-3">
          {movieData?.map((item, index) => {
            return (
              <MovieCard
                key={index}
                data={item}
                initStatus={false}
                crossCheck={true}
                mediaType={mediaType}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MovieCredits;
