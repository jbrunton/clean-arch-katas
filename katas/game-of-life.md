# Game of Life Kata

A kata for practicing domain-driven design / clean architecture.

This is different from the classic [Game of Life TDD kata](https://codingdojo.org/kata/GameOfLife/) in scope: this kata includes additional input, rendering and data storage considerations which require adapting the model to different use cases, and careful thought about how to separate these different concerns.

# Core mechanics

## Task 1: Basic rules

Implement a basic console app which simulates Conway's game of life. Running the app should simulate a game in the following way:

1. The board should be 10 x 10.
2. For now, populate the board with 15 live cells, starting from the top left corner (see turn 1 in example below).
3. In each turn, a cell is born if it has 3 neighbors, survives if it has 2 or 3 neighbors, and otherwise dies.
5. Each turn, the board should be rendered to the console, with the turn number printed above.
4. The game should be ended after 20 turns.

Hints:

* If you use the `●` character, you might need to add spaces between cells or the board may look squashed horizontally.

Example output:

```
turn 1
● ● ● ● ● ● ● ● ● ●
● ● ● ● ●








turn 2
●         ● ● ● ●
●           ● ● ●
  ● ● ●







# etc.

turn 20
        ● ● ● ●
      ●
    ●       ● ●
        ●   ● ●
      ● ● ● ●
            ●




game ended after 20 turns
```

## Task 2: Game inputs

Add the following parameters to customise the inputs:

1. The width and height of the game board.
2. The number of cells to populate on the board (you can continue to populate them from the top left for now).
3. The max number of turns.

Hints:

* You might consider using [Commander.js](https://github.com/tj/commander.js/) to parse commands. (The template kata repository has examples [here](https://github.com/jbrunton/clean-arch-kata-ts-template/tree/main/src/app/commands).)

A possible syntax for running the command:

```bash
$ pnpm game play --width 10 --height 10 --max-turns 100 --cell-count 15 --delay 20
$ pnpm game play -w 10 -h 10 -m 100 -c 15 -d 20
```

# Improving the UX

## Task 3: Seed input

Add the following parameters to customise the game setup:

1. A seed input to initialise a pseudo-random number generator.
2. A cell count to specify the number of live cells in the first turn.

The cells should be randomly placed using the PRNG, so that each run of the program is deterministic for the given inputs.

A possible syntax for running the command:

```bash
$ pnpm game play --width 10 --height 10 --cell-count 80 --max-turns 1000 --delay 20 --seed 4
$ pnpm game play -w 10 -h 10 -c 80 -m 1000 -d 20 -s 4
```

## Task 4: Animate turns

For short games, appending each turn to the terminal is fine. But for large boards / long games, this quickly becomes awkward.

Add options to animate the turns so that they happen 'in place' in the terminal:

1. A flag to enable animation, which will render each turn over the previous.
2. The delay between renders in milliseconds.

Leave the last turn only in the terminal when the program exits so you can see the end state.

Hints:

* You might like to clear the terminal before rendering the game, to make the most of the terminal space. You can do this with `process.stdout.write("\u001Bc");` on Mac/xTerm.
* You might like to render each turn over the previous turn. You can reset the terminal cursor with `process.stdout.moveCursor(0, -y);` (where `y` is the number of lines to move back up the screen).
* You might like to validate the specified width and height fit in the terminal. You can check `process.stdout.columns` and `process.stdout.rows`.

## Task 5: Render cell deaths

Render an additional 'frame' between turns to animate the deaths of cells, so that changes are more obvious to the eye. The below examples show two frames for a single turn, with the dying cells shown first with a `◌`.
```
turn 3
◌ ● ● ● ● ● ● ● ◌

● ●
◌ ◌ ●
◌ ◌ ●
◌ ◌ ●
◌ ◌ ●
◌ ◌ ●
◌ ●
●
```
```
turn 3
  ● ● ● ● ● ● ●

● ●
    ●
    ●
    ●
    ●
    ●
  ●
●
```

## Task 6: Evaluate your design

Consider the design of your code:

* Is the domain model clear?
* Have you found a suitable 'ubiquitous' language?
* Have you cleanly separated your business logic from your I/O and the libraries/frameworks you're using?

Refactor your model as appropriate.

Hints:

* What are the entities and value objects of the domain?
* Are the nouns in the ubiquitous language represented by entities/value objects, and the verbs by actions performed on these objects?
* Should rendering be a single step (which takes a 'game' of some kind and logs it to the output), or should it be separated into separate steps: a 'render' use case (which encodes a game to a string) followed by a logging action to the terminal? (There's no inherently correct answer, but it's worth considering.)
* Is all your business logic simple to unit test?

# Detecting endgame states

## Task 7: Identify when the game has settled

If the board doesn't change between turns we say that the game has 'settled'. Identify when this occurs and print the number of turns it took.

```
turn 36
                ● ●
              ●   ●
                ●







board settled after 36 turns
```

If this doesn't happen by the time the max turns is reached, then print this instead.
```
turn 20
                ● ●
          ●       ●
        ●       ●
        ●
      ●   ●
    ● ●   ●
      ●   ●
          ● ●
          ● ●
        ● ● ●
game ended after max (20) turns without settling
```

## Task 8: Identify when the game has entered a cycle

If the game doesn't settle, it will enter a cycle of two or more repeated states. When this occurs, print the cycle steps and then exit.

Some example output. (Note that you won't necessarily get the same cycle for the same inputs, as that will depend on the PRNG you use and how you use it.)

```
$ pnpm game play -w 10 -h 10 -c 80 -t 1000 -d 20 -s 4

turn 67
            ● ● ●
          ●   ●   ●
        ● ● ●   ● ●
        ●     ●   ●
              ● ●
            ● ●




game entered cycle of length 3 at turn 61
turn 1 of cycle
            ● ● ●
        ●         ●
        ●         ●
        ●         ●

            ● ● ●




turn 2 of cycle
            ◌ ● ●
        ◌ ●   ●   ●
      ● ● ●     ● ●
        ◌         ◌
              ● ●
            ◌ ● ◌
              ●



turn 3 of cycle
            ● ● ●
          ●   ●   ●
      ◌ ● ● ●   ● ●
        ●     ●   ●
              ● ●
            ● ●
              ◌



cycle restarts
            ● ● ●
        ● ◌   ◌   ●
        ● ◌ ◌   ◌ ●
        ●     ◌   ●
              ◌ ◌
            ● ● ●




```

## Task 9: Evaluate your model

Evaluate your design again. Consider the questions from task 6 above.

# Seeding and saving games

## Task 10: Manually seed game

When running a game, if no seed and cell count are given, show the user a blank game board and let them specify the initial cell states. For example, you might let them use arrow keys to move around a cursor, and space to activate or deactive cells.

Hints:

* With Node.js, you can listen for key presses with a promise like in the below snippet.

```typescript
import readline from "readline";

const awaitInputs = async (onKeyPress: (keyName: string) => void) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  return new Promise<void>((resolve) => {
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c") {
        console.info("^C");
        process.exit();
      }
      if (key.name === "return") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        resolve();
      } else {
        onKeyPress(key.name);
      }
    });
  });
};
```

## Task 11: Save games

Create a task which will save a game. A saved game will have a name, an optional description, and a seed state specified by the inputs to the command.

If no cell seed or cell count are given, prompt the user to manually seed the game.

A possible syntax for running the command:

```bash
$ pnpm game save example-game --description "Example game" --width 10 --height 10 --cell-count 80 --seed 4
$ pnpm game save example-game -d "Example game" -w 10 -h 10 -c 80 -s 4
```

You should then be able to run the game by name:

```bash
$ pnpm game play --name example-game --max-turns 1000 --delay 20
```

## Task 12: List games

Add a command to list the saved games:

```bash
$ pnpm game list
```

## Task 13: Evaluate your model

Refactor to further clarify the domain and use cases, considering the same questions as before.

# Generalising the rules

## Task 14: Rule-string notation

Game of Life rules can be specified using rule-string notation of `B3/S23` (a cell is born if it has 3 neighbors and survives if it has 2 or 3 neighbors). Add a rule parameter to specify rules in this notation, so that a game can be played with [Highlife](https://en.wikipedia.org/wiki/Highlife) rules 
(`B36/S23`).

## Task 15: Polystate Life

Add support for the [Polystate Life](https://conwaylife.com/wiki/Polystate_Life) family of rules. Cells should be colored to distinguish between states. The number of states should be added as an option when running or seeding a game, and stored when saving a game.
