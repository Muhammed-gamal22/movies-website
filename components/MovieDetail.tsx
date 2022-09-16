import React, { useState } from "react";
import Image from "next/image";
import { Movie } from "../type";
import Video from "./Video";
import { motion } from "framer-motion";
interface movieDetailProps {
  movie: Movie;
  trailer: string;
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
const MovieDetail = ({ movie, trailer }: movieDetailProps) => {
  const Revenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(movie?.revenue);
  const Budget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(movie?.budget);
  const VoteAvg = Number(movie?.vote_average.toFixed(1) || 90) * 10;
  const DATA = [
    {
      label: "Revenue : ",
      value: Revenue,
    },
    {
      label: "Budget : ",
      value: Budget,
    },
    {
      label: "Status : ",
      value: movie?.status,
    },
    {
      label: "Viewers Vote : ",
      value: VoteAvg + "%",
    },
  ];
  return (
    <div className="relative top-0 left-0 bg-gradient-to-b w-screen h-screen">
      <div className="bg-gradient-to-l from-gray-900/10 to-[#010511]">
        <Image
          alt=""
          src={`https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          layout="fill"
          className="-z-10 object-cover"
        />
        <motion.div
          variants={wrapperVariants}
          animate="visible"
          initial="hidden"
          exit="exit"
          className="absolute left-4 top-4 lg:top-20 lg:left-20"
        >
          <div className="flex">
            <div className="flex-1">
              <div className="flex flex-wrap sm:flex-nowrap m-0">
                <div className="relative min-w-[180px] h-[260px] mb-4 sm:mb-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${
                      movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt=""
                    layout="fill"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="sm:ml-7  text-white ">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
                    {movie?.title}
                  </h1>
                  <p className="mt-4 font-semibold text-xl w-10/12 leading-7">
                    {movie?.overview}
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="relative flex-1 mt-8 rounded-md w-[95%] sm:w-[500px]  min-h-[300px] lg:min-h-[350px]">
                  <Video trailer={trailer} />
                </div>
                <div className="flex-1 text-white lg:ml-16">
                  <div className="flex flex-col space-y-4 md:mt-24 mt-4">
                    {DATA.map((data) => (
                      <div className="flex items-center" key={data.label}>
                        <h1 className="text-[#a09ba0] font-medium text-2xl">
                          {data?.label}
                        </h1>
                        <span className="ml-4">{data?.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetail;
