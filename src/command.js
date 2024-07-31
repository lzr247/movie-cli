import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  getAllMovies,
  getMovie,
  newMovie,
  removeAllMovies,
  removeMovie,
} from "./movies.js";

const logAllMovies = (movies) => {
  movies.forEach(({ id, tags, content }) => {
    console.log(`${id} | ${tags} | ${content} \n`);
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <movie>",
    "create a new movie",
    (yargs) => {
      return yargs.positional("movie", {
        describe: "The content of the movie you want to create.",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags
        ? argv.tags.split(",").map((arg) => arg.trim())
        : [];
      const movie = await newMovie(argv.movie, tags);
      console.log("New movie: ", movie);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the movie",
  })
  .command(
    "all",
    "get all movies",
    () => {},
    async () => {
      const movies = await getAllMovies();
      logAllMovies(movies);
    }
  )
  .command(
    "find <filter>",
    "get matching movies",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter movies by, will be applied to movie.content.",
        type: "string",
      });
    },
    async (argv) => {
      const matches = await getMovie(argv.filter);
      logAllMovies(matches);
    }
  )
  .command(
    "remove <id>",
    "remove movie by id",
    (yargs) => {
      return yargs.positional("id", {
        describe: "Id of the movie you want to remove.",
        type: "number",
      });
    },
    async (argv) => {
      const id = await removeMovie(argv.id);
      console.log(`Movie with the id: ${id} is removed.`);
    }
  )
  .command(
    "clean",
    "remove all movies",
    () => {},
    async () => {
      await removeAllMovies();
      console.log("All movies are removed.");
    }
  )
  .demandCommand(1)
  .parse();
