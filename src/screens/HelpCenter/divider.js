import React, { Component } from 'react';

export default class Divider extends Component {
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    marginBottom: '30px',
                }}
            ></div>
        );
    }
}
