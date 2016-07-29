(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name voyHoyEropeFrontApp
   * @description
   * # voyHoyEropeFrontApp
   *
   * Main module of the application.
   */
  var app = angular
    .module('vhEurope', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'rzModule',
      'pascalprecht.translate',
      'angular-loading-bar',
      'constants',
      'ui.router',
      'ui.mask',
      'LocalStorageModule',
      'ngProgress',
      'angulartics',
      'angulartics.google.analytics',
      'satellizer',
      'ngImgCrop',
      'matchMedia'
    ]);

  app.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('search', {
        url: '/search/:origin/:originCountryCode/:destination/:destinationCountryCode/:departureDate/:returnDate',
        templateUrl: 'views/search.tpl.html',
        controller: 'SearchController',
        controllerAs: 'search'
      })
      .state('seat', {
        url: '/seat/:idDeparture/:idReturn',
        templateUrl: 'views/seat.tpl.html',
        controller: 'SeatController',
        controllerAs: 'seat'
      })
      .state('payment', {
        url: '/payment/:idDeparture/:idReturn',
        templateUrl: 'views/payment.tpl.html',
        controller: 'PaymentController',
        controllerAs: 'payment'
      })
      .state('success', {
        url: '/success',
        templateUrl: 'views/success.tpl.html',
        controller: 'SuccessController',
        controllerAs: 'success'
      })
      .state('legal-text', {
        url: '/legal-text',
        templateUrl: 'views/legal-text.tpl.html',
      })
      .state('privacy-policy', {
        url: '/privacy-policy',
        templateUrl: 'views/privacy-policy.tpl.html',
      })
      .state('cookies-policy', {
        url: '/cookies-policy',
        templateUrl: 'views/cookies-policy.tpl.html',
      })
      .state('terms', {
        url: '/terms',
        templateUrl: 'views/terms.tpl.html',
      })
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'views/about-us.tpl.html',
      })
      .state('cancel', {
        url: '/cancel/:uuid',
        templateUrl: 'views/cancel.tpl.html',
        controller: 'CancelController',
        controllerAs: 'cancel'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.tpl.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "views/signup.tpl.html",
        controller: "SignUpController",
        controllerAs: "signup"
      })
      .state("logout", {
        url: "/logout",
        templateUrl: null,
        controller: "LogoutController",
        controllerAs: "logout"
      })
      .state("profile", {
        url: "/customer-profile",
        templateUrl: 'views/profile.tpl.html',
        controller: "CustomerProfileController",
        controllerAs: "cprofile"
      })
      .state("purchases", {
        url: "/customer-purchases",
        templateUrl: 'views/purchases.tpl.html',
        controller: "CustomerPurchasesController",
        controllerAs: "cpurchase"
      })
      .state("settings", {
        url: "/customer-settings",
        templateUrl: 'views/settings.tpl.html',
        controller: "CustomerSettingsController",
        controllerAs: "csettings"
      })
      .state("pdf-info", {
        url: "/pdf-info",
        templateUrl: 'views/pdf-info.tpl.html',
      })
  });



  app.config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('es', translationsES);
    $translateProvider.translations('fr', translationsFR);

    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy();
    $translateProvider.useCookieStorage();
    $translateProvider.fallbackLanguage('es');
  }]);

  app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);

  app.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('resertrip')
      .setStorageType('sessionStorage');
  }]);

  app.config(function($authProvider, apiUrl) {
    // Parametros de configuración
    $authProvider.loginUrl = apiUrl + "login";
    $authProvider.signupUrl = apiUrl + "register";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "resertrip";
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = '';
  });

  var translationsEN = {
    "MAIN": {
      "TITLE": "TRAVEL SMART WITH RESERTRIP",
      "SUBTITLE": "Compare and buy",
      "BUS": "Bus",
      "TRAIN": "Train",
      "PLANE": "Plane",
      "FERRY": "Ferry",
      "CAR": "Car",
      "FIND_PASSAGES": "Find your bus ticket in Spain",
      "CTA_BUY": "Purchase from your",
      "CTA_PHONE": "MOBILE",
      "BUS_COMPANIES": "Bus companies in Spain",
      "MUCH_MORE": "And many more.",
      "CHOOSE_ORIGIN": "Choose your origin",
      "CHOOSE_DESTINATION": "Choose your destination",
      "RETURN": "Return",
      "COOKIES_MESSAGE": "This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.",
      "SEARCH": "Search"
    },
    "TIME": {
      "TITLE": "Your time has run out",
      "MESSAGE": "The time to make your purchase has exceeded the maximum time. Please try again. <br>The results page will load automatically."
    },
    "POPULAR_TRIPS": {
      "FROM": "from",
      "TO": "to"
    },
    "NAVBAR": {
      "PASSAGES": "Tickets",
      "BUSOLOGY": "Busologia",
      "BLOG": "Blog",
      "SPANISH": "Spanish",
      "ENGLISH": "English",
      "FRENCH": "French",
      "MESSAGE": "All your transportation options",
      "LANGUAGE": "Language"
    },
    "FOOTER": {
      "TERMS": "General Conditions",
      "PRIVACITY": "Privacy Policies",
      "LEGAL_TEXT": "Legal Text",
      "COOKIES": "Cookies Policy",
      "COPYRIGHT": "2016 Resertrip. All rights reserved.",
      "ABOUTUS_LABEL": "About Us",
      "LEGAL_TEXT_CONTENT": "<p class='lead text-center'>LEGAL TEXT</p><p class='text-justify'>In compliance with the Spanish Organic Law 15/1999 of December 13th pursuant to the Protection of Personal Data, we inform you that the personal data provided will be included in a file owned by the company with the purpose of carrying out actions corresponding to the purchase of the selected ticket. Likewise, we inform you that the data provided as a result of the purchase will be stored in <b>DATOS RESERTRIP</b> and in addition will be transferred to the concessionary companies of regular passenger lines for transport systems. <b>DATOS RESERTRIP</b> as well as the concessionary companies are responsible for the confidentiality in the terms legally required according to their specific privacy policies.</p><p class='text-justify'>The fields of the form marked with asterisks (*) are required to be completed. Failure to include these details will mean your purchase cannot be processed. </p><p class='text-justify'>Sending your personnel data implies the acceptance and consent in the treatment of the same, your personnel data will be incorporated into a duly registered file in the General Data Protection Register.</p><p class='text-justify'>We understand that the details provided correspond to the interested party and are true. <b>RESERTRIP</b> reserves the right to exclude all users who have submitted false information from this service, without prejudice to any other legal action that may be taken by the company. You are responsible for informing <b>RESERTRIP</b> if there is any change to the personal information you have provided.</p><p class='text-justify'><b>RESERTRIP</b> guarantees that you may exercise your right to access, correct, challenge, or delete the information provided in accordance with the procedure established in prevailing legislation by sending an email to <a href='mailto:info@resertrip.com'>info@resertrip.com</a> or writing to: <b>RESERTRIP S.L., Avenida General Peron 26, Madrid 28020</b>. In both cases you should attach a photocopy of your National Identity Card, or another document which accredits your identity.</p>",
      "COOKIES_CONTENT": "<p class='lead text-center'>Cookies policy</p><p class='text-justify'>Cookies are small pieces of information that are stored on the browser used by each user for the server to remember certain information that can later be used. This information can identify you as a specific user and allows you to save your personal preferences and technical information as may be views or particular pages you visit. Users who do not wish to receive cookies or wish to be informed before they are stored on their computer can configure their browser to that effect.</p> <p class='text-justify'>The cookies we use do not store any personal data or otherwise collect personally-identifiable information. Cookies are used to improve the services we offer. Some are strictly necessary to make the page work well and others are used to improve performance and your experience as a user.</p> <p class='text-justify'>Below, cookies are classified based on a number of categories.</p> <p class='text-left'><b>Types of cookies managed according to the different entities:</b></p> <p class='text-justify'>First-party cookies: are those that are sent to the user's terminal equipment from a computer or domain managed by the own editor and from which it provides the service requested by the user.</p> <p class='text-justify'>Third-party cookies: are those that are sent to the user's terminal equipment from a computer or domain which is not managed by the editor, but by another entity that processes data through cookies.</p> <p class='text-left'><b>Type of cookies according to the period of time they remain active:</b></p> <p class='text-justify'>Session cookies: type of cookies designed to collect and store data while the user accesses a web page.</p> <p class='text-justify'>Persistent cookies: type of cookies in which data remains stored in the terminal and can be accessed and processed for a period of time defined by the creator of the cookie, it can range from a few minutes to several years.</p> <p class='text-left'><b>Types of cookies according to their purpose:</b></p> <p class='text-justify'>Technical cookies: are those that allow the user to surf through a web page, platform or application and use the different options or services that may exist as, for example, traffic control and data communication, identify the session, access to restricted areas parts, recall elements that make up an order, perform the purchase process of an order, submit the registration application of an event, use safety elements while surfing, store content for audio or video broadcasting, or share content through social networks.</p> <p class='text-justify'>Customized cookies: are those that allow the user to access the service according to some general features which are predefined on the basis of a series of criteria in the user´s terminal, such as the language, type of browser accessing the service, local configuration to access the service, etc…</p> <p class='text-justify'>Analytic cookies: are those that allow the person responsible for them, to follow-up and analyse user´s behaviours of web sites to which they are linked. The information collected through this type of cookie is used for measuring the activity of web sites, applications or platforms and for users' browsing profiling of such sites, for making improvements based on usage data analysis made by service users.</p> <p class='text-justify'>Advertising cookies: are those that allow management of advertising spots, as efficiently as possible that the editor has included in a web page, application or platform from where the provided service is requested on the basis of criteria such as the edited content or the frequency in which the spots are displayed.</p> <p class='text-justify'>Behavioural advertising cookies: are those that allow management of advertising spots, as efficiently as possible, that the editor has included in a web page, application or platform from where the provided service is requested. These cookies store information on user behaviour obtained through the observation of their surfing habits, enabling development of a specific profile to display advertising based on the same.</p> <p class='text-justify'>You will find more information about cookies and how to manage them at <a href='http://www.aboutcookies.org' target='_blank'>www.aboutcookies.org</a>.</p> <p class='text-justify'><b>The following types of cookies are used in the RESERTRIP website <a href='www.resertrip.com'>www.resertrip.com</a>:</b></p> <p class='text-justify'>Analytic cookies: these cookies are used to analyse user habits in an aggregated and anonymous form, including the number of visits to the website and to the different product sheets, the origin of visits, day and time, platform, number of clicks on a banner and search words used by a user to find the desired content. This allows RESERTRIP to employ a useful method for making improvements in its website and know what content or design is more relevant to the user.</p> <p class='text-justify'>Functional cookies: these cookies help users to have a better web surfing experience through the site. An example for using this type of cookie is the one used for storing browsing data of a specific language.</p> <p class='text-justify'>Technical cookies: these cookies are necessary to display the website properly and ensure the correct functioning of the site.</p>",
      "PRIVACITY_CONTENT": "<p class='lead text-center'>PRIVACY POLICY</p><p class='text-justify'>By means of this legal notice, <b>RESERTRIP S.L.</b> (<b>RESERTRIP</b>), domiciled in Avenida General Peron 26, Madrid 28020, informs users of the web page of its property about its policy of privacy and protection of personal data, so that users can freely and voluntarily determine whether they wish to provide the personal data that may be requested, with the purpose of utilization of certain services within our web page.</p><p class='text-justify'>Any person who accesses this website assumes a user role, committing themselves to the observance and strict compliance with the provisions contained herein, as well as any other legal provision set out.</p><p class='text-justify'>The user undertakes not to use this web site for fraudulent purposes, as well as to not engage in any conduct that could damage the image, the interests and rights of <b>RESERTRIP</b>. In the event of a breach by the user of the conditions of use of this web site, or reasonable suspicion by the company that the user is breaking them, <b>RESERTRIP</b> reserves the right to limit, suspend or terminate your access to the website, taking any technical measure as may be necessary for that purpose.</p><p class='text-justify'>Through the present web page we will not gather any information that can personally identify you, unless you voluntarily decide to provide it to us, either by performing operations of ticket purchase or coach hire, or by the e-mail address inserted in our web page, or by registering as a user in our web page.</p><p class='text-justify'>The provided personal data will be stored in a personal data file and will be treated, according to the occasion, with the purpose of processing the necessary steps for the ticket purchases, coach hires, resolution of claims or enquiries, as well as for purposes of processing the registration of users in our web page. We also inform you that the data provided as a consequence of the purchase of a ticket will be stored in DATOS <b>RESERTRIP</b> and will also be transferred to the systems of the dealer companies for regular passenger transport. Both DATOS <b>RESERTRIP</b> and the dealer companies are responsible for their confidentiality in the required legal terms, according to their specified privacy policies.</p><p class='text-justify'>Likewise, we inform you that it is our wish to keep you informed by any means, even e-mail or another equivalent electronic means, about news, products and services related to <b>RESERTRIP</b> in which you could be interested. In this regard, if you do not wish your data to be treated with this purpose you can reject it by sending us an e-mail informing so to the following address: info@resertrip.com. Otherwise, we understand that you authorize us to treat your personal data with the related advertising purposes. Similarly, each commercial communication will include this rejecting option to the treatment of your personal data.</p><p class='text-justify'>Rights of access, rectification, cancellation and rejection shall be carried out according to what it is established in current norms, by means of request addressed to our email address info@resertrip.com or to the postal address: <b>RESERTRIP</b> S.L. Avenida General Peron 26, Madrid 28020, attaching in any case photocopy of DNI or equivalent valid identity document.</p><p class='text-justify'>The user will respond in any case for the veracity of the provided data, while <b>RESERTRIP</b> will reserve to itself the right to exclude from the registered service those users that have provided false data, without prejudice to any other proceeding actions under Law.</p><p class='text-justify'>The user is responsible for communicating <b>RESERTRIP</b> any modification of the provided personal data.</p><p class='text-justify'><b>RESERTRIP</b> will comply with what it is established in current norms in regards to the obligation to cancel the personal information that becomes unnecessary for the purpose or for the purposes for which it was gathered, blocking it, hence being able to take care of possible responsibilities derived from the treatment of data, and only during the prescription terms for those responsibilities. Once these terms have passed, the information will be definitively erased using safe methods.</p><p class='text-justify'>Children under 14 years old should not provide any personal information without their parent’s or guardian’s consent. <b>RESERTRIP</b> is not responsible for any personal information sent by children under 14 years old without proper authorization.</p><p class='text-justify'><b>RESERTRIP</b> has adopted the personal data protection safety levels that are legally required for the involved information, and has implemented additional means and technical actions in its scope in order to avoid alteration, loss, treatment or unauthorized access related to the provided personal data, according to what is established in current legislations for protection of personal data. However, the user must be conscious about the fact that internet security actions are not absolutely reliable.</p><p class='text-justify'>When you access our web site, we do not store any information in your computer through cookies with the purpose of automatically recognizing you the next time that you access the site.</p><p class='text-justify'>Our Web Page contains links to other sites. It should be noted that <b>RESERTRIP</b> does not take responsibility for the privacy policy of those sites. We warn consumers to be careful when abandoning our site and to read the privacy policies of all and each of the sites that gather information that can personally identify people. This privacy policy only applies to the information contained in <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'><b>RESERTRIP</b> reserves the right to modify the present Privacy Policy in order to adapt it to future legal or jurisprudence news. In such cases, modifications will be announced in this page with a reasonable time before applying the modifications.</p><p class='text-justify'><b>RESERTRIP</b> provides users with the technical resources to be able to access this notice about Privacy and Data Protection Policy, as well as any other relevant information so that they can provide consent in order to allow this company to proceed with the treatment of their personal data.</p><p class='text-justify'>All of the contents, elements, designs and applications housed in this webpage, whatever its format and features, as well as all the Industrial and intellectual property rights inherent in this web site, are property of <b>RESERTRIP</b> and are protected both under the Industrial and Intellectual Property regulations as well as the rest of legislation in force. Such content may not be object of exploitation, reproduction, distribution, modification, public communication, assignment, transformation or any other process of dissemination that has not been expressly and previously authorized. <b>RESERTRIP</b> reserves itself the right to take the appropriate legal actions against those who violate the ownership rights.</p><p class='text-justify'>The Spanish law will be applied for the resolution of all disputes or issues regarding this web site or the activities therein. Both parties expressly submit, for the resolution of all conflicts derived or related to its use in the Courts and Tribunals of Madrid.</p><p class='text-justify'><b>RESERTRIP S.L.</b> , in virtue of what it is stated in article 10 within Law 34/2002 of Services of Information Society and Electronic Commerce, and complying with the transparency principle within our company, informs the users of its web page: <br>Company name: <b>RESERTRIP</b> S.L. <br>Company address: Avenida General Peron 26, Madrid 28020. <br>C.I.F: B83418830 <br>Registration data within Trading Registry: incorporated in the Trading Registry of Madrid, in Volume 18113, sheet 9, page M-313290. <br>E-mail address: <a href='mailto:info@ysolutions.es'>info@ysolutions.es</a>. <br>Contact phone number: 912309169<br></p>",
      "ABOUTUS": "<div class='container'> <div class='row'> <div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Our Mission</strong></h5> <p>Simply put we help you to travel from A to B.</p><p>Our aim is to provide our customers with:</p><ul> <li>Up to date information on how to travel from A to B</li><li>Providing all the traveling possibilities between these two points</li><li>A fast and easy comparison within and between different modes of transportation.</li></li><li>Purchasing a ticket in a reliable and quick way.</li></ul> <p>All this in a single website with just a few clicks: <a href='http://www.resertrip.com'>www.resertrip.com</a></p><p>Mobility has become a key feature in our global society. Faced with an ever increasing offer between different modes of transportation, the complexity of finding the best suitable traveling opportunity has become daunting.</p><p> From low cost airlines to low cost bus lines.<br>From high speed train to ferry boat. <br>From public transport to private transport (car sharing, Uber, etc...).<br>The options are growing by the day and so is the complexity. </p><p>How can I travel easily from A to B? <a href='www.resertrip.com'>www.resertrip.com</a> is the answer to your problem by reserving your trip on a single website with just a few clicks.</p></div></div></div><div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Our Project</strong></h5> <p>Our aim is to create not only a digital platform where customers can compare and buy tickets, but also to provide information and facilitate your trip. Information on transportation companies, terminals (bus, train, airport), what activities to do at your destination point, etc...</p><p>We also aim to provide all type of services around your trip such as car hire, hotel reservation, reserving your tourist attraction, etc... All in all, everything you need for your trip in one portal with just a few clicks, in as many countries in the world as possible.</p><p>We are developing our presence in Europe and South America first and will expand to other continents in the near future. Whether you are traveling in your home country or traveling abroad on business or for holidays we aim to make your travel as easy as possible. Reserve your next trip on <a href='http://www.resertrip.com.'>www.resertrip.com.</a></p></div></div></div><div class='col-md-12'> <br><div class='box'> <div class='box-content'> <h5><strong>Our Team</strong></h5> <p>We are an international diverse team with a long experience in both transportation and digital marketing. We are based in Madrid and are the first Spanish based multi modal internet platform.</p><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/roderick.jpg' alt='' class='img-circle'> <p>Roderick</p><span>CEO & Founder</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/pablo.jpg' alt='' class='img-circle'> <p>Pablo</p><span>Co-Founder, Sales & Marketing</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/celine.jpg' alt='' class='img-circle'> <p>Celine</p><span>Social Media</span> </div></div></div><br><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jake.jpg' alt='' class='img-circle'> <p>Jake</p><span>Co-Founder & CTO</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/abel.jpg' alt='' class='img-circle'> <p>Abel</p><span>Programming & Development</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jhesus-colmenares.jpg' alt='' class='img-circle'> <p>Jesús</p><span>Programming & Development</span> </div></div></div></div></div></div></div></div>",
      "TERMS_CONTENT": "<p class='lead text-center'>GENERAL CONDITIONS</p><p class='text-justify'><b>RESERTRIP</b></p><p class='text-justify'><b>RESERTRIP</b> is a multimodal platform that facilitates the comparison and sale of tickets in various countries. <b>RESERTRIP</b> is an intermediary between the user and the transportation company. Each transportation company has its own terms and conditions of transportation applicable to its sector and country. Under no circumstances can <b>RESERTRIP</b> be held responsible for any damages and / or claims that may occur during the trip. Customers can consult the specific terms and conditions of transportation at each transportation company’s website.</p><p class='text-justify'><b>Responsibility</b></p><p class='text-justify'>Responsibility of the carrier corresponds to the company effectively executing the service. The transport company does not respond for any non-compliance that is not directly attributable to the same, or for any produced due to a fortuitous case, force majeure or due to legal or administrative demands. In like manner the company is not responsible for any losses in the connection to their services with other transport companies or with their own services. In the case of International services, responsibility corresponds to the transportation company, in accordance to the Laws and Tribunals of the company's country.<p class='text-justify'><b>Luggage</b><p class='text-justify'>Each transport company establishes the maximum weight of luggage that is transported free of charge. Excess luggage weight will be paid in accordance to the amount of the corresponding tariff. In the case of luggage check-in, the company will present the passenger with the corresponding receipt.</p><p class='text-justify'>In the case of loss or deterioration of transported luggage, the claim must be placed immediately after arrival, duly presenting the ticket and luggage check receipt.</p><p class='text-justify'>The carrier's responsibility is limited for national services depending on each countries legislation. On international services, the responsibility lies with the company effectively executing transport and in conformity with the legislation that proceeds. The carrier does not respond for any damage, prejudicial consequences or deterioration suffered by hand luggage or other objects that are not entrusted to their custody.</p><p class='text-left'><b>Bicycles</b></p><p class='text-justify'>The conditions for the transport of bicycles vary depending on the transportation company. For each specific conditions please consult the individual transportation company.</p><p class='text-left'><b>Pets</b></p><p class='text-justify'>The conditions for the transport of pets vary depending on the transportation company. For each specific conditions please consult the individual transportation company.</p><p class='text-left'><b>Cancellation and change in tickets</b></p><p class='text-justify'>Cancellation and changes in tickets sold through the <b>RESERTRIP</b> website may be made through the link provided after the purchase of the ticket via <b>RESERTRIP</b> or directly via the transportation company, and always following the applicable terms and conditions.</p><p class='text-left'><b>Closing of tickets with open return</b></p><p class='text-justify'>If the date, time and seat corresponding to the return trip are not consigned on the forward and return ticket, the passenger must go to the company's corresponding booking office as soon as possible to confirm the return trip, which will be conditioned to availability of seats on the requested date.</p><p class='text-left'><b>Price of the ticket(s)</b></p><p class='text-justify'>The total amount for a ticket or tickets purchased through the Internet consists in the price of the ticket according to the tariff of the transportation company at the moment of purchase, plus in certain cases a service fee charged by the selling party.</p><p class='text-left'><b>Official complaints</b></p><p class='text-justify'>Should the passenger wish to log an official complaint against the transportation company, he / she will have to effect same as soon as possible from the date the transportation service should have occurred. The complaint will be processed in accordance to the applicable law.</p><p class='text-left'><b>Discounts</b></p><p class='text-justify'>Purchase of tickets through the Internet allows applying discounts, this depending on the commercial policy of each company.</p><p class='text-justify'>Passenger entitled to a specific discount must provide proper documentation in order to board a coach, train or plane.</p><p class='text-left'><b>Ownership of the ticket</b></p><p class='text-justify'>Tickets purchased through the Internet are nominative and non-transferable. The passenger's personal identification document is required to use the ticket and the same must correspond with the personal identification number appearing on the ticket.</p><p class='text-justify'>You will have to present your personal identification to travel, either when traveling with a ticket printed on the <b>RESERTRIP</b> web site, or when a physical print-out is requested at the sales point.</p><p class='text-justify'>In the case of tickets purchased through the Internet for minors special conditions apply for identification of the adult accompanying the minor.</p><p class='text-left'><b>Purchasing process</b></p><p class='text-justify'></p>As a general rule <b>RESERTRIP</b> allows the purchase of the ticket on its website. In some cases, where this is not possible, customers will be redirected to the transportation company website to finalize the purchase process.<p class='text-justify'>Once you have finished the purchase process, we recommend that you press the PRINT button that appears on the screen in the 'Purchase Result'. If you do not wish to print the ticket or if printing is impossible, please annotate the locator number in a safe place so that you can request a print-out of the ticket at the transport company's booking office.</p><p class='text-left'><b>Invoice</b></p><p class='text-justify'>If the customer wishes an invoice for the purchased tickets he / she will have to contact the individual transportation company.</p><p class='text-left'><b>Connecting services</b></p><p class='text-justify'>According to the legislation on transport, some routes can be executed by means of service connection with combination of timetables for a certain stop and unique issuance of tickets, which would require a change of bus, train or plane at said stop.</p><p class='text-left'><b>Documentation</b></p><p class='text-justify'>Each passenger must carry the necessary documents (passport, visa, etc.) to cross borders, according to the laws of the country or countries for which they are crossing. If due to causes in which the documentation is not in order, and the passenger is not admitted at boarding, or the entry into any country is prohibited, all expenses will be at his cost, including the return, and the refunding of ticket will not proceed.</p><p class='text-justify'>The ticket must be kept by the passenger during the entire trip, both for one way or return. Lost or stolen ticket, are neither replaced nor refunded.</p><p class='text-left'><b>Minors</b></p><p class='text-justify'>On international services, children under 16 years old must travel accompanied by an adult legally authorized. Youngsters aged between 16 and 18 years, need a passport and police authorization to travel.</p><p class='text-justify'>In national services, the travelling conditions for unaccompanied youngsters vary depending on the carrier company. Please check in each case.</p><p class='text-justify'>The total amount for a ticket or tickets purchased through the Internet consists in the price of the ticket according to the tariff of the transportation company at the moment of purchase, plus in certain cases a service fee charged by the selling party.</p><p class='text-left'><b>Payment modes</b></p><p class='text-justify'>Payments can be made through credit or debit cards on the website of <a href='www.resertrip.com'>www.resertrip.com</a>.</p>"
    },
    "PASSENGERS": {
      "TITLE": "Passengers",
      "ADULTS": "Adults",
      "CHILDREN": "Children",
      "BABIES": "Babies"
    },
    "SEARCH": {
      "LOADING_MESSAGE": "Loading results...",
      "NO_DEPARTURES": "No departures",
      "SEARCHING": "Searching",
      "SORT": {
        "ORDER_BY": "Order by",
        "COMPANY": "Companies",
        "HORARY": "Departure Time",
        "PRICE": "The cheapest",
        "DURATION": "The fastest"
      },
      "FILTERS": {
        "MAP_TITLE": "TRIP INFORMATION",
        "MAP_DISTANCE": "Distance:",
        "MAP_DURATION": "Duration:",
        "TITLE": "FILTERS",
        "RESULTS": "results",
        "DEPARTURE_HOUR": "DEPARTURE HOUR",
        "PRICE": "PRICE",
        "SEAT_TYPE": "SEAT TYPE",
        "COMPANIES": "COMPANIES"
      },
      "TRIPS": {
        "ROUND": "Round",
        "DEPARTURE": "Departure",
        "RETURN": "Return",
        "RESULTS": "results",
        "BUTTON": "BUY"
      },
      "WEATHER": {
        "TITLE_1": "We are looking for the best deals. Please wait.",
        "TITLE_2": "Looking for tickets in other bus companies."
      },
      "NO_RESULTS": {
        "TITLE": "We are sorry. No information found for this route. : (",
        "MESSAGE": "You can not find tickets for the selected destination. They may be exhausted or sale is not available online.",
        "FIND_NEXT_DAY": "Find tickets for the next day"
      },
      "SELECTED_TRIP": {
        "TITLE_1": "Choose your way ticket",
        "TITLE_2": "before selecting your Return",
        "TITLE_3": "Choose your return trip",
        "TITLE_4": "to select your seats",
        "TITLE_5": "Your Ticket Selected",
        "TITLE_6": "Change ticket"
      },
      "SCRAPER": {
        "TITLE": "COMPARE TICKETS",
        "MESSAGE": "These prices are not guaranteed."
      }
    },
    "SEATS": {
      "LOADING_MESSAGE": "Loading seat map...",
      "PASSAGE_ROUND": "Round Trip:",
      "PASSAGE_RETURN": "Return Trip:",
      "FLOOR_1": "FLOOR 1",
      "FLOOR_2": "FLOOR 2",
      "SELECTION_LABEL": "Your seats:",
      "SELECTION_SUBLABEL": "Please select a maximum of 7 seats.",
      "SELECTION_SUBLABEL_NUMBER": " seat(s)",
      "LEGEND_AVAILABLE": "Available",
      "LEGEND_UNAVAILABLE": "Occupied",
      "LEGEND_SELECTED": "Selected",
      "PURCHASE_SUMMARY": "PURCHASE SUMMARY",
      "PURCHASE_BUTTON": "PAY NOW",
      "PURCHASE_TOTAL": "Total",
      "PURCHASE_SEATS": "Seats",
      "PURCHASE_SEAT": "Seat",
      "PURCHASE_ROUND": "Round",
      "PURCHASE_RETURN": "Return",
      "FORM_LABEL_PASSAGE": "Ticket",
      "FORM_LABEL_SEAT": "Seat",
      "FORM_NAME": "Name",
      "FORM_LASTNAME": "Lastname",
      "FORM_RUT": "Document No.",
      "FORM_PASSPORT": "PASSPORT",
      "FORM_COUNTRY": "Country",
      "FORM_COUNTRY_TEXT": "Select a country",
      "FORM_PHONE": "Phone",
      "FORM_PHONE_PLACEHOLDER": "Phone",
      "FORM_EMAIL": "Email",
      "FORM_EMAIL_PLACEHOLDER": "Email",
      "FORM_BTN_SELECT": "Select",
      "FORM_BTN_UPDATE": "Update",
      "REDIRECT": "Soon you will be redirected to the search page automatically"
    },
    "PAYMENT": {
      "INFORMATION": {
        "TITLE": "PAYER INFORMATION",
        "FORM_NAME": "Name",
        "FORM_LASTNAME": "Lastname",
        "FORM_DNI": "DNI",
        "FORM_CREDIT_CARD": "Credit Card Number",
        "FORM_CREDIT_CARD_PLACEHOLDER": "Credit Card Number",
        "FORM_CVV": "CVV",
        "FORM_MONTH": "Month",
        "FORM_YEAR": "Year",
        "FORM_EMAIL": "Email",
        "FORM_EMAIL_PLACEHOLDER": "Email",
        "FORM_NOTIFICATIONS": "Receive notifications deals."
      },
      "PAY": {
        "TITLE": "PAYMENT METHODS",
        "SUBTITLE": "Select a payment method",
        "TERMS": "When buying you agree to our",
        "TERMS_LINK": "Terms and Conditions",
        "BUTTON": "PAY NOW"
      },
      "PURCHASE": {
        "TITLE": "PURCHASE INFORMATION",
        "SUBTOTAL": "Subtotal",
        "FEES": "Service Fee",
        "TOTAL": "TOTAL",
        "ROUND": "Trip",
        "RETURN": "Return",
        "PROCESS": "Your purchase is in process, please wait a few seconds",
        "TRAVEL_DETAIL": "Please check your travel details."
      },
      "PROMOTION": {
        "LABEL": "VOUCHER PROMOTION",
        "PLACEHOLDER": "Promotion Code",
        "VALIDATE": "VALIDATE"
      }
    },
    "SUCCESS": {
      "TITLE": "Your purchase was successful",
      "SUBTITLE": "Dear ",
      "TEXT_1": "Thank you very much for trusting in",
      "TEXT_2": "Resertrip",
      "TEXT_3": "We send an email with the details of your trip and your attachment passage",
      "ROUND": {
        "TITLE": "ROUND",
        "NO_TRIPS": "No. OF PASSAGES:",
        "TICKETS": {
          "TITLE": "TICKETS",
          "DNI": "DNI:",
          "NAME": "NAME:",
          "SEAT": "SEAT:",
          "CODE": "CODE:",
          "PRICE": "PRICE:"
        }
      },
      "RETURN": {
        "TITLE": "RETURN",
        "NO_TRIPS": "No. OF PASSAGES:",
        "TICKETS": {
          "TITLE": "TICKETS",
          "DNI": "DNI:",
          "NAME": "NAME:",
          "SEAT": "SEAT:",
          "CODE": "CODE:",
          "PRICE": "PRICE:"
        }
      },
      "PAYMENT": {
        "TITLE": "PAYMENT DETAIL",
        "TYPE": "Payment method:",
        "TOTAL": "TOTAL:",
        "LINK": "Terms and Conditions",
        "TOTALFEE": "Service Fee:"
      }
    },
    "CANCEL": {
      "TITLE": "We present your list of passages",
      "CANCELMSG": "This list of passages already canceled",
      "BUTTON": "Cancel",
      "EXPIRED": "This purchase has expired",
      "SECTION": "Section"
    },
    "SESSION": {
      "LOGIN": "Login",
      "LOGIN_BUTTON": "Login",
      "REGISTER": "Sign up",
      "REGISTER_TITLE": "Create account",
      "SIGNIN": "Sign in",
      "REMEMBER": "Remember",
      "FORGOT": "Forgot password?",
      "EMAIL": "Email",
      "PASSWORD": "Password",
      "NAME": "Name",
      "CONFIRM_PASSWORD": "Confirm password",
      "RECOVER": "Recover your password",
      "RECOVER_BUTTON": "Recover password",
      "RECOVER_TEXT": "Please enter your email and soon we'll send you the steps to proceed to recover the password",
      "ERROR_LOGIN": "Check the email or password",
      "INF_RECOVER": "You have successfully reset your password, please check your email",
      "GOOD": "Great!",
      "EXIT": "Exit",
      "PROFILE": "Profile",
      "DASHBOARD": "Dashboard",
      "PURCHASES": "Purchases",
      "SETTINGS": "Settings",
      "HELLO": "Hello",
      "SMS_TRIPS": "TRIPS MADE",
      "SMS_KILOMETERS": "kMS TRAVELS",
      "UPDATE_BUTTON": "Update",
      "TITTLE_UPLOAD_IMAGE": "Upload new image",
      "ERROR_UPLOAD_IMAGE": "Error uploading image",
      "UPLOADING_IMAGE": "Uploading image...",
      "IMAGE_PREVIEW": "Preview",
      "TEXT_UPLOAD_IMAGE": "Select or drag image here",
      "PURCHASES_TEXT1": "Trips purchased",
      "PURCHASES_TEXT2": "Trips expired",
      "PURCHASES_TEXT3": "Trips cancelled",
      "PURCHASES_TEXT4": "Searching trips...",
      "PURCHASES_TEXT5": "There is not trips purchased",
      "PURCHASES_TEXT6": "There is not trips expired",
      "PURCHASES_TEXT7": "There is not trips cancelled",
      "PURCHASES_TEXT8": "Trip",
      "PURCHASES_TEXT9": "Passenger",
      "PURCHASES_TEXT10": "Date",
      "PURCHASES_TEXT11": "# ticket",
      "PURCHASES_TEXT12": "Price",
      "SETTINGS_TEXT1": "General information",
      "SETTINGS_TEXT2": "Password",
      "SETTINGS_TEXT3": "Emergency contact",
      "SETTINGS_TEXT4": "Unsubscribe",
      "SETTINGS_TEXT5": "<strong>Wait!</strong> Are you sure you want to delete your account?",
      "SETTINGS_TEXT6": "Yes, I'm sure",
      "LASTNAME": "Lastname",
      "DNI": "# DNI",
      "ADDRESS": "Address",
      "BIRTHDATE": "Birthdate",
      "PHONE": "Phone number",
      "PASSWORD_TEXT1": "Current password",
      "PASSWORD_TEXT2": "New password",
      "UPDATE_TEXT1": "Updated information",
      "UPDATE_TEXT2": "Passwords don't match",
      "UPDATE_TEXT3": "Check the current password"
    },
    "PDF": {
      "TITLE": "Sorry, something went wrong",
      "SUB-TITLE": "Right now it is not possible to download the PDF of your ticket, please try again or later.",
      "DESCRIPTION": "To try again remember do it from your email or from the view of Successful Purchase."
    }
  };
  var translationsES = {
    "MAIN": {
      "TITLE": "VIAJA INTELIGENTE CON RESERTRIP",
      "SUBTITLE": "Compara y compra",
      "BUS": "Autobús",
      "TRAIN": "Tren",
      "PLANE": "Avión",
      "FERRY": "Barco",
      "CAR": "Auto",
      "FIND_PASSAGES": "Encuentra tus billetes de autobús en España",
      "CTA_BUY": "Compra desde tu",
      "CTA_PHONE": "MOVIL",
      "BUS_COMPANIES": "Empresas de autobuses en España",
      "MUCH_MORE": "Y muchas más.",
      "CHOOSE_ORIGIN": "Elige tu origen",
      "CHOOSE_DESTINATION": "Elige tu destino",
      "RETURN": "Vuelta",
      "COOKIES_MESSAGE": "Este portal, al igual que la mayoría de portales en Internet, usa cookies para mejorar la experiencia del usuario. Continuar en la página supone aceptar el uso de estas cookies.",
      "SEARCH": "Buscar"
    },
    "TIME": {
      "TITLE": "Tu tiempo se ha agotado",
      "MESSAGE": "El tiempo para realizar su compra ha excedido el tiempo máximo. Por favor inténtelo de nuevo. <br>La página de resultados se cargará automáticamente."
    },
    "POPULAR_TRIPS": {
      "FROM": "desde",
      "TO": "a"
    },
    "NAVBAR": {
      "PASSAGES": "Billetes",
      "BUSOLOGY": "Busologia",
      "BLOG": "Blog",
      "SPANISH": "Español",
      "ENGLISH": "Inglés",
      "FRENCH": "Francés",
      "MESSAGE": "Todas tus opciones de transporte",
      "LANGUAGE": "Idioma"
    },
    "FOOTER": {
      "TERMS": "Condiciones Generales",
      "PRIVACITY": "Políticas de Privacidad",
      "LEGAL_TEXT": "Texto Legal",
      "COOKIES": "Políticas de Cookies",
      "COPYRIGHT": "2016 Resertrip. Todos los derechos reservados.",
      "ABOUTUS_LABEL": "Nosotros",
      "LEGAL_TEXT_CONTENT": "<p class='lead text-center'>TEXTO LEGAL</p><p class='text-justify'>En cumplimiento de lo dispuesto en la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, le informamos que los datos personales facilitados serán incluidos en un fichero titularidad de Resertrip S.L. con la finalidad de llevar a cabo las gestiones correspondientes a la compra del billete seleccionado.</p> <p class='text-justify'>Asimismo, le informamos que los datos facilitados como consecuencia de la compra se almacenarán en DATOS <b>RESERTRIP</b> y además serán transferidos a los sistemas de las compañías concesionarias de líneas regulares de transporte de viajeros. Tanto DATOS <b>RESERTRIP</b> como las compañías concesionarias se responsabilizan de su confidencialidad en los términos exigidos legalmente, de acuerdo con sus políticas específicas de privacidad.</p> <p class='text-justify'>Los datos señalados con un asterisco son de cumplimentación obligatoria, suponiendo su ausencia la imposibilidad de gestionar la compra seleccionada.</p> <p class='text-justify'>El envío de sus datos implica aceptar y consentir el tratamiento de los mismos, que serán incorporados a un fichero debidamente inscrito en el Registro General de Protección de Datos.</p> <p class='text-justify'>Entendemos que los datos facilitados son del propio usuario y que son ciertos, reservándose <b>RESERTRIP</b> el derecho a excluir de los servicios ofertados a todo usuario que haya facilitado datos falsos, sin perjuicio de las demás acciones que procedan en Derecho. El usuario se hace responsable de comunicar a <b>RESERTRIP</b> cualquier modificación de los datos personales facilitados.</p> <p class='text-justify'>El acceso a esta web puede implicar la utilización de cookies. Las cookies son pequeñas cantidades de información que se almacenan en el navegador utilizado por cada usuario para que el servidor recuerde cierta información que posteriormente pueda utilizar. Esta información permite identificarle a usted como un usuario concreto y permite guardar sus preferencias personales, así como información técnica como puedan ser visitas o páginas concretas que visite.</p> <p class='text-justify'>Aquellos usuarios que no deseen recibir cookies o quieran ser informados antes de que se almacenen en su ordenador, pueden configurar su navegador a tal efecto.</p> <p class='text-justify'>El ejercicio de los derechos de acceso, rectificación, cancelación y oposición, podrá llevarse a cabo, conforme a lo dispuesto en la normativa vigente, mediante solicitud dirigida a nuestra dirección de correo electrónico <a href='mailto:info@resertrip.com'>info@resertrip.com</a> o a la dirección postal: <b>RESERTRIP S.L., Avenida General Perón 26, Madrid 28020</b>, adjuntando en todo caso, fotocopia de su <b>D.N.I</b> o documento equivalente válido en derecho que permita acreditar su identidad.</p>",
      "COOKIES_CONTENT": "<p class='lead text-center'>Política de cookies</p><p class='text-justify'>Las cookies son pequeñas cantidades de información que se almacenan en el navegador utilizado por cada usuario para que el servidor recuerde cierta información que posteriormente pueda utilizar. Esta información permite identificarle a usted como un usuario concreto y permite guardar sus preferencias personales, así como información técnica como puedan ser visitas o páginas concretas que visite. Aquellos usuarios que no deseen recibir cookies o quieran ser informados antes de que se almacenen en su ordenador, pueden configurar su navegador a tal efecto.</p><p class='text-justify'>Las cookies que utilizamos no almacenan dato personal alguno, ni ningún tipo de información que pueda identificarle. Las cookies sirven para mejorar los servicios que le ofrecemos. Algunas son estrictamente necesarias para que la página funcione bien y otras sirven para mejorar el rendimiento y su experiencia como usuario.</p><p class='text-justify'>A continuación, se realiza una clasificación de las cookies en función de una serie de categorías.</p><p class='text-left'><b>Tipos de cookies según la entidad que las gestione:</b></p><p class='text-justify'>Cookies propias: son aquéllas que se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.</p><p class='text-justify'>Cookies de tercero: son aquéllas que se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.</p><p class='text-left'><b>Tipos de cookies según el plazo de tiempo que permanecen activadas:</b></p><p class='text-justify'>Cookies de sesión: son un tipo de cookies diseñadas para recabar y almacenar datos mientras el usuario accede a una página web.</p><p class='text-justify'>Cookies persistentes: son un tipo de cookies en el que los datos siguen almacenados en el terminal y pueden ser accedidos y tratados durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios años.</p><p class='text-left'><b>Tipos de cookies según su finalidad:</b></p><p class='text-justify'>Cookies técnicas: son aquéllas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de videos o sonido o compartir contenidos a través de redes sociales.</p><p class='text-justify'>Cookies de personalización: son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.</p><p class='text-justify'>Cookies de análisis: son aquéllas que permiten al responsable de las mismas, el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la elaboración de perfiles de navegación de los usuarios de dichos sitios, aplicaciones y plataformas, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.</p><p class='text-justify'>Cookies publicitarias: son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.</p><p class='text-justify'>Cookies de publicidad comportamental: son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado. Estas cookies almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo.</p><p class='text-justify'>Encontrarás más información sobre las cookies y cómo gestionarlas en <a href='http://www.aboutcookies.org' target='_blank'>www.aboutcookies.org</a>.</p><p class='text-justify'><b>En la página web de RESERTRIP <a href='www.resertrip.com'>www.resertrip.com</a> se utilizan los siguientes tipos de cookies:</b></p><p class='text-justify'>Cookies analíticas: estas cookies se utilizan para analizar el comportamiento de los usuarios de forma agregada y anónima incluyendo el número de visitantes a la web y a diferentes fichas de producto, la procedencia de las visita, día y hora, plataforma, numero de clics en un banner, palabras de búsqueda que utiliza un usuario para encontrar su contenido deseado. De esta forma RESERTRIP se sirve de un medio de gran utilidad para poder introducir mejoras en el sitio web y saber qué contenido o diseño es más relevante para el usuario.</p><p class='text-justify'>Cookies funcionales: son cookies que ayudan al usuario a tener una mejor experiencia de la navegación por el sitio. Un ejemplo de uso de este tipo de cookies son las que se utilizan para almacenar los datos de navegación de un determinado idioma.</p><p class='text-justify'>Cookies técnicas: las cookies técnicas son necesarias para mostrar correctamente la página web y garantizar el correcto funcionamiento del sitio.</p>",
      "PRIVACITY_CONTENT": "<p class='lead text-center'>Aviso legal y Política de privacidad</p><p class='text-justify'>Mediante este aviso legal, <b>RESERTRIP S.L.</b> (<b>RESERTRIP</b>), domiciliada en Madrid, Avenida General Perón 26, Madrid 28020, informa a los usuarios de la página web de su propiedad, acerca de su política de privacidad y protección de datos de carácter personal, para que el usuario determine, libre y voluntariamente, si desean facilitar los datos personales que le puedan ser solicitados, con motivo de la utilización de determinados servicios de nuestra página web.</p><p class='text-justify'>Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra disposición legal que fuera de aplicación.</p><p class='text-justify'>El usuario se compromete a no usar el presente sitio web con fines fraudulentos, así como a no llevar a cabo conducta alguna que pudiera dañar la imagen, los intereses y los derechos de <b>RESERTRIP</b>. En caso de incumplimiento por parte del usuario de las condiciones de uso del presente sitio web, o de sospecha razonable por parte de la empresa de que el usuario las está incumpliendo, <b>RESERTRIP</b> se reserva el derecho a limitar, suspender o terminar su acceso al sitio web, adoptando cualquier medida técnica que sea necesaria con ese fin.</p><p class='text-justify'><b>RESERTRIP</b> garantiza que tratará con total seguridad y confidencialidad los datos correspondientes al medio de pago utilizado. Los datos de la tarjeta utilizada para el pago se transmiten de forma encriptada a través del protocolo seguro SSL, que garantiza el secreto en la comunicación a través de un diálogo con claves de cifrado.</p><p class='text-justify'><b>RESERTRIP</b>, con el objeto de garantizar la seguridad de las transacciones efectuadas a través de la presente página web tiene incorporado, en sus procesos de control, la verificación y gestión previa de la información facilitada por el cliente respecto a la tarjeta de pago. <b>RESERTRIP</b> se reserva la facultad de rechazar la solicitud de contratación y compra de billetes cuyo pago se efectúe haciendo uso de una tarjeta.</p><p class='text-justify'>Tenga en cuenta, adicionalmente, que los proveedores o emisores de los medios de pago utilizados pueden tener adoptados otras medidas antifraude y que conlleven el rechazo de cierto tipo de operaciones. <b>RESERTRIP</b> no controla ni es responsable de los perjuicios que pudiera ocasionar la aplicación de las políticas que tengan aprobadas los distintos proveedores o emisores de medios de pago.</p><p class='text-justify'>Queda prohibida la utilización de un medio de pago titularidad de un tercero excepto en el caso de que se cuente con la autorización expresa de dicho tercero, siendo de su responsabilidad la prueba de dicha autorización y asumiendo todos los daños y perjuicios que se produzcan a <b>RESERTRIP</b>.</p><p class='text-justify'>A través del presente sitio web, no recogeremos ninguna información personalmente identificable sobre usted, a no ser que voluntariamente decida proporcionárnosla bien, al efectuar operaciones de compra de billetes o alquiler de autocares, bien mediante la dirección de correo electrónico de contacto inserta en nuestra web o mediante su registro como usuario de nuestra página web.</p><p class='text-justify'>Los datos personales facilitados se incluirán en un fichero de datos personales y serán tratados, según los casos que corresponda, con la finalidad de llevar a cabo las gestiones necesarias para efectuar la compra de billetes, el alquiler de autocares, la resolución de consultas, quejas o reclamaciones efectuadas, así como gestionar los procesos de registro de usuarios de nuestra web.</p><p class='text-justify'>Asimismo, le informamos que los datos facilitados como consecuencia de la compra de un billete se almacenarán en DATOS <b>RESERTRIP</b> y además serán transferidos a los sistemas de las compañías concesionarias de líneas regulares de transporte de viajeros. Tanto DATOS <b>RESERTRIP</b> como las compañías concesionarias se responsabilizan de su confidencialidad en los términos exigidos legalmente, de acuerdo con sus políticas específicas de privacidad.</p><p class='text-justify'>De igual manera, le informamos que es nuestro deseo poder mantenerle informado mediante cualquier medio, incluso por correo electrónico u otro medio de comunicación electrónica equivalente, sobre novedades, productos y servicios relacionados con <b>RESERTRIP</b>, que pudieran ser de su interés. A este respecto, si Usted no desea que sus datos sean tratados con esta finalidad podrá oponerse a este tratamiento de datos enviándonos un correo electrónico a tal efecto a la siguiente dirección <a href='mailto:info@resertrip.com'>info@resertrip.com</a>. De no ser así, entendemos que Usted nos autoriza al tratamiento de sus datos personales con los fines publicitarios relacionados. De igual manera, en cada comunicación comercial se incluirá esta posibilidad de oposición al tratamiento de sus datos con fines publicitarios.</p><p class='text-justify'>El ejercicio de los derechos de acceso, rectificación, cancelación y oposición, podrá llevarse a cabo, conforme a lo dispuesto en la normativa vigente, mediante solicitud dirigida a nuestra dirección de correo electrónico <a href='mailto:info@resertrip.com'>info@resertrip.com</a> o a la dirección postal: <b>RESERTRIP</b> S.L. Avenida General Perón 26, Madrid 28020, adjuntando en todo caso, fotocopia de su D.N.I o documento equivalente válido en derecho que permita acreditar su identidad.</p><p class='text-justify'>El usuario responderá, en cualquier caso, de la veracidad de los datos facilitados, reservándose <b>RESERTRIP</b> el derecho a excluir de los servicios registrados a todo usuario que haya facilitado datos falsos, sin perjuicio de las demás acciones que procedan en Derecho.</p><p class='text-justify'>El usuario se hace responsable de comunicar a <b>RESERTRIP</b> cualquier modificación de los datos personales facilitados.</p><p class='text-justify'><b>RESERTRIP</b> cumplirá lo dispuesto en la normativa vigente en cuanto al deber de cancelación de la información personal que haya dejado de ser necesaria para el fin o los fines para los cuales fue recabada, bloqueando la misma, con el fin de poder atender a las posibles responsabilidades derivadas del tratamiento de los datos, y sólo durante los plazos de prescripción de dichas responsabilidades. Una vez transcurran dichos plazos, se eliminará definitivamente esa información mediante métodos seguros.</p><p class='text-justify'>Los menores de 14 años no deberán enviar ninguna información personal sin el consentimiento de su padre o tutor. <b>RESERTRIP</b> no es responsable de ninguna información personal enviada por los menores de 14 años sin la autorización oportuna.</p><p class='text-justify'><b>RESERTRIP</b> ha adoptado los niveles de seguridad de protección de datos personales legalmente requeridos en función de la información tratada y ha implantado otros medios y medidas técnicas adicionales a su alcance para evitar su alteración, pérdida, tratamiento o acceso no autorizado de los datos personales facilitados, de acuerdo lo dispuesto en la normativa vigente en materia de protección de datos de carácter persona. No obstante lo anterior, el usuario debe ser consciente de que las medidas de seguridad en internet no son inexpugnables.</p><p class='text-justify'>Cuando usted accede a nuestro sitio web, no almacenamos ninguna información en su ordenador a través de cookies con objeto de reconocerle de forma automática la próxima vez que usted utilice el mismo.</p><p class='text-justify'>Nuestra Página Web contiene enlaces a otros sites. Hay que considerar que <b>RESERTRIP</b> no se responsabiliza de la política de privacidad de esos sites. Advertimos a los consumidores que tengan cuidado cuando abandonen nuestro site y que lean las políticas de privacidad de todos y cada uno de los sites que reúnan información personal identificable. Esta política de privacidad sólo es aplicable a la información contenida en <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'><b>RESERTRIP</b> se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a futuras novedades legislativas o jurisprudenciales.</p><p class='text-justify'><b>RESERTRIP</b> proporciona a los usuarios los recursos técnicos adecuados para que, con carácter previo, puedan acceder a este aviso sobre la Política de Privacidad y Protección de Datos, así como cualquier otra información relevante y puedan prestar su consentimiento a fin de que esta sociedad proceda al tratamiento de sus datos personales.</p><p class='text-justify'>La totalidad de los contenidos, elementos, diseños y aplicaciones albergados en esta página web, cualquiera que sea su formato y características, así como todos los Derechos de Propiedad Industrial e Intelectual inherentes a dicho sitio web, son titularidad de <b>RESERTRIP</b> estando protegidos tanto por la normativa de Propiedad Industrial e Intelectual como por el resto de legislación que pueda ser de aplicación. Dicho contenido, no podrá ser objeto de explotación, reproducción, distribución, modificación, comunicación pública, cesión, transformación ni de cualquier otro procedimiento de difusión, que no haya sido expresa y previamente autorizado. <b>RESERTRIP</b> se reserva el ejercicio de las acciones judiciales que le asistan frente a quienes vulneren los derechos de su titularidad a los que se ha hecho referencia.</p><p class='text-justify'>Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Madrid.</p><p class='text-justify'><b>RESERTRIP</b> S.L., en virtud de lo expuesto en el artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico y conforme al principio de transparencia de nuestra compañía informa a los usuarios de su página web:</p><p class='text-justify'>Denominación Social: <b>RESERTRIP S.L.</b> <br>Domicilio social: Avenida General Peron 26, Madrid 28020. <br>Dirección de contacto: Avenida General Peron 26, Madrid 28020. <br>C.I.F. B83418830 <br>Datos de Inscripción en el Registro Mercantil: inscrita en el Registro Mercantil de Madrid, al Tomo 18113, Folio 9, Hoja M-313290<br>Dirección de correo electrónico: <a href='mailto:info@ysolutions.es'>info@ysolutions.es</a>.<br>Tfno. de contacto: 912309169 <br></p>",
      "ABOUTUS": "<div class='container'><div class='row'> <div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Nuestra Misión</strong></h5> <p>Dicho de la forma más sencilla, queremos ayudarte a viajar de A a B.</p><p>Nuestro objetivo es proporcionar a nuestros clientes con:</p><ul> <li>Información actualizada sobre como viajar de A a B.</li><li>Proporcionar todas las posibilidades de viaje y conexión entre dos puntos.</li><li>Una comparación rápida y fácil entre un mismo y distintos medios de transporte.</li><li> Compra de billetes de forma fiable y ágil.</li></ul> <p>Todo esto en un sólo sitio web en un par de clicks: <a href='http://www.resertrip.com'>www.resertrip.com</a></p><p>La movilidad se ha convertido en una característica clave de nuestra sociedad global. Frente a una oferta cada vez mayor entre distintos medios de transporte, la complejidad de encontrar la oportunidad que mejor se adapta a las necesidades del cliente y el momento puede ser desalentadora.</p><p> Desde aerolíneas de bajo coste a líneas de autobús.<br>Desde el tren de alta velocidad al ferry.<br>Desde el transporte público al transporte privado (coche compartido, Uber, etc....) <br>Las opciones se incrementan cada día y también la complejidad. </p><p>Cómo puedo viajar fácilmente entre A y B? <a href='www.resertrip.com'>www.resertrip.com</a> es la respuesta a esta pregunta, reservando tu viaje en un sitio web con sólo un par de clicks.</p></div></div></div><div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Nuestro Proyecto</strong></h5> <p> Queremos crear no sólo una plataforma digital donde los clientes pueden comparar y comprar billetes, sino que también queremos proveer de información para facilitar el viaje. Información sobre las compañías de transporte, las terminales y estaciones (bus, tren, aeropuerto), qué actividades se pueden hacer en el punto de destino, etc....</p><p>Además, queremos facilitar toda clase de servicios alrededor del viaje tales como el alquiler de un coche, la reserva de un hotel, reserva de una atracción turística, etc... En definitiva, todo lo que necesitas en tu viaje directamente en un portal y en sólo unos clicks, y en tantos países como sea posible.</p><p>Estamos desarrollando nuestra presencia en Europa y en Sudamérica en un primer momento, y tenemos planes para expandir a otros países en un futuro próximo. Tanto si estas viajando en tu propio país, como si lo haces a otro país por trabajo o por vacaciones, nos proponemos ayudarte a que tu viaje sea lo más fácil posible. Reserva tu próximo viaje en <a href='http://www.resertrip.com.'>www.resertrip.com.</a></p></div></div></div><div class='col-md-12'><br><div class='box'> <div class='box-content'> <h5><strong>Nuestro Equipo</strong></h5> <p>Somos un equipo internacional, diverso y con mucha experiencia tanto en el mundo del transporte como en marketing digital. Estamos basados en Madrid y somos la primera plataforma de viaje multimodal en internet con base en España.</p><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/roderick.jpg' alt='' class='img-circle'> <p>Roderick</p><span>CEO & Fundador</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/pablo.jpg' alt='' class='img-circle'> <p>Pablo</p><span>Co - Fundador, Ventas & Marketing</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/celine.jpg' alt='' class='img-circle'> <p>Celine</p><span>Redes Sociales</span> </div></div></div><br><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jake.jpg' alt='' class='img-circle'> <p>Jake</p><span>Co-Fundador & CTO</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/abel.jpg' alt='' class='img-circle'> <p>Abel</p><span>Programación & Desarrollo</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jhesus-colmenares.jpg' alt='' class='img-circle'> <p>Jesús</p><span>Programación & Desarrollo</span> </div></div></div></div></div></div></div></div>",
      "TERMS_CONTENT": "<p class='lead text-center'>CONDICIONES GENERALES</p><p class='text-justify'><b>RESERTRIP</b></p><p class='text-justify'><b>RESERTRIP</b> es una plataforma multimodal que facilita la comparación y venta de billetes de varios modos de transporte en varios países. <b>RESERTRIP</b> ejerce de intermediario entre el usuario y el transportista. Cada transportista dispone de unas condiciones generales de transporte que aplica a su sector y a su país. En ningún caso <b>RESERTRIP</b> se hace responsable de daños y perjuicios que podrían ocurrir durante el viaje. Para conocer las condiciones generales de cada transportista recomendamos consultar la pagine web de cada empresa.</p><p class='text-justify'><b>Responsabilidad</b></p><p class='text-justify'>La responsabilidad del transportista incumbe a la empresa que realiza efectivamente el servicio. La empresa transportista no responderá de los incumplimientos que no le sean directamente imputables, ni de los producidos por caso fortuito, fuerza mayor, o por atender exigencias legales o administrativas. Del mismo modo, no se hace responsable de las pérdidas de enlace de sus servicios con otros transportes, ya sean propios o ajenos. En servicios internacionales, la responsabilidad que pudiera existir incumbe a la empresa que realiza el transporte, con arreglo a las Leyes y Tribunales de su país.<p class='text-justify'><b>Equipajes</b><p class='text-justify'>Cada empresa de transporte establece el peso máximo de equipaje a transportar gratuitamente. El exceso deberá ser abonado según la cuantía que por tarifa corresponda. En caso de facturación del equipaje, la empresa hará entrega del correspondiente resguardo.</p><p class='text-justify'>En caso de pérdida o deterioro del equipaje transportado, será imprescindible efectuar la reclamación en los plazos indicados en el apartado de 'Reclamaciones' exhibiendo el billete y el resguardo de facturación, en su caso.</p><p class='text-justify'>La responsabilidad del transportista estará limitada en servicios nacionales según la legislación vigente en cada país. En servicios internacionales la responsabilidad corresponde a la empresa que efectivamente efectúa el transporte conforme a la legislación que proceda. El transportista no responderá de los daños, pérdidas o averías que sufran los bultos de mano u otros objetos no confiados a su custodia.</p><p class='text-left'><b>Bicicletas</b></p><p class='text-justify'>Las condiciones para el transporte de bicicletas varían en función de la empresa transportista. Consultar directamente las condiciones de cada transportista.</p><p class='text-left'><b>Mascotas</b></p><p class='text-justify'>Las condiciones para el transporte de mascotas varían en función de la empresa transportista. Consultar directamente las condiciones de cada transportista.</p><p class='text-left'><b>Anulación y cambio de billetes</b></p><p class='text-justify'>La anulación y el cambio de los billetes vendidos a través de la web de <b>RESERTRIP</b> se podrán realizar a través del enlace facilitado tras la compra del billete en <b>RESERTRIP</b> o directamente con la empresa transportista, y siempre según las condiciones generales de cada una.</p><p class='text-left'><b>Cierre de billetes con vuelta abierta</b></p><p class='text-justify'>Si en el billete de ida y vuelta no figuran consignados el día, hora y asiento relativos al regreso, el viajero deberá presentarse en la oficina correspondiente de ventas de la empresa con la mayor antelación posible para confirmar el regreso, que estará condicionado a la existencia de plazas disponibles en la fecha solicitada.</p><p class='text-left'><b>Precio de los billetes</b></p><p class='text-justify'>El importe total de los billetes comprados por Internet, se compone del precio del billete según las tarifas vigentes, más en algunos casos la cantidad adicional expresada en concepto de coste de gestión que cobra la parte vendedora.</p><p class='text-left'><b>Reclamaciones</b></p><p class='text-justify'>Si el viajero desea efectuar algún tipo de reclamación contra la empresa transportista, deberá formularla en el plazo más breve posible desde la fecha en que se haya prestado o se hubiere debido prestar el servicio de transporte. La reclamación será tramitada conforme a lo dispuesto en la legislación vigente.</p><p class='text-left'><b>Descuentos</b></p><p class='text-justify'>La compra de billetes por medio de Internet permite la aplicación de descuentos en función de la política comercial de cada empresa.</p><p class='text-justify'>Es imprescindible para acceder al autobús, tren o avión la presentación de la documentación acreditativa que confiere el derecho al descuento.</p><p class='text-left'><b>Titularidad del billete</b></p><p class='text-justify'>Los billetes adquiridos por Internet son nominativos personales e intransferibles. Para su utilización se requiere la comprobación de un documento personal del viajero y que este dato corresponda con el número de identificación personal reflejado en el billete.</p><p class='text-justify'>Para viajar es necesario la presentación de un documento personal, tanto si se accede directamente con el billete impreso en la web de <b>RESERTRIP</b> como si se solicita la impresión física del billete en el punto de venta.</p><p class='text-justify'>En los billetes adquiridos por Internet para menores de edad aplican condiciones especiales para identificar a las personas que acompañan al menor.</p><p class='text-left'><b>Proceso de compra</b></p><p class='text-justify'></p>Como norma general <b>RESERTRIP</b> permite la compra del billete en su página web. En algunos casos donde esto no es posible se redirige a la web del transportista para terminar el proceso de compra.<p class='text-justify'>Una vez terminado el proceso de compra, es imprescindible que pulse el botón IMPRIMIR que aparecerá en su pantalla en el 'Resultado de la Compra'. Si no desea imprimir el billete, o no le es posible, por favor, anote el localizador en un lugar seguro para solicitar la impresión del billete en la taquilla de la empresa transportista.</p><p class='text-left'><b>Factura</b></p><p class='text-justify'>Si el cliente desea la factura de sus billetes tiene que ponerse en contacto con la empresa transportista.</p><p class='text-left'><b>Conexiones</b></p><p class='text-justify'>De acuerdo con la legislación de transportes algunos de los trayectos pueden realizarse mediante conexión de servicios con combinación de horarios de una parada determinada y expedición única de billetes, lo que requeriría un cambio de autobús, tren o avión en dicha parada.</p><p class='text-left'><b>Documentación</b></p><p class='text-justify'>Cada pasajero debe llevar la documentación necesaria (pasaporte, visados, etc.…) para cruzar las fronteras, según las leyes del país o países por los que transiten. Si por causas de no llevar la documentación o no tenerla en regla, el viajero no fuese admitido al embarque, o se le prohíba la entrada en algún país, todos los gastos originados serán a su cargo, incluidos los de retorno y no procederá el reembolso del billete no utilizado.</p><p class='text-justify'>El billete debe ser conservado por el viajero durante todo el trayecto, tanto de ida como de regreso. En caso de extravío del billete el cliente deberá ponerse en contacto con la empresa transportista.</p><p class='text-left'><b>Menores</b></p><p class='text-justify'>En servicios internacionales, los menores de 16 años deben viajar acompañados de un adulto legalmente autorizado. Los jóvenes con edades comprendidas entre 16 y 18 años, necesitan pasaporte y autorización policial para viajar.</p><p class='text-justify'>En servicios nacionales, las condiciones de viaje para el transporte de menores sin acompañante varían en función de la empresa transportista. Rogamos consulten en cada caso.</p><p class='text-left'><b>Medios de Pago</b></p><p class='text-justify'>El pago con tarjeta financiera de crédito o débito son los únicos medios de pago aceptados en <a href='www.resertrip.com'>www.resertrip.com</a>.</p>"
    },
    "PASSENGERS": {
      "TITLE": "Pasajeros",
      "ADULTS": "Adultos",
      "CHILDREN": "Niños",
      "BABIES": "Bebés"
    },
    "SEARCH": {
      "LOADING_MESSAGE": "Cargando resultados...",
      "NO_DEPARTURES": "No hay salidas",
      "SEARCHING": "Buscando",
      "SORT": {
        "ORDER_BY": "Ordenar por",
        "COMPANY": "Empresas",
        "HORARY": "Más Temprano",
        "PRICE": "El más Barato",
        "DURATION": "El más rápido"
      },
      "FILTERS": {
        "MAP_TITLE": "INFORMACIÓN DEL VIAJE",
        "MAP_DISTANCE": "Distancia:",
        "MAP_DURATION": "Duración:",
        "TITLE": "FILTROS",
        "RESULTS": "resultados",
        "DEPARTURE_HOUR": "HORA DE SALIDA",
        "PRICE": "PRECIO",
        "SEAT_TYPE": "TIPO DE ASIENTO",
        "COMPANIES": "EMPRESAS"
      },
      "TRIPS": {
        "ROUND": "Ida",
        "DEPARTURE": "Ida",
        "RETURN": "Vuelta",
        "RESULTS": "resultados",
        "BUTTON": "COMPRAR"
      },
      "WEATHER": {
        "TITLE_1": "Estamos buscando las mejores ofertas. Por favor espere.",
        "TITLE_2": "Buscando billetes en otras empresas de autobús."
      },
      "NO_RESULTS": {
        "TITLE": "Lo Sentimos. No encontramos información para esta ruta. : (",
        "MESSAGE": "No encontramos billetes para el destino seleccionado. Puede que estén agotados o que no esté disponible su venta por internet.",
        "FIND_NEXT_DAY": "Buscar billetes para el siguiente día"
      },
      "SELECTED_TRIP": {
        "TITLE_1": "Selecciona tu Ida",
        "TITLE_2": "antes de seleccionar tu Vuelta",
        "TITLE_3": "Selecciona tu Vuelta ",
        "TITLE_4": "para poder seleccionar tus asientos",
        "TITLE_5": "Tu Billete Seleccionado",
        "TITLE_6": "Cambia billete de IDA"
      },
      "SCRAPER": {
        "TITLE": "COMPARA BILLETES",
        "MESSAGE": "Estos precios no estan garantizados."
      }
    },
    "SEATS": {
      "LOADING_MESSAGE": "Cargando mapa de asientos...",
      "PASSAGE_ROUND": "Billete Ida:",
      "PASSAGE_RETURN": "Billete Vuelta:",
      "FLOOR_1": "PISO 1",
      "FLOOR_2": "PISO 2",
      "SELECTION_LABEL": "Tu(s) asiento(s):",
      "SELECTION_SUBLABEL": "Por favor seleccione un máximo de 7 asientos.",
      "SELECTION_SUBLABEL_NUMBER": " asiento(s)",
      "LEGEND_AVAILABLE": "Disponible",
      "LEGEND_UNAVAILABLE": "Ocupado",
      "LEGEND_SELECTED": "Seleccionado",
      "PURCHASE_SUMMARY": "RESÚMEN DE COMPRA",
      "PURCHASE_BUTTON": "PAGAR AHORA",
      "PURCHASE_TOTAL": "Total",
      "PURCHASE_SEATS": "Asientos",
      "PURCHASE_SEAT": "Asiento",
      "PURCHASE_ROUND": "Ida",
      "PURCHASE_RETURN": "Vuelta",
      "FORM_LABEL_PASSAGE": "Billete",
      "FORM_LABEL_SEAT": "Asiento",
      "FORM_NAME": "Nombre",
      "FORM_LASTNAME": "Apellido",
      "FORM_RUT": "No. de documento",
      "FORM_PASSPORT": "PASAPORTE",
      "FORM_COUNTRY": "País",
      "FORM_COUNTRY_TEXT": "Seleccione un país",
      "FORM_PHONE": "Teléfono",
      "FORM_PHONE_PLACEHOLDER": "Telefono",
      "FORM_EMAIL": "Correo electrónico",
      "FORM_EMAIL_PLACEHOLDER": "Correo electronico",
      "FORM_BTN_SELECT": "Seleccionar",
      "FORM_BTN_UPDATE": "Actualizar",
      "REDIRECT": "En breve seras redireccionado a la página de búsqueda automáticamente"
    },
    "PAYMENT": {
      "INFORMATION": {
        "TITLE": "INFORMACION DEL PAGADOR",
        "FORM_NAME": "Nombre",
        "FORM_LASTNAME": "Apellido",
        "FORM_DNI": "DNI",
        "FORM_CREDIT_CARD": "Número de tarjeta de crédito",
        "FORM_CREDIT_CARD_PLACEHOLDER": "Numero de tarjeta de credito",
        "FORM_CVV": "CVV",
        "FORM_MONTH": "Mes",
        "FORM_YEAR": "Año",
        "FORM_EMAIL": "Correo electrónico",
        "FORM_EMAIL_PLACEHOLDER": "Correo electronico",
        "FORM_NOTIFICATIONS": "Recibir notificaciones de ofertas."
      },
      "PAY": {
        "TITLE": "FORMAS DE PAGO",
        "SUBTITLE": "Selecciona una forma de pago",
        "TERMS": "Al comprar estás aceptando nuestros",
        "TERMS_LINK": "Términos y Condiciones",
        "BUTTON": "PAGAR AHORA"
      },
      "PURCHASE": {
        "TITLE": "INFORMACIÓN DE COMPRA",
        "SUBTOTAL": "Subtotal",
        "FEES": "Coste de gestión",
        "TOTAL": "TOTAL",
        "ROUND": "Ida",
        "RETURN": "Vuelta",
        "PROCESS": "Se esta procesando su compra, por favor espere",
        "TRAVEL_DETAIL": "Por favor, verifique sus datos de viaje."
      },
      "PROMOTION": {
        "LABEL": "CUPON DE PROMOCIÓN",
        "PLACEHOLDER": "Codigo de la promocion",
        "VALIDATE": "VALIDAR"
      }
    },
    "SUCCESS": {
      "TITLE": "Tu compra se ha realizado con éxito",
      "SUBTITLE": "Estimado(a) ",
      "TEXT_1": "Muchas gracias por confiar en",
      "TEXT_2": "Resertrip",
      "TEXT_3": "Te enviamos un e-mail con los detalles de tu viaje y tu billete adjunto a",
      "ROUND": {
        "TITLE": "IDA",
        "NO_TRIPS": "No. DE VIAJES:",
        "TICKETS": {
          "TITLE": "TICKETS",
          "DNI": "DNI:",
          "NAME": "NOMBRE:",
          "SEAT": "ASIENTO:",
          "CODE": "CÓDIGO:",
          "PRICE": "PRECIO:"
        }
      },
      "RETURN": {
        "TITLE": "VUELTA",
        "NO_TRIPS": "No. DE VIAJES:",
        "TICKETS": {
          "TITLE": "TICKETS",
          "DNI": "DNI:",
          "NAME": "NOMBRE:",
          "SEAT": "ASIENTO:",
          "CODE": "CÓDIDO:",
          "PRICE": "PRECIO:"
        }
      },
      "PAYMENT": {
        "TITLE": "DETALLE DE PAGO",
        "TYPE": "Método de pago:",
        "TOTAL": "TOTAL:",
        "LINK": "Terminos y condiciones",
        "TOTALFEE": "Coste de gestión:"
      }
    },
    "CANCEL": {
      "TITLE": "Te presentamos tu lista de billetes",
      "CANCELMSG": "Esta lista de billetes ya se encuentra anulada",
      "BUTTON": "Anular",
      "EXPIRED": "Esta Compra ya ha caducado",
      "SECTION": "Tramo"
    },
    "SESSION": {
      "LOGIN": "Iniciar sesión",
      "LOGIN_BUTTON": "Iniciar",
      "REGISTER": "Regístrate",
      "REGISTER_TITLE": "Crear cuenta",
      "SIGNIN": "Ingresar",
      "REMEMBER": "Recordar",
      "FORGOT": "¿Olvidó su contraseña?",
      "EMAIL": "Correo electrónico",
      "PASSWORD": "Contraseña",
      "NAME": "Nombre",
      "CONFIRM_PASSWORD": "Confirmar contraseña",
      "RECOVER": "Recupera tu contraseña",
      "RECOVER_BUTTON": "Recupera contraseña",
      "RECOVER_TEXT": "Por favor, ingresa tu correo electrónico y proximamente le enviaremos a esa dirección los pasos para proceder a recuperar la contraseña",
      "ERROR_LOGIN": "Revisa el email y/o contraseña",
      "INF_RECOVER": "Se ha restablecido correctamente tu contraseña, por favor revisa tu correo",
      "GOOD": "¡Bien!",
      "EXIT": "Salir",
      "PROFILE": "Perfil",
      "DASHBOARD": "Control",
      "PURCHASES": "Compras",
      "SETTINGS": "Ajustes",
      "HELLO": "Hola",
      "SMS_TRIPS": "VIAJES HECHOS",
      "SMS_KILOMETERS": "kMS RECORRIDOS",
      "UPDATE_BUTTON": "Actualizar",
      "TITTLE_UPLOAD_IMAGE": "Cargar nueva imagen de usuario",
      "ERROR_UPLOAD_IMAGE": "Error al cargar tu imagen",
      "UPLOADING_IMAGE": "Cargando nueva imagen...",
      "IMAGE_PREVIEW": "Vista Previa",
      "TEXT_UPLOAD_IMAGE": "Seleccione o Arrastre Imagen aqui",
      "PURCHASES_TEXT1": "Viajes comprados",
      "PURCHASES_TEXT2": "Viajes expirados",
      "PURCHASES_TEXT3": "Viajes anulados",
      "PURCHASES_TEXT4": "Buscando viajes asociados...",
      "PURCHASES_TEXT5": "No hay viajes comprados",
      "PURCHASES_TEXT6": "No hay viajes expirados",
      "PURCHASES_TEXT7": "No hay viajes cancelados",
      "PURCHASES_TEXT8": "Viaje",
      "PURCHASES_TEXT9": "Pasajero",
      "PURCHASES_TEXT10": "Fecha",
      "PURCHASES_TEXT11": "# Billete",
      "PURCHASES_TEXT12": "Precio",
      "SETTINGS_TEXT1": "Información general",
      "SETTINGS_TEXT2": "Contraseña",
      "SETTINGS_TEXT3": "Contacto de Emergencia",
      "SETTINGS_TEXT4": "Darse de baja",
      "SETTINGS_TEXT5": "<strong>¡Espera!</strong> ¿Estás seguro que deseas eliminar tu cuenta de usuario?",
      "SETTINGS_TEXT6": "Si, estoy seguro",
      "LASTNAME": "Apellido",
      "DNI": "# Identificación",
      "ADDRESS": "Dirección",
      "BIRTHDATE": "Fecha de nacimiento",
      "PHONE": "Número de teléfono",
      "PASSWORD_TEXT1": "Contraseña actual",
      "PASSWORD_TEXT2": "Contraseña nueva",
      "UPDATE_TEXT1": "Información actualizada",
      "UPDATE_TEXT2": "Las contraseñas no coinciden",
      "UPDATE_TEXT3": "Revisa la contraseña actual"
    },
    "PDF": {
      "TITLE": "Lo sentimos, algo salió mal",
      "SUB-TITLE": "En estos momentos no es posible descargar el PDF de su billete, por favor inténtelo de nuevo o más tarde.",
      "DESCRIPTION": "Para volver a intentarlo recuerde hacerlo desde su correo electrónico o desde la vista de Compra Exitosa."
    }
  };
  var translationsFR = {
    "MAIN": {
      "TITLE": "VOYAGEZ INTELIGENT AVEC RESERTRIP",
      "SUBTITLE": "Comparer et acheter",
      "BUS": "Bus",
      "TRAIN": "Train",
      "PLANE": "Avion",
      "FERRY": "Ferry",
      "CAR": "Covoiturage",
      "FIND_PASSAGES": "Trouver votre billet de bus en France",
      "CTA_BUY": "Acheter directement au travers de votre",
      "CTA_PHONE": "MOBILE",
      "BUS_COMPANIES": "Sociétés de bus en France",
      "MUCH_MORE": "Et beaucoup d'autres.",
      "CHOOSE_ORIGIN": "Choisir votre départ",
      "CHOOSE_DESTINATION": "Choisir votre arrivée",
      "RETURN": "Retour",
      "COOKIES_MESSAGE": "Ce site utilise des cookies. En continuant à naviguer sur le site, vous acceptez notre utilisation des cookies.",
      "SEARCH": "Chercher"
    },
    "TIME": {
      "TITLE": "Votre temps est écoulé",
      "MESSAGE": "Le temps pour effectuer votre achat a dépassé le temps maximum. Veuillez réessayer. <br>La page de résultats se chargera automatiquement."
    },
    "POPULAR_TRIPS": {
      "FROM": "de",
      "TO": "à"
    },
    "NAVBAR": {
      "PASSAGES": "Billets",
      "BUSOLOGY": "Busologie",
      "BLOG": "Blog",
      "SPANISH": "Espagnole",
      "ENGLISH": "Anglais",
      "FRENCH": "Français",
      "MESSAGE": "Toutes vos options de transport",
      "LANGUAGE": "Langue"
    },
    "FOOTER": {
      "TERMS": "Conditions Générales",
      "PRIVACITY": "Politique de confidentialité",
      "LEGAL_TEXT": "Mentions légales",
      "COOKIES": "Informations relatives aux cookies",
      "COPYRIGHT": "2016 Resertrip. Tous droits réservés.",
      "ABOUTUS_LABEL": "À propos",
      "LEGAL_TEXT_CONTENT": "<p class='lead text-center'>TEXTE LÉGAL</p><p class='text-justify'>Conformément aux dispositions de la Loi Organique Espagnole 15/1 999, du 13 décembre, sur la Protection des Données à caractère personnel, nous vous informons que les données personnelles fournies seront incluses dans un fichier appartenant à Resertrip S.L., dans le but de réaliser les formalités correspondant à l’achat du billet sélectionné. De même, nous vous informons que les renseignements fournis dans le cadre de l’achat, seront emmagasinés dans un fichier <b>DATOS RESERTRIP</b> et qu’ils seront, en outre, transférés aux systèmes des sociétés concessionnaires de lignes régulières de transport de voyageurs. Aussi bien les <b>DATOS RESERTRIP</b> que les sociétés concessionnaires assument la responsabilité de leur confidentialité dans les termes exigés légalement, conformément à leurs politiques spécifiques de confidentialité.</p><p class='text-justify'>Les champs signalés avec un astérisque doivent être obligatoirement remplis, leur absence supposant l’impossibilité de traiter l’achat sélectionné. </p><p class='text-justify'>SL’envoi de vos données implique que vous acceptez et vous consentez qu’elles soient traitées. Celles-ci seront intégrées à un fichier dûment inscrit au Registre Général de Protection des Données.</p><p class='text-justify'>Nous considérons que les données fournies sont du propre usager et qu’elles sont vraies, <b>RESERTRIP</b> rse réservant le droit d’exclure des services offerts tout usager  ayant fourni des renseignements faux, sans préjudice des autres actions prévues en droit. Il incombe à l’usager de communiquer à <b>RESERTRIP</b> toute modification des renseignements personnels fournis.</p><p>L’accès à cette page Web peut impliquer l’utilisation de cookies. Les cookies sont des petits blocs d’information stockés dans le navigateur utilisé par chaque usager, afin de rappeler au serveur certaines informations qu’il pourra utiliser postérieurement. Ces informations permettent de vous identifier en tant qu’usager concret et de sauvegarder vos préférences personnelles, ainsi que des informations techniques telles que les visites ou des pages concrètes que vous visitez.</p><p>Les usagers ne souhaitant pas recevoir des cookies ou voulant en être informés avant que ceux-ci ne soient stockés dans leur ordinateur, peuvent configurer leur navigateur à cette fin.</p><p class='text-justify'><b>RESERTRIP</b> gLes droits d’accès, de rectification, d’annulation et d’opposition pourront être exercés, conformément aux dispositions de la réglementation en vigueur, par le biais d’une demande adressée à notre adresse courriel <a href='mailto:info@resertrip.com'>info@resertrip.com</a> u à l’adresse postale: <b>RESERTRIP S.L., Avenida General Peron 26, Madrid 28020</b>. en joignant dans tous les cas, la photocopie de votre C.N.I. ou de toute pièce d’identité équivalente valable en droit.</p>",
      "COOKIES_CONTENT": "<p class='lead text-center'>Cookies policy</p><p class='text-justify'>Cookies are small pieces of information that are stored on the browser used by each user for the server to remember certain information that can later be used. This information can identify you as a specific user and allows you to save your personal preferences and technical information as may be views or particular pages you visit. Users who do not wish to receive cookies or wish to be informed before they are stored on their computer can configure their browser to that effect.</p> <p class='text-justify'>The cookies we use do not store any personal data or otherwise collect personally-identifiable information. Cookies are used to improve the services we offer. Some are strictly necessary to make the page work well and others are used to improve performance and your experience as a user.</p> <p class='text-justify'>Below, cookies are classified based on a number of categories.</p> <p class='text-left'><b>Types of cookies managed according to the different entities:</b></p> <p class='text-justify'>First-party cookies: are those that are sent to the user's terminal equipment from a computer or domain managed by the own editor and from which it provides the service requested by the user.</p> <p class='text-justify'>Third-party cookies: are those that are sent to the user's terminal equipment from a computer or domain which is not managed by the editor, but by another entity that processes data through cookies.</p> <p class='text-left'><b>Type of cookies according to the period of time they remain active:</b></p> <p class='text-justify'>Session cookies: type of cookies designed to collect and store data while the user accesses a web page.</p> <p class='text-justify'>Persistent cookies: type of cookies in which data remains stored in the terminal and can be accessed and processed for a period of time defined by the creator of the cookie, it can range from a few minutes to several years.</p> <p class='text-left'><b>Types of cookies according to their purpose:</b></p> <p class='text-justify'>Technical cookies: are those that allow the user to surf through a web page, platform or application and use the different options or services that may exist as, for example, traffic control and data communication, identify the session, access to restricted areas parts, recall elements that make up an order, perform the purchase process of an order, submit the registration application of an event, use safety elements while surfing, store content for audio or video broadcasting, or share content through social networks.</p> <p class='text-justify'>Customized cookies: are those that allow the user to access the service according to some general features which are predefined on the basis of a series of criteria in the user´s terminal, such as the language, type of browser accessing the service, local configuration to access the service, etc…</p> <p class='text-justify'>Analytic cookies: are those that allow the person responsible for them, to follow-up and analyse user´s behaviours of web sites to which they are linked. The information collected through this type of cookie is used for measuring the activity of web sites, applications or platforms and for users' browsing profiling of such sites, for making improvements based on usage data analysis made by service users.</p> <p class='text-justify'>Advertising cookies: are those that allow management of advertising spots, as efficiently as possible that the editor has included in a web page, application or platform from where the provided service is requested on the basis of criteria such as the edited content or the frequency in which the spots are displayed.</p> <p class='text-justify'>Behavioural advertising cookies: are those that allow management of advertising spots, as efficiently as possible, that the editor has included in a web page, application or platform from where the provided service is requested. These cookies store information on user behaviour obtained through the observation of their surfing habits, enabling development of a specific profile to display advertising based on the same.</p> <p class='text-justify'>You will find more information about cookies and how to manage them at <a href='http://www.aboutcookies.org' target='_blank'>www.aboutcookies.org</a>.</p> <p class='text-justify'><b>The following types of cookies are used in the RESERTRIP website <a href='www.resertrip.com'>www.resertrip.com</a>:</b></p> <p class='text-justify'>Analytic cookies: these cookies are used to analyse user habits in an aggregated and anonymous form, including the number of visits to the website and to the different product sheets, the origin of visits, day and time, platform, number of clicks on a banner and search words used by a user to find the desired content. This allows RESERTRIP to employ a useful method for making improvements in its website and know what content or design is more relevant to the user.</p> <p class='text-justify'>Functional cookies: these cookies help users to have a better web surfing experience through the site. An example for using this type of cookie is the one used for storing browsing data of a specific language.</p> <p class='text-justify'>Technical cookies: these cookies are necessary to display the website properly and ensure the correct functioning of the site.</p>",
      "PRIVACITY_CONTENT": "<p class='lead text-center'>Avertissement légal et Politique de confidentialité</p><p class='text-justify'>Par le biais de cet avertissement légal, <b>RESERTRIP S.L.</b> (<b>RESERTRIP</b>), dont le siège social a été fixé à Avenida General Perón 26, Madrid 28020, Espagne, informe les usagers de la page Web lui appartenant, sur sa politique de confidentialité et de protection des données à caractère personnel, pour que ceux-ci choisissent, librement et volontairement, s’ils souhaitent fournir les renseignements personnels susceptibles de leur être demandés, dans le cadre de l’utilisation de certains services de notre page Web.</p><p class='text-justify'>Toute personne accédant à ce site Web assume le rôle d’usager, en s’engageant à l’observance et au respect rigoureux des dispositions stipulées ici, ainsi que de toute autre disposition légale pouvant être applicable.</p><p class='text-justify'>L’usager s’engage à ne pas utiliser le présent site Web à des fins frauduleuses et à n’adopter aucune conduite pouvant porter préjudice à l’image, aux intérêts et aux droits de <b>RESERTRIP</b>. En cas de manquement de la part de l’usager aux conditions d’utilisation du présent site Web, ou de suspicion raisonnable de la part de l’entreprise que l’usager ne les respecte pas, <b>RESERTRIP</b> se réserve le droit de limiter, de suspendre ou de mettre fin à son accès au site Web, en adoptant toute mesure technique s’avérant nécessaire à cette fin.<p class='text-justify'><b>RESERTRIP</b> garantit qu’elle traitera en toute sécurité et confidentialité les données correspondant au moyen de paiement utilisé. Les données de la carte bancaire utilisée pour le paiement sont transmises cryptées au travers du protocole sécurisé SSL qui garantit le secret dans la communication au travers d’un dialogue avec des clés de chiffrage.</p><p class='text-justify'><b>RESERTRIP</b>, dans le but de garantir la sécurité des transactions effectuées au travers de la présente page Web, intègre dans ses processus de contrôle, la vérification et la gestion préalable des informations fournies par le client concernant la carte bancaire de paiement. <b>RESERTRIP</b> se réserve le droit de refuser la demande d’engagement et d’achat de billets dont le paiement serait effectué au moyen d’une carte.</p><p class='text-justify'>Il faut tenir compte, en outre, que les fournisseurs ou les émetteurs des moyens de paiement utilisés peuvent avoir adopté d’autres mesures antifraudes qui impliquent le refus de certains types d’opérations. <b>RESERTRIP</b> ne contrôle pas et ne peut non plus être tenu responsable des préjudices que pourrait occasionner l’application de politiques adoptées par les divers fournisseurs ou émetteurs des moyens de paiement.</p><p class='text-justify'>Il est interdit d’utiliser un moyen de paiement appartenant à un tiers, à moins de disposer de l’autorisation expresse de ce tiers, la preuve de cette autorisation étant sous votre responsabilité et tous les dommages et les préjudices que pourrait subir <b>RESERTRIP</b> vous incomberont.</p><p class='text-justify'>Nous ne recueillerons, au travers du présent site Web, aucune information personnellement identifiable vous concernant, à moins que vous ne décidiez de nous la fournir volontairement, soit en effectuant des opérations d’achat de billets ou de location d’autocars, soit par le biais de l’adresse courriel de contact insérée dans notre page Web ou en vous inscrivant en tant qu’usager de notre page web.</p><p class='text-justify'>Les renseignements personnels fournis seront inclus dans un fichier de données personnelles et ils seront traités, selon les cas, dans le but de mener à bien les formalités nécessaires pour réaliser l’achat de billets, la location d’autocars, pour résoudre des questions, des griefs ou des réclamations, ainsi que pour gérer les processus d’enregistrement des usagers de notre Web.</p><p class='text-justify'>De même, nous vous informons que les renseignements fournis dans le cadre de l’achat d’un billet seront emmagasinés dans un fichier DATOS <b>RESERTRIP</b> et qu’ils seront, en outre, transférés aux systèmes des sociétés concessionnaires de lignes régulières de transport de voyageurs. Aussi bien les DATOS <b>RESERTRIP</b> que les sociétés concessionnaires seront responsables de leur confidentialité dans les termes exigés légalement, conformément à leurs politiques spécifiques de confidentialité.</p><p class='text-justify'>Nous vous informons, par ailleurs, que nous souhaitons pouvoir vous tenir informés par le biais de tout moyen, y compris par courriel ou par tout autre moyen de communication électronique équivalent, des nouveautés, des produits et des services proposés par <b>RESERTRIP</b>, susceptibles de vous intéresser. Sur ce point, si vous ne souhaitez pas que les renseignements vous concernant soient traités dans ce but, vous pourrez vous opposer à ce traitement des données en nous envoyant un courriel à cet effet à l’adresse suivante: <a href='mailto:info@resertrip.com'>info@resertrip.com</a>. Dans le cas contraire, nous entendons que vous nous autorisez à traiter vos données personnelles à des fins publicitaires en rapport. Par ailleurs, cette possibilité d’opposition au traitement de vos données à des fins publicitaires sera incluse dans chaque communication commerciale.</p><p class='text-justify'>Les droits d’accès, de rectification, d’annulation et d’opposition pourront être exercés, conformément aux dispositions de la réglementation en vigueur, par le biais d’une demande adressée à notre adresse courriel <a href='mailto:info@resertrip.com'>info@resertrip.com</a> ou à l’adresse postale : <b>RESERTRIP</b> S.L., Avenida General Perón 26, Madrid 28020, Espagne, en joignant dans tous les cas, la photocopie de votre C.N.I. ou de toute pièce d’identité équivalente valable en droit.</p><p class='text-justify'>L’usager répondra, dans tous les cas, de la véracité des renseignements fournis, <b>RESERTRIP</b> se réservant le droit d’exclure des services enregistrés tout usager ayant fourni des renseignements faux, sans préjudice des autres actions prévues en droit.</p><p class='text-justify'>Il incombe à l’usager de communiquer à <b>RESERTRIP</b> toute modification des renseignements personnels fournis.</p><p class='text-justify'><b>RESERTRIP</b> crespectera les dispositions de la réglementation en vigueur en ce qui concerne le devoir d’annulation des informations personnelles ne s’avérant plus nécessaires pour la ou les fins auxquelles celles-ci auront été recueillies, en les bloquant, afin de pouvoir assumer les responsabilités éventuelles découlant du traitement des données et uniquement durant les délais de prescription de ces responsabilités. Une fois ces délais écoulés, ces informations seront définitivement éliminées par le biais de méthodes sécurisées.</p><p class='text-justify'>Les mineurs de moins de 14 ans ne devront envoyer aucune information personnelle sans le consentement de leurs parents ou de leur tuteur. <b>RESERTRIP</b> ne peut être tenue responsable de toute information personnelle envoyée par des mineurs de moins de 14 ans sans l’autorisation opportune.</p><p class='text-justify'><b>RESERTRIP</b> a adopté les niveaux de sécurité pour la protection des données personnelles légalement requis en fonction des informations traitées et a implanté d’autres moyens et des mesures techniques supplémentaires à sa portée, pour éviter leur altération ou leur perte, le traitement ou l’accès non autorisé aux renseignements personnels fournis, conformément aux dispositions de la réglementation en vigueur en matière de protection des données à caractère personnel. En dépit de ce qui précède, l’usager doit être conscient que les mesures de sécurité sur internet ne sont pas inexpugnables.</p><p class='text-justify'>Lorsque vous accédez à notre site Web, nous ne stockons aucune information dans votre ordinateur au travers de cookies, afin de vous reconnaître de façon automatique lors de votre prochaine visite.</p><p class='text-justify'>Notre page Web contient des liens vers d’autres sites. Il faut tenir compte du fait que <b>RESERTRIP</b> ne peut être tenue responsable de la politique de confidentialité de ces sites. Nous prévenons les consommateurs de faire attention lorsqu’ils abandonnent notre site et de lire les politiques de confidentialité de chacun des sites qui réunissent des informations personnelles identifiables. Cette politique de confidentialité ne s’applique qu’aux informations contenues dans <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'><b>RESERTRIP</b> se réserve le droit de modifier la présente Politique de Confidentialité, afin de l’adapter à de futures nouveautés législatives ou jurisprudentielles.</p><p class='text-justify'><b>RESERTRIP</b> offre aux usagers les ressources techniques adéquates pour que, à titre préalable, ceux-ci puissent accéder à cet avertissement sur la Politique de Confidentialité et de Protection des Données, ainsi qu’à toute autre information pertinente et qu’ils puissent donner leur consentement, afin que cette société procède au traitement de leurs données personnelles.</p><p class='text-justify'>La totalité des contenus, des éléments, des designs et des applications hébergés dans cette page Web, quel que soit leur format et leurs caractéristiques, ainsi que tous les droits de Propriété Industrielle et Intellectuelle inhérents à ce site Web, appartiennent à <b>RESERTRIP</b> ceux-ci étant protégés tant par la réglementation sur la Propriété Industrielle et Intellectuelle, que par le reste de la législation pouvant s’avérer applicable. Ce contenu ne pourra faire l’objet d’exploitation, de reproduction, de distribution, de modification, de communication publique, de cession, de transformation ou de tout autre procédé de diffusion, n’ayant pas été autorisé expressément et au préalable. <b>RESERTRIP</b> se réserve le droit d’exercer des actions judiciaires face à tous ceux qui porteraient atteinte aux droits dont elle est propriétaire auxquels il a été fait référence.</p><p class='text-justify'>La législation espagnole sera applicable pour résoudre toutes les controverses ou les questions en rapport avec le présent site Web ou les activités menées dans celui-ci, les parties se soumettant expressément à celle-ci, les Cours et les Tribunaux de Madrid étant compétents pour la résolution de tous les conflits découlant ou en rapport avec son utilisation.</p><p class='text-justify'><b>RESERTRIP</b> S.L., en vertu des dispositions de l’article 10 de la Loi Espagnole 34/2002 sur les Services de la Société de l’Information et de Commerce Électronique et conformément au principe de transparence de notre société informe les usagers de sa page Web :</p><p class='text-justify'>Raison sociale : <b>RESERTRIP S.L.</b> <br>Siège social : Avenida General Perón 26, Madrid 28020, Espagne. <br>Adresse de contact : Avenida General Perón 26, Madrid 28020, Espagne. <br>SIRET : B83418830 <br>mmatriculation au Registre du Commerce et des Sociétés : immatriculée au Registre du Commerce et des Sociétés de Madrid, au Tome 34 702, Livre 0, Folio 10, Section 8, Feuille M624 172.<br>Courriel : <a href='mailto:info@ysolutions.es'>info@ysolutions.es</a>.<br>Téléphone de contact : 912309169 <br></p>",
      "ABOUTUS": "<div class='container'> <div class='row'> <div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>NOTRE OBJECTIF</strong></h5> <p>Nous souhaitons tout simplement vous aider à voyager du point A au point B.</p><p>Notre objectif est de fournir à nos clients:</p><ul> <li>Des informations actualisées sur la façon de voyager entre A et B.</li><li>Toutes les possibilités de voyage et les correspondances entre deux points.</li><li>Une comparaison rapide et facile entre un même moyen de transport ou des moyens de transport différents.</li><li>L’achat de billets de façon fiable et aisée.</li></ul> <p>Tout ceci, sur un même site Web en quelques clics: <a href='http://www.resertrip.com'>www.resertrip.com</a></p><p>La mobilité est devenue une caractéristique clé de notre société mondialisée. Face à une offre toujours plus importante entre divers moyens de transport, la complexité de trouver la possibilité s’adaptant le mieux aux besoins du client peut s’avérer décourageante.</p><p> Des compagnies aériennes à bas prix aux compagnies d’autobus.<br>Du train à grande vitesse au ferry. <br>Du transport public au transport privé (covoiturage, Uber, etc.)<br>Les options augmentent tous les jours, mais aussi la complexité. </p><p>Comment puis-je voyager facilement de A à B ? <a href='www.resertrip.com'>www.resertrip.com</a> est la réponse à cette question, en réservant votre voyage en seulement quelques clics.</p></div></div></div><div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>NOTRE PROJET</strong></h5> <p>Nous souhaitons non seulement créer une plate-forme numérique permettant aux clients de comparer et d’acheter des billets, mais nous voulons aussi fournir des informations facilitant le voyage : informations sur les compagnies de transport, les terminaux, les gares (routières et ferroviaires) et les aéroports, sur les activités existantes au point de destination, etc.</p><p>En outre, nous souhaitons fournir tout type de services entrant dans le cadre du voyage, tels que la location de voiture, la réservation d’hôtels, la réservation d’attractions touristiques, etc. En définitive, tout ce dont vous aurez besoin pour votre voyage, directement dans un même portail web, en à peine quelques clics et dans autant de pays que possible.</p><p>Nous avons décidé d’asseoir, tout d’abord, notre présence en Europe et en Amérique du Sud et nous envisageons de nous étendre à d’autres pays dans un futur proche. Que vous voyagiez dans votre propre pays ou à l’étranger, que ce soit pour votre travail ou en vacances, nous vous proposons de vous aider à rendre votre voyage le plus facile possible. Réservez votre prochain voyage sur <a href='http://www.resertrip.com.'>www.resertrip.com.</a></p></div></div></div><div class='col-md-12'> <br><div class='box'> <div class='box-content'> <h5><strong>NOTRE EQUIPE</strong></h5> <p>Nous sommes une équipe internationale, variée et qui dispose d’une vaste expérience, aussi bien dans le secteur du transport, que dans celui du marketing numérique. Notre base se situe à Madrid et nous sommes la première plate-forme de voyage multimodal sur Internet basée en Espagne.</p><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/roderick.jpg' alt='' class='img-circle'> <p>Roderick</p><span>CEO et Fondateur</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/pablo.jpg' alt='' class='img-circle'> <p>Pablo</p><span>Co-Fondateur, Ventes et Marketing</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/celine.jpg' alt='' class='img-circle'> <p>Celine</p><span>Média Sociaux</span> </div></div></div><br><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jake.jpg' alt='' class='img-circle'> <p>Jake</p><span>Co-Fondateur et CTO</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/abel.jpg' alt='' class='img-circle'> <p>Abel</p><span>Programmation et Développement</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jhesus-colmenares.jpg' alt='' class='img-circle'><p>Jesús</p><span>Programmation et Développement</span> </div></div></div></div></div></div></div></div>",
      "TERMS_CONTENT": "<p class='lead text-center'>CONDITIONS GÉNÉRALES</p><p class='text-justify'><b>RESERTRIP</b></p><p class='text-justify'><b>RESERTRIP</b> est une plate-forme multimodale qui facilite la comparaison et la vente de billets de moyens de transport différents dans divers pays. <b>RESERTRIP</b> sert d’intermédiaire entre l’usager et le transporteur. Chaque transporteur dispose de conditions générales de transport qu’il applique à son secteur et à son pays. En aucun cas <b>RESERTRIP</b> n’assume la responsabilité des dommages et intérêts pouvant survenir durant le voyage. Pour connaître les conditions générales des transporteurs, nous vous recommandons de consulter la page web de chaque entreprise.</p><p class='text-justify'><b>Responsabilité</b></p><p class='text-justify'>La responsabilité du transporteur incombe à l’entreprise qui offre effectivement le service. L’entreprise de transport ne répondra pas des manquements ne lui étant pas directement imputables, ni de ceux découlant de situations fortuites, de cas de force majeure ou répondant à des exigences légales ou administratives. De même, elle ne sera pas tenue responsable en cas de perte des correspondances entre leurs services et d’autres moyens de transport, que ceux-ci soient propres ou externes. Pour les services internationaux, la responsabilité pouvant exister incombera à l’entreprise qui réalisera le transport, conformément aux Lois et aux Tribunaux de son pays.<p class='text-justify'><b>Bagages</b><p class='text-justify'>Chaque entreprise de transport établit le poids maximum des bagages transportés gratuitement. L’excès devra être payé en fonction du tarif correspondant. En cas d’enregistrement des bagages, l’entreprise remettra le récépissé afférent.</p><p class='text-justify'>En cas de perte ou de détérioration des bagages transportés, il sera indispensable de présenter une réclamation dans les délais indiqués à l’alinéa des « Réclamations » en présentant le billet et le récépissé d’enregistrement, le cas échéant.</p><p class='text-justify'>La responsabilité du transporteur sera limitée, pour les services nationaux, selon la législation en vigueur dans chaque pays. Pour les services internationaux, la responsabilité incombera à l’entreprise qui assurera effectivement le transport, conformément à la législation opportune. Le transporteur ne répondra pas des dommages, des pertes ou des avaries subis par les bagages à main ou tout autre objet qui ne lui auront pas été confiés.</p><p class='text-left'><b>Bicyclettes</b></p><p class='text-justify'>Les conditions de transport des bicyclettes varient en fonction de l’entreprise de transport. Veuillez consulter directement les conditions de chaque transporteur.</p><p class='text-left'><b>Animaux de compagnie</b></p><p class='text-justify'>Les conditions de transport des animaux de compagnie varient en fonction de l’entreprise de transport. Veuillez consulter directement les conditions de chaque transporteur.</p><p class='text-left'><b>Annulation et modification de billets</b></p><p class='text-justify'>L’annulation et la modification des billets vendus au travers de la page Web de <b>RESERTRIP</b> pourront être réalisées au travers du lien fourni après l’achat du billet sur <b>RESERTRIP</b> ou directement auprès de l’entreprise de transport et toujours selon les conditions générales de chacune.</p><p class='text-left'><b>Réservation du retour de billets open</b></p><p class='text-justify'>Si sur le billet aller-retour, la date, l’heure et la place ne sont pas stipulées pour le retour, le voyageur devra se rendre, dans les plus brefs délais, au bureau de vente correspondant de l’entreprise, pour confirmer le retour qui dépendra des places disponibles à la date demandée.</p><p class='text-left'><b>Prix des billets</b></p><p class='text-justify'>Le montant total des billets achetés sur Internet comprend le prix du billet selon les tarifs en vigueur, plus - dans certains cas - la somme supplémentaire au titre des frais de gestion perçus par la partie vendeuse.</p><p class='text-left'><b>Réclamations</b></p><p class='text-justify'>Si le voyageur souhaite présenter une réclamation à l’encontre de l’entreprise de transport, il devra la formuler dans les plus brefs délais à compter de la date de prestation du service de transport ou de celle à laquelle celui-ci aurait dû avoir lieu. La réclamation sera traitée conformément aux dispositions de la législation en vigueur.</p><p class='text-left'><b>Réductions</b></p><p class='text-justify'>L’achat de billets sur Internet permet d’appliquer des réductions en fonction de la politique commerciale de chaque entreprise.</p><p class='text-justify'>Il est indispensable pour monter dans l’autobus, le train ou l’avion, de présenter la documentation justificative conférant le droit à la réduction.</p><p class='text-left'><b>Propriété du billet</b></p><p class='text-justify'>Les billets achetés sur Internet sont nominatifs, personnels et incessibles. Pour pouvoir les utiliser, le voyageur doit présenter une pièce d’identité dont le numéro devra coïncider avec celui stipulé sur le billet.</p><p class='text-justify'>Pour pouvoir voyager, il faudra présenter une pièce d’identité à l’embarquement, que le billet ait été directement imprimé à partir de la page Web de <b>RESERTRIP</b> ou que l’impression physique du billet ait été demandée au point de vente.</p><p class='text-justify'>Pour les billets achetés sur Internet pour des mineurs, des conditions spéciales d’identification s’appliquent aux personnes accompagnant le mineur.</p><p class='text-left'><b>Processus d’achat</b></p><p class='text-justify'></p>A titre de règle générale, <b>RESERTRIP</b> permet d’acheter le billet sur sa page Web. Dans certains cas où ceci s’avèrera impossible, l’acheteur sera redirigé sur le site Web du transporteur pour terminer le processus d’achat.</p><p class='text-justify'>Une fois le processus d’achat achevé, il est indispensable de cliquer sur le bouton IMPRIMER s’affichant à l’écran dans le « Résultat de l’achat ». Si vous ne souhaitez pas imprimer le billet ou que vous n’en avez pas la possibilité, veuillez prendre note du numéro de réservation et conservez-le en lieu sûr pour demander l’impression du billet au guichet de l’entreprise de transport.</p><p class='text-left'><b>Facture</b></p><p class='text-justify'>Si le client souhaite une facture de ses billets, il devra contacter l’entreprise de transport.</p><p class='text-left'><b>Correspondances</b></p><p class='text-justify'>Conformément à la législation des transports, certains parcours peuvent être réalisés avec une correspondance et une combinaison d’horaires à un arrêt déterminé, en délivrant un seul billet et qui requiert donc un changement d’autobus, de train ou d’avion à cet arrêt.</p><p class='text-left'><b>Documentation</b></p><p class='text-justify'>Chaque passager doit être en possession de la documentation nécessaire (passeport, visas, etc.) pour passer les frontières, conformément aux lois du ou des pays qu’il traversera. Si, dans le cas où il ne disposerait pas de la documentation ou que celle-ci ne serait pas en règle, le voyageur n’est pas admis au moment de l’embarquement ou que l’entrée dans un pays lui est interdite, tous les frais en découlant seront à sa charge, y compris ceux de retour et il ne pourra prétendre au remboursement du billet non utilisé.</p><p class='text-justify'>Le billet doit être conservé par le voyageur pendant toute la durée du voyage, aussi bien à l’aller qu’au retour. En cas de perte du billet, le client devra contacter l’entreprise de transport.</p><p class='text-left'><b>Mineurs</b></p><p class='text-justify'>Pour les services internationaux, les mineurs de moins de 16 ans doivent voyager accompagnés d’un adulte légalement autorisé. Les adolescents âgés de 16 à 18 ans, doivent être munis d’un passeport et d’une autorisation des services de police pour voyager.</p><p class='text-justify'>Pour les services nationaux, les conditions de voyage pour le transport de mineurs non accompagnés varient en fonction de l’entreprise de transport. Nous vous prions de vous renseigner dans chaque cas.</p><p class='text-left'><b>Moyens de paiement</b></p><p class='text-justify'>Le paiement par carte bancaire - de crédit ou de débit - est le seul moyen de paiement accepté sur <a href='www.resertrip.com'>www.resertrip.com</a>.</p>"
    },
    "PASSENGERS": {
      "TITLE": "Passagers",
      "ADULTS": "Adultes",
      "CHILDREN": "Enfants",
      "BABIES": "Bébés"
    },
    "SEARCH": {
      "LOADING_MESSAGE": "Chargement de résultats en cours...",
      "NO_DEPARTURES": "Aucun départ",
      "SEARCHING": "Recherche",
      "SORT": {
        "ORDER_BY": "Classement par",
        "COMPANY": "Sociétés",
        "HORARY": "Heure de départ",
        "PRICE": "Le moins cher",
        "DURATION": "Le plus rapide"
      },
      "FILTERS": {
        "MAP_TITLE": "TINFORMATIONS SUR LE TRAJET",
        "MAP_DISTANCE": "Distance:",
        "MAP_DURATION": "Temps de voyage:",
        "TITLE": "FILTRES",
        "RESULTS": "Résultats",
        "DEPARTURE_HOUR": "HEURE DE DÉPART",
        "PRICE": "PRIX",
        "SEAT_TYPE": "TYPE DE SIÈGE",
        "COMPANIES": "SOCIÉTÉS"
      },
      "TRIPS": {
        "ROUND": "Aller - Retour",
        "DEPARTURE": "Départ",
        "RETURN": "Retour",
        "RESULTS": "Résultats",
        "BUTTON": "ACHETER"
      },
      "WEATHER": {
        "TITLE_1": "Nous recherchons les meilleurs offres. Veuillez attendre.",
        "TITLE_2": "Nous recherchons des billets avec d'autres opérateurs."
      },
      "NO_RESULTS": {
        "TITLE": "Nous sommes désolés, nous n'avons pas trouvé d'information pour cette route. :(",
        "MESSAGE": "Nous ne pouvons pas trouver des billets pour la destination sélectionnée. Ils peuvent être épuisés ou la vente n'est pas disponible en ligne.",
        "FIND_NEXT_DAY": "Trouver des billets pour le lendemain"
      },
      "SELECTED_TRIP": {
        "TITLE_1": "Choisir votre aller",
        "TITLE_2": "avant de choisir votre retour",
        "TITLE_3": "Choisir votre retour",
        "TITLE_4": "pour sélectionner votre siège",
        "TITLE_5": "Votre billet sélectionné",
        "TITLE_6": "Changer de billet"
      },
      "SCRAPER": {
        "TITLE": "COMPARER BILLETS",
        "MESSAGE": "Ces prix ne sont pas guarantis."
      }
    },
    "SEATS": {
      "LOADING_MESSAGE": "Chargement du plan des sièges…",
      "PASSAGE_ROUND": "Voyage aller - retour:",
      "PASSAGE_RETURN": "Voyage retour:",
      "FLOOR_1": "PREMIER ÉTAGE",
      "FLOOR_2": "DEUXIÈME ÉTAGE",
      "SELECTION_LABEL": "Vos sièges:",
      "SELECTION_SUBLABEL": "Choisir un maximum de 7 places.",
      "SELECTION_SUBLABEL_NUMBER": " siège(s)",
      "LEGEND_AVAILABLE": "Disponible",
      "LEGEND_UNAVAILABLE": "Occupé",
      "LEGEND_SELECTED": "Sélectionné",
      "PURCHASE_SUMMARY": "RÉSUMÉ DE VOTRE ACHAT",
      "PURCHASE_BUTTON": "PAYER MAINTENANT",
      "PURCHASE_TOTAL": "Total",
      "PURCHASE_SEATS": "Sièges",
      "PURCHASE_SEAT": "Siège",
      "PURCHASE_ROUND": "Aller - Retour",
      "PURCHASE_RETURN": "Retour",
      "FORM_LABEL_PASSAGE": "Billet",
      "FORM_LABEL_SEAT": "Siège",
      "FORM_NAME": "Prénom",
      "FORM_LASTNAME": "Nom de famille",
      "FORM_RUT": "Numéro de document",
      "FORM_PASSPORT": "PASSEPORT",
      "FORM_COUNTRY": "Pays",
      "FORM_COUNTRY_TEXT": "Choisir un pays",
      "FORM_PHONE": "Téléphone",
      "FORM_PHONE_PLACEHOLDER": "Téléphone",
      "FORM_EMAIL": "E-mail",
      "FORM_EMAIL_PLACEHOLDER": "E-mail",
      "FORM_BTN_SELECT": "Choisir",
      "FORM_BTN_UPDATE": "Mettre à jour",
      "REDIRECT": "Bientôt vous serez automatiquement redirigé vers la page de recherche"
    },
    "PAYMENT": {
      "INFORMATION": {
        "TITLE": "PRÉNOM ET NOM DU DÉTENTEUR DE LA CARTE",
        "FORM_NAME": "Prénom",
        "FORM_LASTNAME": "Nom de famille",
        "FORM_DNI": "Numéro carte d'identité",
        "FORM_CREDIT_CARD": "Numéro de carte de crédit",
        "FORM_CREDIT_CARD_PLACEHOLDER": "Numéro de carte de crédit",
        "FORM_CVV": "Code CVC",
        "FORM_MONTH": "Mois",
        "FORM_YEAR": "Année",
        "FORM_EMAIL": "E-mail",
        "FORM_EMAIL_PLACEHOLDER": "E-mail",
        "FORM_NOTIFICATIONS": "Recevoir des notifications d'offres."
      },
      "PAY": {
        "TITLE": "OPTIONS DE PAIEMENT",
        "SUBTITLE": "Choisir une option de paiement",
        "TERMS": "J'accepte les",
        "TERMS_LINK": "Conditions Générales",
        "BUTTON": "PAYER MAINTENANT"
      },
      "PURCHASE": {
        "TITLE": "INFORMATION SUR VOTRE ACHAT",
        "SUBTOTAL": "Subtotal",
        "FEES": "Frais de service",
        "TOTAL": "TOTAL",
        "ROUND": "Voyage",
        "RETURN": "Retour",
        "PROCESS": "Votre achat est en cours, s'il vous plaît attendre quelques secondes",
        "TRAVEL_DETAIL": "S'il vous plaît vérifier les détails de votre voyage."
      },
      "PROMOTION": {
        "LABEL": "BON DE RÉDUCTION",
        "PLACEHOLDER": "Code promotionnel",
        "VALIDATE": "VALIDER"
      }
    },
    "SUCCESS": {
      "TITLE": "Votre achat a réussi avec succès",
      "SUBTITLE": "Cher / Chère ",
      "TEXT_1": "Nous vous remercions pour votre confiance dans",
      "TEXT_2": "Resertrip",
      "TEXT_3": "Nous vous envoyons un e-mail avec les détails de votre voyage",
      "ROUND": {
        "TITLE": "ALLER - RETOUR",
        "NO_TRIPS": "NUMÉRO DE VOYAGES:",
        "TICKETS": {
          "TITLE": "BILLETS",
          "DNI": "NUMÉRO CARTE D'IDENTITÉ:",
          "NAME": "PRÉNOM:",
          "SEAT": "SIÈGE:",
          "CODE": "CODE:",
          "PRICE": "PRIX:"
        }
      },
      "RETURN": {
        "TITLE": "RETOUR",
        "NO_TRIPS": "NUMÉRO DE VOYAGES:",
        "TICKETS": {
          "TITLE": "BILLETS",
          "DNI": "NUMÉRO CARTE D'IDENTITÉ:",
          "NAME": "PRÉNOM:",
          "SEAT": "SIÈGE:",
          "CODE": "CODE:",
          "PRICE": "PRIX:"
        }
      },
      "PAYMENT": {
        "TITLE": "INFORMATION SUR VOTRE ACHAT",
        "TYPE": "MODE DE PAIEMENT:",
        "TOTAL": "TOTAL:",
        "LINK": "Conditions Générales",
        "TOTALFEE": "Frais de service:"
      }
    },
    "CANCEL": {
      "TITLE": "La liste de vos voyages",
      "CANCELMSG": "TLa liste de vos voyages déjà annulés",
      "BUTTON": "Annuler",
      "EXPIRED": "Cet achat à expiré",
      "SECTION": "Section"
    },
    "SESSION": {
      "LOGIN": "Identifiant",
      "LOGIN_BUTTON": "Identifiant",
      "REGISTER": "Inscription",
      "REGISTER_TITLE": "Créer un compte",
      "SIGNIN": "Se connecter",
      "REMEMBER": "Se rappeller",
      "FORGOT": "Oublier votre mot de passe?",
      "EMAIL": "E-mail",
      "PASSWORD": "Mot de passe",
      "NAME": "Prénom",
      "CONFIRM_PASSWORD": "Confirmer mot de passe",
      "RECOVER": "Récuperer votre mot de passe",
      "RECOVER_BUTTON": "Récuperer mot de passe",
      "RECOVER_TEXT": "Introduire votre e-mail et vous recevrez les instructions pour récuperer votre mot de passe",
      "ERROR_LOGIN": "Vérifier votre e-mail ou votre mot de passe",
      "INF_RECOVER": "Vous avez changer votre mot de passe avec succès. Vérifier votre e-mail.",
      "GOOD": "Génial!",
      "EXIT": "Sortie",
      "PROFILE": "Profil",
      "DASHBOARD": "Tableau de bord",
      "PURCHASES": "Achats",
      "SETTINGS": "Paramètres",
      "HELLO": "Bonjour",
      "SMS_TRIPS": "VOS VOYAGES",
      "SMS_KILOMETERS": "VOS KILOMÈTRES PARCOURUS",
      "UPDATE_BUTTON": "Mise à jour",
      "TITTLE_UPLOAD_IMAGE": "Télécharger nouvelle image",
      "ERROR_UPLOAD_IMAGE": "Erreur dans le téléchargement de l'image",
      "UPLOADING_IMAGE": "Téléchargement de l'image…",
      "IMAGE_PREVIEW": "Aperçu",
      "TEXT_UPLOAD_IMAGE": "Sélectionner ou faite glisser l'image ici",
      "PURCHASES_TEXT1": "Voyages achetés",
      "PURCHASES_TEXT2": "Voyages expirés",
      "PURCHASES_TEXT3": "Voyages annulés",
      "PURCHASES_TEXT4": "Recherche de voyages en cours...",
      "PURCHASES_TEXT5": "Il n'y a pas de voyages achetés",
      "PURCHASES_TEXT6": "Il n'y a pas de voyages expirés",
      "PURCHASES_TEXT7": "Il n'y a pas de voyages anulés",
      "PURCHASES_TEXT8": "Voyage",
      "PURCHASES_TEXT9": "Passager",
      "PURCHASES_TEXT10": "Date",
      "PURCHASES_TEXT11": "# billet",
      "PURCHASES_TEXT12": "Prix",
      "SETTINGS_TEXT1": "Informations générales",
      "SETTINGS_TEXT2": "Mot de passe",
      "SETTINGS_TEXT3": "Contact d'urgence",
      "SETTINGS_TEXT4": "Désinscription",
      "SETTINGS_TEXT5": "<strong>Êtes-vous!</strong> sûr de vouloir supprimer votre compte?",
      "SETTINGS_TEXT6": "Oui, je suis sûr",
      "LASTNAME": "Dernier nom",
      "DNI": "# Numéro carte d'identité",
      "ADDRESS": "Adresse",
      "BIRTHDATE": "Date de naissance",
      "PHONE": "Numéro de téléphone",
      "PASSWORD_TEXT1": "Mot de passe actuel",
      "PASSWORD_TEXT2": "Nouveau mot de passe",
      "UPDATE_TEXT1": "Information mise à jour",
      "UPDATE_TEXT2": "Les mots de passe ne correspondent pas",
      "UPDATE_TEXT3": "Vérifier le mot de passe actuel"
    },
    "PDF": {
      "TITLE": "Désolé, quelque chose a mal tourné",
      "SUB-TITLE": "À l'heure actuelle, il est impossible de télécharger le PDF de votre billet, s'il vous plaît essayer à nouveau ou plus tard.",
      "DESCRIPTION": "Pour essayer de nouveau rappeler de le faire à partir de votre e-mail ou de la vue de l'achat réussie."
    }
  };

})();