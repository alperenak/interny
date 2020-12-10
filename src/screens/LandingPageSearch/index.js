import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Components ***/
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";

/*** Utils ***/
import store from "../../store";

/*** Styles ***/
import styles from "./landingpagesearch.scss";

/*** Icons ***/
import Input from "../../components/Input";
import Button from "../../components/Button";

import { getCookie } from "../../utils/cookie";
import Footer from "../../components/Footer";
import LoadingModal from "../../components/LoadingModal";
import searchIcon from "../../icons/colorfulSearch.svg";
import locationIcon from "../../icons/colorfulLocation.svg";
import closeIcon from "../../icons/close-outline.svg";

class LandingPageSearch extends Component {
  state = {
    posts: [],
    offset: 0,
    limit: 5,
    isAuthorized: false,
    totalCount: 0,
    loading: true,
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

  async componentDidMount() {
    this.setState({ loading: true });
    let token = getCookie("token");
    let res = await this.returnPostRequest();
    let totalCount = res.total;
    let posts = res.results.map((pst) => {
      return this.fillPosts(pst);
    });
    this.setState({ posts, totalCount, isAuthorized: !!token, loading: false });
  }

  async componentDidUpdate(prevProps) {
    let { keyword, location } = this.props.match.params;
    if (
      !Object.is(prevProps.match.params.keyword, keyword) ||
      !Object.is(prevProps.match.params.location, location)
    ) {
      this.setState({ offset: 0, loading: true });
      let res = await this.returnPostRequest();
      let posts = res.results.map((pst) => {
        return this.fillPosts(pst);
      });
      this.setState({ posts, totalCount: res.total, loading: false });
    }
  }

  returnPostRequest = async () => {
    let { offset, limit } = this.state;
    let { keyword, location } = this.props.match.params;
    let token = getCookie("token");
    this.setState({ loading: true });
    let res = [];
    if (!!token) {
      res = await store.getPosts({ keyword, location, offset, limit });
    } else {
      res = await store.getLandingPosts({ keyword, location, offset, limit });
    }
    this.setState({ loading: false });
    return res;
  };

  fillPosts = (pst) => [
    {
      id: pst.id,
      date: pst.startDate,
      header: pst.Employer.legalName,
      company: pst.position,
      image: pst.Employer.logo,
      location: `${pst.country.map((e) => e)}`,
      buttons: [
        {
          type: "ghost",
          text: pst.startDate,
          sizeName: "small",
          width: "85px",
        },
      ],
      description: pst.description,
      note: "987 views",
    },
  ];

  onLoadMore = async () => {
    let { offset, limit } = this.state;
    await this.setState((state) => {
      state.offset += state.limit;
      state.loading = true;
      return state;
    });

	let payload = {
	offset:offset,
	limit:limit,
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
	let response = await store.advancedSearch(payload,this.props.browseInternship ?'jobs':'job');
	let posts = response.data.results.map((pst) => {
	  return this.fillPosts(pst);
	});
	this.setState({
      posts: [...this.state.posts, ...posts],
      offset: offset + limit,
      loading: false,
    });
  };

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
  				<div class="col-md-12">
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
  				<div class="col-md-12">
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
  				<div class="col-md-12">
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
  				<div class="col-md-12">
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
  				<div class="col-md-12">
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
  				<div class="col-md-12" style={{"margin-top":"10px"}}>
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
  				<div class="col-md-12">
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
  				<div class="col-md-12">
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
  				<div class="col-md-12" style={{"margin-top":"10px"}}>
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
  				<div class="col-md-12">
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
				<div class="row">
					<div class="col-md-6">
						<Button
							type={"secondary"}
							text={"Find Internship"}
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
								let response = await store.advancedSearch(payload,this.props.browseInternship ?'jobs':'job');
								let posts = response.data.results.map((pst) => {
							      return this.fillPosts(pst);
							    });
								console.log(posts);
								if (response)
									this.setState({
										total:response.data.total,
										posts:posts,
										advancedSearch: false,
										advanced_search_processing: false,
									});
							}}
						/>
					</div>
					<div class="col-md-6">
						<Button
		  					onButtonClick={() => this.resetInputs()}
		  					isLink={true}
		  					text={"Clear"}
		  				/>
					</div>
				</div>
  			</div>
  		</div>
  	</div>
    );
  };
	render() {
		let { keyword, location } = this.props.match.params;
		let { posts, totalCount, loading } = this.state;
		return (
			<div className={"landingPageSearch"}>
				<LoadingModal text="Loading" v-if={loading} />

				<div class="container">
					<div class="row">
						<div class="col-md-4">
							<div class="landingPageSearch__filter">
								{this.renderAdvancedSearch()}
							</div>
						</div>
						<div class="col-md-8">
							<div className={"landingPageSearch__noResult"} v-if={posts.length <= 0}>
								No results found...
								<div v-if={keyword || location} className={"landingPageSearch__description"}>
									Your search for
									{keyword === "null" ? "" : ' "' + keyword + '" '}
									{keyword === "null" || location === "null" ? "" : "in"}
									{location === "null" ? "" : ' "' + location + '" '}
									did not return any result
								</div>
								<div v-else className={"landingPageSearch__description"}>
									Did not return any result
								</div>
							</div>
							<Card
								v-if={posts.length > 0}
								v-for={(pst, i) in posts}
								key={i}
								type={"jobPost"}
								posts={pst}
							/>
							<div className={"landingPageSearch__buttonContainer"}>
								<Button
									v-if={posts.length > 0 && totalCount > posts.length}
									type={"ghost"}
									text={"Load More"}
									sizeName={"small"}
									onButtonClick={() => this.onLoadMore()}
									width={"160px"}
								/>
							</div>
						</div>

					</div>

				</div>



				<Footer />
			</div>
		);
	}
}

export default LandingPageSearch;
