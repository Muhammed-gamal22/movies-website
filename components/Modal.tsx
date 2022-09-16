import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Element } from "../type";
import MuiModal from "@mui/material/Modal";
import { Movie } from "../type";
import Video from "./Video";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface modalProps {
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  currentMovie: Movie | undefined;
}
const Modal = ({ isShowModal, setIsShowModal, currentMovie }: modalProps) => {
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    if (!currentMovie) return;
    const getData = async () => {
      const url = `https://api.themoviedb.org/3/${
        currentMovie?.media_type === "tv" ? "tv" : "movie"
      }/${currentMovie?.id}?api_key=${
        process.env.customKey
      }&language=en-US&append_to_response=videos`;
      const data = await fetch(url).then((res) => res.json());
      if (data.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos.results[index]?.key);
      }
    };
    getData();
  }, [currentMovie]);
  return (
    <MuiModal open={isShowModal} onClose={() => setIsShowModal(false)}>
      <>
        <div
          onClick={() => setIsShowModal(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#7600FF] text-white flex items-center justify-center rounded-full cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </div>
        <div className="relative flex-1  mt-8 rounded-md w-[80vw] md:h-[90vh] h-[50vh] mx-auto">
          <Video trailer={trailer} />
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
