import React, { Component } from 'react';

class GameOption extends Component{
    constructor(props){
        super(props);

        this.changeRow = this.changeRow.bind(this);
        this.changeColumn = this.changeColumn.bind(this);
        this.changeMine = this.changeMine.bind(this);
        this.changeTimer = this.changeTimer.bind(this);
        this.minMines = this.minMines.bind(this);
        this.maxMines = this.maxMines.bind(this);
        this.randomMines = this.randomMines.bind(this);
        this.setupBoard = this.setupBoard.bind(this);
        this.validSetup = this.validSetup.bind(this);
        this.setGameData = this.setGameData.bind(this);
        this.startGame = this.startGame.bind(this);

        this.state = {
            rows: 9,
            columns: 9,
            mines: 10,
            timer: 200
        }
    };

    // Initial setting up of Cell object
    initCell(){
        return {
            opened: false,
            mine: false,
            flag: false,
            number: 0
        }
    }

    // List of functions handling user input for different options
    changeRow(e){
        if(e && e.target && (!isNaN(e.target.value) || e.target.value === '')){
            this.setState({
                rows: e.target.value
            });
        }
    }

    changeColumn(e){
        if(e && e.target && (!isNaN(e.target.value) || e.target.value === '')){
            this.setState({
                columns: e.target.value
            });
        }
    }

    changeMine(e){
        if(e && e.target && (!isNaN(e.target.value) || e.target.value === '')){
            this.setState({
                mines: e.target.value
            });
        }
    }

    changeTimer(e){
        if(e && e.target && (!isNaN(e.target.value) || e.target.value === '')){
            this.setState({
                timer: e.target.value
            });
        }
    }

    // dynamically generate minimum and maximum of mines allowed
    minMines(){
        return Math.max(Math.round(0.1 * this.state.rows * this.state.columns / 10) * 10, 5);
    }

    maxMines(){
        return Math.round(0.8 * this.state.rows * this.state.columns / 10) * 10;
    }

    // Randomly assign mines to gameData before starting the game
    randomMines(){
        let mineArray = [],
            max = this.state.rows * this.state.columns;

        while(mineArray.length < this.state.mines){
            let index = Math.floor(Math.random() * max);

            if(mineArray.indexOf(index) === -1){
                mineArray.push(index);
            }
        }
        return mineArray.sort();
    }

    // Once setting is valid, set up the board and call randomMines
    setupBoard(){
        let board = {},
            mines = this.randomMines();

        for (let i = 0; i < this.state.rows; i++){
            board[i] = {};

            for (let j = 0; j < this.state.columns; j++){
                let mine = mines.indexOf(i * this.state.columns + j) > -1;

                board[i][j] = Object.assign({}, this.initCell(), { mine: mine });
            }
        }

        return board;
    }

    // Function to check if all user inputs are valid
    validSetup(){
        if(this.state.rows < 5 || this.state.rows > 30){
            return false;
        }

        if(this.state.columns < 5 || this.state.columns > 30){
            return false;
        }

        if(this.state.mines < this.minMines() || this.state.mines > this.maxMines()){
            return false;
        }

        if(this.state.timer < 10 || this.state.timer > 999){
            return false;
        }

        return true;
    }

    // Package the format for gameData and return to App
    setGameData(){
        return {
            rows: parseInt(this.state.rows, 10),
            columns: parseInt(this.state.columns, 10),
            mines: parseInt(this.state.mines, 10),
            timer: parseInt(this.state.timer, 10),
            board: this.setupBoard()
        };
    }

    startGame(){
        if(this.validSetup()) {
            this.props.setupGame(this.setGameData());
        }
    }

    render(){
        return (
            <div className="game-option">
                <div className="title">Game Option</div>
                <div className="options">
                    <div className="option">
                        <div className="caption">Number of Cells per Row<div className="helptext">(5 - 30)</div></div>
                        <input type="text" className="input" onChange={this.changeRow} value={this.state.rows} />
                        <br clear="all" />
                    </div>
                    <div className="option">
                        <div className="caption">Number of Cells per Column<div className="helptext">(5 - 30)</div></div>
                        <input type="text" className="input" onChange={this.changeColumn} value={this.state.columns} />
                        <br clear="all" />
                    </div>
                    <div className="option">
                        <div className="caption">Number of Mines<div className="helptext">({this.minMines()} - {this.maxMines()})</div></div>
                        <input type="text" className="input" onChange={this.changeMine} value={this.state.mines} />
                        <br clear="all" />
                    </div>
                    <div className="option">
                        <div className="caption">Time Limit (seconds)<div className="helptext">(10 - 999)</div></div>
                        <input type="text" className="input" onChange={this.changeTimer} value={this.state.timer} />
                        <br clear="all" />
                    </div>
                </div>
                <div className="buttons">
                    <button className="submit-button" disabled={!this.validSetup()} onClick={this.startGame}>Start Game</button>
                </div>
            </div>
        );
    }
}

export default GameOption;