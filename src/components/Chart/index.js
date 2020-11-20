import React, { PureComponent } from "react";

/*** Components ***/
import Card from "../Card";
import PieDiagram from "./sub-components/PieChart";
import LineDiagram from "./sub-components/LineChart";

/*** Styles ***/
import styles from "./chart.scss";

export default class Chart extends PureComponent {

  render() {
    let { type, header } = this.props;
    return (
      <Card type={"chart"}>
        <div className={"Chart"}>
          <div className={`${"header"} ${type}`} v-if={header}>
            {header}
          </div>
          <div className={"pieDiagram"}>
            <PieDiagram v-if={type === "pie"} />
          </div>
          <LineDiagram v-if={type === "line"} />
        </div>
      </Card>
    );
  }
}
