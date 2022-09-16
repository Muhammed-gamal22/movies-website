export const baseUrl = "https://api.themoviedb.org/3";
export const API_KEY = process.env.NEXT_PUPLIC_API_KEY;
const requests = {
  moviesTrending: `${baseUrl}/trending/all/week?api_key=${API_KEY}`,
  moviesOriginals: `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US`,
  moviesTopRated: `${baseUrl}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  moviesPopular: `${baseUrl}/movie/popular?api_key=${API_KEY}`,
  moviesActions: `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=27`,
};
export default requests;
