import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Button from "../../../Button";
import Card from "../../index";

/*** Utils ***/
import store from '../../../../store';

/*** Styles ***/
import styles from './intern.scss';

/*** Icons ***/
import coverLetterIcon from '../../../../icons/file-rounded-outlined-symbol.svg';
import CVIcon from '../../../../icons/file-rounded-empty-sheet.svg';

class Intern extends Component {
    state = {
        section: {},
        coverLetter: {},
        cvVisibility: false,
        coverLetterVisibility: false,
    };

    async componentDidMount() {
        this.getCV();
        this.getCoverLetters();
    }

    getCoverLetters = () => {
        let { CoverLetter, Intern } = this.props.application;
        let coverLetter = {
                "title": `Cover Letter`,
                "text": CoverLetter.text
        };

        this.setState({ coverLetter });
    };

    getCV = () => {
        let { Cv, Intern } = this.props.application;
        let section = {
                id: Cv.id,
                header: `CV`,
                items: Object.keys(Cv).filter(s => !['id', 'sectors', 'intern', 'title', 'phone', 'photo'].includes(s)).map(sect => {
                    return {
                        title: sect.replace(/\w+/g,
                            function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}),
                        items: Array.isArray(Cv[sect]) ? Cv[sect].map(e => {
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
        this.setState({ section: section });
    };

    render() {
        let {application} = this.props;
        let {section, coverLetterVisibility, cvVisibility, coverLetter} = this.state;

        let primaryButtonText = '';
        let primaryFunc = () => {};
        let ghostButtonText = '';
        let ghostFunc = () => {};

        if (application.isPending) { // when intern applies
            primaryButtonText = 'ACCEPT';
            primaryFunc = async () => store.acceptApplication(application.Job.id, application.id) ;
            ghostButtonText = 'REJECT';
            ghostFunc = async () => store.rejectApplication(application.Job.id, application.id);
        } else if (application.isAccepted) {
            if (application.isApproved) { // when intern agree
                primaryButtonText = 'ASSIGNMENTS';
                primaryFunc = () => {};
                ghostButtonText = 'WITHDRAW';
                ghostFunc = () => {};
            } else { // when employer accepted
                primaryButtonText = 'WITHDRAW';
                primaryFunc = () => {};
                ghostButtonText = 'REJECT';
                ghostFunc = async () => store.rejectApplication(application.Job.id, application.id);
            }
        } else if (application.isRejected) { // when employer or intern rejcet
            primaryButtonText = 'ACCEPT';
            primaryFunc = () => {};
            ghostButtonText = 'WITHDRAW';
            ghostFunc = () => {};
        }

        return (
            <div className={"Intern"}>
                <div className={"cardWrapper"}>
                    <div className={"photoContainer"}>
                        <img src={application.Intern.avatar} alt={'image'}/>
                    </div>
                    <div className={"infoWrapper"}>
                        <Link to={''} className={"internName"}>
                            {application.Intern.name} {application.Intern.surname}
                        </Link>
                        <div className={"detailButtons"}>
                            <div
                                onClick={() => this.setState({cvVisibility: !cvVisibility, coverLetterVisibility: false})}
                                className={"detailButton"}
                            >
                                <img src={CVIcon} alt={'icon'}/>
                                <div>Curriculum vitae</div>
                            </div>
                            <div
                                onClick={() => this.setState({cvVisibility: false, coverLetterVisibility: !coverLetterVisibility})}
                                className={"detailButton"}
                            >
                                <img src={coverLetterIcon} alt={'icon'}/>
                                <div>Cover Letter</div>
                            </div>
                        </div>
                    </div>
                    <div className={"buttonContainer"}>
                        <Button
                            type={'primary'}
                            text={primaryButtonText}
                            sizeName={'small'}
                            width={'72px'}
                            onButtonClick={async () => await primaryFunc()}
                        />
                        <Button
                            type={'ghost'}
                            text={ghostButtonText}
                            sizeName={'small'}
                            width={'72px'}
                            onButtonClick={async () => await ghostFunc()}
                        />
                    </div>
                </div>
                <div className={"CVs"}>
                    <Card
                        v-if={cvVisibility}
                        type={'section'}
                        sections={section.items}
                        header={{text: section.header, position: 'center'}}
                    />
                </div>
                <div className={"CoverLettersWrapper"}>
                    <Card
                        type={'coverLetter'}
                        v-if={coverLetterVisibility}
                        header={{text: coverLetter.title, position: 'center'}}
                        coverLetter={coverLetter}
                        disabled={true}
                    />
                </div>
            </div>
        );
    }
}

export default Intern;
