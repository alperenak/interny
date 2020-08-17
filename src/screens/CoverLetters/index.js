import React, {Component} from 'react';
import Card from "../../components/Card";

/*** Utils ***/
import store from '../../store';

/*** Styles ***/
import styles from './coverletters.scss';
import SearchSection from "../../components/SearchSection";
import {getCookie} from "../../utils/cookie";

class CoverLetters extends Component {
    state = {
      coverLetters: []
    };

    async componentDidMount() {
        let id = getCookie('user_id');
        let res = await store.getCoverLetters(id);
        let coverLetters = res.map(cl => {
            return {
                "title": cl.title,
                "text": cl.text
            };
        });

        this.setState({ coverLetters });
    }

    render() {
        let {coverLetters} = this.state;
        let {user} = this.props;
        return (
            <div className={styles.CoverLetters}>
                <SearchSection />
                <div className={styles.cards}>
                    <div className={styles.CoverLettersWrapper}>
                        <Card
                            type={'coverLetter'}
                            v-for={(coverLetter, i) in coverLetters}
                            header={{text: coverLetter.title, position: 'center'}}
                            coverLetter={coverLetter}
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

export default CoverLetters;
