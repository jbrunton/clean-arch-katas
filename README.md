# Game of Life Kata

A kata for practicing domain-driven design / clean architecture.

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

1. Height and width of the board.
2. Max number of turns.
3. The delay between renders in milliseconds.

## Task 3: Render cell deaths

Add an additional rendering frame between turns to animate the deaths of cells. The below examples show two frames for a single turn, with the dying cells shown first with a `◌`.
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

1. `--seed` to initialise a pseudo-random number generator.
2. `--live-cells` to specify the number of live cells in the first turn.

The cells should be randomly placed using the PRNG, so that each run of the program is deterministic for the given inputs.

## Task 5: Identify when the game has settled

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
board did not stabilise after 20 turns
```
