import React, { Component, Fragment } from "react";

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./jobPost.scss";

/*** Icons ***/
import locationIcon from "../../../../icons/location.svg";
import { Link } from "react-router-dom";
import { getCookie } from "../../../../utils/cookie";

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
              loading={btn.loading}
              iconAutoWidth={btn.iconAutoWidth}
              iconPosition={btn.iconPosition}
              onButtonClick={btn.onButtonClick}
              sizeName={btn.sizeName}
              responsive={btn.responsive}
              text={btn.text}
              type={btn.type}
              width={btn.width}
              to={btn.to}
              hoverText={btn.hoverText ? btn.hoverText : null}
            />
          );
        })}
      </div>
    );
  }

  renderPost = (pst, multiple) => {
    const { selectJob, RedirectControl = (props) => props.is === false ? props.children : <></> } = this.props;

    let link = getCookie('token') ? `/postdetail/${pst.id}` : 'signup';

    return (
      <Fragment>
        <div className={`${multiple ? styles.multiplePost : styles.singlePost}`}>
          <RedirectControl is={false}>
            <Link to={link} className={styles.itemImage}>
              <img src={pst.image ? pst.image : ""} alt={"image"} />
            </Link>

            <Link
              to={link}
              className={styles.postHeaderWrapper}
            >
              <div className={styles.postHeader}>{pst.header}</div>
              <div className={styles.postDate}>{pst.date}</div>
            </Link>

            <Link to={link} className={styles.postCompany}>
              {pst.company}
            </Link>

            {pst.buttons && this.renderPostButtons(pst.buttons)}

            <Link
              to={link}
              v-if={pst.location}
              className={styles.postLocation}
            >
              <img src={locationIcon} alt={"location"} />
              {pst.location}
            </Link>

            <Link to={link} className={styles.postNote}>
              {pst.description}
            </Link>

            <Link to={link} className={styles.postNote}>
              {pst.note}
            </Link>
          </RedirectControl>

          <RedirectControl>
            <a href="#" onClick={() => selectJob(pst.id)} className={styles.itemImage}>
              <img src={pst.image ? pst.image : ""} alt={"image"} />
            </a>

            <a
              href="#"
              onClick={() => selectJob(pst.id)}
              className={styles.postHeaderWrapper}
            >
              <div className={styles.postHeader}>{pst.header}</div>
              <div className={styles.postDate}>{pst.date}</div>
            </a>

            <a href="#" onClick={() => selectJob(pst.id)} className={styles.postCompany}>
              {pst.company}
            </a>

            {pst.buttons && this.renderPostButtons(pst.buttons)}

            <a
              href="#"
              onClick={() => selectJob(pst.id)}
              v-if={pst.location}
              className={styles.postLocation}
            >
              <img src={locationIcon} alt={"location"} />
              {pst.location}
            </a>

            <a href="#" onClick={() => selectJob(pst.id)} className={styles.postNote}>
              {pst.description}
            </a>

            <a href="#" onClick={() => selectJob(pst.id)} className={styles.postNote}>
              {pst.note}
            </a>
          </RedirectControl>
        </div>
      </Fragment>
    );
  };

  renderEmpty = () => {
    let { posts } = this.props;

    if (posts.length < 1) {
      return <div className={styles.noJob}> <span>There is no job post for you...</span> </div>
    }
    return;
  }

  render() {
    let { posts } = this.props;
    return (
      <Fragment>
        {posts.map((post, i) => {
          return (
            <div key={i} className={`${styles.jobPost}`}>
              {this.renderPost(post, posts.length > 1)}
            </div>
          );
        })}
        {this.renderEmpty()}
      </Fragment>
    );
  }
}

export default JobPost;
