Minesweeper By Eric Wong - December 17, 2018

This is a take home project for Viv to demonstrate my technical skill - Installation instruction at the bottom.

This project is coded in React and it can be run locally once npm is installed. It also uses font awesome for the flag.

This game started with a Game Option menu to set the number of rows, columns, mines and time limit, and each setting is bounded by a minimum and maximum with number of mines having the minimum and maximum dynamically set by rows and column. The "Start Game" option is enabled only if the settings are valid.

Once user made the selection of game options, user will see the game board with the specified settings.  Mines are generated randomly and number of mines in adjacent cells are calculated as well. The App layer will keep track of the number of opened cells, which will be used to calculate the winning status, and number of flagged cells, to display in Game Status panel.

Game Board Component is used to keep track of status of the game: "started" "won" "lost" and to take action when user has opened an empty cell or a cell with mine, which will change the status of the game. Also, the timer will be regulated as a losing condition once timer goes to 0 seconds.

Cell Component is used to manage the individual status of the cells, like opened or not opened, mine, flagged, number of mines in adjacent cells etc. A user can left click to open a cell, or right click to flag an unopened cell, and a flagged cell is protected and cannot be opened. When user opens a cell, it will propagate the appropriate event to Game Board Component.

User can start another game within a game session, which will be prompted before proceeding, or will start another game immediately if won or lost the game.

Winning or losing messages will be displayed once the game finished, and locations of mines will be displayed if losing the game.

**Unit Testing**

I am not good at it and I only put 3 sample cases for testing App in App.test.js to demonstrate. I choose Enzyme, Chai, and I ran into a little problem with Jest. I am more used to angular's mock which is in jasmine.

(Automatic README comment below)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
