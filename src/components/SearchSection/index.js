import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Input from "../../components/Input";

/*** Styles ***/
import styles from "./searchSection.scss";
import homeCurve from "../../assets/home-curve.svg";
/*** Icons ***/
import searchIcon from "../../icons/colorfulSearch.svg";
import locationIcon from "../../icons/colorfulLocation.svg";
import closeIcon from "../../icons/close-outline.svg";

/*** Store ***/
import store from "../../store";
import { getCookie, setCookie } from "../../utils/cookie";

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
    tags: [],
    externalSource: [],
    dynamic: "",
    advancedSearch: false,
    advanced_keyword: "",
    advanced_industry: "",
    advanced_location: "",
    advanced_country: "",
    advanced_city: "",
    advanced_employee: {
      min: 0,
      max: 0,
    },
    advanced_intern_type: "",
    advanced_duration: "",
    advanced_intern_quota: {
      min: 0,
      max: 0,
    },
    advanced_rate: {
      min: 0,
      max: 0,
    },
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
  resetInputs() {
    this.setState({
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
      tags: [],
      externalSource: [],
      dynamic: "",
      advancedSearch: false,
      advanced_keyword: "",
      advanced_industry: "",
      advanced_location: "",
      advanced_country: "",
      advanced_city: "",
      advanced_employee: {
        min: 0,
        max: 0,
      },
      advanced_intern_type: "",
      advanced_duration: "",
      advanced_intern_quota: {
        min: 0,
        max: 0,
      },
      advanced_rate: {
        min: 0,
        max: 0,
      },
    });
    setTimeout(() => {
      this.setState({
        advancedSearch: true,
      });
    }, 10);
  }

  getTagValue(name) {
    return this.state.tags.find((item) => {
      return item.name === "keyword";
    }).value;
  }

  sendRequestTags() {
    let payload = {
      keyword: this.getTagValue("keyword"),
      location: this.getTagValue("location"),
      country: this.getTagValue("country"),
      city: this.getTagValue("city"),
      employee_min: this.getTagValue("keyword"),
      employee_max: this.getTagValue("keyword"),
      intern_type: this.getTagValue("type"),
      duration: this.getTagValue("keyword"),
      intern_quota_min: this.getTagValue("keyword"),
      intern_quota_max: this.getTagValue("keyword"),
      rate_min: this.getTagValue("keyword"),
      rate_max: this.getTagValue("keyword"),
      industry: this.getTagValue("keyword"),
    };
  }
  addTags() {
    this.setState({
      tags: [
        { name: "keyword", value: this.state.advanced_keyword },
        { name: "location", value: this.state.advanced_location },
        { name: "industry", value: this.state.advanced_industry },
        { name: "country", value: this.state.advanced_country },
        { name: "duration", value: this.state.advanced_duration },
        {
          name: "intern quota",
          value: `${this.state.advanced_intern_quota.min} - ${this.state.advanced_intern_quota.max} `,
        },
        {
          name: "Rate",
          value: `${this.state.advanced_rate.min} - ${this.state.advanced_rate.max} `,
        },
        {
          name: "employee",
          value: `${this.state.advanced_employee.min} - ${this.state.advanced_employee.max} `,
        },
        { name: "city", value: this.state.advanced_city },
        { name: "type", value: this.state.advanced_intern_type },
      ],
    });
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
  	  <div className={"advancedSearchDropdown2"} onClick={() => {this.setState({ advancedSearch: false });}}>
  		  <div className={"advancedSearchDropdown2__inputs"} onClick={(e) => {e.stopPropagation();}}>
  			  <div className={`${"only_mobile"} ${"advancedSearchDropdown2__inputs__close_icon"}`} onClick={() => {this.setState({ advancedSearch: false });}}>
  				  <img src={closeIcon} alt="" />
  			  </div>
  			  <div class="row">
  				  <div class="col-md-6">
  					  <Input
  						  id={"keyword"}
  						  type={"text"}
  						  placeholder={"Software Developer"}
  						  size={"full"}
  						  labelDescription={"Position, keyword or company"}
  						  defaultValue={
  						  this.state.advanced_keyword !== "null"
  						  ? this.state.advanced_keyword
  						  : ""
  						  }
  						  onChange={(value) => this.setState({ advanced_keyword: value })}
  						  label={"Keyword"}
  					  />
  				  </div>
  				  <div class="col-md-6">
  					  <Input
  						  id={"location"}
  						  type={"text"}
  						  placeholder={"Software Developer"}
  						  size={"full"}
  						  labelDescription={"Enter a location"}
  						  defaultValue={
  						  this.state.tagsLabeladvanced_location !== "null"
  						  ? this.stateadvanced_location
  						  : ""
  						  }
  						  onChange={(value) => this.setState({ advanced_location: value })}
  						  label={"Location"}
  					  />
  				  </div>
  			  </div>
  			  <div class="row">
  				  <div class="col-md-6">
  					  <Input
  						  id={"country"}
  						  type={"text"}
  						  placeholder={"Turkey"}
  						  size={"full"}
  						  labelDescription={"Enter a country"}
  						  defaultValue={
  						  this.state.advanced_country !== "null"
  						  ? this.state.advanced_country
  						  : ""
  						  }
  						  onChange={(value) => this.setState({ advanced_country: value })}
  						  label={"Country"}
  					  />
  				  </div>
  				  <div class="col-md-6">
  					  <Input
  						  id={"city"}
  						  type={"text"}
  						  placeholder={"Istanbul"}
  						  size={"full"}
  						  labelDescription={"Enter a city"}
  						  defaultValue={advanced_city !== "null" ? advanced_city : "sads"}
  						  onChange={(value) => this.setState({ advanced_city: value })}
  						  label={"City"}
  					  />
  				  </div>
  			  </div>
  			  <div class="row">
  				  <div class="col-md-6">
  					  <Input
  						  type={"text"}
  						  id={"industry"}
  						  placeholder={"Tech."}
  						  size={"full"}
  						  labelDescription={"Enter an industry"}
  						  defaultValue={advanced_industry !== "null" ? advanced_industry : ""}
  						  onChange={(value) => {
  							this.setState({ advanced_industry: value });
  						  }}
  						  label={"Industry"}
  					  />
  				  </div>
  				  <div class="col-md-6">
  					  <label htmlFor="advanced_employee_min" className="advancedSearchDropdown2__inputLabel">Employee Number</label>{" "}
  					  <div class="row">
  						  <div class="col-md-6">
  							  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper"}>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__description"}>Min</div>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__input"}>
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
  						  </div>
  						  <div class="col-md-6">
  							  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper"}>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__description"}>Max</div>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__input"}>
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
  										  }}
  										  value={this.state.advanced_employee.max}
  									  />
  								  </div>
  							  </div>
  						  </div>
  					  </div>
  				  </div>
  			  </div>
  			  <div class="row">
  				  <div class="col-md-6">
  					  <Input
  						  type={"select"}
  						  id={"internType"}
  						  label={"Intern Type"}
  						  size={"full"}
  						  labelDescription={"Choose one below"}
  						  defaultValue={
  							  this.state.advanced_intern_type !== "null"
  							  ? this.state.advanced_intern_type
  							  : ""
  						  }
  						  onChange={(value, slValue) => {
  							  this.setState({ advanced_intern_type: slValue.value });
  						  }}
  						  placeholder={"Select intern type"}
  						  externalSource={[
  							  { key: "Student", value: "Student", selected: true },
  							  { key: "Newly Graduated", value: "Newly Graduated" },
  						  ]}
  					  />
  				  </div>
  				  <div class="col-md-6">
  					  <Input
  						  id={"duration"}
  						  type={"select"}
  						  size={"full"}
  						  label={"Duration"}
  						  labelDescription={"Choose one below"}
  						  defaultValue={
  							  this.state.advanced_duration !== "null"
  							  ? this.state.advanced_duration
  							  : ""
  						  }
  						  selectedValueId={"duration"}
  						  placeholder={"Select duration"}
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
  				  </div>
  			  </div>
  			  <div class="row">
  				  <div class="col-md-6">
  					  <label htmlFor="advanced_intern_quota" className="advancedSearchDropdown2__inputLabel">Intern Quota</label>{" "}
  					  <div class="row">
  						  <div class="col-md-6">
  							  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper"}>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__description"}>Min</div>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__input"}>
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
  						  </div>
  						  <div class="col-md-6">
  							  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper"}>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__description"}>Max</div>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__input"}>
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
  				  </div>
  				  <div class="col-md-6">
  					  <label htmlFor="advanced_rate" className="advancedSearchDropdown2__inputLabel">Rate</label>{" "}
  					  <div class="row">
  						  <div class="col-md-6">
  							  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper"}>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__description"}>Min</div>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__input"}>
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
  						  </div>
  						  <div class="col-md-6">
  							  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper"}>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__description"}>Max</div>
  								  <div className={"advancedSearchDropdown2__two-inputs-wrapper__input-wrapper__input"}>
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
  				  </div>
  			  </div>

  			  <div className={"advancedSearchDropdown2__send-button"}>
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
  						  this.addTags();
  						  let response = await store.advancedSearch(payload,this.props.browseInternship ?'jobs':'job');

  						  if (response)
  							  this.setState({
  								  advancedSearch: false,
  								  advanced_search_processing: false,
  							  });
  					  }}
  				  />
  				  <Button
  					  onButtonClick={() => this.resetInputs()}
  					  isLink={true}
  					  text={"Clear"}
  				  />
  			  </div>
  		  </div>
  	  </div>
    );
  };

	render() {
		let { keyword, location } = this.state;
		let { browseInternship } = this.props;
		const backgroundImageClass = this.props.consentTaken ? "searchSection__backgroundImageCookiesGone" : "searchSection__backgroundImage"

		return (
			<div className={`${"searchSection"} ${this.props.page === "home" && backgroundImageClass}`}>
				<div class="searchSection__bgColor">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div v-if={this.props.page === "home"} className={"searchSection__slogan"}>
									The <span style={{ color: "#f97050" }}>Easiest</span> Way to Get Your{" "}
									<span style={{ color: "#696cff" }}>New Internship</span>
								</div>
								<div v-if={this.props.page === "home"} className={"searchSection__subSlogan"}>
									Find the career you deserve
								</div>
							</div>
						</div>
						<div className={"searchSection__searchBars"}>
							<div class="row" style={{"align-items":"flex-end"}}>
								<div class="col-xl-5 col-lg-5 col-md-6">
									<div className={"searchSection__searchBars__keyword"}>
										<Input
											type={"text"}
											placeholder={"Software Developer"}
											size={"full"}
											icon={{ src: searchIcon, position: "right" }}
											labelDescription={"Enter position name, keyword or company name"}
											defaultValue={keyword !== "null" ? keyword : ""}
											onChange={(value) => this.setState({ keyword: value })}
											label={"Keyword"}
										/>
									</div>
								</div>
								<div class="col-xl-5 col-lg-5 col-md-6">
									<div className={"searchSection__searchBars__location"}>
										<Input
											type={"text"}
											placeholder={"Istanbul, Turkey"}
											size={"full"}
											icon={{ src: locationIcon, position: "right" }}
											labelDescription={"Enter city name, country or state name"}
											defaultValue={location !== "null" ? location : ""}
											onChange={(value) => this.setState({ location: value })}
											label={"Location"}
										/>
									</div>
								</div>
								<div class="col-xl-2 col-lg-2">
									<div className={"searchSection__searchBars__findJob"}>
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
							</div>
						</div>
					</div>
					<div
			          v-if={getCookie("token") || browseInternship}
			          className={"advancedSearch"}
			        >
						<Button
							text={"Advanced Search"}
							type={"ghost"}
							onButtonClick={(e) => {
								e.preventDefault();
								this.setState({ advancedSearch: true });
							}}
						/>
		          		{this.state.advancedSearch && this.renderAdvancedSearch()}
		        	</div>

					<div v-if={this.props.page === "home"} className={"searchSection__prepareCv"}>
						<Link to={"SignUp"} className={"underlined"}>
							Prepare your CV
						</Link>{" "}
						- Easily apply to thousands of jobs from anywhere
					</div>
					<Fragment v-else>
						<ul className={"searchSection__searches"}>
							{this.state.searches.map((searchedWord, i) => {
								return (
									<Link
										to={`/search/${keyword ? keyword : null}/${searchedWord}`}
										key={"searchedWord" + i}
										className={"searchSection__searches__searchedWord"}
									>
										{searchedWord}
									</Link>
								);
							})}
						</ul>
						<div className={"tagsContainer"}>
							{this.state.tags.length !== 0 ? this.state.tags.filter((item) =>
								item.value !== "" &&
								!item.value?.includes("0 - 0") &&
								item.value !== "" &&
								item.value !== " "
							)
							.map((item) => {
								return (
									<div className={"tagsContainer__tagsWrapper"}>
										<div className={"tagsContainer__tagsWrapper__tagsTitle"}>{item.name} </div>
										<div className={"tagsContainer__tagsWrapper__tagsLabel"}>
											<div className={"tagsContainer__tagsWrapper__tagsValue"}>{item.value}</div>
											<div className={"tagsContainer__tagsWrapper__cross"}
												onClick={() => {
													this.sendRequestTags();
													this.setState({
														tags: this.state.tags.filter((tags) => {
															return tags.name !== item.name;
														}),
													});
												}}
											>
												<img
													src={closeIcon}
													className={styles.closeTag}
													alt="closeTag"
													width="10"
												/>
											</div>
										</div>
									</div>
								);
							})
						: ""}
					</div>
		        </Fragment>
				</div>





			<img className={"homeCurve"} src={homeCurve} />
	    	</div>

		);
	}
}

export default SearchSection;
