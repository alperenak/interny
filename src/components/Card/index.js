import React, {Component} from 'react';
import PropTypes from "prop-types";

/*** Components ***/
import CV from "./sub-components/CV";
import JobPost from "./sub-components/JobPost";
import Profile from "./sub-components/Porfile";
import DropDown from "./sub-components/DropDown";
import CoverLetter from "./sub-components/CoverLetter";
import Authentication from "./sub-components/Authentication";

/*** Styles ***/
import styles from './card.scss';

class Card extends Component {
    render() {
        let {type, header, children} = this.props;
        return (
            <div className={`${styles.Card} ${styles[type]}`}>
                <div v-if={header} className={`${styles.cardHeader} ${styles[header.position]}`}>{header.text}</div>
                <CV v-if={type==="cv"} {...this.props}/>
                <JobPost v-if={type==="jobPost"} {...this.props}/>
                <Profile v-if={type==="profile"} {...this.props}/>
                <DropDown v-if={type==="dropDown"} {...this.props}/>
                <CoverLetter v-if={type==="coverLetter"} {...this.props}/>
                <Authentication v-if={type==='auth' || type==='login' } {...this.props}/>
                {children}
            </div>
        );
    }
}

export default Card;

Card.propTypes = {
  type: PropTypes.string,
  externalData: PropTypes.array,
  posts: PropTypes.array,
  sections: PropTypes.array,
  header: PropTypes.string,
  title: PropTypes.string,
};

Card.defaultProps = {
  type: '',
  posts: [],
  sections: [],
  externalData: [],
  header: '',
  title: '',
};
