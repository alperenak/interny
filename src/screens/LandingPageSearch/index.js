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
import Button from "../../components/Button";
import { getCookie } from "../../utils/cookie";
import Footer from "../../components/Footer";
import LoadingModal from "../../components/LoadingModal";

class LandingPageSearch extends Component {
  state = {
    posts: [],
    offset: 0,
    limit: 5,
    isAuthorized: false,
    totalCount: 0,
    loading: true,
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
    let res = await this.returnPostRequest();
    let posts = res.results.map((pst) => {
      return this.fillPosts(pst);
    });
    this.setState({
      posts: [...this.state.posts, ...posts],
      offset: offset + limit,
      loading: false,
    });
  };

  render() {
    let { keyword, location } = this.props.match.params;
    let { posts, totalCount, loading } = this.state;
    return (
      <div className={styles.LandingPageSearch}>
        <LoadingModal text="Loading" v-if={loading} />
        <SearchSection
          isAuthorized
          defaultKeyword={keyword}
          browseInternship={true}
          defaultLocation={location}
        />
        <div className={styles.noResult} v-if={posts.length <= 0}>
          No results found...
          <div v-if={keyword || location} className={styles.description}>
            Your search for
            {keyword === "null" ? "" : ' "' + keyword + '" '}
            {keyword === "null" || location === "null" ? "" : "in"}
            {location === "null" ? "" : ' "' + location + '" '}
            did not return any result
          </div>
          <div v-else className={styles.description}>
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
        <div className={styles.buttonContainer}>
          <Button
            v-if={posts.length > 0 && totalCount > posts.length}
            type={"ghost"}
            text={"Load More"}
            sizeName={"small"}
            onButtonClick={() => this.onLoadMore()}
            width={"160px"}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default LandingPageSearch;
