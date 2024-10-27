import { Subject } from "entities/subject";

export const greet = (subject: Subject): void => {
  console.info(`Hello, ${subject.name}`);
};
