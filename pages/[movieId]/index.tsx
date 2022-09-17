import React from "react";
import { Movie, Element } from "../../type";
import MovieDetail from "../../components/MovieDetail";
import Head from "next/head";
interface movieDetailsProps {
  movie: Movie;
  trailer: string;
}
const MovieDetails = ({ movie, trailer }: movieDetailsProps) => {
  return (
    <div>
      <Head>
        <title>{movie?.title}</title>
        <meta name="description" content={movie?.overview} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-b">
        <MovieDetail movie={movie} trailer={trailer} />
        {!movie && <p>this film not found</p>}
      </div>
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const movieId = context.params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUPLIC_API_KEY}&language=en-US&append_to_response=videos`;
  const data = await fetch(url).then((res) => res.json());
  let trailer;
  if (data?.videos) {
    const index = data?.videos?.results.findIndex(
      (element: Element) => element.type === "Trailer"
    );
    trailer = data?.videos?.results[index]?.key;
  }
  return {
    props: {
      movie: data,
      trailer: trailer,
    },
  };
}
export default MovieDetails;
