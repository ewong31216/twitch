import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Cell extends Component {
    constructor(props){
        super(props);

        this.content = this.content.bind(this);
        this.openedMine = this.openedMine.bind(this);
        this.openedEmpty = this.openedEmpty.bind(this);
        this.updateFlagged = this.updateFlagged.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);

        this.state = {
            row: props.row,
            column: props.column,
            opened: props.opened || false,
            flag: props.flag || false,
            exploded: false
        };
    }

    // Trigger the action for opening up a cell, mainly for automatically opened up from adjacent cell with 0 count
    componentDidUpdate(prevProps, prevState){
        if(!prevState.opened && this.state.opened) {
            if(this.props.mine) {
                this.openedMine();
            }else {
                this.openedEmpty();
            }
        }else if(!prevProps.opened && this.props.opened){
            this.onClick();
        }
    }

    content(){
        const { mode, mine, number } = this.props,
            { opened } = this.state;

        // Should appropriate content based on status of the game and user input, e.g. show all mines if user lost
        if(!opened){
            return mode === 'lost' && mine ? (
                <div className="mine"></div>
            ) : (this.state.flag ? (
                <div className="flag">
                    <FontAwesomeIcon icon="flag" />
                </div>
            ) : false);
        }else{
            return (mine || number > 0) ? (mine ? (
                <div className="mine"></div>
            ): (
                <div className={"number number" + number}>{ number }</div>
            )) : false;
        }
    }

    // User basically lose the game if opening up a cell with a mine
    openedMine(){
        this.setState({
            exploded: true
        });
        this.props.explodedMine(this.state.row, this.state.column);
    }

    openedEmpty(){
        this.props.openedEmpty(this.state.row, this.state.column);
    }

    // When user set or unset a flag, need to update the count and propagate to Game Board and App and Game Status to display
    updateFlagged(increase){
        this.props.updateFlagged(increase);
    }

    // Open a cell, if not flagged or already opened
    onClick(){
        const { mode } = this.props,
            { opened, flag } = this.state;

        if(mode === 'started' && !opened && !flag){
            this.setState({
                opened: true
            });
        }
    }

    // Set a flag, also to avoid default action for showing context menu from browser
    onContextMenu(e){
        e.stopPropagation();
        e.preventDefault();

        const { mode } = this.props,
            { opened, flag } = this.state;

        if(mode === 'started' && !opened){
            this.setState({
                flag: !flag
            });

            this.updateFlagged(!flag);
        }
    }

    render(){
        const { opened, exploded } = this.state;

        return (
            <div className={"cell" + (opened ? ' opened' + (exploded ? ' exploded' : '') : '')} onClick={this.onClick} onContextMenu={this.onContextMenu}>
                <this.content />
            </div>
        );
    }
}

export default Cell;