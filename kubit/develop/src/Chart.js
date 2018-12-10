import React, {Component} from 'react';
import {
    LineChart,
    Line,
    Legend,
    XAxis,
    YAxis,
    Tooltip
    } from 'recharts';

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render(){
        const { data, dataKeys } = this.props;

        return data ? (
            <LineChart width={800} height={600} data={data} margin={{ top: 60, right: 20, bottom: 5, left: 0 }}>
            { dataKeys.map(dataKey =>
                <Line type="monotone" connectNulls={true} dataKey={dataKey} stroke={this.getRandomColor()} key={dataKey} />
            )}
                <XAxis dataKey="date" />
                <YAxis />
                <Legend wrapperStyle={{ top: 0 }} />
                <Tooltip />
            </LineChart>
        ) : false;
    }
}

export default Chart;