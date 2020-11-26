import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FooterAlternative from "../../components/FooterAlternative";
import styles from "./helpCenter.scss";
import handshake from "../../assets/help-center.jpg";
import discover from "../../icons/discover.svg";

class HelpCenter extends Component {

    render() {
        return (
			<div style={{"background":"#f6f8fa"}}>
            <div className={"helpCenter"}>
				<div class="affiliate__header" style={{"background-image":"url("+handshake+")"}}>
					<div class="affiliate__mask"></div>
					<div class="container">
						<div class="row" style={{"justify-content":"center"}}>
							<div class="col-md-7">
								<div class="affiliate__content">
									<p>Her zaman faydalı, insanların daima isteyebileceği, hiçbir zaman modası geçmeyecek bir ürünü, yani yüzlerce kategoride yer alan binlerce online kursu tanıtın!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="helpCenter__search">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="helpCenter__title">
									<span>HOW WE CAN WE HELP YOU?</span>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 helpCenter__searchInput">
								<Input
									type={"text"}
									placeholder={"Message"}
									size={"full"}
									label={"Search"}
								/>
							</div>
						</div>
						<div class="row" style={{"justify-content":"center"}}>
							<div class="col-md-3" style={{"display":"flex","justify-content":"center"}}>
								<Button
									type={"primary"}
									text={"SEARCH"}
									sizeName={"default"}
									to={"/helpCenterDetail"}
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="affiliate__triple">
					<div class="container">

						<div class="row">
							<div class="col-md-4">
								<a href="/helpCenterDetail2">
								<div class="affiliate__tripleBox boxAnimation">
									<img src={discover} />
									<span class="affiliate__tripleBox__title">
										INTERN
									</span>
									<span class="affiliate__tripleBox__description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</span>
								</div>
								</a>
							</div>
							<div class="col-md-4">
								<div class="affiliate__tripleBox boxAnimation">
									<img src={discover} />
									<span class="affiliate__tripleBox__title">
										COMPANY
									</span>
									<span class="affiliate__tripleBox__description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="affiliate__tripleBox boxAnimation">
									<img src={discover} />
									<span class="affiliate__tripleBox__title">
										UNIVERSITY
									</span>
									<span class="affiliate__tripleBox__description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
			<FooterAlternative />
			</div>
        );
    }
}

export default HelpCenter;
