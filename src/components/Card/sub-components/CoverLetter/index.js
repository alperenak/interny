import React, { Component } from "react";

/*** Components ***/
import Input from "../../../Input";
import Button from "../../../Button";
import CKEditor from "react-ckeditor-component";
/*** Icons ***/
import downArrow from "../../../../icons/chevron-down-outline.svg";

/*** Styles ***/
import styles from "./coverletter.scss";

class CoverLetter extends Component {
  state = {
    editMode: false,
    accordion_opened: "",
    header: {
      text: "Cover Letter",
      position: "center",
    },
    buttons: [
      {
        disabled: false,
        sizeName: "default",
        text: "DELETE",
        type: "ghost",
        onButtonClick: async () => {
          this.setState({ editMode: false })
          await this.props.onDelete();
        }
      },
      {
        disabled: false,
        sizeName: "default",
        text: "SAVE",
        type: "secondary",
        onButtonClick: async () => {
          await this.props.onSubmit();
          this.setState({ editMode: false });
        },
      },
    ],
  };

  onClickAccordionOpener = () => {
    this.setState({
      accordion_opened: this.state.accordion_opened == "" ? "active" : "",
      editMode:
        this.state.accordion_opened && this.state.editMode ? true : false,
    });
  };

  onClickEditButton = () => {
    this.setState({ editMode: true });
  };

  renderEditMode = () => {
    let { coverLetter, showButtons, onChange, disabled } = this.props;
    let { buttons } = this.state;
    return (
      <>
		<CKEditor
			activeClass="p10"
			content={coverLetter?.text}
			events={{
				"change": onChange
			}}
		/>
        <div v-if={showButtons} className={"buttonContainer"}>
          <Button
            v-for={(btn, i) in buttons}
            key={i}
            type={btn.type}
            disabled={btn.disabled}
            sizeName={btn.sizeName}
            text={btn.text}
            onButtonClick={btn.onButtonClick}
          />
        </div>
      </>
    );
  };

  renderEditSection = () => {
    return (
      <div className={"editSection"}>
        <div dangerouslySetInnerHTML={{ __html: this.props.coverLetter?.text }} />
        <Button
          type={"secondary"}
          disabled={false}
          sizeName={"default"}
          text={"Edit"}
          onButtonClick={this.onClickEditButton}
        />
      </div>
    );
  };

	render() {
		return (
			<div className={`${"coverLetterWrapper"}`}>
				<div
				className={`${"accordion_wrapper"} ${this.state.accordion_opened}`}
				>
					{this.state.editMode
					? this.renderEditMode()
					: this.renderEditSection()}
				</div>
				<div
				className={`${"accordion_button"} `}
				onClick={this.onClickAccordionOpener}
				>
					<img
						className={`${this.state.accordion_opened}`}
						src={downArrow}
						alt=""
					/>
				</div>
			</div>
		);
	}
}

export default CoverLetter;
