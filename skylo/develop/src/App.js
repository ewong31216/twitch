import React, { Component } from 'react';
import DateRange from './DateRange';
import ApiCalls from './ApiCalls';
import Map from './Map';
import Slider from './Slider';
import Graph from './Graph';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.processData = this.processData.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.fetchData = this.fetchData.bind(this);

        this.data = {
            id: 'dd7295fa-6c65-484d-b38d-30df3bc31c0c',
            lags: [],
            longs: []
        };

        this.state = {
            current: 0,
            data: [],
            center: {
                lat: 59.95,
                lng: 30.33
            }
        };
    }

    updateCurrent(current){
        if(!isNaN(current)){
            this.setState({
                current: current
            })
        }
    }

    processData(data){
        if(data && data.length){
            for (let i = 0; i < data.length; i++){
                let previousSpeed = data[i - 1] ? data[i - 1].speed : 0,
                    acceleration = data[i].speed - previousSpeed;

                data[i].acceleration = acceleration;
                this.data.lags.push(data[i].lat);
                this.data.longs.push(data[i].long);
            }

            this.setState({
                center: {
                    lat: (Math.max(...this.data.lags) + Math.min(...this.data.lags)) / 2,
                    lng: (Math.max(...this.data.longs) + Math.min(...this.data.longs)) / 2
                }
            });
        }

        return data;
    }

    fetchData(params){
        ApiCalls.makeCall('https://alpha.skylo.io/api/devices/history/ids/' + this.data.id + '?since=' + params.fromDate + '&until=' + params.toDate, 'GET', [
            "Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRqYXlAZm9yZC5jb20iLCJzeXN0ZW1Sb2xlIjoic3lzdGVtVXNlciIsImlhdCI6MTU0MTAwNzAzMiwiaXNzIjoiaHR0cDovL3dlYi1zZXJ2ZXJzLWRldi0xNDI1MzI1MDI4LnVzLXdlc3QtMi5lbGIuYW1hem9uYXdzLmNvbSIsInN1YiI6ImUyMmE2MjlkLWRlYTAtNDc0Yi04YzY5LTFlODQwYmZkMzRmYSIsImp0aSI6IjY0Nzk2YWIwLTlhYTItNGY3Ny04OTk4LWI1MzMzYzhlMmI5OCJ9.aIGEX_qigixaA17dcO0KNJay-R_704FDaugfkIAeVLA"
        ]).then(response => {
            let data = [];

            if(response && response.devices && response.devices[this.data.id]){
                data = response.devices[this.data.id];
            }

            this.setState({
                current: 0,
                data: this.processData(data)
            });
        });
    }

    render() {
        return (
            <div className="App">
                <div className="header">
                    <div className="title">Vehicle Statistics</div>
                    <DateRange fetchData={this.fetchData}></DateRange>
                </div>
                <div className="right-content">
                    <Graph {...this.state} dataKey={'rssi'} color={"#00f"} title={'Signal'}></Graph>
                    <Graph {...this.state} dataKey={'speed'} color={"#0f0"} title={'Speed'}></Graph>
                    <Graph {...this.state} dataKey={'acceleration'} color={"#0ff"} title={'Acceleration'}></Graph>
                </div>
                <div className="main-content">
                    <Map {...this.state}></Map>
                    <Slider {...this.state} updateCurrent={this.updateCurrent}></Slider>
                </div>
            </div>
        );
    }
}

export default App;
