import { input } from "@inquirer/prompts";

const main = async () => {
  const name = await input({
    message: "Hello, who are you?",
    default: "World",
  });

  console.info(`Hello, ${name}!`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
