import React, {Component} from 'react';

/*** Components ***/
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";

/*** Styles ***/
import styles from './home.scss';

/*** Icons ***/
import searchIcon from '../../icons/colorfulSearch.svg';
import locationIcon from '../../icons/colorfulLocation.svg';
import bounImage from '../../assets/Boğaziçi_Üniversitesi_Logo.png';
import workingStudentImage from '../../assets/workingStudent.jpg';
import register from '../../icons/register.svg';
import application from '../../icons/application.svg';
import duties from '../../icons/duties.svg';

class Home extends Component {
    state = {
        cities: [
            'Manchester',
            'London',
            'Oxford',
            'Newcastle',
            'Birmingham',
            'Norwich',
            'Bath',
            'Bristol',
            'Yorkshire',
            'Swindon',
            'Dover',
            'Bibury',
            'Southampton',
        ],
        items: [1,2,3]
    };

    render() {
        let {items} = this.state;
        return (
            <div className={styles.Home}>
                <div className={styles.searchSection}>
                    <div className={styles.slogan}>The Easiest Way to Get Your New Internship</div>
                    <div className={styles.subSlogan}>Find the career you deserve</div>
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
                    <div className={styles.prepareCv}><span className={styles.underlined}>Prepare your CV</span> - Easily apply to thousands of jobs from anywhere</div>
                </div>
                <div className={styles.popularSearchSection}>
                    <div className={styles.popularSearchTitle}>Popular Searches</div>
                    <ul className={styles.cities}>
                        {this.state.cities.map(city => {
                            return <li className={styles.city}>{city}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.postsSection}>
                    <div className={styles.postsTitle}>Find an Internship and Advance Your Career</div>
                    <div className={styles.postsSubTitle}>Each month, thousands of students get career opportunities via Interny</div>
                    <div className={styles.cards}>
                        <Card
                            v-for={item in items}
                            type={'jobPost'}
                            posts={[
                                {
                                    date:'20 days ago',
                                    header:'Siemens AG',
                                    company:'Software Development Engineer',
                                    image: bounImage,
                                    buttons:[
                                        {
                                            type:'ghost',
                                            text:'20 Days Internship',
                                            sizeName:'small',
                                        }
                                    ],
                                    note:'Responsible for the design, coding, unit testing and documentation of software components and features. Build automation test framework. Work with the software engineering team to meet deliverables. ',
                                }
                            ]}
                        />
                    </div>
                    <div className={styles.discoverBtn}>
                        <Button type={'ghost'} text={'Discover'} sizeName={'large'} />
                    </div>
                </div>
                <div className={styles.companiesSection}>
                    <div className={styles.companiesTitle}>Outstanding Companies</div>
                    <div className={styles.companiesSubTitle}>Each month, more than 7 billion jobseekers turn to website in their search for work</div>
                    <div className={styles.companiesImages}>
                        <img src={bounImage} alt={'image'}/>
                        <img src={bounImage} alt={'image'}/>
                        <img src={bounImage} alt={'image'}/>
                        <img src={bounImage} alt={'image'}/>
                    </div>
                </div>
                <div className={styles.browseJobsSection}>
                    <div className={styles.jobsTitle}>
                        <div>Use thousands of jobs from anywhere here</div>
                        <div className={styles.prepareCv}>Prepare your CV -></div>
                    </div>
                    <img src={workingStudentImage} alt={'image'} />
                </div>
                <div className={styles.howItWorksSection}>
                    <div className={styles.howItWorksTitle}>How It Works</div>
                    <div className={styles.howItWorksSubTitle}>
                        Each month, more than 7 billion jobseekers turn to website in their search for work,
                        making over 160,000 applications every day.
                    </div>
                    <div className={styles.divisions}>
                        <div className={styles.division}>
                            <img className={styles.icon} src={register} />
                            <div className={styles.title}>Register</div>
                            <div className={styles.description}>Create your profile, determine your interests, talk about your skills.</div>
                        </div>
                        <div className={styles.division}>
                            <img className={styles.icon} src={application} />
                            <div className={styles.title}>Application</div>
                            <div className={styles.description}>Find the best project in the industry you want to improve yourself.</div>
                        </div>
                        <div className={styles.division}>
                            <img className={styles.icon} src={duties} />
                            <div className={styles.title}>Duties</div>
                            <div className={styles.description}>After approval, review the project details and ask the project manager for questions.</div>
                        </div>
                    </div>
                </div>
                <div className={styles.internsSaysSection}></div>
                <div className={styles.packagesSection}></div>
                <div className={styles.footerSection}></div>
            </div>
        );
    }
}

export default Home;
