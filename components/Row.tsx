import React, { useRef, useState } from "react";
import { Movie } from "../type";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Thumbnail from "./Thumbnail";
interface RowProps {
  movies: Movie[];
  title: string;
}
const Row = ({ movies, title }: RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative p-4">
      <ChevronLeftIcon
        className={`absolute left-0 text-white cursor-pointer top-[125px] z-40 h-10 w-10 bg-[#7600FF] rounded-full flex items-center p-2 ${
          !isMoved && "hidden"
        }`}
        onClick={() => handleClick("left")}
      />
      <h2 className="mb-4  text-white font-bold">{title}</h2>
      <div
        className="flex overflow-scroll scrollbar-hide mb-2 w-full"
        ref={rowRef}
      >
        {movies?.map((movie) => (
          <Thumbnail key={movie.title} movie={movie} />
        ))}
      </div>

      <ChevronRightIcon
        className="absolute right-2 text-white cursor-pointer top-[125px] z-40 h-10 w-10 bg-[#7600FF] rounded-full flex items-center p-2"
        onClick={() => handleClick("right")}
      />
    </div>
  );
};

export default Row;
