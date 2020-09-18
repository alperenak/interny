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
                                    Apply to 4-Week Internships, Local/Global Applications, Project Management Tool
                                </div>
                                <Button type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                            </div>
                        </div>
                    </Card>
                    <div className={styles.frontier}>
                        <Card type={'pricing'}>
                            <div className={styles.packageCard}>
                                <div className={styles.headerDiv}>
                                    <div className={styles.packageTitle}>WFA</div>
                                    <div className={styles.packagePrice}>$14,99</div>
                                    <div className={styles.packagePaymentDate}>Per Month</div>
                                </div>
                                <div className={styles.stroke} />
                                <div className={styles.descriptionDiv}>
                                    <div className={styles.packageDescription}>
                                        Apply to 8/12-Week Internships, Video-CV, WFA Report, Certification, Freemium Features
                                    </div>
                                    <Button type={'primary'} text={'Buy Now'} sizeName={'default'} />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <Card type={'pricing'}>
                        <div className={styles.packageCard}>
                            <div className={styles.headerDiv}>
                                <div className={styles.packageTitle}>COM </div>
                                <div className={styles.packagePrice}>$9.99</div>
                                <div className={styles.packagePaymentDate}>Per Month</div>
                            </div>
                            <div className={styles.stroke} />
                            <div className={styles.descriptionDiv}>
                                <div className={styles.packageDescription}>
                                    Apply to Competence Scaling, Competence Evaluation, Additional Report
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
