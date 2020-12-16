import React, {Component} from 'react';
import YouTube from "react-youtube";

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";

/*** Styles ***/
import styles from "./courseDetail.scss";

/*** Icons ***/
import playIcon from "../../icons/play-triangle-outline.svg";
import playIconWhite from "../../icons/play-triangle-outline-white.svg";
import fileIcon from "../../icons/file.svg";
import fileIconWhite from "../../icons/file-white.svg";
import Button from "../../components/Button";

class CourseDetail extends Component {
    state = {
        contents: [],
        course: {},
        courseSource: [],
        numPages: null,
        pageNumber: 1
    };
    async componentDidMount() {
        let {id} = this.props.match.params;
        let course = await store.getCourse(id);
        this.setState(state => {
            course.Sections.map((section, i) => {
                let tempSection = {
                    key: section._id,
                    value: section.name,
                    selected: i === 0,
                    contents: section.Contents,
                    onChange: () => this.setState({contents: section.Contents})
                };
                state.courseSource.push(tempSection);
                if (i === 0) state.contents = section.Contents;
            });
            state.course = course;
            return state;
        })
    }

    onListItemClick = (content) => {
        if (content.type === 'video') {
            this.props.createModal({
                header: content.name,
                content: () => this.renderVideoPlayer(content.file)
            });
        } else if (content.type === 'pdf') {
            this.props.createModal({
                header: content.name,
                content: () => this.renderPDFReader(content.file)
            });
        }
    };

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({numPages});
    };

    renderVideoPlayer(file) {
        const opts = {
            height: '780',
            width: '1280',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return <YouTube videoId={file} opts={opts} onReady={this._onReady} />;
    }

    createContent = () => {
        this.props.createModal({
            header: 'Create Content'
        });
    };

    createSection = () => {
        this.props.createModal({
            header: 'Create Content'
        });
    };

    renderPDFReader(file) {

    }

    render() {
        let userType = getCookie('user');
        let {contents, courseSource, hover, course} = this.state;
        return (
            <div className={styles.MyCourses}>

            </div>
        );
    }
}

export default CourseDetail;
