import React, {Component} from 'react';
import {
    LineChart,
    Line,
    YAxis
    } from 'recharts';

class Graph extends Component {
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render(){
        const { current, data, dataKey } = this.props;

        let offset = 60,
            width = this.props.width || 400,
            left = current * (width - offset) / (data.length || 1) + offset,
            color = this.props.color || this.getRandomColor();

        return data && data.length ? (
            <div className="graph-container current-line-container">
                <div className="title">{this.props.title}</div>
                <div className="current-line" style={{left: left}}></div>
                <LineChart width={width} height={200} data={data} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
                    <Line type="monotone" connectNulls={true} dataKey={dataKey} stroke={color} key={dataKey} dot={{r:0}} />
                    <YAxis />
                </LineChart>
            </div>
        ) : false;
    }
}

export default Graph;