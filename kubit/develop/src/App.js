import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Chart from './Chart';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.chart = this.chart.bind(this);
        this.filter = this.filter.bind(this);
        this.processData = this.processData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.index = {
            date: 0,
            visit: 2,
            visitScore: 3,
            home: 4,
            homeScore: 5
        };

        this.state = {
            textarea: false,
            data: false,
            dataValid: false,
            chartData: false
        };
    }

    toggleMenu(name){
        let menu = $('.drop-down-menu.' + name);

        if(menu.hasClass('show')){
            menu.removeClass('show');
        }else{
            $('.drop-down-menu').removeClass('show');
            menu.addClass('show');
        }
        this.applyFilter();
    }

    applyFilter(){
        let chartObj = {},
            types = [],
            chartData = [],
            dataKeys = [];

        this.state.data.dates.map(date => chartObj[date] = []);

        document.querySelectorAll('.drop-down-menu.type input[type=checkbox]:checked').forEach(type => {
            types.push(type.value);
        });

        document.querySelectorAll('.drop-down-menu.teams input[type=checkbox]:checked').forEach(team => {
            let teamName = team.value,
                teamRecord = this.state.data.teams[teamName];

            if(teamRecord){
                dataKeys.push(teamName);

                Object.keys(teamRecord).map(date => {
                    let record = teamRecord[date];

                    if(record && types.indexOf(record.type) !== -1){
                        chartObj[date].push({
                            team: teamName,
                            score: record.score
                        });
                    }
                });
            }
        });

        Object.keys(chartObj).forEach(date => {
            let teams = chartObj[date],
                data = {
                    date: date
                };

            teams.map(team => {
                data[team.team] = team.score;
            });

            chartData.push(data);
        });

        if(dataKeys.length) {
            this.setState({
                chartData: {
                    dataKeys: dataKeys,
                    data: chartData
                }
            });
        }
    }

    chart(){
        return this.state.chartData ? (
            <Chart {...this.state.chartData}></Chart>
        ) : false;
    }

    filter(){
        return this.state.dataValid ? (
            <div className="filter">
                <span><strong>Filter:</strong> </span>
                <div className="item">
                    <span onClick={() => this.toggleMenu("teams")}>Select Teams</span>
                    <div className="drop-down-menu teams">
                    { Object.keys(this.state.data.teams).sort().map(name =>
                        <label className="team" key={name}>
                            <input type="checkbox" value={name} /> { name }
                        </label>
                    )}
                    </div>
                </div>
                <div className="item">
                    <span onClick={() => this.toggleMenu("type")}>Select Type</span>
                    <div className="drop-down-menu type">
                        <label className="type">
                            <input type="checkbox" value="home" defaultChecked/> Home
                        </label>
                        <label className="type">
                            <input type="checkbox" value="visit" defaultChecked/> Visit
                        </label>
                    </div>
                </div>
                <br clear="all" />
            </div>
        ) : false;
    }

    processData(str){
        if(str && str.length){
            let lines = str.split("\n"),
                labels = lines.shift().split(','),
                dates = [],
                teams = {};

            lines.forEach(line => {
                let record = line.split(','),
                    date = record[this.index.date],
                    visit = record[this.index.visit],
                    visitScore = record[this.index.visitScore],
                    home = record[this.index.home],
                    homeScore = record[this.index.homeScore];

                if(date) {
                    if (dates.indexOf(date) === -1) {
                        dates.push(date);
                    }
                    if (visit && visitScore) {
                        if(!teams[visit]){
                            teams[visit] = {};
                        }
                        teams[visit][date] = {
                            type: 'visit',
                            score: visitScore
                        };
                    }
                    if(home && homeScore){
                        if(!teams[home]){
                            teams[home] = {};
                        }
                        teams[home][date] = {
                            type: 'home',
                            score: homeScore
                        };
                    }
                }
            });

            return {
                labels: labels,
                dates: dates.sort(),
                teams: teams
            };
        }
    }

    onChange(e){
        this.setState({
            textarea: e.target.value
        });
    }

    onUpdate(){
        let data = this.processData(this.state.textarea);

        if(data) {
            this.setState({
                data: data,
                dataValid: true
            });
        }else{
            this.setState({
                dataValid: false,
                chartData: false
            });
        }
    }

    render() {
        return (
            <div className="App">
                <this.chart/>
                <this.filter/>
                <textarea className="data-input" onChange={this.onChange}></textarea>
                <button className="data-update" onClick={this.onUpdate}>Update Data</button>
            </div>
        );
    }
}

export default App;
