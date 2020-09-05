import React, {Component} from 'react';
import YouTube from "react-youtube";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from "../../store";

/*** Styles ***/
import styles from "./courseDetail.scss";

/*** Icons ***/
import playIcon from "../../icons/play-triangle-outline.svg";
import playIconWhite from "../../icons/play-triangle-outline-white.svg";
import fileIcon from "../../icons/file.svg";
import fileIconWhite from "../../icons/file-white.svg";

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
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return <YouTube videoId={file} opts={opts} onReady={this._onReady} />;
    }

    renderPDFReader(file) {
        let {pageNumber, numPages} = this.state;
        return <div>
            <Document
                file={file}
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>;
    }

    render() {
        let {contents, courseSource, hover, course} = this.state;
        return (
            <div className={styles.MyCourses}>
                <Card header={{text: course.name, position: 'center'}}>
                    <div className={styles.courseDescription}>{course.description}</div>
                </Card>
                <div className={styles.cards}>
                    <div className={styles.courses}>
                        <Card
                            type={'courseSection'}
                            course={cnt}
                            v-for={(cnt, i) in contents}
                            key={i}
                        >
                            <div
                                onMouseOver={() => this.setState({ hover: i })}
                                onMouseLeave={() => this.setState({ hover: '' })}
                                className={styles.courseHeader}
                                onClick={() => this.onListItemClick(cnt)}
                            >
                                <div v-if={cnt.type === 'video'} className={styles.playIcon}>
                                    <img v-if={i !== hover} src={playIcon} alt={'icon'} />
                                    <img v-else src={playIconWhite} alt={'icon'} />
                                </div>
                                <div v-else className={styles.playIcon}>
                                    <img v-if={i !== hover} src={fileIcon} alt={'icon'} />
                                    <img v-else src={fileIconWhite} alt={'icon'} />
                                </div>
                                <div>
                                    {cnt.name}
                                </div>
                            </div>
                            <div className={styles.courseDuration}>{cnt.duration}</div>
                        </Card>
                    </div>
                    <div className={styles.profileSection}>
                        <Card
                            type={'list'}
                            header={{text: 'Sections', position: 'center'}}
                            externalData={courseSource}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseDetail;
