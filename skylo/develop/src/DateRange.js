import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class DateRange extends Component{
    constructor(props) {
        super(props);

        this.checkValid = this.checkValid.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onChangeToDate = this.onChangeToDate.bind(this);
        this.onChangeFromDate = this.onChangeFromDate.bind(this);
        this.onGoButton = this.onGoButton.bind(this);

        this.data = {
            dateExp: /^(\d{2}:\d{2}:\d{2}) (\d{1,2})\/(\d{1,2})\/(\d{4})$/
        };

        this.state = {
            toDate: new Date(),
            fromDate: new Date(),
            valid: false
        };
    }

    checkValid(){
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

    onChangeToDate(date){
        this.setState({
            toDate: new Date(date)
        }, this.checkValid);
    }

    onChangeFromDate(date){
        this.setState({
            fromDate: new Date(date)
        }, this.checkValid);
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
                    <DatePicker
                        value={moment(this.state.toDate).format("HH:mm:ss MM/DD/YYYY")}
                        onChange={this.onChangeToDate}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        timeIntervals={5}
                        dateFormat="HH:mm:ss MM/dd/yyyy"
                        timeCaption="time"
                    />
                    <br />
                    <div className="helptext">(HH:mm:ss MM/DD/YYYY)</div>
                </div>
                <div className="from-date-container">
                    <label className="from-date">From</label>
                    <DatePicker
                        value={moment(this.state.fromDate).format("HH:mm:ss MM/DD/YYYY")}
                        onChange={this.onChangeFromDate}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        timeIntervals={5}
                        dateFormat="HH:mm:ss MM/dd/yyyy"
                        timeCaption="time"
                    />
                    <br />
                    <div className="helptext">(HH:mm:ss MM/DD/YYYY)</div>
                </div>
                <button className="go-button" disabled={!this.state.valid} onClick={this.onGoButton}>Go</button>
            </div>
        );
    }
}

export default DateRange;