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
import downloadIcon from '../../assets/download-icon.png';
import uploadIcon from '../../assets/upload-icon.png';
import FooterAlternative from "../../components/FooterAlternative";

class CVView extends Component {
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
            <div className={"cvDetail cvShow"}>
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
						<div class="col-md-12">

							<div className={styles.CVs}>
							{typeof this.state.cv.id !== "undefined" ? (
								<CV
									file={this.state.cv}
									getCVs={this.getCVs}
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

export default CVView;
