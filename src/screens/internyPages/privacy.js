import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";


class PrivacyPage extends Component {
	state = {
		pri1: false,
		pri2: false,
		pri3: false,
	};
	componentDidMount(){

	}
    render() {
        return (
			<>
			<div class="container" style={{"margin-top":"100px"}}>
	          <div class="row">
			  <div class="col-md-12" style={{"text-align":"center","margin-bottom":"30px"}}>
				 <span class="affiliate__timeline__title">Privacy Policy</span>
			 </div>
	            <div>
	              <p class={"p1"}>Last updated: October 10, 2020</p>
	              <p class={"p1"}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
	              <p class={"p1"}>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
	              <p class={"p2"}><span class={"s1"}>Interpretation and Definitions</span></p>
	              <p class={"p3"}><strong>Interpretation</strong></p>
	              <p class={"p1"}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
	              <p class={"p3"}><strong>Definitions</strong></p>
	              <p class={"p1"}>For the purposes of this Privacy Policy:</p>
	              <p class={"p4"}><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
	              <p class={"p4"}><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
	              <p class={"p4"}><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named INTERNY App</p>
	              <p class={"p4"}><strong>Business</strong>, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers&apos; personal information and determines the purposes and means of the processing of Consumers&apos; personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers&apos; personal information, that does business in the State of California.</p>
	              <p class={"p4"}><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to INTERNY INC., 350 Oakmead Pkwy, Sunnyvale, 94085, CA.</p>
	              <p class={"p4"}>For the purpose of the GDPR, the Company is the Data Controller.</p>
	              <p class={"p4"}><strong>Consumer</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.</p>
	              <p class={"p4"}><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
	              <p class={"p4"}><strong>Country</strong> refers to: California, United States</p>
	              <p class={"p4"}><strong>Data Controller</strong>, for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.</p>
	              <p class={"p4"}><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
	              <p class={"p4"}><strong>Do Not Track</strong> (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.</p>
	              <p class={"p4"}><strong>Facebook Fan Page</strong> is a public profile named Interny Inc. specifically created by the Company on the Facebook social network, accessible from <a href="https://www.facebook.com/internynet/">https://www.facebook.com/internynet/</a></p>
	              <p class={"p4"}><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
	              <p class={"p4"}>For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity.</p>
	              <p class={"p4"}>For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.</p>
	              <p class={"p4"}><strong>Sale</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer&apos;s Personal information to another business or a third party for monetary or other valuable consideration.</p>
	              <p class={"p4"}><strong>Service</strong> refers to the Application or the Website or both.</p>
	              <p class={"p4"}><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used. For the purpose of the GDPR, Service Providers are considered Data Processors.</p>
	              <p class={"p4"}><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
	              <p class={"p4"}><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
	              <p class={"p4"}><strong>Website</strong> refers to INTERNY Website, accessible from <a href="https://www.interny.net">https://www.interny.net</a></p>
	              <p class={"p4"}><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
	              <p class={"p4"}>Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service.</p>
	              <p class={"p2"}><span class={"s1"}>Collecting and Using Your Personal Data</span></p>
	              <p class={"p5"}><strong>Types of Data Collected</strong></p>
	              <p class={"p6"}><strong>Personal Data</strong></p>
	              <p class={"p1"}>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>Email address</li>
	                <li class={"li1"}>First name and last name</li>
	                <li class={"li1"}>Phone number</li>
	                <li class={"li1"}>Address, State, Province, ZIP/Postal code, City</li>
	                <li class={"li1"}>Bank account information in order to pay for products and/or services within the Service</li>
	                <li class={"li1"}>Usage Data</li>
	              </ul>
	              <p class={"p1"}>When You pay for a product and/or a service via bank transfer, We may ask You to provide information to facilitate this transaction and to verify Your identity. Such information may include, without limitation:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>Date of birth</li>
	                <li class={"li1"}>Passport or National ID card</li>
	                <li class={"li1"}>Bank card statement</li>
	                <li class={"li1"}>Other information linking You to an address</li>
	              </ul>
	              <p class={"p6"}><strong>Usage Data</strong></p>
	              <p class={"p1"}>Usage Data is collected automatically when using the Service.</p>
	              <p class={"p1"}>Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
	              <p class={"p1"}>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
	              <p class={"p1"}>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
	              <p class={"p6"}><strong>Information from Third-Party Social Media Services</strong></p>
	              <p class={"p1"}>The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>Google</li>
	                <li class={"li1"}>Facebook</li>
	                <li class={"li1"}>Twitter</li>
	              </ul>
	              <p class={"p1"}>If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service&apos;s account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>
	              <p class={"p1"}>You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service&apos;s account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.</p>
	              <p class={"p6"}><strong>Information Collected while Using the Application</strong></p>
	              <p class={"p1"}>While using Our Application, in order to provide features of Our Application, We may collect, with your prior permission:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>Information regarding your location</li>
	                <li class={"li1"}>Information from your Device&apos;s phone book (contacts list)</li>
	                <li class={"li1"}>Pictures and other information from your Device&apos;s camera and photo library</li>
	              </ul>
	              <p class={"p1"}>We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company&apos;s servers and/or a Service Provider&apos;s server or it be simply stored on Your device.</p>
	              <p class={"p1"}>You can enable or disable access to this information at any time, through Your Device settings.</p>
	              <p class={"p6"}><strong>Tracking Technologies and Cookies</strong></p>
	              <p class={"p1"}>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.</p>
	              <p class={"p1"}>You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.</p>
	              <p class={"p1"}>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser. Learn more about cookies: <a href="https://www.termsfeed.com/blog/cookies/">All About Cookies</a>.</p>
	              <p class={"p1"}>We use both session and persistent Cookies for the purposes set out below:</p>
	              <p class={"p4"}><strong>Necessary / Essential Cookies</strong></p>
	              <p class={"p4"}>Type: Session Cookies</p>
	              <p class={"p4"}>Administered by: Us</p>
	              <p class={"p4"}>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
	              <p class={"p4"}><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
	              <p class={"p4"}>Type: Persistent Cookies</p>
	              <p class={"p4"}>Administered by: Us</p>
	              <p class={"p4"}>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
	              <p class={"p4"}><strong>Functionality Cookies</strong></p>
	              <p class={"p4"}>Type: Persistent Cookies</p>
	              <p class={"p4"}>Administered by: Us</p>
	              <p class={"p4"}>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
	              <p class={"p4"}><strong>Tracking and Performance Cookies</strong></p>
	              <p class={"p4"}>Type: Persistent Cookies</p>
	              <p class={"p4"}>Administered by: Third-Parties</p>
	              <p class={"p4"}>Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new pages, features or new functionality of the Website to see how our users react to them.</p>
	              <p class={"p1"}>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
	              <p class={"p3"}><strong>Use of Your Personal Data</strong></p>
	              <p class={"p1"}>The Company may use Personal Data for the following purposes:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
	                <li class={"li1"}><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
	                <li class={"li1"}><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
	                <li class={"li1"}><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&apos;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
	                <li class={"li1"}><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
	                <li class={"li1"}><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
	              </ul>
	              <p class={"p1"}>We may share your personal information in the following situations:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to advertise on third party websites to You after You visited our Service, for payment processing, to contact You.</li>
	                <li class={"li1"}><strong>For Business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.</li>
	                <li class={"li1"}><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
	                <li class={"li1"}><strong>With Business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
	                <li class={"li1"}><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
	              </ul>
	              <p class={"p3"}><strong>Retention of Your Personal Data</strong></p>
	              <p class={"p1"}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
	              <p class={"p1"}>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
	              <p class={"p3"}><strong>Transfer of Your Personal Data</strong></p>
	              <p class={"p1"}>Your information, including Personal Data, is processed at the Company&apos;s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to &mdash; and maintained on &mdash; computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
	              <p class={"p1"}>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
	              <p class={"p1"}>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
	              <p class={"p5"}><strong>Disclosure of Your Personal Data</strong></p>
	              <p class={"p6"}><strong>Business Transactions</strong></p>
	              <p class={"p1"}>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
	              <p class={"p6"}><strong>Law enforcement</strong></p>
	              <p class={"p1"}>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
	              <p class={"p6"}><strong>Other legal requirements</strong></p>
	              <p class={"p1"}>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>Comply with a legal obligation</li>
	                <li class={"li1"}>Protect and defend the rights or property of the Company</li>
	                <li class={"li1"}>Prevent or investigate possible wrongdoing in connection with the Service</li>
	                <li class={"li1"}>Protect the personal safety of Users of the Service or the public</li>
	                <li class={"li1"}>Protect against legal liability</li>
	              </ul>
	              <p class={"p3"}><strong>Security of Your Personal Data</strong></p>
	              <p class={"p1"}>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
	              <p class={"p2"}><span class={"s1"}>Detailed Information on the Processing of Your Personal Data</span></p>
	              <p class={"p1"}>Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.</p>
	              <p class={"p3"}><strong>Analytics</strong></p>
	              <p class={"p1"}>We may use third-party Service providers to monitor and analyze the use of our Service.</p>
	              <p class={"p4"}><strong>Google Analytics</strong></p>
	              <p class={"p4"}>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>
	              <p class={"p4"}>You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity.</p>
	              <p class={"p4"}>You may opt-out of certain Google Analytics features through your mobile device settings, such as your device advertising settings or by following the instructions provided by Google in their Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
	              <p class={"p4"}>For more information on the privacy practices of Google, please visit the Google Privacy &amp; Terms web page: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
	              <p class={"p4"}><strong>Firebase</strong></p>
	              <p class={"p4"}>Firebase is an analytics service provided by Google Inc.</p>
	              <p class={"p4"}>You may opt-out of certain Firebase features through your mobile device settings, such as your device advertising settings or by following the instructions provided by Google in their Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
	              <p class={"p4"}>We also encourage you to review the Google&apos;s policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245">https://support.google.com/analytics/answer/6004245</a></p>
	              <p class={"p4"}>For more information on what type of information Firebase collects, please visit the Google Privacy &amp; Terms web page: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
	              <p class={"p4"}><strong>Facebook Pixel</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a></p>
	              <p class={"p3"}><strong>Email Marketing</strong></p>
	              <p class={"p1"}>We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.</p>
	              <p class={"p1"}>We may use Email Marketing Service Providers to manage and send emails to You.</p>
	              <p class={"p4"}><strong>Mailchimp</strong></p>
	              <p class={"p4"}>Mailchimp is an email marketing sending service provided by The Rocket Science Group LLC.</p>
	              <p class={"p4"}>For more information on the privacy practices of Mailchimp, please visit their Privacy policy: <a href="https://mailchimp.com/legal/privacy/">https://mailchimp.com/legal/privacy/</a></p>
	              <p class={"p4"}><strong>GetResponse</strong></p>
	              <p class={"p4"}>GetResponse is an email marketing sending service provided by GetResponse.</p>
	              <p class={"p4"}>For more information on the privacy practices of GetResponse, please visit their Privacy policy: <a href="https://www.getresponse.com/legal/privacy.html">https://www.getresponse.com/legal/privacy.html</a></p>
	              <p class={"p4"}><strong>Amazon Simple Email Service</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://aws.amazon.com/privacy">https://aws.amazon.com/privacy</a></p>
	              <p class={"p3"}><strong>Payments</strong></p>
	              <p class={"p1"}>We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).</p>
	              <p class={"p1"}>We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
	              <p class={"p4"}><strong>Apple Store In-App Payments</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.apple.com/legal/privacy/en-ww/">https://www.apple.com/legal/privacy/en-ww/</a></p>
	              <p class={"p4"}><strong>Google Play In-App Payments</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.google.com/policies/privacy/">https://www.google.com/policies/privacy/</a></p>
	              <p class={"p4"}><strong>Stripe</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a></p>
	              <p class={"p1"}>When You use Our Service to pay a product and/or service via bank transfer, We may ask You to provide information to facilitate this transaction and to verify Your identity.</p>
	              <p class={"p3"}><strong>Behavioral Remarketing</strong></p>
	              <p class={"p1"}>The Company uses remarketing services to advertise on third party websites to You after You visited our Service. We and Our third-party vendors use cookies to inform, optimize and serve ads based on Your past visits to our Service.</p>
	              <p class={"p4"}><strong>Google Ads (AdWords)</strong></p>
	              <p class={"p4"}>Google Ads (AdWords) remarketing service is provided by Google Inc.</p>
	              <p class={"p4"}>You can opt-out of Google Analytics for Display Advertising and customise the Google Display Network ads by visiting the Google Ads Settings page: <a href="http://www.google.com/settings/ads">http://www.google.com/settings/ads</a></p>
	              <p class={"p4"}>Google also recommends installing the Google Analytics Opt-out Browser Add-on - <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a> - for your web browser. Google Analytics Opt-out Browser Add-on provides visitors with the ability to prevent their data from being collected and used by Google Analytics.</p>
	              <p class={"p4"}>For more information on the privacy practices of Google, please visit the Google Privacy &amp; Terms web page: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
	              <p class={"p4"}><strong>Twitter</strong></p>
	              <p class={"p4"}>Twitter remarketing service is provided by Twitter Inc.</p>
	              <p class={"p4"}>You can opt-out from Twitter&apos;s interest-based ads by following their instructions: <a href="https://support.twitter.com/articles/20170405">https://support.twitter.com/articles/20170405</a></p>
	              <p class={"p4"}>You can learn more about the privacy practices and policies of Twitter by visiting their Privacy Policy page: <a href="https://twitter.com/privacy">https://twitter.com/privacy</a></p>
	              <p class={"p4"}><strong>Facebook</strong></p>
	              <p class={"p4"}>Facebook remarketing service is provided by Facebook Inc.</p>
	              <p class={"p4"}>You can learn more about interest-based advertising from Facebook by visiting this page: <a href="https://www.facebook.com/help/164968693837950">https://www.facebook.com/help/164968693837950</a></p>
	              <p class={"p4"}>To opt-out from Facebook&apos;s interest-based ads, follow these instructions from Facebook: <a href="https://www.facebook.com/help/568137493302217">https://www.facebook.com/help/568137493302217</a></p>
	              <p class={"p4"}>Facebook adheres to the Self-Regulatory Principles for Online Behavioural Advertising established by the Digital Advertising Alliance. You can also opt-out from Facebook and other participating companies through the Digital Advertising Alliance in the USA <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a>, the Digital Advertising Alliance of Canada in Canada <a href="http://youradchoices.ca/">http://youradchoices.ca/</a> or the European Interactive Digital Advertising Alliance in Europe <a href="http://www.youronlinechoices.eu/">http://www.youronlinechoices.eu/</a>, or opt-out using your mobile device settings.</p>
	              <p class={"p4"}>For more information on the privacy practices of Facebook, please visit Facebook&apos;s Data Policy: <a href="https://www.facebook.com/privacy/explanation">https://www.facebook.com/privacy/explanation</a></p>
	              <p class={"p4"}><strong>Instagram</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a></p>
	              <p class={"p4"}><strong>Linkedin</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.linkedin.com/legal/privacy-policy">https://www.linkedin.com/legal/privacy-policy</a></p>
	              <p class={"p4"}><strong>Youtube</strong></p>
	              <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
	              <p class={"p3"}><strong>Usage, Performance and Miscellaneous</strong></p>
	              <p class={"p1"}>We may use third-party Service Providers to provide better improvement of our Service.</p>
	              <p class={"p4"}><strong>Invisible reCAPTCHA</strong></p>
	              <p class={"p4"}>We use an invisible captcha service named reCAPTCHA. reCAPTCHA is operated by Google.</p>
	              <p class={"p4"}>The reCAPTCHA service may collect information from You and from Your Device for security purposes.</p>
	              <p class={"p4"}>The information gathered by reCAPTCHA is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a></p>
	              <p class={"p4"}><strong>Google Places</strong></p>
	              <p class={"p4"}>Google Places is a service that returns information about places using HTTP requests. It is operated by Google</p>
	              <p class={"p4"}>Google Places service may collect information from You and from Your Device for security purposes.</p>
	              <p class={"p4"}>The information gathered by Google Places is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a></p>
	              <p class={"p2"}><span class={"s1"}>GDPR Privacy</span></p>
	              <p class={"p3"}><strong>Legal Basis for Processing Personal Data under GDPR</strong></p>
	              <p class={"p1"}>We may process Personal Data under the following conditions:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}><strong>Consent:</strong> You have given Your consent for processing Personal Data for one or more specific purposes.</li>
	                <li class={"li1"}><strong>Performance of a contract:</strong> Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.</li>
	                <li class={"li1"}><strong>Legal obligations:</strong> Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.</li>
	                <li class={"li1"}><strong>Vital interests:</strong> Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.</li>
	                <li class={"li1"}><strong>Public interests:</strong> Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.</li>
	                <li class={"li1"}><strong>Legitimate interests:</strong> Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.</li>
	              </ul>
	              <p class={"p1"}>In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>
	              <p class={"p3"}><strong>Your Rights under the GDPR</strong></p>
	              <p class={"p1"}>The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.</p>
	              <p class={"p1"}>You have the right under this Privacy Policy, and by law if You are within the EU, to:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}><strong>Request access to Your Personal Data.</strong> The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.</li>
	                <li class={"li1"}><strong>Request correction of the Personal Data that We hold about You.</strong> You have the right to to have any incomplete or inaccurate information We hold about You corrected.</li>
	                <li class={"li1"}><strong>Object to processing of Your Personal Data.</strong> This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.</li>
	                <li class={"li1"}><strong>Request erasure of Your Personal Data.</strong> You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.</li>
	                <li class={"li1"}><strong>Request the transfer of Your Personal Data.</strong> We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.</li>
	                <li class={"li1"}><strong>Withdraw Your consent.</strong> You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.</li>
	              </ul>
	              <p class={"p3"}><strong>Exercising of Your GDPR Data Protection Rights</strong></p>
	              <p class={"p1"}>You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.</p>
	              <p class={"p1"}>You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.</p>
	              <p class={"p2"}><span class={"s1"}>Facebook Fan Page</span></p>
	              <p class={"p3"}><strong>Data Controller for the Facebook Fan Page</strong></p>
	              <p class={"p1"}>The Company is the Data Controller of Your Personal Data collected while using the Service. As operator of the Facebook Fan Page <a href="https://www.facebook.com/internynet/">https://www.facebook.com/internynet/</a>, the Company and the operator of the social network Facebook are Joint Controllers.</p>
	              <p class={"p1"}>The Company has entered into agreements with Facebook that define the terms for use of the Facebook Fan Page, among other things. These terms are mostly based on the Facebook Terms of Service: <a href="https://www.facebook.com/terms.php">https://www.facebook.com/terms.php</a></p>
	              <p class={"p1"}>Visit the Facebook Privacy Policy <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a> for more information about how Facebook manages Personal data or contact Facebook online, or by mail: Facebook, Inc. ATTN, Privacy Operations, 1601 Willow Road, Menlo Park, CA 94025, United States.</p>
	              <p class={"p3"}><strong>Facebook Insights</strong></p>
	              <p class={"p1"}>We use the Facebook Insights function in connection with the operation of the Facebook Fan Page and on the basis of the GDPR, in order to obtain anonymized statistical data about Our users.</p>
	              <p class={"p1"}>For this purpose, Facebook places a Cookie on the device of the user visiting Our Facebook Fan Page. Each Cookie contains a unique identifier code and remains active for a period of two years, except when it is deleted before the end of this period.</p>
	              <p class={"p1"}>Facebook receives, records and processes the information stored in the Cookie, especially when the user visits the Facebook services, services that are provided by other members of the Facebook Fan Page and services by other companies that use Facebook services.</p>
	              <p class={"p1"}>For more information on the privacy practices of Facebook, please visit Facebook Privacy Policy here: <a href="https://www.facebook.com/full_data_use_policy">https://www.facebook.com/full_data_use_policy</a></p>
	              <p class={"p2"}><span class={"s1"}>CCPA Privacy</span></p>
	              <p class={"p3"}><strong>Your Rights under the CCPA</strong></p>
	              <p class={"p1"}>Under this Privacy Policy, and by law if You are a resident of California, You have the following rights:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}><strong>The right to notice.</strong> You must be properly notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.</li>
	                <li class={"li1"}><strong>The right to access / the right to request.</strong> The CCPA permits You to request and obtain from the Company information regarding the disclosure of Your Personal Data that has been collected in the past 12 months by the Company or its subsidiaries to a third-party for the third party&apos;s direct marketing purposes.</li>
	                <li class={"li1"}><strong>The right to say no to the sale of Personal Data.</strong> You also have the right to ask the Company not to sell Your Personal Data to third parties. You can submit such a request by visiting our &quot;Do Not Sell My Personal Information&quot; section or web page.</li>
	                <li class={"li1"}><strong>The right to know about Your Personal Data.</strong> You have the right to request and obtain from the Company information regarding the disclosure of the following:<span class="Apple-converted-space">&nbsp;</span></li>
	                <li class={"li1"}>The categories of Personal Data collected</li>
	                <li class={"li1"}>The sources from which the Personal Data was collected</li>
	                <li class={"li1"}>The business or commercial purpose for collecting or selling the Personal Data</li>
	                <li class={"li1"}>Categories of third parties with whom We share Personal Data</li>
	                <li class={"li1"}>The specific pieces of Personal Data we collected about You</li>
	                <li class={"li1"}><strong>The right to delete Personal Data.</strong> You also have the right to request the deletion of Your Personal Data that have been collected in the past 12 months.</li>
	                <li class={"li1"}><strong>The right not to be discriminated against.</strong> You have the right not to be discriminated against for exercising any of Your Consumer&apos;s rights, including by:<span class="Apple-converted-space">&nbsp;</span></li>
	                <li class={"li1"}>Denying goods or services to You</li>
	                <li class={"li1"}>Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</li>
	                <li class={"li1"}>Providing a different level or quality of goods or services to You</li>
	                <li class={"li1"}>Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
	              </ul>
	              <p class={"p3"}><strong>Exercising Your CCPA Data Protection Rights</strong></p>
	              <p class={"p1"}>In order to exercise any of Your rights under the CCPA, and if you are a California resident, You can email or call us or visit our &quot;Do Not Sell My Personal Information&quot; section or web page.</p>
	              <p class={"p1"}>The Company will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonable necessary and with prior notice.</p>
	              <p class={"p3"}><strong>Do Not Sell My Personal Information</strong></p>
	              <p class={"p1"}>We do not sell personal information. However, the Service Providers we partner with (for example, our advertising partners) may use technology on the Service that &quot;sells&quot; personal information as defined by the CCPA law.</p>
	              <p class={"p1"}>If you wish to opt out of the use of your personal information for interest-based advertising purposes and these potential sales as defined under CCPA law, you may do so by following the instructions below.</p>
	              <p class={"p1"}>Please note that any opt out is specific to the browser You use. You may need to opt out on every browser that you use.</p>
	              <p class={"p6"}><strong>Website</strong></p>
	              <p class={"p1"}>You can opt out of receiving ads that are personalized as served by our Service Providers by following our instructions presented on the Service:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>From Our &quot;Cookie Consent&quot; notice banner</li>
	                <li class={"li1"}>Or from Our &quot;CCPA Opt-out&quot; notice banner</li>
	                <li class={"li1"}>Or from Our &quot;Do Not Sell My Personal Information&quot; notice banner</li>
	                <li class={"li1"}>Or from Our &quot;Do Not Sell My Personal Information&quot; link</li>
	              </ul>
	              <p class={"p1"}>The opt out will place a cookie on Your computer that is unique to the browser You use to opt out. If you change browsers or delete the cookies saved by your browser, you will need to opt out again.</p>
	              <p class={"p6"}><strong>Mobile Devices</strong></p>
	              <p class={"p1"}>Your mobile device may give you the ability to opt out of the use of information about the apps you use in order to serve you ads that are targeted to your interests:</p>
	              <ul class={"ul1"}>
	                <li class={"li1"}>&quot;Opt out of Interest-Based Ads&quot; or &quot;Opt out of Ads Personalization&quot; on Android devices</li>
	                <li class={"li1"}>&quot;Limit Ad Tracking&quot; on iOS devices</li>
	              </ul>
	              <p class={"p1"}>You can also stop the collection of location information from Your mobile device by changing the preferences on your mobile device.</p>
	              <p class={"p2"}><span class={"s1"}>&quot;Do Not Track&quot; Policy as Required by California Online Privacy Protection Act (CalOPPA)</span></p>
	              <p class={"p1"}>Our Service does not respond to Do Not Track signals.</p>
	              <p class={"p1"}>However, some third party websites do keep track of Your browsing activities. If You are visiting such websites, You can set Your preferences in Your web browser to inform websites that You do not want to be tracked. You can enable or disable DNT by visiting the preferences or settings page of Your web browser.</p>
	              <p class={"p2"}><span class={"s1"}>Your California Privacy Rights (California&apos;s Shine the Light law)</span></p>
	              <p class={"p1"}>Under California Civil Code Section 1798 (California&apos;s Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties&apos; direct marketing purposes.</p>
	              <p class={"p1"}>If you&apos;d like to request more information under the California Shine the Light law, and if you are a California resident, You can contact Us using the contact information provided below.</p>
	              <p class={"p2"}><span class={"s1"}>California Privacy Rights for Minor Users (California Business and Professions Code Section 22581)</span></p>
	              <p class={"p1"}>California Business and Professions Code section 22581 allow California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.</p>
	              <p class={"p1"}>To request removal of such data, and if you are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.</p>
	              <p class={"p1"}>Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.</p>
	              <p class={"p2"}><span class={"s1"}>Links to Other Websites</span></p>
	              <p class={"p1"}>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
	              <p class={"p1"}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
	              <p class={"p2"}><span class={"s1"}>Changes to this Privacy Policy</span></p>
	              <p class={"p1"}>We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
	              <p class={"p1"}>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
	              <p class={"p1"}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
	              <p class={"p2"}><span class={"s1"}>Contact Us</span></p>
	              <p class={"p1"}>If you have any questions about this Privacy Policy, You can contact us:</p>
	              <p class={"p4"}>By email: info@interny.net</p>
	              <p class={"p4"}>By visiting this page on our website: <a href="https://www.interny.net/help">https://www.interny.net/help</a></p>
	            </div>
	          </div>
	        </div>
			<Footer />
			</>
        );
    }
}

export default PrivacyPage;
