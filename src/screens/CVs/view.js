import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
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
		sections:[],
		height:0,
		width: 0,
    };

    async componentDidMount() {
        await this.getCVs();
		await this.getCVList();
		if(this.props.match.params.download === "download"){
			const height = this.cvID.clientHeight;
			const width = this.cvID.clientHeight;
			this.setState({ height: height, width: width, avatar: "none"});
			await this.downloadCV(this.state.cv.title, height, width);
		}
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
	downloadCV = async (title, height, width) => {
		console.log("download clicked")
		// var HTML_Width = width/3;
		// var HTML_Height = height
		var HTML_Width = width;
		var HTML_Height = height * 3
		console.log("aaa", HTML_Width+"  "+HTML_Height);

		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		console.log("bbbb", PDF_Width+"  "+PDF_Height);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;

		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		console.log("cccc", totalPDFPages)

		html2canvas(document.getElementsByClassName("cvDetail cvShow")[0],{scale: 3, allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');

			console.log("dddd", canvas.width+"  "+canvas.height);

			//[PDF_Width, PDF_Height]
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
			pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


			for (var i = 1; i <= totalPDFPages; i++) {
				pdf.addPage();
				pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}

			pdf.save("my_cv");
		});
    };
	// renderProgressBar(){
	// 	const divs = [];
	// 	for (var i = 1; i <= this.state.cv.total; i++) {
	// 		if(i <= this.state.cv.completeness){
	// 			divs.push(
	// 				<div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"14.1%","background-color":"#f69f1e"}}></div>
	// 			);
	// 		}else{
	// 			divs.push(
	// 				<div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"14.1%","background-color":"#dfe2f3"}}></div>
	// 			);
	// 		}
	// 	}
	// 	return divs;
	// }
    render() {
        let { user } = this.props;
        let { sections, processing } = this.state;
		const self = this;
        return (
			<>
            <div className={"cvDetail cvShow"} id = "download"
				ref={ (cv) => { this.cvID = cv } }
			>
                {processing && <LoadingModal text="Loading" />}
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div v-if={this.props.match.params.download != "download"} class="cvTitle">{this.state.cv.title}</div>
							<div className={"cvDetail__profileSection"}>
								<Card
									type={'profile'}
									getUser={this.props.getUser}
									profileObject={{
										avatar: this.state.avatar || user.avatar,
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
