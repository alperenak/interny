import React, { Component } from 'react';
import "./style.scss";

export default class HighlightBox extends Component {
    render() {
        const { icon, title, description } = this.props;
        return (
            <div className="highlightBox">
                <img src={icon} alt={title}></img>
                <span className="highlightBox__title">{title}</span>
                { description &&
                    <span className="highlightBox__description">
                        {description}
                    </span>
                }
            </div>
        );
    }
}
