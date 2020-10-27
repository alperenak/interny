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

//accordion library
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';



class CV extends Component {
    render() {
        let {file, getCVs} = this.props;
        return (

            <div className={styles.CV}>
                <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>

                             <ProfileSection file={file} getCVs={getCVs} />
                             
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>

                    <Experiences file={file} getCVs={getCVs} />
                    <Education file={file} getCVs={getCVs} />
                    <Skills file={file} getCVs={getCVs} />
                    <Languages file={file} getCVs={getCVs} />
                    <Certificates file={file} getCVs={getCVs} />
                    <AdditionalInfo file={file} getCVs={getCVs} />

                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
            </div>
                


        );
    }
}

export default CV;

CV.propTypes = {
  file: PropTypes.object
};
