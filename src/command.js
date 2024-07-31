import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getAllMovies, newMovie } from "./movies.js";

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
        describe: "The content of the movie you want to create",
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
  .demandCommand(1)
  .parse();
