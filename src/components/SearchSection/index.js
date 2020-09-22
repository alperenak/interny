import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Input from "../../components/Input";

/*** Styles ***/
import styles from "./searchSection.scss";

/*** Icons ***/
import searchIcon from "../../icons/colorfulSearch.svg";
import locationIcon from "../../icons/colorfulLocation.svg";
import closeIcon from "../../icons/close-outline.svg";

/*** Store ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";

class SearchSection extends Component {
  state = {
    keyword: "",
    location: "",
    searches: [
      "Manchester",
      "London",
      "Oxford",
      "Newcastle",
      "Birmingham",
      "Norwich",
      "Bath",
      "Bristol",
    ],
    advancedSearch: false,
    advanced_keyword: "",
    advanced_industry: "",
    advanced_location: "",
    advanced_country: "",
    advanced_city: "",
    advanced_employee: { min: 0, max: 0 },
    advanced_intern_type: "",
    advanced_duration: "",
    advanced_intern_quota: { min: 0, max: 0 },
    advanced_rate: { min: 0, max: 0 },
    advanced_search_processing: false,
  };

  componentDidMount() {
    let { defaultKeyword, defaultLocation } = this.props;
    this.setState({ keyword: defaultKeyword, location: defaultLocation });
  }

  componentDidUpdate(prevProps) {
    let { defaultKeyword, defaultLocation } = this.props;
    if (!Object.is(prevProps.defaultKeyword, defaultKeyword)) {
      this.setState({ keyword: defaultKeyword });
    }
    if (!Object.is(prevProps.defaultLocation, defaultLocation)) {
      this.setState({ location: defaultLocation });
    }
  }

  renderAdvancedSearch = () => {
    let {
      advanced_keyword,
      advanced_location,
      advanced_country,
      advanced_city,
      advanced_employee,
      advanced_intern_type,
      advanced_duration,
      advanced_intern_quota,
      advanced_rate,
      advanced_industry,
    } = this.props;
    return (
      <div
        className={styles.advancedSearchDropdown}
        onClick={() => {
          this.setState({ advancedSearch: false });
        }}
      >
        <div
          className={styles.advancedSearchDropdown__inputs}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            style={{ paddingBottom: "50px" }}
            className={styles.hidden_mobile}
          ></div>
          <div
            style={{ paddingBottom: "50px" }}
            className={styles.hidden_mobile}
          ></div>

          <div
            className={`${styles.only_mobile} ${styles.close_icon}`}
            onClick={() => {
              this.setState({ advancedSearch: false });
            }}
          >
            {" "}
            <img src={closeIcon} alt="" />{" "}
          </div>

          <Input
            type={"text"}
            placeholder={"Software Developer"}
            size={"half"}
            labelDescription={"Position, keyword or company"}
            defaultValue={advanced_keyword !== "null" ? advanced_keyword : ""}
            onChange={(value) => this.setState({ advanced_keyword: value })}
            label={"Keyword"}
          />

          <Input
            type={"text"}
            placeholder={"Software Developer"}
            size={"half"}
            labelDescription={"Enter a location"}
            defaultValue={advanced_location !== "null" ? advanced_location : ""}
            onChange={(value) => this.setState({ advanced_location: value })}
            label={"Location"}
          />

          <Input
            type={"text"}
            placeholder={"Turkey"}
            size={"half"}
            labelDescription={"Enter a country"}
            defaultValue={advanced_country !== "null" ? advanced_country : ""}
            onChange={(value) => this.setState({ advanced_country: value })}
            label={"Country"}
          />

          <Input
            type={"text"}
            placeholder={"Istanbul"}
            size={"half"}
            labelDescription={"Enter a city"}
            defaultValue={advanced_city !== "null" ? advanced_city : ""}
            onChange={(value) => this.setState({ advanced_city: value })}
            label={"City"}
          />

          <Input
            type={"text"}
            placeholder={"Tech."}
            size={"half"}
            labelDescription={"Enter an industry"}
            defaultValue={advanced_industry !== "null" ? advanced_industry : ""}
            onChange={(value) => {
              this.setState({ advanced_industry: value });
            }}
            label={"Industry"}
          />

          <div className={styles["advancedSearch__two-inputs-wrapper"]}>
            <label htmlFor="advanced_employee_min">Employee Number</label>{" "}
            <div className={styles["advancedSearch__two-inputs"]}>
              <div className={styles["advancedSearch__input-wrapper"]}>
                <div className={styles["advancedSearch__description"]}>Min</div>
                <div className={styles["advancedSearch__input"]}>
                  <input
                    name="advanced_employee_min"
                    placeholder="Min. Employee"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({
                        advanced_employee: {
                          min: e.target.value,
                          max: this.state.advanced_employee.max,
                        },
                      });
                    }}
                    value={this.state.advanced_employee.min}
                  />
                </div>
              </div>

              <div className={styles["advancedSearch__input-wrapper"]}>
                <div className={styles["advancedSearch__description"]}>Max</div>
                <div className={styles["advancedSearch__input"]}>
                  <input
                    name="advanced_employee_max"
                    placeholder="Max. Employee"
                    onChange={(e) => {
                      console.log(e);
                      e.preventDefault();
                      this.setState({
                        advanced_employee: {
                          min: this.state.advanced_employee.min,
                          max: e.target.value,
                        },
                      });

                      console.log(this.state.advanced_employee);
                    }}
                    value={this.state.advanced_employee.max}
                  />
                </div>
              </div>
            </div>
          </div>

          <Input
            type={"select"}
            label={"Intern Type"}
            labelDescription={"Choose one below"}
            defaultValue={
              advanced_intern_type !== "null" ? advanced_intern_type : ""
            }
            onChange={(value, slValue) => {
              this.setState({ advanced_intern_type: slValue.value });
            }}
            placeholder={'Select intern type'}
            externalSource={[
              { key: "Student", value: "Student", selected: true },
              { key: "Newly Graduated", value: "Newly Graduated" },
            ]}
          />

          <Input
            type={"select"}
            label={"Duration"}
            labelDescription={"Choose one below"}
            defaultValue={advanced_duration !== "null" ? advanced_duration : ""}
            placeholder={'Select duration'}
            onChange={(value, slValue) =>
              this.setState({ advanced_duration: slValue.value })
            }
            externalSource={[
              { key: "4 weeks", value: "4 weeks" },
              { key: "5 weeks", value: "5 weeks" },
              { key: "6 weeks", value: "6 weeks" },
              { key: "7 weeks", value: "7 weeks" },
              { key: "8 weeks", value: "8 weeks" },
              { key: "9 weeks", value: "9 weeks" },
              { key: "10 weeks", value: "10 weeks" },
              { key: "11 weeks", value: "11 weeks" },
              { key: "12 weeks", value: "12 weeks" },
            ]}
          />

          <div className={styles["advancedSearch__two-inputs-wrapper"]}>
            <label htmlFor="advanced_intern_quota">Intern Quota</label>{" "}
            <div className={styles["advancedSearch__two-inputs"]}>
              <div className={styles["advancedSearch__input-wrapper"]}>
                <div className={styles["advancedSearch__description"]}>Min</div>
                <div className={styles["advancedSearch__input"]}>
                  <input
                    name="advanced_intern_quota"
                    placeholder="Minimum"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({
                        advanced_intern_quota: {
                          min: e.target.value,
                          max: this.state.advanced_intern_quota.max,
                        },
                      });
                    }}
                    value={this.state.advanced_intern_quota.min}
                  />
                </div>
              </div>

              <div className={styles["advancedSearch__input-wrapper"]}>
                <div className={styles["advancedSearch__description"]}>Max</div>
                <div className={styles["advancedSearch__input"]}>
                  <input
                    name="advanced_intern_quota"
                    placeholder="Maximum"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({
                        advanced_intern_quota: {
                          min: this.state.advanced_intern_quota.min,
                          max: e.target.value,
                        },
                      });
                    }}
                    value={this.state.advanced_intern_quota.max}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles["advancedSearch__two-inputs-wrapper"]}>
            <label htmlFor="advanced_rate">Rate</label>{" "}
            <div className={styles["advancedSearch__two-inputs"]}>
              <div className={styles["advancedSearch__input-wrapper"]}>
                <div className={styles["advancedSearch__description"]}>Min</div>
                <div className={styles["advancedSearch__input"]}>
                  <input
                    name="advanced_rate"
                    placeholder="Minimum"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({
                        advanced_rate: {
                          min: e.target.value,
                          max: this.state.advanced_rate.max,
                        },
                      });
                    }}
                    value={this.state.advanced_rate.min}
                  />
                </div>
              </div>

              <div className={styles["advancedSearch__input-wrapper"]}>
                <div className={styles["advancedSearch__description"]}>Max</div>
                <div className={styles["advancedSearch__input"]}>
                  <input
                    name="advanced_rate"
                    placeholder="Maximum"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({
                        advanced_rate: {
                          max: e.target.value,
                          min: this.state.advanced_rate.min,
                        },
                      });

                      console.log(this.state.advanced_rate);
                    }}
                    value={this.state.advanced_rate.max}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles["advancedSearch__send-button"]}>
            <Button
              type={"secondary"}
              text={"Find Internship"}
              sizeName={"large"}
              loading={this.state.advanced_search_processing}
              onButtonClick={async () => {
                this.setState({ advanced_search_processing: true });
                let payload = {
                  keyword: this.state.advanced_keyword,
                  location: this.state.advanced_location,
                  country: this.state.advanced_country,
                  city: this.state.advanced_city,
                  employee_min: this.state.advanced_employee.min,
                  employee_max: this.state.advanced_employee.max,
                  intern_type: this.state.advanced_intern_type,
                  duration: this.state.advanced_duration,
                  intern_quota_min: this.state.advanced_intern_quota.min,
                  intern_quota_max: this.state.advanced_intern_quota.max,
                  rate_min: this.state.advanced_rate.min,
                  rate_max: this.state.advanced_rate.max,
                  industry: this.state.advanced_industry,
                };

                let response = await store.advancedSearch(payload);

                if (response)
                  this.setState({
                    advancedSearch: false,
                    advanced_search_processing: false,
                  });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { keyword, location } = this.state;

    return (
      <div
        className={`${styles.searchSection} ${
          this.props.page === "home" && styles.backgroundImage
        }`}
      >
        <div v-if={this.props.page === "home"} className={styles.slogan}>
          The <span style={{color: '#f97050'}}>Easiest</span> Way to Get Your <span style={{color: '#696cff'}}>New Internship</span>
        </div>
        <div v-if={this.props.page === "home"} className={styles.subSlogan}>
          Find the career you deserve
        </div>
        <div className={styles.searchBars}>
          <div className={styles.keyword}>
            <Input
              type={"text"}
              placeholder={"Software Developer"}
              size={"responsive"}
              icon={{ src: searchIcon, position: "right" }}
              labelDescription={"Enter position name, keyword or company name"}
              defaultValue={keyword !== "null" ? keyword : ""}
              onChange={(value) => this.setState({ keyword: value })}
              label={"Keyword"}
            />
          </div>
          <div className={styles.location}>
            <Input
              type={"text"}
              placeholder={"Istanbul, Turkey"}
              size={"responsive"}
              icon={{ src: locationIcon, position: "right" }}
              labelDescription={"Enter city name, country or state name"}
              defaultValue={location !== "null" ? location : ""}
              onChange={(value) => this.setState({ location: value })}
              label={"Location"}
            />
          </div>
          <div className={styles.findJob}>
            <Button
              type={"secondary"}
              text={"Find Internship"}
              sizeName={"large"}
              to={`/search/${keyword ? keyword : null}/${
                location ? location : null
              }`}
            />
          </div>
        </div>

        <div v-if={getCookie('token')} className={styles["advancedSearch"]}>
          <Button
              text={'Advanced Search'}
              type={'ghost'}
              onButtonClick={(e) => {
                e.preventDefault();
                this.setState({ advancedSearch: true });
              }}
          />
          {this.state.advancedSearch && this.renderAdvancedSearch()}
        </div>

        <div v-if={this.props.page === "home"} className={styles.prepareCv}>
          <Link to={"SignUp"} className={styles.underlined}>
            Prepare your CVs
          </Link>{" "}
          - Easily apply to thousands of jobs from anywhere
        </div>
        <Fragment v-else>
          <ul className={styles.searches}>
            {this.state.searches.map((searchedWord, i) => {
              return (
                <Link
                  to={`/search/${keyword ? keyword : null}/${searchedWord}`}
                  key={"searchedWord" + i}
                  className={styles.searchedWord}
                >
                  {searchedWord}
                </Link>
              );
            })}
          </ul>
        </Fragment>
      </div>
    );
  }
}

export default SearchSection;
