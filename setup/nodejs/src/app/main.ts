import { input } from "@inquirer/prompts";
import { greet } from "usecases/greet";

const main = async () => {
  const name = await input({
    message: "Hello, who are you?",
    default: "World",
  });

  greet({ name });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
