import React, {Component, Fragment} from "react";

/*** Components ***/
import Accordion from "../../components/Accordion";

/*** Store ***/
import store from "../../store";

/*** Styles ***/
import styles from "./faq.scss";
import Card from "../../components/Card";

let dummy_data = {
  intern: [
    { question: "Intern Question 1", answer: "Answer 1" },
    { question: "Intern Question 2", answer: "Answer 2" },
    { question: "Intern Question 3", answer: "Answer 3" },
    { question: "Intern Question 4", answer: "Answer 4" },
    { question: "Intern Question 5", answer: "Answer 5" },
  ],
  employer: [
    { question: "Employer Question 1", answer: "Answer 1" },
    { question: "Employer Question 2", answer: "Answer 2" },
    { question: "Employer Question 3", answer: "Answer 3" },
    { question: "Employer Question 4", answer: "Answer 4" },
    { question: "Employer Question 5", answer: "Answer 5" },
  ],
  university: [
    { question: "University Question 1", answer: "Answer 1" },
    { question: "University Question 2", answer: "Answer 2" },
    { question: "University Question 3", answer: "Answer 3" },
    { question: "University Question 4", answer: "Answer 4" },
    { question: "University Question 5", answer: "Answer 5" },
  ],
};

class FAQ extends Component {
  state = { question_type: "intern", data: {} };

  componentDidMount = async () => {
    let response = await store.faqData();
    if (response) {
      this.setState({ data: response.data });
    }
  };

  renderRightBar = () => {
    return (
      <div className={styles.questions}>
        <Card>
          {dummy_data[this.state.question_type].map((data) => {
            return <Accordion title={data.question} content={data.answer} />;
          })}
        </Card>
      </div>
    );
  };

  renderLeftBar = () => {
    let {question_type} = this.state;
    return (
      <Card type={'list'} externalData={[
        {
          key: 'FAQ for Interns',
          value: 'FAQ for Interns',
          selected: question_type === 'intern',
          onChange: () => this.setState({ question_type: "intern" })
        },
        {
          key: 'FAQ for Employers',
          value: 'FAQ for Employers',
          selected: question_type === 'employer',
          onChange: () => this.setState({ question_type: "employer" })
        },
        {
          key: 'FAQ for Universities',
          value: 'FAQ for Universities',
          selected: question_type === 'university',
          onChange: () => this.setState({ question_type: "university" })
        }
      ]}/>
    );
  };

  render() {
    return (
      <div className={styles.faq_container}>
        {this.renderLeftBar()}
        {this.renderRightBar()}
      </div>
    );
  }
}

export default FAQ;
