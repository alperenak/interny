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
import BeautyStars from 'beauty-stars';
import { Multiselect } from "multiselect-react-dropdown";

class LandingPageSearch extends Component {
  state = {
	langs: [{name: 'English', id: "en"},{name: 'Italian', id: "it"},,{name: 'Turkish', id: "tr"}],
	prefLang:[],
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
		keyword: this.state.advanced_keyword,
		location: this.state.advanced_location,
		country: this.state.advanced_country,
		city: this.state.advanced_city,
		empNum: this.state.advanced_employee,
		intern_type: this.state.advanced_intern_type,
		quota:this.state.quota,
		rate: this.state.rating,
		industry: this.state.advanced_industry,
		begin_period:this.state.begin_period,
		salary:this.state.salary,
		appType:this.state.appType,
		languages:this.state.prefLang,
		gpa:this.state.gpas,
		duration:this.state.length,
		begin_period:this.state.begin_period
	};
	let response = await store.advancedSearch(payload,this.props.browseInternship ?'jobs':'job');
	let posts = response.data.results.map((pst) => {
	  return this.fillPosts(pst);
	});
	this.setState({
      posts: [...this.state.posts, ...posts],
      offset: offset + limit,
      loading: false,
	  rating:0
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
	const self = this;
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
  						? this.state.advanced_location
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
  						labelDescription={"Enter an sector"}
  						defaultValue={advanced_industry !== "null" ? advanced_industry : ""}
  						onChange={(value) => {
  						  this.setState({ advanced_industry: value });
  						}}
  						label={"Sector"}
  					/>
  				</div>
  				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<Input
								type={"select"}
								id={"internType"}
								label={"Employee Number"}
								size={"full"}
								labelDescription={"Choose one below"}
								defaultValue={
									this.state.advanced_employee
								}
								onChange={(value, slValue) => {
									this.setState({ advanced_employee: slValue.value });
								}}
								placeholder={"Select employee number"}
								externalSource={[
									{ key: "1-10", value: "1-10"},
									{ key: "11-50", value: "11-50" },
									{ key: "51-100", value: "51-100" },
									{ key: "101-250", value: "101-250" },
									{ key: "250+", value: "250+" },
								]}
							/>
						</div>

  					</div>
  				</div>
				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<div class="inputWrapper">
								<label for="">Rating</label>
								<div class="labelDescription" style={{"margin-bottom":"10px"}}>Select a rating star</div>
								<BeautyStars
									value={this.state.rating}
									onChange={value => this.setState({ rating:value })}
									size={16}
								/>
							</div>

						</div>

  					</div>
  				</div>
				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<Input
								type={"text"}
								id={"industry"}
								placeholder={"Quota"}
								size={"full"}
								labelDescription={"Enter an quota"}
								defaultValue={this.state.quota}
								onChange={(value) => {
									this.setState({ quota: value });
								}}
								label={"Quota"}
							/>

						</div>

  					</div>
  				</div>

				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<Input
								type={"select"}
								id={"internType"}
								label={"Begin Period"}
								size={"full"}
								labelDescription={"Choose one below"}
								defaultValue={
									this.state.begin_period
								}
								onChange={(value, slValue) => {
									this.setState({ begin_period: slValue.value });
								}}
								placeholder={"Select begin period"}
								externalSource={[
									{ key: "Jan1", value: "January - 1st Week"},
									{ key: "May2", value: "May – 2nd Week" },
									{ key: "June3", value: "June – 3rd Week" },
									{ key: "Oct4", value: "October – 4th Week" },
								]}
							/>
						</div>

  					</div>
  				</div>
				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<Input
								type={"select"}
								id={"internType"}
								label={"Length"}
								size={"full"}
								labelDescription={"Choose one below"}
								defaultValue={
									this.state.length
								}
								onChange={(value, slValue) => {
									this.setState({ length: slValue.value });
								}}
								placeholder={"Select Length"}
								externalSource={[
									{ key: "4", value: "4 Weeks"},
									{ key: "8", value: "8 Weeks" },
									{ key: "12", value: "12 Weeks" },
								]}
							/>
						</div>

  					</div>
  				</div>
				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<Input
								type={"select"}
								id={"internType"}
								label={"Preferred GPA"}
								size={"full"}
								labelDescription={"Choose one below"}
								defaultValue={
									this.state.gpas
								}
								onChange={(value, slValue) => {
									this.setState({ gpas: slValue.value });
								}}
								placeholder={"Select Length"}
								externalSource={[
									{ key: "-", value: "-"},
									{ key: "2/4", value: "2/4 or Higher" },
									{ key: "2.5/4", value: "2.5/4 or Higher" },
									{ key: "3/4", value: "3/4 or Higher" },
									{ key: "3.5/4", value: "3.5/4 or Higher" },
								]}
							/>
						</div>

  					</div>
  				</div>
				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<div class="inputWrapper">
								<label for="">Preferred Language</label>
								<div class="labelDescription" style={{"margin-bottom":"10px"}}>Select a language</div>
								<Multiselect
									style={{
										searchBox: {
											"border-radius": "12px",
		 									"box-shadow": "0 6px 12px 0 rgba(215,219,252,0.55)",
		 									"background-color": "#ffffff",
		 									"border": "1px solid #d6dfea",
											"font-family": "Sofia Pro",
											"color": "#AFB8C3",
											"font-size": "calc(2px + 11px)",
											height:50
									      },
									}}
									options={this.state.langs} // Options to display in the dropdown
									selectedValues={this.state.prefLang} // Preselected value to persist in dropdown
									onSelect={(a) => {
										self.setState({
											prefLang:a
										})
									}} // Function will trigger on select event
									onRemove={(a) => {
										self.setState({
											prefLang:a
										})
									}} // Function will trigger on remove event
									displayValue="name" // Property name to display in the dropdown options
									/>
							</div>

						</div>

  					</div>
  				</div>
				<div class="col-md-12" style={{"margin-top":"10px"}}>
  					<div class="row">
						<div class="col-md-12">
							<Input
								type={"select"}
								id={"internType"}
								label={"Application Type"}
								size={"full"}
								labelDescription={"Choose one below"}
								defaultValue={
									this.state.appType
								}
								onChange={(value, slValue) => {
									this.setState({ appType: slValue.value });
								}}
								placeholder={"Select Application Type"}
								externalSource={[
									{ key: "local", value: "Local"},
									{ key: "global", value: "Global" },
								]}
							/>
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
  							{ key: "University Student", value: "Student", selected: true },
  							{ key: "Newly Graduated", value: "Newly Graduated" },
  						]}
  					/>
  				</div>
				<div class="col-md-12">
  					<Input
  						type={"select"}
  						id={"internType"}
  						label={"Salary"}
  						size={"full"}
  						labelDescription={"Choose one below"}
  						defaultValue={
  							this.state.salary
  						}
  						onChange={(value, slValue) => {
  							this.setState({ salary: slValue.value });
  						}}
  						placeholder={"Select salary"}
  						externalSource={[
  							{ key: "yes", value: "Yes"},
  							{ key: "no", value: "No" },
  						]}
  					/>
  				</div>
  			</div>

  			<div className={"advancedSearchDropdown2__send-button"}>
				<div class="row">
					<div class="col-md-6">
						<Button
							type={"secondary"}
							text={"Find"}
							loading={this.state.advanced_search_processing}
							onButtonClick={async () => {
								this.setState({ advanced_search_processing: true });

								let payload = {
									keyword: this.state.advanced_keyword,
									location: this.state.advanced_location,
									country: this.state.advanced_country,
									city: this.state.advanced_city,
									empNum: this.state.advanced_employee,
									intern_type: this.state.advanced_intern_type,
									quota:this.state.quota,
									rate: this.state.rating,
									industry: this.state.advanced_industry,
									begin_period:this.state.begin_period,
									salary:this.state.salary,
									appType:this.state.appType,
									languages:this.state.prefLang,
									gpa:this.state.gpas,
									duration:this.state.length,
									begin_period:this.state.begin_period
								};
								let response = await store.advancedSearch(payload,this.props.browseInternship ?'jobs':'job');
								let posts = response.data.results.map((pst) => {
							      return this.fillPosts(pst);
							    });
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
