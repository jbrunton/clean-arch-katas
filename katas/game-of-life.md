# Game of Life Kata

A kata for practicing domain-driven design / clean architecture.

# Core mechanics

## Task 1: Basic rules

Implement a basic console app which simulates Conway's game of life. Running the app should simulate a game in the following way:

1. The board should be 10 x 10.
2. The initial live cells should be those where x = 0 or y = 0 (assuming zero-based indexing for the grid).
4. Each turn the board should be rendered to the console, with the turn number printed above. There should be a reasonable delay between renders so the turns can be watched.
5. The game should be played for 20 turns.

Hints:

* You might like to clear the terminal before rendering the game. You can do this with `process.stdout.write("\u001Bc");`.
* You might like to render each turn over the previous turn. You can reset the terminal cursor with `process.stdout.moveCursor(0, -y);` (where `y` is the number of lines to move back up the screen).

Example output:

```
turn 1
● ● ● ● ● ● ● ● ● ●
●
●
●
●
●
●
●
●
●
```

```
turn 5
      ● ● ●
  ●
  ●
●   ● ●

        ●

      ●
  ●
●
```

## Task 2: Game inputs

Add the following parameters to customise the inputs:

1. The width and height of the game board.
2. The max number of turns.
3. The delay between renders in milliseconds.

Hints:

* You might consider using [Commander.js](https://github.com/tj/commander.js/) to parse commands.

A possible syntax for running the command:

```bash
$ pnpm run play --width 10 --height 10 --max-turns 100 --delay 20
$ pnpm run play -w 10 -h 10 -m 100 -d 20
```

# Improving the UX

## Task 3: Render cell deaths

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

## Task 4: Seed input

Add the following parameters to customise the game setup:

1. A seed input to initialise a pseudo-random number generator.
2. A cell count to specify the number of live cells in the first turn.

The cells should be randomly placed using the PRNG, so that each run of the program is deterministic for the given inputs.

A possible syntax for running the command:

```bash
$ pnpm run play --width 10 --height 10 --cell-count 80 --max-turns 1000 --delay 20 --seed 4
$ pnpm run play -w 10 -h 10 -c 80 -m 1000 -d 20 -s 4
```

## Task 5: Evaluate your design

Consider the design of your code:

* Is the domain model clear? Have you found a suitable 'ubiquitous' language?
* Have you cleanly separated your business logic from your I/O and the libraries/frameworks you're using?

Refactor your model as appropriate.

Hints:

* What are the entities and value objects of the domain? Are they clearly named with clear functions/methods operating over them?
* Should rendering be a single step (which takes a 'game' of some kind and logs it to the output), or should it be separated into separate steps: a 'render' use case (which encodes a game to a string) and a logging action to the terminal? There's no inherently correctly answer, but it's worth considering.
* Is all your business logic simple to test?

# Detecting endgame states

## Task 6: Identify when the game has settled

If the board doesn't change between turns we say that the game has 'settled'. Identify when this occurs and print the number of turns it took.

```
turn 36
                ● ●
              ●   ●
                ●







board is stable after 36 turns
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
game ended after max (20) turns without stabilising
```

## Task 7: Identify when the game has entered a cycle

If the game doesn't settle, it will enter a cycle of two or more repeated states. When this occurs, print the cycle steps and then exit.

Some example output. (Note that you won't necessarily get the same cycle for the same inputs, as that will depend on the PRNG you use and how you use it.)

```
$ pnpm run play -w 10 -h 10 -c 80 -t 1000 -d 20 -s 4

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

## Task 8: Evaluate your model

Evaluate your design again. Consider the questions from task 5 above.
