import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './section.scss';
import {formatDate} from "../../../../utils/functions";

class Section extends Component {
    render() {
        let {sections} = this.props;

        return (
            <div className={"Section"}>
                {sections.map((sect, i) => {
                    return (
                        <div key={i} className={"section"}>
                            <div v-if={sect.title} className="sectionTitle">{sect.title}</div>
                            {sect.items.map((item, j) => {
                                return (
                                    <div key={j} className={"item"}>
                                        <div v-if={item.image} className={"itemImage"}>
                                            <img src={item.image} alt={'image'}/>
                                        </div>
                                        <div className={"itemDetail"}>
                                            <div v-if={item.title} className={"itemTitle"}>{item.title}</div>
                                            <div v-if={item.level} className={"itemLocation"}>
                                                {item.level}
                                            </div>
                                            <div v-if={item.institution} className={"itemLocation"}>
                                                {item.institution}
                                            </div>
                                            <div v-if={item.city || item.country} className={"itemLocation"}>
                                                {item.city + " - " + item.country}
                                            </div>
                                            <div v-if={item.endDate || item.startDate} className={"itemDate"}>
                                                {formatDate(item.startDate) + " - " + formatDate(item.endDate)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Section;

Section.propTypes = {
  sections: PropTypes.array
};

Section.defaultProps = {
  sections: []
};
