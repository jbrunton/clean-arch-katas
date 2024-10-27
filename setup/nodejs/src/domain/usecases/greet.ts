import { Subject } from "../entities/Subject";

export const greet = (subject: Subject): void => {
  console.info(`Hello, ${subject.name}`);
};
