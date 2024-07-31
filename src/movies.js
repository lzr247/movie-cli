import { insertDB, getDB, saveDB } from "./db.js";

export const newMovie = async (movie, tags) => {
  const newMovie = {
    tags,
    id: Date.now(),
    content: movie,
  };

  await insertDB(newMovie);
  return newMovie;
};

export const getAllMovies = async () => {
  const { movies } = await getDB();
  return movies;
};

export const getMovie = async (filter) => {
  const { movies } = await getDB();
  return movies.filter((movie) =>
    movie.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeMovie = async () => {};

export const removeAllMovies = async () => {};
