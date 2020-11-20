import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Components ***/
import ProfileSection from "./sub-components/ProfileSection";
import Experiences from "./sub-components/Experiences";
import Education from "./sub-components/Education";
import Skills from "./sub-components/Skills";
import AdditionalInfo from "./sub-components/AdditionalInfo";
import Certificates from "./sub-components/Certificates";
import Languages from "./sub-components/Languages";

/*** Styles ***/
import styles from './cv.scss';

class CV extends Component {
    render() {
        let {file, getCVs} = this.props;
        return (
            <div className={"cvDetailCom"}>
				<div class="row">
					<div class="col-md-12">
						<ProfileSection file={file} getCVs={getCVs} />
					</div>
					<div class="col-md-12">
						<Experiences file={file} getCVs={getCVs} />
					</div>
					<div class="col-md-12">
						<Education file={file} getCVs={getCVs} />
					</div>
					<div class="col-md-12">
						<Skills file={file} getCVs={getCVs} />
					</div>
					<div class="col-md-12">
						<Languages file={file} getCVs={getCVs} />
					</div>
					<div class="col-md-12">
						<Certificates file={file} getCVs={getCVs} />
					</div>
					<div class="col-md-12">
						<AdditionalInfo file={file} getCVs={getCVs} />
					</div>
				</div>
            </div>
        );
    }
}

export default CV;

CV.propTypes = {
    file: PropTypes.object
};
