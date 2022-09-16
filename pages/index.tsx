import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import requests from "../requests";
import { Movie } from "../type";
import Row from "../components/Row";
import { useState } from "react";
import Modal from "../components/Modal";
import { motion } from "framer-motion";

interface moviesProps {
  moviesTrending: Movie[];
  moviesOriginals: Movie[];
  moviesTopRated: Movie[];
  moviesActions: Movie[];
  moviesPopular: Movie[];
}
const wrapperVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
  exit: {
    y: "100vh",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

const Home = ({
  moviesTrending,
  moviesOriginals,
  moviesTopRated,
  moviesActions,
  moviesPopular,
}: moviesProps) => {
  const [currentMovie, setCurrentMovie] = useState<Movie | undefined>();
  const [isShowModal, setIsShowModal] = useState(false);
  const ROWS = [
    {
      title: "Top Rated",
      url: moviesTopRated,
    },
    {
      title: "Trending",
      url: moviesTrending,
    },
    {
      title: "Actions",
      url: moviesActions,
    },
    {
      title: "Popular",
      url: moviesPopular,
    },
  ];

  return (
    <motion.div>
      <Head>
        <title>Movies App</title>
        <meta
          name="description"
          content="Enjoy our films and watch every day."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative">
        <div className="relative h-screen bg-gradient-to-b">
          <Banner
            moviesOriginals={moviesOriginals}
            setCurrentMovie={setCurrentMovie}
            setIsShowModal={setIsShowModal}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={wrapperVariants}
          >
            {ROWS.map((row) => (
              <Row key={row.title} movies={row.url} title={row.title} />
            ))}
          </motion.div>
        </div>
        {/* Modal */}
        {isShowModal && (
          <Modal
            currentMovie={currentMovie}
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          />
        )}
      </main>
    </motion.div>
  );
};

export async function getStaticProps() {
  const [
    moviesTrending,
    moviesActions,
    moviesOriginals,
    moviesPopular,
    moviesTopRated,
  ] = await Promise.all([
    fetch(requests.moviesTrending).then((res) => res.json()),
    fetch(requests.moviesActions).then((res) => res.json()),
    fetch(requests.moviesOriginals).then((res) => res.json()),
    fetch(requests.moviesPopular).then((res) => res.json()),
    fetch(requests.moviesTopRated).then((res) => res.json()),
  ]);
  return {
    props: {
      moviesTrending: moviesTrending.results,
      moviesActions: moviesActions.results,
      moviesOriginals: moviesOriginals.results,
      moviesPopular: moviesPopular.results,
      moviesTopRated: moviesTopRated.results,
    },
  };
}
export default Home;
