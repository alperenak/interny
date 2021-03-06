import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
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
import previewIcon from '../../icons/text-paper-sheet-symbol.svg';

import editIcon from '../../icons/note-outlined-symbol.svg';
import editIconBlue from '../../icons/note-outlined-symbol-blue.svg';
import binIcon from '../../icons/recycling-bin.svg';
import binIconBlue from '../../icons/recycling-bin-blue.svg';
import LoadingModal from '../../components/LoadingModal';
import downloadIcon from '../../assets/download-icon.png';
import uploadIcon from '../../assets/upload-icon.png';
import FooterAlternative from "../../components/FooterAlternative";

class CVs extends Component {
    state = {
        cv: {},
        processing: true,
		sections:[]
    };

    async componentDidMount() {
        await this.getCVs();
		await this.getCVList();
    }
	getCVList = async () => {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
		const self = this;
        this.setState({ sections: [...(res)], processing: false });
    };
    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCV(this.props.match.params.id);

        this.setState({ cv: res });
    };
	onDeleteSubmit = async() => {
		let id = getCookie('user_id');
		let res = await store.deleteCV(id);
		if (res) {
			this.props.history.push("/CVs");
		}
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
        let { user } = this.props;
        let { sections, processing } = this.state;
		const self = this;
        return (
			<>
            <div className={"cvDetail"}>
                {processing && <LoadingModal text="Loading" />}
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="cvTitle">{this.state.cv.title}</div>
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
							<span class="stepTitle">Complete the Details</span>
							<div class="progress" style={{"margin-top":"15px","justify-content":"space-between","border-radius":"10px","margin-bottom":"30px"}}>
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
								<div class="cvRightBox__linkWrapper">
									<div class="cvRightBox__linkInfo">

										<a href={"/CvPreview/" + this.state.cv.id + "/download"} target="_blank" class="cvRightBox__link">Download CV</a>
										<span>Last Update 30 Apr 2020</span>
									</div>
									<div class="cvRightBox__button">
										<img src={downloadIcon} width="16" height="16"/>
									</div>
								</div>
								<div class="cvRightBox__linkWrapper">
									<div class="cvRightBox__linkInfo">
										<a href="#" class="cvRightBox__link">Share CV</a>
									</div>
									<div class="cvRightBox__button">
										<img src={uploadIcon} width="16" height="16"/>
									</div>
								</div>
								<div class="cvRightBox__linkWrapper">
									<div class="cvRightBox__linkInfo">
										<a href={"/CvPreview/" + this.state.cv.id + "/p"} target="_blank" class="cvRightBox__link">Preview CV</a>
									</div>
									<div class="cvRightBox__button">
										<img src={previewIcon} width="16" height="16"/>
									</div>
								</div>
								<div class="cvRightBox__privacyWrapper" style={{"margin-top":"30px"}}>
									<span class="cvRightBox__link">
										Privacy Settings
									</span>
									<div class="cvRightBox__radio" style={{"margin-top":"30px"}}>
										<input type="radio" name="cvRadio"/><label>Open</label>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros augue
										</p>
									</div>
									<div class="cvRightBox__radio">
										<input type="radio" name="cvRadio"/><label>Close</label>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros augue
										</p>
									</div>
								</div>
								<div class="cvRightBox__privacyWrapper">
									<a onClick={() => this.onDeleteSubmit()} href="#"  className="cvRightBox__deleteLink">Delete CV</a>
								</div>
							</div>
							<div class="cvListBox">
								<h3 class="cvListBox__title">My CV's</h3>
									{this.state.sections.map(function(item,index){
										return(
											<div class="cvRightBox__linkWrapper">
												<div class="cvRightBox__linkInfo">
													{item.id == self.props.match.params.id ? (
														<a href={'/Cvdetail/' + item.id} class="cvRightBox__linkActive">{item.title}</a>
													):(
														<a href={'/Cvdetail/' + item.id} class="cvRightBox__link">{item.title}</a>
													)}

												</div>
												<div class="cvRightBox__button">
													<a href={'/Cvdetail/' + item.id}>
														<img src={editIcon} width="16" height="16"/>
													</a>
												</div>
											</div>
										);
									})}
									{this.state.sections.length < 3 ? (

										<Button
										text={'Create new CV'}

										icon={addIcon}
										iconPosition={'right'}
										to={'/cvcreate'}
									/>
									):(null)}
							</div>
						</div>
					</div>
				</div>

            </div>
			<FooterAlternative />
			</>
        );
    }
}

export default CVs;
