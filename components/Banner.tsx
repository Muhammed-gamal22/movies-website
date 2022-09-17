import { Movie } from "../type";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
interface moviesOriginalsProps {
  moviesOriginals: Movie[];
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  setCurrentMovie: Dispatch<SetStateAction<Movie | undefined>>;
}
const wrapperVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};
const Banner = ({
  moviesOriginals,
  setIsShowModal,
  setCurrentMovie,
}: moviesOriginalsProps) => {
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    setMovie(
      moviesOriginals[Math.floor(Math.random() * moviesOriginals.length)]
    );
  }, [moviesOriginals]);
  const formatDate = (release: any) => {
    const d: Date = new Date(release);
    return d.getFullYear();
  };
  return (
    <div className="h-[65vh]">
      <Image
        src={`https://image.tmdb.org/t/p/original/${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt={movie?.title}
        layout="fill"
        className="object-cover bg-center absolute -z-10 top-0 left-0"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={wrapperVariants}
        className="absolute sm:left-20 left-5 top-40 text-white"
      >
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl w-[90vh] leading-3">
          {movie?.title}
        </h1>
        <div className="my-8 font-bold">
          <span className="text-[#879394]">A Disney Original Film</span>
          <span className="mx-2 text-[#319B58] ">
            {(movie?.vote_average || 90) * 10}% Match{" "}
          </span>
          <span className="w-8 h-8 rounded-full bg-[#7600FF] p-2">
            {formatDate(movie?.release_date)}
          </span>
          <button
            onClick={() => {
              setIsShowModal(true);
              setCurrentMovie(movie);
            }}
            className="bg-[#7600FF] block p-2 rounded-full mt-4 w-[20%]"
          >
            Play
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
