import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";

/*** Styles ***/
import styles from './home.scss';

/*** Icons ***/
import chaseBroke from '../../assets/chaseBroke.png';
import internyLogo from '../../assets/interny-logo.png';
import steveAustin from '../../assets/steveAustin.png';
import georgeBurgess from '../../assets/georgeBurgess.png';
import siemens from '../../assets/siemens.png';
import nanodems from '../../assets/nanodems.png';
import fikrimuhal from '../../assets/Fikrimuhal.png';
import vodafoneImage from '../../assets/vodafone.png';
import allianzImage from '../../assets/allianz.png';
import ingBankImage from '../../assets/ing-bank.png';
import unileverImage from '../../assets/unilever.png';
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
                <SearchSection page={'userHome'} />
                <div className={styles.popularSearchSection}>
                    <div className={styles.popularSearchTitle}>Popular Searches</div>
                    <ul className={styles.cities}>
                        {this.state.cities.map((city, i) => {
                            return <li key={'city'+i} className={styles.city}>{city}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.postsSection}>
                    <div className={styles.postsTitle}>Find an Internship and Advance Your Career</div>
                    <div className={styles.postsSubTitle}>Each month, thousands of students get career opportunities via Interny</div>
                    <div className={styles.cards}>
                        <Card
                            v-for={(item, i) in items}
                            type={'jobPost'}
                            key={i}
                            posts={[
                                {
                                    date:'30 days ago',
                                    header: i === 0 ? 'Siemens AG' : (i === 1 ? 'Nanodems Corp.' : 'Fikrimuhal'),
                                    company:'Software Development Engineer',
                                    image: i === 0 ? siemens : (i === 1 ? nanodems : fikrimuhal),
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
                        <Button to={'/Posts'} type={'ghost'} text={'Discover'} sizeName={'large'} />
                    </div>
                </div>
                <div className={styles.companiesSection}>
                    <div className={styles.companiesTitle}>Outstanding Companies</div>
                    <div className={styles.companiesSubTitle}>Each month, more than 7 billion jobseekers turn to website in their search for work</div>
                    <div className={styles.companiesImages}>
                        <img height={38} src={ingBankImage} alt={'image'}/>
                        <img height={65} src={unileverImage} alt={'image'}/>
                        <img height={35} src={allianzImage} alt={'image'}/>
                        <img height={62} src={vodafoneImage} alt={'image'}/>
                    </div>
                </div>
                <div className={styles.browseJobsSection}>
                    <div className={styles.jobsTitle}>
                        <div>Use thousands of jobs from anywhere here</div>
                        <Link to={'signUp'} className={styles.prepareCv}>Prepare your CV -></Link>
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
                <div className={styles.internsSaysSection}>
                    <div className={styles.internsSaysTitle}>What Interns Says About Us</div>
                    <div className={styles.internsSaysSubTitle}>Thousands of students and graduates found new jobs they deserve thanks to Interny</div>
                    <div className={styles.internsSaysImages}>
                        <img height={297} src={steveAustin} alt={'image'}/>
                        <img height={296} className={styles.shadowed} src={chaseBroke} alt={'image'}/>
                        <img height={297} src={georgeBurgess} alt={'image'}/>
                    </div>
                </div>
                <div id={'packages-section'} className={styles.packagesSection}>
                    <div className={styles.packagesTitle}>See Our Internship Packages</div>
                    <div className={styles.packagesSubTitle}>Click to see our all packages</div>
                    <div className={styles.packagesCards}>
                        <Card>
                            <div className={styles.packageCard}>
                                <div className={styles.headerDiv}>
                                    <div className={styles.packageTitle}>Bronze Pack</div>
                                    <div className={styles.packagePrice}>$40.00</div>
                                    <div className={styles.packagePaymentDate}>Per Month</div>
                                </div>
                                <div className={styles.stroke} />
                                <div className={styles.descriptionDiv}>
                                    <div className={styles.packageDescription}>
                                        Apply to 20 days Internships Premium Support 24/7
                                    </div>
                                    <Button type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                                </div>
                            </div>
                        </Card>
                        <div className={styles.frontier}>
                            <Card>
                                <div className={styles.packageCard}>
                                    <div className={styles.headerDiv}>
                                        <div className={styles.packageTitle}>Gold Pack</div>
                                        <div className={styles.packagePrice}>$85.00</div>
                                        <div className={styles.packagePaymentDate}>Per Month</div>
                                    </div>
                                    <div className={styles.stroke} />
                                    <div className={styles.descriptionDiv}>
                                        <div className={styles.packageDescription}>
                                            Apply to 20-30-60 days Internships Consult Career Planning Specialist Premium Support 24/7
                                        </div>
                                        <Button type={'primary'} text={'Buy Now'} sizeName={'default'} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card>
                            <div className={styles.packageCard}>
                                <div className={styles.headerDiv}>
                                    <div className={styles.packageTitle}>Silver Pack</div>
                                    <div className={styles.packagePrice}>$50.00</div>
                                    <div className={styles.packagePaymentDate}>Per Month</div>
                                </div>
                                <div className={styles.stroke} />
                                <div className={styles.descriptionDiv}>
                                    <div className={styles.packageDescription}>
                                        Apply to 20-30 days Internships Premium Support 24/7
                                    </div>
                                    <Button type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className={styles.footerSection}>
                    <div className={styles.footerTop}>
                        <div className={styles.companyDescription}>
                            <img src={internyLogo}/>
                            <div className={styles.description}>
                                Provides a full online service for anyone looking for a new internship.
                                We are not a recruitment agency, we are job site.
                            </div>
                        </div>
                        <div className={styles.options}>
                            <div className={styles.knowUs}>
                                <div className={styles.header}>Know Us</div>
                                <ul>
                                    <li>Register</li>
                                    <li>About Us</li>
                                    <li>FAQ's</li>
                                    <li>Terms and Policies</li>
                                    <li>Privacy Policy</li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                            <div className={styles.followUs}>
                                <div className={styles.header}>Follow Us</div>
                                <ul>
                                    <li>Facebook</li>
                                    <li>Twitter</li>
                                    <li>Linkedin</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.stroke} />
                    <div className={styles.rights}>
                        2020 • Intern Academy © All rights reserved.
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
