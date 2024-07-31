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

export const getAllMovies = async () => {};

export const getMovie = async () => {};

export const removeMovie = async () => {};

export const removeAllMovies = async () => {};
