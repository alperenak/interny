import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './cv.scss';

class CV extends Component {
    render() {
        let {sections} = this.props;

        return (
            <div className={styles.CV}>
                {sections.map(sect => {
                    return (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>{sect.title}</div>
                            {sect.items.map(item => {
                                return (
                                    <div className={styles.item}>
                                        <div  className={styles.itemImage}>
                                            <img src={item.image} alt={'image'}/>
                                        </div>
                                        <div className={styles.itemDetail}>
                                            <div className={styles.itemTitle}>{item.title}</div>
                                            <div className={styles.itemLocation}>{item.location}</div>
                                            <div className={styles.itemDate}>{item.date}</div>
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

export default CV;

CV.propTypes = {
  sections: PropTypes.array
};

CV.defaultProps = {
  sections: []
};
