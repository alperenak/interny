import React, {Component} from 'react';

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
        courseSource: []
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

            return state;
        })
    }

    render() {
        let {contents, courseSource, hover} = this.state;
        return (
            <div className={styles.MyCourses}>
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
                            externalData={courseSource}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseDetail;
