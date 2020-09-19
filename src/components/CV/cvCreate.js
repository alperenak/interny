import React, { Component } from 'react';
import Card from "../Card";
import { default as ProfileSection } from './sub-components/ProfileSection/editForm';
import { default as Experiences } from './sub-components/Experiences/editForm';
import { default as Education } from './sub-components/Education/editForm';
import { default as Skills } from './sub-components/Skills/editForm';
import { default as Languages } from './sub-components/Languages/editForm';
import { default as Certificates } from './sub-components/Certificates/editForm';
import Button from "../Button";
import styles from './cvcreate.scss';
import store from "../../store";
import { getCookie } from "../../utils/cookie";

class CvCreate extends Component {
    state = {
        page: 0,
        title: '',
        summary: '',
        cv: {},
        processing: false
    };

    onChange = (value, key) => {
        this.setState({ [key]: value });
    };

    render() {
        let { page, cv } = this.state;
        return (
            <div id={'cv-create'} className={styles.CvCreate}>
                <div className={styles.title}>
                    <div>
                        {page === 0 && 'Create a CV'}
                        {page === 1 && 'Experiences'}
                        {page === 2 && 'Education'}
                        {page === 3 && 'Language'}
                    </div>
                    <div className={styles.page}>step {page + 1}/4</div>
                </div>
                <Card>
                    <div hidden={page !== 3}><Languages cv_id={cv.id} object={cv.languages} type={'create'} /></div>
                    <div hidden={page !== 2}><Education cv_id={cv.id} object={cv.education} type={'create'} /></div>
                    <div hidden={page !== 1}><Experiences cv_id={cv.id} object={cv.experiences} type={'create'} /></div>
                    <div hidden={page !== 0}><ProfileSection object={cv} type={'create'} onChange={this.onChange} /></div>
                </Card>
                <div className={styles.buttonContainer}>
                    <Button
                        type={'primary'}
                        text={page === 3 ? 'Create CV' : 'Next'}
                        loading={this.state.processing}
                        onButtonClick={async () => {
                            if (page === 0) {
                                let res = await store.createCV(
                                    {
                                        title: this.state.title,
                                        summary: this.state.summary,
                                        intern: getCookie('user_id')
                                    }
                                );
                                this.setState({ page: page + 1, cv: res.data });
                            } else if (page === 3) {
                                this.setState({ processing: true })
                                window.location.pathname = '/CVs';
                            } else {
                                this.setState({ page: page + 1 });
                            }
                        }}
                    />
                    <Button
                        v-if={page !== 0 && page !== 1}
                        type={'link'}
                        text={'Previous'}
                        onButtonClick={() => {
                            this.setState({ page: page !== 0 ? page - 1 : 0 });
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default CvCreate;
