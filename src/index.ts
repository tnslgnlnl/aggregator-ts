import { CommandsRegistry, registerCommand, runCommand, } from "./commands/commands.js";
import { handlerLogin, handlerRegister, handlerReset, handlerUsers } from "./commands/users.js";
import { handlerAgg } from "./commands/aggregate.js";
import { handlerAddFeed, handlerListFeeds } from "./commands/feeds.js";
import { handlerFollow, handlerListFeedFollows, handlerUnfollow } from "./commands/feed-follows.js"
import { middlewareLoggedIn } from "./middleware.js";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("usage: cli <command> [args...]");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const commandsRegistry: CommandsRegistry = {};

  registerCommand(commandsRegistry, "login", handlerLogin);
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", handlerReset);
  registerCommand(commandsRegistry, "users", handlerUsers);
  registerCommand(commandsRegistry, "agg", handlerAgg);
  registerCommand(commandsRegistry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(commandsRegistry, "feeds", handlerListFeeds);
  registerCommand(commandsRegistry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(commandsRegistry, "following", middlewareLoggedIn(handlerListFeedFollows));
  registerCommand(commandsRegistry, "unfollow", middlewareLoggedIn(handlerUnfollow));

  try {
    await runCommand(commandsRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
  process.exit(0);
}

main();