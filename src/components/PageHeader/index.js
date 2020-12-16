import React, { Component } from 'react';
import "./style.scss";

export default class PageHeader extends Component {
    render() {
        const { backgroundImage, title } = this.props;
        return (
            <div class="pageHeader">
                <div
                    class="container"
                    style={{ 'background-image': 'url(' + backgroundImage + ')' }}
                >
                    <p>{title}</p>
                </div>
            </div>
        );
    }
}
