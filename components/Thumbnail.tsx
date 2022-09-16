import React, { useState } from "react";
import { Movie } from "../type";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const Thumbnail = ({ movie }: { movie: Movie }) => {
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  return (
    <motion.div
      key={movie.title}
      className={`h-48 mr-4 min-w-[160px] relative  cursor-pointer rounded-md ${
        selected === true && "border-4 border-solid border-white"
      } `}
      onClick={() => {
        setSelected(true);
        router.push(`/${movie.id}`);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        layout="fill"
        alt=""
        className="w-full h-full object-cover rounded-md border-2 border-solid border-white"
      />
    </motion.div>
  );
};

export default Thumbnail;
