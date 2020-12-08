import React, { Component } from 'react';
/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import Form from "../../components/Form";
import CV from "../../components/CV";
/*** Utils ***/
import store from '../../store';
import { getCookie } from "../../utils/cookie";
import { formButtons, formItems } from "./formItems";
import { formCVData, onCVFormChange } from "../../utils/functions";
/*** Styles ***/
import styles from './cvs.scss';
/*** Icons ***/
import addIcon from '../../icons/add-circular-outlined-white-button.svg';
import editIcon from '../../icons/note-outlined-symbol.svg';
import editIconBlue from '../../icons/note-outlined-symbol-blue.svg';
import binIcon from '../../icons/recycling-bin.svg';
import binIconBlue from '../../icons/recycling-bin-blue.svg';
import LoadingModal from '../../components/LoadingModal';

class CVs extends Component {
    state = {
        cv: {},
        processing: true
    };

    async componentDidMount() {
        await this.getCVs();
    }

    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCV(this.props.match.params.id);
        this.setState({ cv: res, processing: false });
    };
	renderProgressBar(){
		const divs = [];
		for (var i = 1; i <= this.state.cv.total; i++) {
			if(i <= this.state.cv.completeness){
				divs.push(
					<div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"14.1%","background-color":"#f69f1e"}}></div>
				);
			}else{
				divs.push(
					<div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"14.1%","background-color":"#dfe2f3"}}></div>
				);
			}
		}
		return divs;
	}
    render() {
		console.log(this.state.sections)
        let { user } = this.props;
        let { sections, processing } = this.state;
        return (
            <div className={"cvDetail"}>
                {processing && <LoadingModal text="Loading" />}
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div className={"cvDetail__profileSection"}>
								<Card
									type={'profile'}
									getUser={this.props.getUser}
									profileObject={{
										avatar: user.avatar,
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
					</div>
					<div class="row">
						<div class="col-md-8">
							<div class="progress" style={{"justify-content":"space-between","border-radius":"10px","margin-bottom":"30px"}}>
								{this.renderProgressBar()}
							</div>
							<div className={styles.CVs}>
							{typeof this.state.cv.id !== "undefined" ? (
								<CV
									file={this.state.cv}
									getCVs={this.getCVs}
								/>
							):(null)}
							</div>
						</div>
						<div class="col-md-4">
							<div class="cvRightBox">
								<div>
								<a href="#" class="cvRightBox__link">Download CV</a>
								</div>
								<div>
								<a href="#" class="cvRightBox__link">Share CV</a>
								</div>
								<div>
								<a href="#" class="cvRightBox__link">Delete CV</a>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        );
    }
}

export default CVs;
