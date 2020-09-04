import React, {Component} from 'react';

/*** Styles ***/
import styles from './jobapplication.scss';
import Card from "../../components/Card";
import {getCookie} from "../../utils/cookie";
import store from "../../store";
import Button from "../../components/Button";

class JobApplication extends Component {
    state = {
        sections: [],
        CVSource: [],
        jobId: '',
        coverLettersSource: [],
        coverLetters: [],
        selectedCV: '',
        selectedCL: '',
        page: 0
    };

    async componentDidMount() {
        const { jobId } = this.props.match.params;

        await this.getCVs();
        await this.getCoverLetters();

        this.setState({ jobId });
    }

    getCoverLetters = async () => {
        let id = getCookie('user_id');
        let coverLetterRes = await store.getCoverLetters(id);
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
        this.setState({
            coverLetters, coverLettersSource, selectedCL: coverLettersSource[0]?.key
        });
    };

    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
        let CVSource = [];
        let sections = res.map((sects, i) => {
            CVSource.push({
                key: sects.id,
                value: sects.title,
                selected: i === 0,
                to:`${window.location.pathname}`,
                onChange: () => this.setState({selectedCV: sects.id})
            });

            return {
                id: sects.id,
                header: sects.title,
                items: Object.keys(sects).filter(s => !['id', 'sectors', 'intern', 'title', 'phone', 'photo'].includes(s)).map(sect => {
                    return {
                        title: sect.replace(/\w+/g,
                            function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}),
                        items: Array.isArray(sects[sect]) ? sects[sect].map(e => {
                            let {level, institution, title, startDate, endDate} = e;
                            let country = e.location?.country;
                            let city = e.location?.city;
                            let section = {};
                            level ? section.level = level : delete section.level;
                            institution ? section.institution = institution : delete section.institution;
                            title ? section.title = title : delete section.title;
                            country ? section.country = country : delete section.country;
                            city ? section.city = city : delete section.city;
                            startDate ? section.startDate = startDate : delete section.startDate;
                            endDate ? section.endDate = endDate : delete section.endDate;
                            return section
                        })  : []
                    };
                })
            };
        });
        this.setState({ sections: [...sections], CVSource, selectedCV: CVSource[0].key });
    };

    render() {
        let {CVSource, selectedCV, sections, coverLetters, coverLettersSource, selectedCL, page, jobId} = this.state;
        let cv = sections.find(section => section.id === selectedCV);
        let cl = coverLetters?.find(coverLetter => coverLetter.id === selectedCL);
        return (
            <div className={styles.JobApplication}>
                <div className={styles.cards}>
                    <div className={styles.CVs}>
                        <Card
                            v-if={page === 0 && cv}
                            type={'section'}
                            sections={cv?.items}
                            header={{text: cv?.header, position: 'center'}}
                        />
                        <Card
                            v-else-if={page === 1 && cl}
                            type={'coverLetter'}
                            disabled={true}
                            header={{text: cl?.title, position: 'center'}}
                            coverLetter={cl}
                        />
                        <Card v-else>
                            {page === 0 && "There is no cv, please create a cv and try again!"}
                            {page === 1 && "There is no Cover Letter, please create a Cover Letter and try again!"}
                        </Card>
                    </div>
                    <div className={styles.selection}>
                        <Card
                            type={'list'}
                            externalData={page === 0 ? CVSource : coverLettersSource}
                            title={page === 0 ?
                                (CVSource.length > 0 ? 'Select a CV' : 'NO CV AVAILABLE') :
                                (coverLettersSource.length > 0 ? 'Select a Cover Letter' : 'NO Cover Letter AVAILABLE')
                            }
                        />
                        <Button
                            to={page === 0 ? '/CVs' : '/coverletters'}
                            v-if={(CVSource.length <= 0 && page === 0) || (page === 1 && coverLettersSource.length <= 0)}
                            sizeName={'default'}
                            text={page === 0 ? 'Create a CV': 'Create a Cover Letter'}
                            type={'primary'}
                        />
                        <Button
                            onButtonClick={CVSource.length > 0 ? async () => {
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
                            }: {}}
                            v-if={(CVSource.length > 0 && page === 0) || (page === 1)}
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
