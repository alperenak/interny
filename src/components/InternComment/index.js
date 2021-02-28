import React, { Component } from 'react'

// Styles
import './intern-comment.scss';

// Assets
import quoteWhite from '../../assets/quoteWhite.png';
import quoteGray from '../../assets/quoteGray.png';


export default class InternComment extends Component {
    render() {
        const { card, avatar, title, subTitle, text } = this.props;

        const internCommentClassName = card ? "internComment internComment__card" : "internComment";
        const quoteSrc = card ? quoteGray : quoteWhite;
        return (
            <div className={internCommentClassName}>
                <div className="internComment__header">
                    <img className="internComment__header__avatar" src={avatar}></img>
                    <div className="internComment__header__title">
                    <h3 className="internComment__header__title__main">{title}</h3>
                     <small className="internComment__header__title__small">{subTitle}</small>
                    </div>
                </div>
                <div className="internComment__body">
                    <p className="internComment__body__comment">
                        {text}
                    </p>
                </div>
                <div className="internComment__footer">
                    <img src={quoteSrc}></img>
                </div>
            </div>
        )
    }
}

