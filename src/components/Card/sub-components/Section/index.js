import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './section.scss';

class Section extends Component {
    render() {
        let {sections} = this.props;

        return (
            <div className={styles.Section}>
                {sections.map((sect, i) => {
                    return (
                        <div key={i} className={styles.section}>
                            <div v-if={sect.title} className={styles.sectionTitle}>{sect.title}</div>
                            {sect.items.map((item, j) => {
                                return (
                                    <div key={j} className={styles.item}>
                                        <div v-if={item.image} className={styles.itemImage}>
                                            <img src={item.image} alt={'image'}/>
                                        </div>
                                        <div className={styles.itemDetail}>
                                            <div v-if={item.title} className={styles.itemTitle}>{item.title}</div>
                                            <div v-if={item.location} className={styles.itemLocation}>{item.location}</div>
                                            <div v-if={item.date} className={styles.itemDate}>{item.date}</div>
                                        </div>
                                        {/*<div className={styles.itemButtons}>btn</div>*/}
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
