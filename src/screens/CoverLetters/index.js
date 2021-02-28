import React, { Component, Fragment } from "react";

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import SearchSection from "../../components/SearchSection";
import LoadingModal from '../../components/LoadingModal'
import CKEditor from "react-ckeditor-component";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./coverletters.scss";

/*** Icons ***/
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import Input from "../../components/Input";
import FooterAlternative from "../../components/FooterAlternative";

class CoverLetters extends Component {
  state = {
    coverLetters: [],
	content: 'content',

    newLetter: {
      title: "",
      text: "",
    },
    processing: true
  };


   onBlur(evt){
	 console.log("onBlur event called with event info: ", evt);
   }

   afterPaste(evt){
	 console.log("afterPaste event called with event info: ", evt);
   }
  updateContent(newContent) {
	 this.setState({
		 content: newContent
	 })
 }
  async componentDidMount() {
    let response = await this.getCoverLetters();

    if (response) {
      this.setState({ processing: false })

    }
  }

  getCoverLetters = async () => {
    let id = getCookie("user_id");
    let res = await store.getCoverLetters(id);
    let coverLetters = res.map((cl) => {
      return {
        id: cl._id,
        title: cl.title,
        text: cl.text,
      };
    });

    this.setState({ coverLetters });
    return res;
  };
  onChange = (evt) =>{
	  console.log("onChange fired with event info: ", evt);
	  var newContent = evt.editor.getData();
	  console.log(newContent);
	  this.setState((state) => {
		  state.newLetter.text = newContent;
		  return state;
		});
  };
  renderModalButtons = () => [
    {
      type: "ghost",
      text: "Cancel",
      sizeName: "default",
      onButtonClick: () => this.props.closeModal(),
    },
    {
      type: "primary",
      text: "Create",
      sizeName: "default",
      loading: this.state.create_processing,
      onButtonClick: async () => {
        this.setState({ create_processing: true })

        await store.createCoverLetter(
          getCookie("user_id"),
          this.state.newLetter
        );

        let response = await this.getCoverLetters();
        console.log(response);
        if (response) {
          this.setState({ create_processing: false })
          if (!this.state.create_processing)
            this.props.closeModal();
        }
      },
    },
  ];

  createCoverLetter = () => {
    this.props.createModal({
      header: "Create Cover Letter",
      content: this.renderModalContent,
      buttons: this.renderModalButtons(),
    });
  };

  onCreateCoverLetterTitle = (value) => {
    this.setState((state) => {
      state.newLetter.title = value;
      return state;
    });
  };

  onCreateCoverLetter = (value) => {
    this.setState((state) => {
      state.newLetter.text = value;
      return state;
    });
  };

  onCoverLetterChange = (value, id) => {
    this.setState((state) => {
      let { coverLetters } = state;
      coverLetters.find((cl) => cl.id === id).text = value.editor.getData();
      return state;
    });
  };

  onEditSubmit = async (id) => {
    let { coverLetters } = this.state;
    let coverLetter = coverLetters.find((cl) => cl.id === id);
    await store.updateCoverLetter(getCookie("user_id"), coverLetter);
  };

  onCoverLetterDelete = async (id) => {
    await store.deleteCoverLetter(getCookie("user_id"), id);
    await this.getCoverLetters();
  };

	renderModalContent = () => {
		return (
			<Fragment>
				<Input
				type={"text"}
				size={"full"}
				label={"Name your Cover Letter"}
				labelDescription={"The name will be seen only to you"}
				placeholder={"Enter name"}
				onChange={(value) => this.onCreateCoverLetterTitle(value)}
				/>
				<CKEditor
              		activeClass="p10"
              		content={this.state.newLetter.text}
              		events={{
                		"blur": this.onBlur,
                		"afterPaste": this.afterPaste,
                		"change": this.onChange
              		}}
             	/>
			</Fragment>
		);
	};

	render() {
		let { coverLetters, processing } = this.state;
		let { user } = this.props;
		return (
			<div style={{"background-color":"#f6f8fa"}}>
				{processing && <LoadingModal text={"Loading..."} />}
				<div className={"coverLetters"}>
					<div class="container">
						<div class="row">
							<div class="col-xl-8 col-lg-8 order-xl-1  order-lg-1 order-md-2 order-sm-2 order-2">
								<div className={"coverLetters__coverLettersWrapper"}>
									<Card
										type={"coverLetter"}
										showButtons={true}
										v-for={(coverLetter, i) in coverLetters}
										header={{ text: coverLetter.title, position: "center" }}
										coverLetter={coverLetter}
										key={i}
										onChange={(value) =>
										this.onCoverLetterChange(value, coverLetter.id)
										}
										onSubmit={() => this.onEditSubmit(coverLetter.id)}
										onDelete={() => this.onCoverLetterDelete(coverLetter.id)}
										accordion={true}
									/>
									{coverLetters.length <= 0 && (
										<Card>
											You have no Cover Letter yet. <span
											className={"coverLetters__link_text"}
											onClick={this.createCoverLetter}>
											Create one?
											</span>
										</Card>
									)}
								</div>
							</div>
							<div class="col-xl-4 col-lg-4 order-xl-2 order-lg-2 order-md-1 order-sm-1 order-1">
								<div className={"coverLetters__profileSection"}>
									<Card
										type={"profile"}
										getUser={this.props.getUser}
										profileObject={{
										avatar: user.avatar,
										status: "active",
										header: `${user.name} ${user.surname}`,
										location: "Istanbul - Turkey",
										sector: "Software",
										position: "Full Time",
										education: "Graduate",
										}}
									/>
									<Button
										text={"Create new Cover Letter"}
										width={"60%"}
										icon={addIcon}
										iconPosition={"right"}
										onButtonClick={this.createCoverLetter}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FooterAlternative />
			</div>
		);
	}
}

export default CoverLetters;
