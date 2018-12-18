import React, { Component } from 'react';

class Digital extends Component {
    constructor(props) {
        super(props);

        const digits = props.digits || 1;

        let lengths = [];

        for(let i = 0; i < digits; i++){
            lengths.push(i);
        }

        this.data = {
            lengths: lengths
        };

        this.state = {
            max: Math.pow(10, digits),
            digits: digits,
            value: props.value,
            values: this.getValues(props.value)
        };
    }

    digit(props){
        // K map type of evaluating what stoke to display for corresponding digit using CSS
        const digits = {
                'a': [0, 2, 3, 5, 6, 7, 8, 9],
                'b': [0, 4, 5, 6, 8, 9],
                'c': [0, 1, 2, 3, 4, 7, 8, 9],
                'd': [2, 3, 4, 5, 6, 8, 9],
                'e': [0, 2, 6, 8],
                'f': [0, 1, 3, 4, 5, 6, 7, 8, 9],
                'g': [0, 2, 3, 5, 6, 8, 9]
            },
            { value } = props || { value: 0 };

        return (
            <div className="digit">
                <div className={ "stroke horizontal digit-a" + (digits['a'].indexOf(value) > -1 ? ' on' : '')}></div>
                <div className={ "stroke vertical digit-b" + (digits['b'].indexOf(value) > -1 ? ' on' : '')}></div>
                <div className={ "stroke vertical digit-c" + (digits['c'].indexOf(value) > -1 ? ' on' : '')}></div>
                <div className={ "stroke horizontal digit-d" + (digits['d'].indexOf(value) > -1 ? ' on' : '')}></div>
                <div className={ "stroke vertical digit-e" + (digits['e'].indexOf(value) > -1 ? ' on' : '')}></div>
                <div className={ "stroke vertical digit-f" + (digits['f'].indexOf(value) > -1 ? ' on' : '')}></div>
                <div className={ "stroke horizontal digit-g" + (digits['g'].indexOf(value) > -1 ? ' on' : '')}></div>
            </div>
        );
    }

    // Construct an array of digits from least to largest, e.g. 145 => [5, 4, 1]
    getValues(thisValue){
        let values = [];

        while(thisValue >= 10){
            values.push(thisValue % 10);
            thisValue = Math.floor(thisValue / 10);
        }

        values.push(thisValue);

        return values;
    }

    componentDidUpdate(){
        const { value } = this.props;

        // Generate array for digits if value changed
        if(!isNaN(value) && value !== this.state.value && value < this.state.max && value >= 0){
            let values = this.getValues(value);

            this.setState({
                value: value,
                values: values
            });
        }
    }

    render(){
        return (
            <div className="digital">
            { this.data.lengths.map(digit => (
                <this.digit value={this.state.values[digit]} key={digit}/>
            ))}
            </div>
        );
    }
}

export default Digital;