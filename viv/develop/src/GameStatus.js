import React, { Component } from 'react';
import Digital from './Digital';

class GameStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            digits: 3
        };
    }

    render(){
        return (
            <div className="game-status">
                <div className="timer">
                    <Digital digits={this.state.digits} value={this.props.mines}/>
                </div>
                <div className="flagged">
                    <Digital digits={this.state.digits} value={this.props.timer}/>
                </div>
            </div>
        );
    }
}

export default GameStatus;