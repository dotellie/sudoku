# Sudoku

A simple sudoku game made with TypeScript, React and NextJS. Deployment is handled by Vercel.

Every game URL is predictable and will always generate the same board which allows for sharing
of boards. The board is calculated by seeding values that will never interfere with each other
and then running a sudoku back-trace algorithm to solve the entire board. With a complete,
solvable board, values can now be removed to create a puzzle. The correct board can also be
compared against to continuously check for correctness in the user inputted value.

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
