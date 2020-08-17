import React, {Component} from 'react';

/*** Styles ***/
import styles from './jobapplication.scss';
import Card from "../../components/Card";
import {getCookie} from "../../utils/cookie";
import store from "../../store";
import Button from "../../components/Button";

class JobApplication extends Component {
    state = {
        sections: {},
        CVSource: [],
        jobId: '',
        coverLettersSource: [],
        coverLetters: [],
        selectedCV: '',
        selectedCL: '',
        page: 0
    };

    async componentDidMount() {
        let id = getCookie('user_id');
        const { jobId } = this.props.match.params;
        let res = await store.getCVs(id);
        let coverLetterRes = await store.getCoverLetters(id);

        let sections = {};
        let CVSource = [];
        let coverLettersSource = [];

        let coverLetters = coverLetterRes.map((cl, i) => {
            coverLettersSource.push({
                key: cl._id,
                value: cl.title,
                selected: i === 0,
                to:`${window.location.pathname}`,
                onChange: () => this.setState({selectedCoverLetter: cl._id})
            });
            return {
                id: cl._id,
                "title": cl.title,
                "text": cl.text
            };
        });
        res.map((sects, i) => {
            sections[sects.id] = Object.keys(sects).map(sect => {
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
            });
            CVSource.push({
                key: sects.id,
                value: sects.id,
                selected: i === 0,
                to:`${window.location.pathname}`,
                onChange: () => this.setState({selectedCV: sects.id})
            });
        });
        this.setState({
            sections: {...sections}, CVSource, selectedCV: CVSource[0].key, jobId,
            coverLetters, coverLettersSource, selectedCL: coverLettersSource[0].key
        });
    }

    render() {
        let {CVSource, selectedCV, sections, coverLetters, coverLettersSource, selectedCL, page, jobId} = this.state;
        return (
            <div className={styles.JobApplication}>
                <div className={styles.cards}>
                    <div className={styles.CVs}>
                        <Card
                            v-if={page === 0}
                            type={'section'}
                            sections={sections[selectedCV]}
                        />
                        <Card
                            v-if={page === 1}
                            type={'coverLetter'}
                            header={{text: coverLetters.find(cl => cl.id === selectedCL).title, position: 'center'}}
                            coverLetter={coverLetters.find(cl => cl.id === selectedCL)}
                        />
                    </div>
                    <div className={styles.selection}>
                        <Card
                            type={'list'}
                            externalData={page === 0 ? CVSource : coverLettersSource}
                            title={page === 0 ? 'Select a CV' : 'Select a Cover Letter'}
                        />
                        <Button
                            onButtonClick={async () => {
                                if (page === 0) {
                                    this.setState({ page: 1 })
                                } else if (page === 1) {
                                    let res = await store.applyPost(
                                        getCookie('user_id'),
                                        jobId,
                                        selectedCV,
                                        coverLetters.find(cl => cl.id === selectedCL)
                                    );
                                    if (res.status && res.status === 203) {
                                        window.location.pathname = '/';
                                    }
                                }
                            }}
                            sizeName={'default'}
                            text={page === 0 ? 'Continue to Cover Letters' : 'Send Application'}
                            type={'primary'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default JobApplication;
