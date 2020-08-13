import React, {Component, Fragment} from 'react';

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./jobPost.scss";

/*** Icons ***/
import locationIcon from "../../../../icons/location.svg";

class JobPost extends Component {
    renderPostButtons(buttons) {
        return (
            <div className={`${styles.postButton}`}>
                {buttons.map((btn, i) => {
                    return (
                            <Button
                                key={i}
                                disabled={btn.disabled}
                                hoverIcon={btn.hoverIcon}
                                icon={btn.icon}
                                iconAutoWidth={btn.iconAutoWidth}
                                iconPosition={btn.iconPosition}
                                onButtonClick={btn.onButtonClick}
                                sizeName={btn.sizeName}
                                text={btn.text}
                                type={btn.type}
                                width={btn.width}
                                to={btn.to}
                            />
                    );
                })}
            </div>
        );
    }

    renderPost = (pst, multiple) => {
        return (
            <Fragment>
                <div className={`${multiple ? styles.multiplePost : styles.singlePost}`}>
                    <div v-if={pst.image} className={styles.itemImage}>
                        <img src={pst.image} alt={'image'}/>
                    </div>
                    <div className={styles.postHeaderWrapper}>
                        <div className={styles.postHeader}>{pst.header}</div>
                        <div className={styles.postDate}>{pst.date}</div>
                    </div>
                    <div className={styles.postCompany}>{pst.company}</div>
                    {pst.buttons && this.renderPostButtons(pst.buttons)}
                    <div v-if={pst.location} className={styles.postLocation}>
                        <img src={locationIcon} alt={'location'}/>
                        {pst.location}
                    </div>
                    <div className={styles.postNote}>{pst.note}</div>
                </div>
            </Fragment>
        );
    };

    render() {
        let {posts} = this.props;
        return (
            <Fragment>
                {posts.map((post, i) => {
                    return (
                        <div key={i} className={`${styles.jobPost}`}>
                            {this.renderPost(post, posts.length > 1)}
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}

export default JobPost;
