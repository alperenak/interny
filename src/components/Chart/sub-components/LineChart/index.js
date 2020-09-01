import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Post A', Application: 4000
    },
    {
        name: 'Post B', Application: 3000
    },
    {
        name: 'Post C', Application: 2000
    },
    {
        name: 'Post D', Application: 2780
    }
];

export default class LineDiagram extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    render() {

        return (
            <LineChart
                width={400}
                height={240}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Application" stroke="#82ca9d" />
            </LineChart>
        );
    }
}
