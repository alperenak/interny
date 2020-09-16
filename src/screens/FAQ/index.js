import React, { Component } from "react";

/*** Components ***/
import Accordion from "../../components/Accordion";

/*** Store ***/
import store from "../../store";

/*** Styles ***/
import styles from "./faq.scss";

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

  componentDidMount() {
    let response = await store.faqData();
    if (response) {
      this.setState({data: response.data})
    }
  }

  renderRightBar = () => {
    return (
      <div className={styles.questions}>
        <div className={styles.header}>Frequently Asked Questions</div>
        {dummy_data[this.state.question_type].map((data) => {
          return <Accordion title={data.question} content={data.answer} />;
        })}
      </div>
    );
  };

  renderLeftBar = () => {
    return (
      <div className={styles.sidebar}>
        <div className={styles.items}>
          <button
            className={styles.item}
            onClick={() => this.setState({ question_type: "intern" })}
          >
            FAQ for Interns
          </button>
          <button
            className={styles.item}
            onClick={() => this.setState({ question_type: "employer" })}
          >
            FAQ for Employers
          </button>
          <button
            className={styles.item}
            onClick={() => this.setState({ question_type: "university" })}
          >
            FAQ for Universities
          </button>
        </div>
      </div>
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
