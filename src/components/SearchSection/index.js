import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Input from "../../components/Input";

/*** Styles ***/
import styles from './searchSection.scss';

/*** Icons ***/
import searchIcon from '../../icons/colorfulSearch.svg';
import locationIcon from '../../icons/colorfulLocation.svg';

class SearchSection extends Component {
    state = {
        cities: [
            'Salary',
            'Job Types',
            'Skills',
            'Education Level',
            'Location',
            'Company',
            'Experience Level',
        ],
    };
    render() {
        return (
            <div className={`${styles.searchSection}`}>
                <div v-if={this.props.page === 'home'} className={styles.slogan}>The Easiest Way to Get Your New Internship</div>
                <div v-if={this.props.page === 'home'} className={styles.subSlogan}>Find the career you deserve</div>
                <div className={styles.searchBars}>
                    <div className={styles.keyword}>
                        <Input
                            type={'text'}
                            placeholder={'Enter position, keyword or company'}
                            icon={{src: searchIcon, position: 'right'}}
                            label={'Keyword'} />
                    </div>
                    <div className={styles.location}>
                        <Input
                            type={'text'}
                            placeholder={'Enter location'}
                            icon={{src: locationIcon, position: 'right'}}
                            label={'Location'} />
                    </div>
                    <div className={styles.findJob}>
                        <Button type={'secondary'} text={'Find Job'} sizeName={'large'} />
                    </div>
                </div>
                <div v-if={this.props.page === 'home'} className={styles.prepareCv}><Link to={'SignUp'} className={styles.underlined}>Prepare your CV</Link> - Easily apply to thousands of jobs from anywhere</div>
                <Fragment v-else>
                    <ul className={styles.cities}>
                        {this.state.cities.map((city, i) => {
                            return <li key={'city'+i} className={styles.city}>{city}</li>
                        })}
                    </ul>
                </Fragment>
            </div>
        );
    }
}

export default SearchSection;
