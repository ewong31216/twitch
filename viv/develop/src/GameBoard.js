import React, { Component } from 'react';
import GameStatus from './GameStatus';
import Cell from './Cell';

class GameBoard extends Component{
    constructor(props){
        super(props);

        this.lostGame = this.lostGame.bind(this);
        this.updateCell = this.updateCell.bind(this);
        this.decreaseTimer = this.decreaseTimer.bind(this);
        this.openedEmpty = this.openedEmpty.bind(this);
        this.updateFlagged = this.updateFlagged.bind(this);

        this.data = {
            rows: [],
            columns: []
        };

        for(let i = 0; i < props.gameData.rows; i++){
            this.data.rows.push(i);
        }

        for(let i = 0; i < props.gameData.columns; i++){
            this.data.columns.push(i);
        }

        this.state = {
            gameData: this.fillNumber(props.gameData),
            startTimer: false,
            timer: props.gameData.timer || 999,
            opened: 0,
            mines: props.gameData.mines
        };
    };

    // Generate an array for all rows for using .map
    getAllRows(){
        let rows = [];

        for(let i = 0; i < this.props.gameData.rows; i++){
            rows.push(i);
        }

        return rows;
    }

    // Generate an array for all columns for using .map
    getAllColumns(){
        let columns = [];

        for(let i = 0; i < this.props.gameData.columns; i++){
            columns.push(i);
        }

        return columns;
    }

    // Generate an array for related rows for using .map
    getRelatedRows(row){
        let rows = [];

        for(let i = row - 1; i <= row + 1; i++){
            if(i > -1 && i < this.props.gameData.rows){
                rows.push(i);
            }
        }

        return rows;
    }

    // Generate an array for related columns for using .map
    getRelatedColumns(column){
        let columns = [];

        for(let i = column - 1; i <= column + 1; i++){
            if(i > -1 && i < this.props.gameData.columns){
                columns.push(i);
            }
        }

        return columns;
    }

    // Calculate the number displayed in the cell for number of mines in adjacent cells
    calculateNumber(gameData, row, column){
        let rows = this.getRelatedRows(row),
            columns = this.getRelatedColumns(column),
            count = 0;

        rows.map(thisRow =>
            columns.map(thisColumn => {
                let cell = gameData.board[thisRow][thisColumn];

                if(cell.mine){
                    count++;
                }

                return true;
            })
        );

        return count;
    }

    // Fill the number for all the cells initially after mines are randomly generated
    fillNumber(gameData){
        let newGameData = Object.assign({}, gameData),
            rows = this.getAllRows(),
            columns = this.getAllColumns();

        rows.map(thisRow => {
            columns.map(thisColumn => {
                newGameData.board[thisRow][thisColumn].number = this.calculateNumber(newGameData, thisRow, thisColumn);

                return true;
            });

            return true;
        });

        return newGameData;
    }

    lostGame(){
        this.props.changeMode('lost');
    }

    // set State for updating Cell status
    updateCell(row, column, params){
        const { gameData } = this.state;

        this.setState({
            'gameData': Object.assign({}, gameData, {
                'board': Object.assign({}, gameData.board, {
                    [row]: Object.assign({}, gameData.board[row], {
                        [column]: Object.assign({}, gameData.board[row][column], params)
                    })
                })
            })
        });
    }

    // A recursive function to decrease the timer every 1 seconds
    decreaseTimer(){
        let self = this;

        if(this.props.mode === 'started' && this.state.startTimer) {
            if(this.state.timer <= 1) {
                this.lostGame();
            }
            this.setState({
                timer: this.state.timer - 1
            }, () => {
                setTimeout(self.decreaseTimer, 1000);
            });
        }
    }

    // Called from Cell component when opened a cell with no mines in it
    openedEmpty(row, column){
        const { gameData } = this.state;

        let self = this,
            count = gameData.board[row][column].number;

        // Checking to see if all the cells with no mines are opened, and set winning status if so
        if(this.state.opened + gameData.mines + 1 >= gameData.rows * gameData.columns){
            this.props.changeMode('won');
        }else {
            this.setState({
                opened: this.state.opened + 1
            });

            // Timer is started once the first empty cell is opened
            if (!this.state.startTimer) {
                this.setState({
                    startTimer: true
                });
                setTimeout(self.decreaseTimer, 1000);
            }

            // Open up adjacent cells if all empty
            if (count === 0) {
                let rows = this.getRelatedRows(row),
                    columns = this.getRelatedColumns(column);

                rows.map(thisRow => {
                    columns.map(thisColumn => {
                        if (!gameData.board[thisRow][thisColumn].opened) {
                            setTimeout(() => self.updateCell(thisRow, thisColumn, {opened: true}), 0);
                        }

                        return true;
                    });

                    return true;
                });
            }
        }
    }

    // When user mark a flag, update Game Status count for remaining mines
    updateFlagged(increase){
        let mines = this.state.mines,
            offset = increase ? 1 : -1;

        this.setState({
            mines: mines - offset
        });
    }

    render(){
        const { mode } = this.props,
            { gameData } = this.state;

        return (
            <div className="game-board">
                <GameStatus timer={this.state.timer} mines={this.state.mines} />
            { this.data.rows.map(row =>
                <div className="row" key={'row' + row}>
                { this.data.columns.map(column =>
                    <Cell {...gameData.board[row][column]} explodedMine={this.lostGame} openedEmpty={this.openedEmpty} updateFlagged={this.updateFlagged} mode={mode} row={row} column={column} key={'cell' + row * gameData.rows + column}/>
                )}
                    <br clear="all" />
                </div>
            )}
            </div>
        );
    }
}

export default GameBoard;