import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";

/*** Utils ***/
import store from '../../store';

/*** Styles ***/
import styles from './landingpagesearch.scss';

/*** Icons ***/
import Button from "../../components/Button";
import {getCookie} from "../../utils/cookie";

class LandingPageSearch extends Component {
    state = {
        posts: [],
        offset: 0,
        limit: 5,
        isAuthorized: false,
    };

    async componentDidMount() {
        let token = getCookie('token');
        let res = await this.returnPostRequest();
        let posts = res.map(pst => {
            return this.fillPosts(pst);
        });
        this.setState({ posts, isAuthorized: !!token });
    }

    async componentDidUpdate(prevProps) {
        let {keyword, location} = this.props.match.params;
        if (!Object.is(prevProps.match.params.keyword, keyword) ||
            !Object.is(prevProps.match.params.location, location)) {
            let res = await this.returnPostRequest();
            let posts = res.results.map(pst => {
                return this.fillPosts(pst);
            });
            this.setState({ posts, totalPostCount: res.total });
        }
    }

    returnPostRequest = async () => {
        let {offset, limit} = this.state;
        let {keyword, location} = this.props.match.params;
        let token = getCookie('token');
        let res = [];
        if (!!token) {
            res = await store.getPosts(keyword, location, offset, limit);
        } else {
            res = await store.getLandingPosts(keyword, location, offset, limit);
        }
        return res;
    };

    fillPosts = (pst) => [
        {
            id: pst.id,
            date: pst.startDate,
            header: pst.Employer.legalName,
            company: pst.position,
            image: pst.Employer.logo,
            location: `${pst.jobLocation.city} - ${pst.jobLocation.country}`,
            buttons:[
                {
                    type:'ghost',
                    text: 'Remove Post',
                    sizeName:'small',
                    width:'85px',
                }
            ],
            description: pst.description,
            note: '987 views'
        }
    ];

    onLoadMore = async () => {
        let {offset, limit} = this.state;
        let res = await this.returnPostRequest();
        let posts = res.map(pst => {
            return this.fillPosts(pst);
        });
        this.setState({ posts: [...this.state.posts, ...posts], offset: offset + limit });
    };

    render() {
        let {keyword, location} = this.props.match.params;
        let {posts, isAuthorized} = this.state;
        return (
            <div className={styles.LandingPageSearch}>
                <SearchSection
                    isAuthorized
                    defaultKeyword={keyword}
                    defaultLocation={location}
                />
                <div className={styles.noResult} v-if={posts.length <= 0}>
                    No results found...
                    <div className={styles.description}>
                        Your search for
                        {keyword === 'null' ? '' : ' "'+keyword+'" '}
                        {keyword === 'null' || location === 'null' ? '' : 'in'}
                        {location === 'null' ? '' : ' "'+location+'" '}
                        did not return any result
                    </div>
                </div>
                <Card
                    v-if={posts.length > 0}
                    v-for={(pst, i) in posts}
                    key={i}
                    type={'jobPost'}
                    posts={pst}
                />
                <Button
                    v-if={posts.length > 0}
                    type={'ghost'}
                    text={'Load More'}
                    sizeName={'small'}
                    onButtonClick={() => this.onLoadMore()}
                    width={'160px'}
                />
            </div>
        );
    }
}

export default LandingPageSearch;
