import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";

/*** Utils ***/
import store from '../../store';
import {getCookie} from "../../utils/cookie";

/*** Styles ***/
import styles from './cv.scss';

class CV extends Component {
    state = {
        sections: []
    };

    async componentDidMount() {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
        let sections = res.map(sects => Object.keys(sects).map(sect => {
            return {
                title: sect.replace(/\w+/g,
                    function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}),
                items: [
                    {
                        title: sects[sect],
                        location: 'Istanbul - Turkey',
                        date: '',
                    }
                ]
            }
        }));
        this.setState({ sections: [...sections] });
    }

    render() {
        let {user} = this.props;
        let {sections} = this.state;
        return (
            <div className={styles.CV}>
                <SearchSection />
                <div className={styles.cards}>
                    <div className={styles.CVs}>
                        <Card
                            type={'section'}
                            v-for={(section, i) in sections}
                            sections={section}
                            key={i}
                        />
                    </div>
                    <Card
                        type={'profile'}
                        profileObject={{
                            image: '',
                            status: 'active',
                            header: `${user.name} ${user.surname}`,
                            location: 'Istanbul - Turkey',
                            sector: 'Software',
                            position: 'Full Time',
                            education: 'Graduate',
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default CV;
