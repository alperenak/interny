import React, {Component} from 'react';
import styles from "./packages.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";

class Packages extends Component {
    render() {
        return (
            <div id={'packages-section'} className={styles.packagesSection}>
                <div className={styles.packagesCards}>
                    <Card type={'pricing'}>
                        <div className={styles.packageCard}>
                            <div className={styles.headerDiv}>
                                <div className={styles.packageTitle}>FREEMIUM</div>
                                <div className={styles.packagePrice}>$0.00</div>
                                <div className={styles.packagePaymentDate}>Per Month</div>
                            </div>
                            <div className={styles.stroke} />
                            <div className={styles.descriptionDiv}>
                                <div className={styles.packageDescription}>
                                    <div>Sign up!</div>
                                    <div>Create CV</div>
                                    <div>Search Internships</div>
                                </div>
                                <Button type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                            </div>
                        </div>
                    </Card>
                    <div className={styles.frontier}>
                        <Card type={'pricing'}>
                            <div className={styles.packageCard}>
                                <div className={styles.headerDiv}>
                                    <div className={styles.packageTitle}>INTERN</div>
                                    <div className={styles.packagePrice}>$19,99</div>
                                    <div className={styles.packagePaymentDate}>Per Month</div>
                                </div>
                                <div className={styles.stroke} />
                                <div className={styles.descriptionDiv}>
                                    <div className={styles.packageDescription}>
                                        <div>Apply for Internships</div>
                                        <div>PMS</div>
                                        <div>WFA Report</div>
                                        <div>Reference Letter</div>
                                    </div>
                                    <Button type={'primary'} text={'Buy Now'} sizeName={'default'} />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <Card type={'pricing'}>
                        <div className={styles.packageCard}>
                            <div className={styles.headerDiv}>
                                <div className={styles.packageTitle}>COMPETENCY</div>
                                <div className={styles.packagePrice}>$9.99</div>
                                <div className={styles.packagePaymentDate}>Per Month</div>
                            </div>
                            <div className={styles.stroke} />
                            <div className={styles.descriptionDiv}>
                                <div className={styles.packageDescription}>
                                    <div>Case Studies</div>
                                    <div>Competency Analytics</div>
                                    <div>Competency Report</div>
                                </div>
                                <Button type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Packages;
