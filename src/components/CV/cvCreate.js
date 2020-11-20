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

import { Line } from 'rc-progress';

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
	renderProgressBar(page){
		const divs = [];
		for (var i = 0; i <= 3; i++) {
			if(i <= page){
				divs.push(
					<div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"25%","background-color":"#f69f1e"}}></div>
				);
			}else{
				divs.push(
					<div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"25%","background-color":"#dfe2f3"}}></div>
				);
			}
		}
		return divs;
	}
    render() {
        let { page, cv } = this.state;
        return (
            <div id={'cv-create'} className={"cvCreate"}>
				<div class="container">

					<div className={"cvCreate__title"}>
	                    <div>
	                        {page === 0 && 'Create a CV'}
	                        {page === 1 && 'Experiences'}
	                        {page === 2 && 'Education'}
	                        {page === 3 && 'Language'}
	                    </div>
	                    {/* <div className={styles.page}>step {page + 1}/4</div> */}

	                </div>
					<div class="row">
						<div class="col-md-12">
							<div class="progress" style={{"justify-content":"space-between","border-radius":"10px","margin-bottom":"30px"}}>
								{this.renderProgressBar(page)}
							</div>
						</div>
					</div>
					<Card>
						<div hidden={page !== 3}><Languages cv_id={cv.id} object={cv.languages} type={'create'} /></div>
						<div hidden={page !== 2}><Education cv_id={cv.id} object={cv.education} type={'create'} /></div>
						<div hidden={page !== 1}><Experiences cv_id={cv.id} object={cv.experiences} type={'create'} /></div>
						<div hidden={page !== 0}><ProfileSection object={cv} type={'create'} onChange={this.onChange} /></div>
					</Card>
					<div class="row">

						<div class="col-md-12">
							<div className={"cvCreate__buttonContainer"}>
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
			                        type={'secondary'}
			                        text={'Previous'}

			                        onButtonClick={() => {
			                            this.setState({ page: page !== 0 ? page - 1 : 0 });
			                        }}
			                    />
			                </div>
						</div>
					</div>


				</div>
            </div>
        );
    }
}

export default CvCreate;
