import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { newMovie } from "./movies.js";

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
  .demandCommand(1)
  .parse();
