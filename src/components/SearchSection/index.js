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
        keyword: '',
        location: '',
        searches: [
            'Manchester',
            'London',
            'Oxford',
            'Newcastle',
            'Birmingham',
            'Norwich',
            'Bath',
            'Bristol',
        ],
    };

    componentDidMount() {
        let {defaultKeyword, defaultLocation} = this.props;
        this.setState({keyword: defaultKeyword, location: defaultLocation});
    }

    componentDidUpdate(prevProps) {
        let {defaultKeyword, defaultLocation} = this.props;
        if (!Object.is(prevProps.defaultKeyword, defaultKeyword)) {
            this.setState({ keyword: defaultKeyword });
        }
        if (!Object.is(prevProps.defaultLocation, defaultLocation)) {
            this.setState({ location: defaultLocation });
        }
    }

    render() {
        let {keyword, location} = this.state;
        return (
            <div className={`${styles.searchSection}`}>
                <div v-if={this.props.page === 'home'} className={styles.slogan}>The Easiest Way to Get Your New Internship</div>
                <div v-if={this.props.page === 'home'} className={styles.subSlogan}>Find the career you deserve</div>
                <div className={styles.searchBars}>
                    <div className={styles.keyword}>
                        <Input
                            type={'text'}
                            placeholder={'Software Developer'}
                            size={'medium'}
                            icon={{src: searchIcon, position: 'right'}}
                            labelDescription={'Enter position name, keyword or company name'}
                            defaultValue={keyword !== 'null' ? keyword : ''}
                            onChange={(value) => this.setState({keyword: value})}
                            label={'Keyword'} />
                    </div>
                    <div className={styles.location}>
                        <Input
                            type={'text'}
                            placeholder={'Istanbul, Turkey'}
                            size={'medium'}
                            icon={{src: locationIcon, position: 'right'}}
                            labelDescription={'Enter city name, country or state name'}
                            defaultValue={location !== 'null' ? location : ''}
                            onChange={(value) => this.setState({location: value})}
                            label={'Location'} />
                    </div>
                    <div className={styles.findJob}>
                        <Button
                            type={'secondary'}
                            text={'Find Job'}
                            sizeName={'large'}
                            to={`/search/${keyword ? keyword : null}/${location ? location : null}`}
                        />
                    </div>
                </div>
                <div v-if={this.props.page === 'home'} className={styles.prepareCv}><Link to={'SignUp'} className={styles.underlined}>Prepare your CVs</Link> - Easily apply to thousands of jobs from anywhere</div>
                <Fragment v-else>
                    <ul className={styles.searches}>
                        {this.state.searches.map((searchedWord, i) => {
                            return <Link
                                        to={`/search/${keyword ? keyword : null}/${searchedWord}`}
                                        key={'searchedWord'+i}
                                        className={styles.searchedWord}
                            >
                                {searchedWord}
                            </Link>
                        })}
                    </ul>
                </Fragment>
            </div>
        );
    }
}

export default SearchSection;
