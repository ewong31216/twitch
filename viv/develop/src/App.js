import React, { Component } from 'react';
import GameOption from './GameOption';
import GameBoard from './GameBoard';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

library.add(faFlag);

class App extends Component {
    constructor(props){
        super(props);

        this.setupGame = this.setupGame.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.footer = this.footer.bind(this);

        this.state = {
            mode: 'new',
            gameData: {}
        };
    }

    //to be called by GameOption for gameData, and also set mode to started
    setupGame(gameData){
        this.setState({
            mode: 'started',
            gameData: gameData
        });
    }

    changeMode(mode){
        this.setState({
            mode: mode
        });
    }

    startNewGame(){
        // Only prompt user if in a game session
        if(this.state.mode === 'started') {
            if (window.confirm("Are you sure you want to start a new game?")) {
                this.changeMode('new');
            }
        }else{
            this.changeMode('new');
        }
    }

    header(){
        const {mode} = this.state;

        switch(mode){
            case 'won':
                return (
                    <div className="message">
                        <h2 className="won">Congratulations!</h2>
                        <h3>You won!</h3>
                    </div>
                );
            case 'lost':
                return (
                    <div className="message">
                        <h2 className="lost">Oh Nooooooo!</h2>
                        <h3>You lost!</h3>
                    </div>
                );
            default:
                return (
                    <div className="message">
                        <h1 className="game">Welcome to Mine Sweeper</h1>
                        <h3>By Eric Wong - December 18, 2018</h3>
                    </div>
                );
        }
    }

    content(){
        const {mode} = this.state;

        switch(mode){
            case 'new': //Before the game, only show Game Option
                return (
                    <GameOption setupGame={this.setupGame}></GameOption>
                );
            case 'started':
            case 'won':
            case 'lost':
                // Showing the game board for wining, losing or during a game
                return (
                    <GameBoard mode={mode} gameData={this.state.gameData} changeMode={this.changeMode}></GameBoard>
                );
            default:
                return false;
        }
    }

    footer(){
        const {mode} = this.state;

        // Game Option has its own button to start the game, and should not be allowed to start a new game
        return mode !== 'new' ? (
            <div className="buttons">
                <button className="submit-button" onClick={ this.startNewGame }>Start another Game</button>
            </div>
        ) : false;
    }

    render() {
        return (
            <div className="App">
                <div className="header">
                    <this.header/>
                </div>
                <div className="content">
                    <this.content/>
                </div>
                <div className="footer">
                    <this.footer/>
                </div>
            </div>
        );
    }
}

export default App;
