import React, { Component, Fragment } from "react";
/*** Styles ***/
import styles from "./aboutUs.scss";
import aboutBg from "../../assets/aboutBg.png";
import Footer from "../../components/Footer";

class AboutUs extends Component {

    render() {
        return (
            <div>
				<div class="affiliate__header">
					<div class="container" style={{"background-image":"url("+aboutBg+")"}}>
						<p>ABOUT US</p>
					</div>
				</div>
                <div className="bg-white py-5">
                    <div className="container py-5">
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <i className="fa fa-bar-chart fa-2x mb-3 text-primary" />
                                <h2 className="font-weight-light">Intern</h2>
                                <p className="font-italic text-muted mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <a href="/search" className="btn btn-light px-5 rounded-pill shadow-sm">
                                    Find Interships
                                </a>
                            </div>
                            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                                <img
                                    src="https://i.pinimg.com/originals/8c/22/4c/8c224c88cbfcf226e3ee5d215e4930fa.png"
                                    alt
                                    className="img-fluid mb-4 mb-lg-0"
                                />
                            </div>
                        </div>
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-5 px-5 mx-auto">
                                <img
                                    src="https://user-images.githubusercontent.com/32520017/98449172-64f0e880-2142-11eb-881f-d25cce802856.png"
                                    alt
                                    className="img-fluid mb-4 mb-lg-0"
                                />
                            </div>
                            <div className="col-lg-6">
                                <i className="fa fa-leaf fa-2x mb-3 text-primary" />
                                <h2 className="font-weight-light">Company</h2>
                                <p className="font-italic text-muted mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">
                                    Create Internship Program
                                </a>
                            </div>
                        </div>
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <i className="fa fa-bar-chart fa-2x mb-3 text-primary" />
                                <h2 className="font-weight-light">University</h2>
                                <p className="font-italic text-muted mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <a href="/search" className="btn btn-light px-5 rounded-pill shadow-sm">
                                    Monitor Student's Internships
                                </a>
                            </div>
                            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPyeh4kLjISqqLr86Y309CvH8hvegmduMBkw&usqp=CAU"
                                    alt
                                    className="img-fluid mb-4 mb-lg-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light py-5">
                    <div className="container py-5">
                        <div className="row mb-4">
                            <div className="col-lg-5">
                                <h2 className="display-4 font-weight-light">Our team</h2>
                                <p className="font-italic text-muted">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        <div className="row text-center">
                            {/* Team item*/}
                            <div className="col-xl-3 col-sm-6 mb-5">
                                <div className="bg-white rounded shadow-sm py-5 px-4">
                                    <img
                                        src="https://res.cloudinary.com/mhmd/image/upload/v1556834132/avatar-4_ozhrib.png"
                                        alt
                                        width={100}
                                        className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                    />
                                    <h5 className="mb-0">Manuella Nevoresky</h5>
                                    <span className="small text-uppercase text-muted">
                                        CEO - Founder
                                    </span>
                                    <ul className="social mb-0 list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End*/}
                            {/* Team item*/}
                            <div className="col-xl-3 col-sm-6 mb-5">
                                <div className="bg-white rounded shadow-sm py-5 px-4">
                                    <img
                                        src="https://res.cloudinary.com/mhmd/image/upload/v1556834130/avatar-3_hzlize.png"
                                        alt
                                        width={100}
                                        className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                    />
                                    <h5 className="mb-0">Samuel Hardy</h5>
                                    <span className="small text-uppercase text-muted">
                                        CEO - Founder
                                    </span>
                                    <ul className="social mb-0 list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End*/}
                            {/* Team item*/}
                            <div className="col-xl-3 col-sm-6 mb-5">
                                <div className="bg-white rounded shadow-sm py-5 px-4">
                                    <img
                                        src="https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-2_f8dowd.png"
                                        alt
                                        width={100}
                                        className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                    />
                                    <h5 className="mb-0">Tom Sunderland</h5>
                                    <span className="small text-uppercase text-muted">
                                        CEO - Founder
                                    </span>
                                    <ul className="social mb-0 list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End*/}
                            {/* Team item*/}
                            <div className="col-xl-3 col-sm-6 mb-5">
                                <div className="bg-white rounded shadow-sm py-5 px-4">
                                    <img
                                        src="https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-1_s02nlg.png"
                                        alt
                                        width={100}
                                        className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                    />
                                    <h5 className="mb-0">John Tarly</h5>
                                    <span className="small text-uppercase text-muted">
                                        CEO - Founder
                                    </span>
                                    <ul className="social mb-0 list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="social-link">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End*/}
                        </div>
                    </div>
                </div>


                <div className={`container ${styles.myCarousel}`}>
                <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="https://www.teahub.io/photos/full/100-1001595_golden-gate-bridge.jpg" class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3>California USA</h3>
                        <h5>Main Location</h5>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://i0.wp.com/www.parkeagle.com/wp-content/uploads/2016/12/rotterdam.jpg?fit=1920%2C1080&ssl=1" class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3>Rotterdam NL</h3>
                        <h5>Europe Headquarters</h5>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://www.wallpapers4u.org/wp-content/uploads/istanbul_turkey_sea_buildings_96520_1920x1080.jpg" class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3>Istanbul TR</h3>
                        <h5>Europe-Asia Headquarters</h5>
                    </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://i2.wp.com/wallur.com/wp-content/uploads/2016/12/london-background-11.jpg"
                             className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h3>London UK</h3>
                            <h5>United Kingdom Headquarters</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.setaswall.com/wp-content/uploads/2018/01/Dubai-Widescreen-Wallpaper-09-1920x1080.jpg"
                             className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Dubai UAE</h3>
                            <h5>West Asia Headquarters</h5>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
                </div>
                <Footer />
            </div>


        );
    }
}

export default AboutUs;
