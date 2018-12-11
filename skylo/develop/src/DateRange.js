import React, { Component } from 'react';

class DateRange extends Component{
    constructor(props) {
        super(props);

        this.onChangeToDate = this.onChangeToDate.bind(this);
        this.onChangeFromDate = this.onChangeFromDate.bind(this);
        this.onGoButton = this.onGoButton.bind(this);

        this.data = {
            dateExp: /^(\d{2}:\d{2}:\d{2}) (\d{1,2})\/(\d{1,2})\/(\d{4})$/
        };

        this.state = {
            toDate: false,
            fromDate: false,
            valid: false
        };
    }

    componentDidUpdate(){
        let valid = this.isValid();

        if(valid !== this.state.valid){
            this.setState({
                valid: valid
            });
        }
    }

    getDate(str){
        if(str) {
            let match = str.match(this.data.dateExp);

            if(match && match.length === 5){
                return new Date(match[4] + '-' + match[3] + '-' + match[2] + ' ' + match[1]);
            }
        }

        return false;
    }

    isValid(){
        if(!this.state.fromDate || !this.state.toDate){
            return false;
        }

        if(this.state.fromDate.toString() === 'Invalid Date' || this.state.toDate.toString() === 'Invalid Date'){
            return false;
        }

        return true;
    }

    onChangeToDate(e){
        this.setState({
            toDate: this.getDate(e.target.value)
        });
    }

    onChangeFromDate(e){
        this.setState({
            fromDate: this.getDate(e.target.value)
        });
    }

    onGoButton() {
        if(this.state.valid) {
            this.props.fetchData({
                toDate: this.state.toDate.toISOString(),
                fromDate: this.state.fromDate.toISOString()
            });
        }
    }

    render(){
        return(
            <div className="date-range">
                <div className="to-date-container">
                    <label className="to-date">To</label>
                    <input type="text" onChange={this.onChangeToDate} />
                    <br />
                    <div className="helptext">(HH:mm:ss DD/MM/YYYY)</div>
                </div>
                <div className="from-date-container">
                    <label className="from-date">From</label>
                    <input type="text" onChange={this.onChangeFromDate} />
                    <br />
                    <div className="helptext">(HH:mm:ss DD/MM/YYYY)</div>
                </div>
                <button className="go-button" disabled={!this.state.valid} onClick={this.onGoButton}>Go</button>
            </div>
        );
    }
}

export default DateRange;