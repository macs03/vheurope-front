(function () {
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

     app.config(function ($stateProvider, $urlRouterProvider) {
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
     });



    app.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.translations('en', translationsEN);
      $translateProvider.translations('es', translationsES);

      $translateProvider.preferredLanguage('es');
      $translateProvider.useSanitizeValueStrategy('sanitize');
      $translateProvider.useCookieStorage();
      $translateProvider.fallbackLanguage('es');
    }]);

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('resertrip')
            .setStorageType('sessionStorage');
    }]);

    app.config(function($authProvider,apiUrl) {
        // Parametros de configuración
        $authProvider.loginUrl = apiUrl+"login";
        $authProvider.signupUrl = apiUrl+"register";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "resertrip";
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = '';
    });

    var translationsEN = {
          "MAIN": {
            "TITLE": "TRAVEL SMART WITH RESERTRIP",
            "SUBTITLE": "Buy and compare",
            "FIND_PASSAGES": "Find your bus ticket in Spain",
            "CTA_BUY": "Purchase from your",
            "CTA_PHONE": "MOBILE",
            "BUS_COMPANIES": "Bus companies in Spain",
            "MUCH_MORE": "And many more.",
            "CHOOSE_ORIGIN": "Choose your origin",
            "CHOOSE_DESTINATION": "Choose your destination",
            "RETURN": "Return",
            "COOKIES_MESSAGE": "This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies."
          },
          "TIME":{
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
            "MESSAGE": "All of your transport options",
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
            "PRIVACITY_CONTENT": "<p class='lead text-center'>PRIVACY POLICY</p><p class='text-justify'>By means of this legal notice, <b>RESERTRIP S.L.</b> (<b>RESERTRIP</b>), domiciled in Avenida General Peron 26, Madrid 28020, informs users of the web page of its property about its policy of privacy and protection of personal data, so that users can freely and voluntarily determine whether they wish to provide the personal data that may be requested, with the purpose of utilization of certain services within our web page.</p><p class='text-justify'>Any person who accesses this website assumes a user role, committing themselves to the observance and strict compliance with the provisions contained herein, as well as any other legal provision set out.</p><p class='text-justify'>The user undertakes not to use this web site for fraudulent purposes, as well as to not engage in any conduct that could damage the image, the interests and rights of <b>RESERTRIP</b>. In the event of a breach by the user of the conditions of use of this web site, or reasonable suspicion by the company that the user is breaking them, <b>RESERTRIP</b> reserves the right to limit, suspend or terminate your access to the website, taking any technical measure as may be necessary for that purpose.</p><p class='text-justify'>Through the present web page we will not gather any information that can personally identify you, unless you voluntarily decide to provide it to us, either by performing operations of ticket purchase or coach hire, or by the e-mail address inserted in our web page, or by registering as a user in our web page.</p><p class='text-justify'>The provided personal data will be stored in a personal data file and will be treated, according to the occasion, with the purpose of processing the necessary steps for the ticket purchases, coach hires, resolution of claims or enquiries, as well as for purposes of processing the registration of users in our web page. We also inform you that the data provided as a consequence of the purchase of a ticket will be stored in DATOS <b>RESERTRIP</b> and will also be transferred to the systems of the dealer companies for regular passenger transport lines. Both DATOS <b>RESERTRIP</b> and the dealer companies are responsible for their confidentiality in the required legal terms, according to their specified privacy policies.</p><p class='text-justify'>Likewise, we inform you that it is our wish to keep you informed by any means, even e-mail or another equivalent electronic means, about news, products and services related to <b>RESERTRIP</b> in which you could be interested. In this regard, if you do not wish your data to be treated with this purpose you can reject it by sending us an e-mail informing so to the following address: info@resertrip.com. Otherwise, we understand that you authorize us to treat your personal data with the related advertising purposes. Similarly, each commercial communication will include this rejecting option to the treatment of your personal data.</p><p class='text-justify'>Rights of access, rectification, cancellation and rejection shall be carried out according to what it is established in current norms, by means of request addressed to our email address info@resertrip.com or to the postal address: <b>RESERTRIP</b> S.L. (<b>RESERTRIP</b>), Avenida General Peron 26, Madrid 28020, attaching in any case photocopy of DNI or equivalent valid identity document.</p><p class='text-justify'>The user will respond in any case for the veracity of the provided data, while <b>RESERTRIP</b> will reserve to itself the right to exclude from the registered service those users that have provided false data, without prejudice to any other proceeding actions under Law.</p><p class='text-justify'>The user is responsible for communicating <b>RESERTRIP</b> any modification of the provided personal data.</p><p class='text-justify'><b>RESERTRIP</b> will comply with what it is established in current norms in regards to the obligation to cancel the personal information that becomes unnecessary for the purpose or for the purposes for which it was gathered, blocking it, hence being able to take care of possible responsibilities derived from the treatment of data, and only during the prescription terms for those responsibilities. Once these terms have passed, the information will be definitively erased using safe methods.</p><p class='text-justify'>Children under 14 years old should not provide any personal information without their parent’s or guardian’s consent. <b>RESERTRIP</b> is not responsible for any personal information sent by children under 14 years old without proper authorization.</p><p class='text-justify'><b>RESERTRIP</b> has adopted the personal data protection safety levels that are legally required for the involved information, and has implemented additional means and technical actions in its scope in order to avoid alteration, loss, treatment or unauthorized access related to the provided personal data, according to what is established in current legislations for protection of personal data. However, the user must be conscious about the fact that internet security actions are not absolutely reliable.</p><p class='text-justify'>When you access our web site, we do not store any information in your computer through cookies with the purpose of automatically recognizing you the next time that you access the site.</p><p class='text-justify'>Our Web Page contains links to other sites. It should be noted that <b>RESERTRIP</b> does not take responsibility for the privacy policy of those sites. We warn consumers to be careful when abandoning our site and to read the privacy policies of all and each of the sites that gather information that can personally identify people. This privacy policy only applies to the information contained in <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'><b>RESERTRIP</b> reserves the right to modify the present Privacy Policy in order to adapt it to future legal or jurisprudence news. In such cases, modifications will be announced in this page with a reasonable time before applying the modifications.</p><p class='text-justify'><b>RESERTRIP</b> provides users with the technical resources to be able to access this notice about Privacy and Data Protection Policy, as well as any other relevant information so that they can provide consent in order to allow this company to proceed with the treatment of their personal data.</p><p class='text-justify'>All of the contents, elements, designs and applications housed in this webpage, whatever its format and features, as well as all the Industrial and intellectual property rights inherent in this web site, are property of <b>RESERTRIP</b> and are protected both under the Industrial and Intellectual Property regulations as well as the rest of legislation in force. Such content may not be object of exploitation, reproduction, distribution, modification, public communication, assignment, transformation or any other process of dissemination that has not been expressly and previously authorized. <b>RESERTRIP</b> reserves itself the right to take the appropriate legal actions against those who violate the ownership rights.</p><p class='text-justify'>The Spanish law will be applied for the resolution of all disputes or issues regarding this web site or the activities therein. Both parties expressly submit, for the resolution of all conflicts derived or related to its use in the Courts and Tribunals of Madrid.</p><p class='text-justify'><b>RESERTRIP S.L.</b> , in virtue of what it is stated in article 10 within Law 34/2002 of Services of Information Society and Electronic Commerce, and complying with the transparency principle within our company, informs the users of its web page: <br>Company name: <b>RESERTRIP</b> S.L. <br>Company address: Avenida General Peron 26, Madrid 28020. <br>C.I.F: B83418830 <br>Registration data within Trading Registry: incorporated in the Trading Registry of Madrid, in Volume 18113, sheet 9, page M-313290. <br>E-mail address: <a href='mailto:info@ysolutions.es'>info@ysolutions.es</a>. <br>Contact phone number: 912309169<br></p>",
            "ABOUTUS": "<div class='container'> <div class='row'> <div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Our Mission</strong></h5> <p>Simply put we help you to travel from A to B.</p><p>Our aim is to provide our customers with:</p><ul> <li>Up to date information on how to travel from A to B</li><li>Providing all the traveling possibilities between these two points 3) a fast and easy comparison within and between different modes of transportation.</li><li>Purchasing a ticket in a reliable and quick way.</li></ul> <p>All this in a single website with just a few clicks: <a href='http://www.resertrip.com'>www.resertrip.com</a></p><p>Mobility has become a key feature in our global society. Faced with an ever increasing offer between different modes of transportation, the complexity of finding the best suitable traveling opportunity has become daunting.</p><p> From low cost airlines to low cost bus lines.<br>From high speed train to ferry boat. <br>From public transport to private transport (car sharing, Uber, etc...).<br>The options are growing by the day and so is the complexity. </p><p>How can I travel easily from A to B? <a href='www.resertrip.com'>www.resertrip.com</a> is the answer to your problem by reserving your trip on a single website with just a few clicks.</p></div></div></div><div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Our Project</strong></h5> <p>Our aim is to create not only a digital platform where customers can compare and buy tickets, but also to provide information and facilitate your trip. Information on transportation companies, ter- minals (bus, train, airport), what activities to do at your destination point, etc...</p><p>We also aim to provide all type of services around your trip such as car hire, hotel reservation, reserving your tourist attraction, etc... All in all, everything you need for your trip in one portal with just a few clicks, in as many countries in the world as possible.</p><p>We are developing our presence in Europe and South America first and will expand to other continents in the near future. Whether you are traveling in your home country or traveling abroad on busi- ness or for holidays we aim to make your travel as easy as possible. Reserve your next trip on <a href='http://www.resertrip.com.'>www.resertrip.com.</a></p></div></div></div><div class='col-md-12'> <br><div class='box'> <div class='box-content'> <h5><strong>Our Team</strong></h5> <p>We are an international diverse team with a long experience in both transportation and digital marketing. We are based in Madrid and are the first Spanish based multi modal internet platform.</p><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/roderick.jpg' alt='' class='img-circle'> <p>Roderick</p><span>CEO & Fundador</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/pablo.jpg' alt='' class='img-circle'> <p>Pablo</p><span>Co-Founder, Sales & Marketing</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/celine.jpg' alt='' class='img-circle'> <p>Celine</p><span>Social Media</span> </div></div></div><br><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jake.jpg' alt='' class='img-circle'> <p>Jake</p><span>Co-Founder & CTO</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/abel.jpg' alt='' class='img-circle'> <p>Abel</p><span>Programming & Development</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jhesus-colmenares.jpg' alt='' class='img-circle'> <p>Jesús</p><span>Programming & Development</span> </div></div></div></div></div></div></div></div>",
            "TERMS_CONTENT": "<p class='lead text-center'>GENERAL CONDITIONS</p><p class='text-justify'><b>Responsibility</b></p><p class='text-justify'>Responsibility of the carrier corresponds to the company effectively executing the service. The transport company does not respond for any non-compliance that is not directly attributable to the same, or for any produced due to a fortuitous case, force majeure or due to legal or administrative demands. In like manner the company is not responsible for any losses in the link to their services with other transport companies, be the same own or foreign. In the case of International Lines, responsibility could correspond to the company executing transport, the same in accordance to the Laws and Tribunals of the company's country.<p class='text-justify'><b>Luggage</b><p class='text-justify'>Each transport company establishes the maximum weight of luggage that is transported free of charge. Excess luggage weight will be paid-up in accordance to the amount of the corresponding tariff, save that specifically arranged for international lines. In the case of luggage check, the company will present the passenger with the corresponding receipt.</p><p class='text-justify'>In the case of loss or deterioration of transported luggage, the claim must be placed immediately after arrival, duly presenting the ticket and luggage check receipt.</p><p class='text-justify'>The carrier's responsibility is limited (at National services under Art 23 Law 16/1987, dated July 30) and specifically to a maximum of € 300 in international services operated by Alsa. On international lines, the responsibility lies with the company effectively executing transport and in conformity with the legislation that proceeds. The carrier does not respond for any damage, prejudicial consequences or deterioration suffered by hand luggage or other objects that are not entrusted to their custody.</p><p class='text-left'><b>Bicycles</b></p><p class='text-justify'>The conditions for the transport of bicycles vary depending on the transport company:</p><p class='text-justify'>-ALSA / CONDA.</p><p class='text-justify'>The transport of bicycles, surfboards or skis has a supplement of € 5 on the ticket price in short-haul services and € 10 in long-haul services.</p><p class='text-justify'>A total of four units are allowed per coach, between bicycles and surfboards (one per ticket). They must be conveniently disassembled and packed.</p><p class='text-justify'>International services, only allows the transportation of bicycles in the route Spain-Morocco, previously reserved and paid.</p><p class='text-justify'>-LA UNION / LA BURUNDESA / HIFE</p><p class='text-justify'>They must be conveniently disassembled and packed. Consult the supplement amount.</p><p class='text-justify'>-COMES / THERPASA</p><p class='text-justify'>They must be conveniently disassembled and packed. The transport is free.</p><p class='text-left'><b>Pets</b></p><p class='text-justify'>According to the Current Legal Regulations, pets cannot access the compartment reserved for passengers on a bus. The only exception is guide dogs for the blind, which are allowed to travel next to the passenger.</p><p class='text-justify'>In case that the company allows the transport of pets, dogs or cats will travel in the bus hold, inside cages or special baskets provided by the passenger that must be adapted for this use, being strictly prohibited to transport them outside of such cages or baskets.</p><p class='text-justify'>In general, the transfer of these animals is the sole responsibility of their owners, which shall necessarily travel in the same service as the animal.</p><p class='text-justify'>The passenger must present himself at the boarding point, together with the animal, 15 minutes before departure, so as to personally introduce the animal into the cage and place it inside the coach, following the instructions given by the driver. The animal shall be in good physical, hygienic and psychological condition for the travel, not being compulsory, although it is recommended, to use a muzzle in case of dogs.</p><p class='text-justify'>Only one dog or cat is allowed per bus.</p><p class='text-justify'>The transport cost can vary depending on the transport company. Please consult in every case.</p><p class='text-left'><b>Cancellation and change in tickets</b></p><p class='text-justify'>Cancellation and changes in tickets sold through the <b>RESERTRIP</b> web site may be made at <a href='www.resertrip.com'>www.resertrip.com</a> at least 2 hours before departure and with the condition that the ticket is not printed and held at the booking office. It is recommended that these operations be executed during commercial hours, given that transport companies carry out nocturnal maintenance tasks and the service might not be available. If the ticket has been printed at the booking office, the operation will have to take place at each company's sales point.</p><p class='text-justify'>In the case of cancellation, the amount of the ticket will be returned to the passenger, deducting 10% if requested less than 48 hours before departure and 20% if requested between 48 and 2 hours before departure of the bus. In no case whatsoever will handling costs be refunded (see specific change and cancellation conditions).</p><p class='text-justify'>In the case of cancellation, and whenever the client is in possession of a printed ticket and no office corresponding to the route issuing company exists, the client is to send the ticket directly to <b>RESERTRIP</b> in order to execute said cancellation.</p><p class='text-justify'>The ticket will only be valid for the date and time appearing in the same. Non-presentation of the passenger at the time and date of departure will imply loss of the trip and will not give rise to any change in the ticket or to a refund of its amount.</p><p class='text-justify'>No cancellations and changes are admissible in special promotion tickets.</p><p class='text-justify'>Tickets purchased at travel agencies and Internet, once printed at the ticket office, only allow changes and cancellation in points of sale.</p><p class='text-justify'>A change in the travel date is only possible if requested a minimum of 2 hours prior to service, the same conditioned by availability of seats on the new date that is requested.</p><p class='text-justify'>Only one change is allowed per ticket. The change of date and time is free, except for companies included in the section regarding Specific Conditions for Ticket Change and Cancellation.</p><p class='text-left'><b>Specific conditions for ticket change and cancellation</b></p><p class='text-justify'>FOR ALSA TICKETS: In the case of cancelation the company shall refund the passenger the full amount of the ticket if requested at least 48 hours before the departure. If the cancelation is requested between 24 and 48 hours, the company shall refund the amount of the ticket minus 10%. In the event that the cancelation is requested less than 24 hours before 20% shall be deducted from the amount of the ticket.</p><p class='text-justify'>In case of tickets that have been previously changed, a 20% deduction of the amount will be applied when requested with more than 48 hours in advance. For these types of tickets, the cancellation fee will be 30% when requested between 48 and 24 hours in advance and 40% of its amount, when requested less than 24 hours in advance prior to the departure.</p><p class='text-justify'>One single change per ticket is admitted when requested at least 48 hours before the departure. An additional surcharge of 5% of the ticket price will be applied for those changes requested 24 to 48 hours in advance. An additional surcharge of 10% of the ticket price will be applied when the change is requested less than 24 hours in advance. The closing of a ticket is considered as a change.</p><p class='text-justify'>A 20% surcharge will be applied in the second and successive ticket changes when requested more than 24 hours in advance. A 30% surcharge will be applied on the ticket Price when these changes are requested less than 24 hours in advance.</p><p class='text-justify'>Regarding international routes, these change and cancellation conditions are applicable to all tickets with departure from Spain.</p><p class='text-justify'>Ticket changes are not allowed for the companies ALOSA, ALARSA. You must contact the customer service of Movelia at 902 33 55 33 in order to cancel the ticket without charges and then proceed with the purchase of a new ticket. </p><p class='text-justify'>IMPORTANT: When a change or closure of ticket is carried out, the seat may not be chosen because it is automatically assigned. </p> <p class='text-justify'>Changes will only affect the date or time of service. It is not possible to make any change regarding the route, passenger´s personal data, assigned seat and/or number of bus.</p><p class='text-left'><b>Closing of tickets with open return</b></p><p class='text-justify'>If the date, time, seat and vehicle corresponding to the return trip are not consigned on the forward and return ticket, the passenger must go to the company's corresponding booking office as soon as possible (8 days in the case of international lines) to confirm the return trip, which will be conditioned to availability of seats on the requested date. Confirmation of the return does not involve any cost whatsoever.</p><p class='text-justify'>If the ticket has not been printed at the booking office, the closing operation can be executed at <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'>Check the validity of the departure ticket with open return, since it may vary depending on the company. The companies Daibus, Agreda, Therpasa, La Unión and La Burundesa require that tickets have all the data correct in both directions at the time of the purchase.</p><p class='text-left'><b>Price of the tickets</b></p><p class='text-justify'>The total amount of tickets purchased through the Internet consists in the price of the ticket according to the enforced dealer's tariffs, plus the additional amounts expressed in the concept of handling costs charged by the selling party. Handling costs will be applied to each ticket, considering the forward and return tickets as a sole ticket to the effects of said cost.</p><p class='text-left'><b>Reinforcements and seat assigning</b></p><p class='text-justify'>For national and international services, the Company reserves the possibility of executing the service with vehicles that belong to collaborating companies whenever circumstances were to thus require the same, and in particular, to cover intensification in traffic, with said vehicles possibly not gathering together the comfort characteristics of their habitual vehicles. The Company reserves the right to modify the seat that is assigned to the passenger whenever operating conditions were to so exact the same.</p><p class='text-justify'>With Daibus, the vehicles that are contracted to reinforce the lines (coach number 2 and following) make 2 stops during the route in order to comply with that established in the enforced legislation in matters concerning driving and resting periods.</p><p class='text-left'><b>Smoking prohibition</b></p><p class='text-justify'>Smoking in the vehicle is strictly forbidden (Art. 6 R.D. 1293/1999).</p><p class='text-left'><b>Official complaints book</b></p><p class='text-justify'>An official complaints book is at the disposal of passengers at the place of origin and destination of all national services.</p><p class='text-justify'>The company Daibus has complaint sheets and suggestions in their administrations.</p><p class='text-left'><b>Discounts</b></p><p class='text-justify'>Purchase of tickets through the Internet allows applying discounts, this depending on the commercial policy of each company.</p><p class='text-left'><b>Ownership of the ticket</b></p><p class='text-justify'>Tickets purchased through the Internet are non-negotiable and non-transferable. The passenger's personal identification document is required to use the ticket and the same must correspond with the personal identification number appearing on the ticket.</p><p class='text-justify'>You will have to present your personal identification to travel, this both when directly accessing the bus with a ticket printed on the <b>RESERTRIP</b> web site, as well as when a physical print-out is requested at the sales point.</p><p class='text-justify'>In the case of tickets purchased through the Internet for minors who are not in possession of personal documentation, the document of the adult accompanying the minor will have to be included in the web section reserved for the same. Non-correspondence of necessary personal data will imply automatic cancellation of the ticket.</p><p class='text-left'><b>Purchasing process</b></p><p class='text-justify'>To purchase the ticket please follow the 4 steps outlined on the web site.</p><p class='text-justify'>As of the moment you choose your seat in step 2 and until you press the 'pay' button on the payment page you will have a period of 5 minutes to finish the purchase operation.</p><p class='text-justify'>The purchase will be valid once you have entered your credit card number and its expiry date and pressed the 'Pay' button in Step 4, the same with the corresponding debit of the amount.</p><p class='text-justify'>Once you have finished the purchase process, we recommend that you press the PRINT button that appears on the screen in the 'Purchase Result'. If you do not wish to print the ticket or if printing is impossible, please annotate the locator number in a safe place so that you can request a print-out of the ticket at the transport company's booking office.</p><p class='text-left'><b>Legal text</b></p><p class='text-justify'>In compliance with the Spanish Organic Law 15/1999 of December 13 pursuant to the Protection of Personal Data, we inform you that the personal data provided will be included in a file owned by the company with the purpose of carrying out actions corresponding to the purchase of the selected ticket. Likewise, we inform you that the data provided as a result of the purchase will be stored in DATOS <b>RESERTRIP</b> and in addition it will be transferred to the concessionary companies of regular passenger lines for transport systems. DATOS <b>RESERTRIP</b> as well as the concessionary companies are responsible for the confidentiality in the terms legally required according to their specific privacy policies.</p><p class='text-justify'>The fields of the form marked with asterisks (*) are required to be completed. Failure to include these details will mean your purchase cannot be processed.</p><p class='text-justify'>Sending your personnel data implies the acceptance and consent in the treatment of the same, your personnel data will be incorporated into a duly registered file in the General Data Protection Register.</p><p class='text-justify'>We understand that the details provided correspond to the interested party and are true. <b>RESERTRIP</b> reserves the right to exclude all users who have submitted false information from this service, without prejudice to any other legal action that may be taken by the company. You are responsible for informing <b>RESERTRIP</b> if there is any change to the personal information you have provided.</p><p class='text-justify'><b>RESERTRIP</b> guarantees that you may exercise your right to access, correct, challenge, or delete the information provided in accordance with the procedure established in prevailing legislation by sending an email to info@resertrip.com or writing to: <b>RESERTRIP</b> S.L. (MOVELIA), Avenida General Peron 26, Madrid 28020. In both cases you should attach a photocopy of your National Identity Card, or another document which accredits your identity.</p><p class='text-left'><b>Invoice</b></p><p class='text-justify'>If the client wants the bill for the tickets the option INVOICE may be used upon finalizing of the purchase process, or, if the ticket is printed, it can then be sent by mail to: Avenida General Peron 26, Madrid 28020, indicating the invoice data and mailing address for the same.</p><p class='text-left'><b>Changes in bus</b></p><p class='text-justify'>According to the legislation on transport, some routes can be executed by means of service connection with combination of timetables for a certain stop and unique issuance of tickets, which would require a change of bus at said stop.</p><p class='text-left'><b>Conditions subject to each company's policies</b></p><p class='text-justify'>The company Hife only admits 15 kg of luggage per passenger and Alosa 20 kg. International lines admit 25 kg.</p><p class='text-left'><b>Bus Access</b></p><p class='text-justify'>In national lines, you can access directly to the bus with the locator number and ID Card, except in the companies Hife, Autobuses la Unión, La Burundesa and Trasnportes Generales Comes.</p><p class='text-justify'>In these companies, passengers should proceed with the printed ticket directly to the bus driver, or to the ticket desk of the transporting company 30m. before departure, with the locator number and ID Card, in order to request the printed ticket.</p><p class='text-justify'>On international routes, it is necessary that the passenger checks-in 30m. before departure, with the printed ticket and the personal documentation in order.</p><p class='text-justify'>The international line Spain-France - Switzerland-Poland, has transshipment in Barcelona, so the passenger should go to the Point of Sale of Alsa to obtain the ticket from the town of origin to Barcelona.</p><p class='text-left'><b>Documentation</b></p><p class='text-justify'>Each passenger must carry the necessary documents (passport, Visa, etc.) to cross borders, according to the laws of the country or countries for which they are crossing. If due to causes in which the documentation is not in order, and the passenger is not admitted at boarding, or the entry into any country is prohibited, all expenses will be at his cost, including the return, and the refunding of ticket will not proceed.</p><p class='text-justify'>The ticket must be kept by the passenger during the entire trip, both for one way or return. Lost or stolen ticket, are neither replaced nor refunded.</p><p class='text-left'><b>Youngsters</b></p><p class='text-justify'>On international lines, children under 16 years old must travel accompanied by an adult legally authorized. Youngsters aged between 16 and 18 years, need a passport and police authorization to travel.</p><p class='text-justify'>In national lines, the travelling conditions for unaccompanied youngsters vary depending on the carrier company. Please check in each case</p><p class='text-left'><b>Payment modes</b></p><p class='text-justify'>Payments can be made through credit or debit cards on the website of <a href='www.resertrip.com'>www.resertrip.com</a>.</p>"
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
            "SORT": {
              "ORDER_BY": "Order by:",
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
            "REDIRECT" : "Soon you will be redirected to the search page automatically"
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
              "RETURN": "Return"
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
              "TOTALFEE" : "Service Fee:"
            }
          },
          "CANCEL": {
            "TITLE": "We present your list of passages",
            "CANCELMSG": "This list of passages already canceled",
            "BUTTON" : "Cancel",
            "EXPIRED" : "This purchase has expired",
            "SECTION" : "Section"
          }
        };
    var translationsES = {
      "MAIN": {
        "TITLE": "VIAJA INTELIGENTE CON RESERTRIP",
        "SUBTITLE": "Compra y compara",
        "FIND_PASSAGES": "Encuentra tus billetes de autobús en España",
        "CTA_BUY": "Compra desde tu",
        "CTA_PHONE": "MOVIL",
        "BUS_COMPANIES": "Empresas de autobuses en España",
        "MUCH_MORE": "Y muchas más.",
        "CHOOSE_ORIGIN": "Elige tu origen",
        "CHOOSE_DESTINATION": "Elige tu destino",
        "RETURN": "Vuelta",
        "COOKIES_MESSAGE": "Este portal, al igual que la mayoría de portales en Internet, usa cookies para mejorar la experiencia del usuario. Continuar en la página supone aceptar el uso de estas cookies."
      },
      "TIME":{
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
        "PRIVACITY_CONTENT": "<p class='lead text-center'>Aviso legal y Política de privacidad</p><p class='text-justify'>Mediante este aviso legal, <b>RESERTRIP S.L.</b> (<b>RESERTRIP</b>), domiciliada en Madrid, Avenida General Perón 26, Madrid 28020, informa a los usuarios de la página web de su propiedad, acerca de su política de privacidad y protección de datos de carácter personal, para que el usuario determine, libre y voluntariamente, si desean facilitar los datos personales que le puedan ser solicitados, con motivo de la utilización de determinados servicios de nuestra página web.</p><p class='text-justify'>Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra disposición legal que fuera de aplicación.</p><p class='text-justify'>El usuario se compromete a no usar el presente sitio web con fines fraudulentos, así como a no llevar a cabo conducta alguna que pudiera dañar la imagen, los intereses y los derechos de <b>RESERTRIP</b>. En caso de incumplimiento por parte del usuario de las condiciones de uso del presente sitio web, o de sospecha razonable por parte de la empresa de que el usuario las está incumpliendo, <b>RESERTRIP</b> se reserva el derecho a limitar, suspender o terminar su acceso al sitio web, adoptando cualquier medida técnica que sea necesaria con ese fin.</p><p class='text-justify'><b>RESERTRIP</b> garantiza que tratará con total seguridad y confidencialidad los datos correspondientes al medio de pago utilizado. Los datos de la tarjeta utilizada para el pago se transmiten de forma encriptada a través del protocolo seguro SSL, que garantiza el secreto en la comunicación a través de un diálogo con claves de cifrado.</p><p class='text-justify'><b>RESERTRIP</b>, con el objeto de garantizar la seguridad de las transacciones efectuadas a través de la presente página web tiene incorporado, en sus procesos de control, la verificación y gestión previa de la información facilitada por el cliente respecto a la tarjeta de pago. <b>RESERTRIP</b> se reserva la facultad de rechazar la solicitud de contratación y compra de billetes cuyo pago se efectúe haciendo uso de una tarjeta.</p><p class='text-justify'>Tenga en cuenta, adicionalmente, que los proveedores o emisores de los medios de pago utilizados pueden tener adoptados otras medidas antifraude y que conlleven el rechazo de cierto tipo de operaciones. <b>RESERTRIP</b> no controla ni es responsable de los perjuicios que pudiera ocasionar la aplicación de las políticas que tengan aprobadas los distintos proveedores o emisores de medios de pago.</p><p class='text-justify'>Queda prohibida la utilización de un medio de pago titularidad de un tercero excepto en el caso de que se cuente con la autorización expresa de dicho tercero, siendo de su responsabilidad la prueba de dicha autorización y asumiendo todos los daños y perjuicios que se produzcan a <b>RESERTRIP</b>.</p><p class='text-justify'>A través del presente sitio web, no recogeremos ninguna información personalmente identificable sobre usted, a no ser que voluntariamente decida proporcionárnosla bien, al efectuar operaciones de compra de billetes o alquiler de autocares, bien mediante la dirección de correo electrónico de contacto inserta en nuestra web o mediante su registro como usuario de nuestra página web.</p><p class='text-justify'>Los datos personales facilitados se incluirán en un fichero de datos personales y serán tratados, según los casos que corresponda, con la finalidad de llevar a cabo las gestiones necesarias para efectuar la compra de billetes, el alquiler de autocares, la resolución de consultas, quejas o reclamaciones efectuadas, así como gestionar los procesos de registro de usuarios de nuestra web.</p><p class='text-justify'>Asimismo, le informamos que los datos facilitados como consecuencia de la compra de un billete se almacenarán en DATOS <b>RESERTRIP</b> y además serán transferidos a los sistemas de las compañías concesionarias de líneas regulares de transporte de viajeros. Tanto DATOS <b>RESERTRIP</b> como las compañías concesionarias se responsabilizan de su confidencialidad en los términos exigidos legalmente, de acuerdo con sus políticas específicas de privacidad.</p><p class='text-justify'>De igual manera, le informamos que es nuestro deseo poder mantenerle informado mediante cualquier medio, incluso por correo electrónico u otro medio de comunicación electrónica equivalente, sobre novedades, productos y servicios relacionados con <b>RESERTRIP</b>, que pudieran ser de su interés. A este respecto, si Usted no desea que sus datos sean tratados con esta finalidad podrá oponerse a este tratamiento de datos enviándonos un correo electrónico a tal efecto a la siguiente dirección <info@b>fo@b>rese</inrtrip.com. De no ser así, entendemos que Usted nos autoriza al tratamiento de sus datos personales con los fines publicitarios relacionados. De igual manera, en cada comunicación comercial se incluirá esta posibilidad de oposición al tratamiento de sus datos con fines publicitarios.</p><p class='text-justify'>El ejercicio de los derechos de acceso, rectificación, cancelación y oposición, podrá llevarse a cabo, conforme a lo dispuesto en la normativa vigente, mediante solicitud dirigida a nuestra dirección de correo electrónico <info@b>fo@b>rese</inrtrip.com o a la dirección postal: <b>RESERTRIP</b> S.L. Avenida General Perón 26, Madrid 28020, adjuntando en todo caso, fotocopia de su D.N.I o documento equivalente válido en derecho que permita acreditar su identidad.</p><p class='text-justify'>El usuario responderá, en cualquier caso, de la veracidad de los datos facilitados, reservándose <b>RESERTRIP</b> el derecho a excluir de los servicios registrados a todo usuario que haya facilitado datos falsos, sin perjuicio de las demás acciones que procedan en Derecho.</p><p class='text-justify'>El usuario se hace responsable de comunicar a <b>RESERTRIP</b> cualquier modificación de los datos personales facilitados.</p><p class='text-justify'><b>RESERTRIP</b> cumplirá lo dispuesto en la normativa vigente en cuanto al deber de cancelación de la información personal que haya dejado de ser necesaria para el fin o los fines para los cuales fue recabada, bloqueando la misma, con el fin de poder atender a las posibles responsabilidades derivadas del tratamiento de los datos, y sólo durante los plazos de prescripción de dichas responsabilidades. Una vez transcurran dichos plazos, se eliminará definitivamente esa información mediante métodos seguros.</p><p class='text-justify'>Los menores de 14 años no deberán enviar ninguna información personal sin el consentimiento de su padre o tutor. <b>RESERTRIP</b> no es responsable de ninguna información personal enviada por los menores de 14 años sin la autorización oportuna.</p><p class='text-justify'><b>RESERTRIP</b> ha adoptado los niveles de seguridad de protección de datos personales legalmente requeridos en función de la información tratada y ha implantado otros medios y medidas técnicas adicionales a su alcance para evitar su alteración, pérdida, tratamiento o acceso no autorizado de los datos personales facilitados, de acuerdo lo dispuesto en la normativa vigente en materia de protección de datos de carácter persona. No obstante lo anterior, el usuario debe ser consciente de que las medidas de seguridad en internet no son inexpugnables.</p><p class='text-justify'>Cuando usted accede a nuestro sitio web, no almacenamos ninguna información en su ordenador a través de cookies con objeto de reconocerle de forma automática la próxima vez que usted utilice el mismo.</p><p class='text-justify'>Nuestra Página Web contiene enlaces a otros sites. Hay que considerar que <b>RESERTRIP</b> no se responsabiliza de la política de privacidad de esos sites. Advertimos a los consumidores que tengan cuidado cuando abandonen nuestro site y que lean las políticas de privacidad de todos y cada uno de los sites que reúnan información personal identificable. Esta política de privacidad sólo es aplicable a la información contenida en <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'><b>RESERTRIP</b> se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a futuras novedades legislativas o jurisprudenciales.</p><p class='text-justify'><b>RESERTRIP</b> proporciona a los usuarios los recursos técnicos adecuados para que, con carácter previo, puedan acceder a este aviso sobre la Política de Privacidad y Protección de Datos, así como cualquier otra información relevante y puedan prestar su consentimiento a fin de que esta sociedad proceda al tratamiento de sus datos personales.</p><p class='text-justify'>La totalidad de los contenidos, elementos, diseños y aplicaciones albergados en esta página web, cualquiera que sea su formato y características, así como todos los Derechos de Propiedad Industrial e Intelectual inherentes a dicho sitio web, son titularidad de <b>RESERTRIP</b> estando protegidos tanto por la normativa de Propiedad Industrial e Intelectual como por el resto de legislación que pueda ser de aplicación. Dicho contenido, no podrá ser objeto de explotación, reproducción, distribución, modificación, comunicación pública, cesión, transformación ni de cualquier otro procedimiento de difusión, que no haya sido expresa y previamente autorizado. <b>RESERTRIP</b> se reserva el ejercicio de las acciones judiciales que le asistan frente a quienes vulneren los derechos de su titularidad a los que se ha hecho referencia.</p><p class='text-justify'>Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Madrid.</p><p class='text-justify'><b>RESERTRIP</b> S.L., en virtud de lo expuesto en el artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico y conforme al principio de transparencia de nuestra compañía informa a los usuarios de su página web:</p><p class='text-justify'>Denominación Social: <b>RESERTRIP S.L.</b> <br>Domicilio social: Avenida General Peron 26, Madrid 28020. <br>Dirección de contacto: Avenida General Peron 26, Madrid 28020. <br>C.I.F. B83418830 <br>Datos de Inscripción en el Registro Mercantil: inscrita en el Registro Mercantil de Madrid, al Tomo 18113, Folio 9, Hoja M-313290<br>Dirección de correo electrónico: <a href='mailto:info@ysolutions.es'>info@ysolutions.es</a>.<br>Tfno. de contacto: 912309169 <br></p>",
        "ABOUTUS": "<div class='container'><div class='row'> <div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Nuestra Misión</strong></h5> <p>Dicho de la forma más sencilla, queremos ayudarte a viajar de A a B.</p><p>Nuestro objetivo es proporcionar a nuestros clientes con:</p><ul> <li>Información actualizada sobre como viajar de A a B.</li><li>Proporcionar todas las posibilidades de viaje y conexión entre dos puntos.</li><li>Una comparación rápida y fácil entre un mismo y distintos medios de transporte.</li><li> Compra de billetes de forma fiable y ágil.</li></ul> <p>Todo esto en un sólo sitio web en un par de clicks: <a href='http://www.resertrip.com'>www.resertrip.com</a></p><p>La movilidad se ha convertido en una característica clave de nuestra sociedad global. Frente a una oferta cada vez mayor entre distintos medios de transporte, la complejidad de encontrar la oportunidad que mejor se adapta a las necesidades del cliente y el momento puede ser desalentadora.</p><p> Desde aerolíneas de bajo coste a líneas de autobús.<br>Desde el tren de alta velocidad al ferry.<br>Desde el transporte público al transporte privado (coche compartido, Uber, etc....) <br>Las opciones se incrementan cada día y también la complejidad. </p><p>Cómo puedo viajar fácilmente entre A y B? <a href='www.resertrip.com'>www.resertrip.com</a> es la respuesta a esta pregunta, reservando tu viaje en un sitio web con sólo un par de clicks.</p></div></div></div><div class='col-md-6'> <div class='box'> <div class='box-content' style='min-height: 500px'> <h5><strong>Nuestro Proyecto</strong></h5> <p> Queremos crear no sólo una plataforma digital donde los clientes pueden comparar y comprar billetes, sino que también queremos proveer de información para facilitar el viaje. Información sobre las compañías de transporte, las terminales y estaciones (bus, tren, aeropuerto), qué actividades se pueden hacer en el punto de destino, etc....</p><p>Además, queremos facilitar toda clase de servicios alrededor del viaje tales como el alquiler de un coche, la reserva de un hotel, reserva de una atracción turística, etc... En definitiva, todo lo que necesitas en tu viaje directamente en un portal y en sólo unos clicks, y en tantos países como sea posible.</p><p>Estamos desarrollando nuestra presencia en Europa y en Sudamérica en un primer momento, y tenemos planes para expandir a otros países en un futuro próximo. Tanto si estas viajando en tu propio país, como si lo haces a otro país por trabajo o por vacaciones, nos proponemos ayudarte a que tu viaje sea lo más fácil posible. Reserva tu próximo viaje en <a href='http://www.resertrip.com.'>www.resertrip.com.</a></p></div></div></div><div class='col-md-12'><br><div class='box'> <div class='box-content'> <h5><strong>Nuestro Equipo</strong></h5> <p>Somos un equipo internacional, diverso y con mucha experiencia tanto en el mundo del transporte como en marketing digital. Estamos basados en Madrid y somos la primera plataforma de viaje multimodal en internet con base en España.</p><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/roderick.jpg' alt='' class='img-circle'> <p>Roderick</p><span>CEO & Fundador</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/pablo.jpg' alt='' class='img-circle'> <p>Pablo</p><span>Co - Fundador, Ventas & Marketing</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/celine.jpg' alt='' class='img-circle'> <p>Celine</p><span>Redes Sociales</span> </div></div></div><br><br><br><div class='row'> <div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jake.jpg' alt='' class='img-circle'> <p>Jake</p><span>Co-Fundador & CTO</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/abel.jpg' alt='' class='img-circle'> <p>Abel</p><span>Programación & Desarrollo</span> </div></div><div class='col-md-4'> <div class='profile text-center'> <img src='https://s3.eu-central-1.amazonaws.com/vheurope/team/jhesus-colmenares.jpg' alt='' class='img-circle'> <p>Jesús</p><span>Programación & Desarrollo</span> </div></div></div></div></div></div></div></div>",
        "TERMS_CONTENT": "<p class='lead text-center'>CONDICIONES GENERALES</p><p class='text-left'><b>Responsabilidad</b></p><p class='text-justify'>La responsabilidad del transportista incumbe a la empresa que realiza efectivamente el servicio. La empresa transportista no responderá de los incumplimientos que no le sean directamente imputables, ni de los producidos por caso fortuito, fuerza mayor, o por atender exigencias legales o administrativas. Del mismo modo, no se hace responsable de las pérdidas de enlace de sus servicios con otros transportes, ya sean propios o ajenos. En Líneas Internacionales, la responsabilidad que pudiera existir incumbe a la empresa que realiza el transporte, con arreglo a las Leyes y Tribunales de su país.</p><p class='text-left'><b>Equipajes</b></p><p class='text-justify'>Cada empresa de transporte establece el peso máximo de equipaje a transportar gratuitamente. El exceso deberá ser abonado según la cuantía que por tarifa corresponda, salvo lo dispuesto específicamente para las líneas internacionales. En caso de facturación del equipaje, la empresa hará entrega del correspondiente resguardo.</p><p class='text-justify'>En caso de pérdida o deterioro del equipaje transportado, será imprescindible efectuar la reclamación en los plazos indicados en el apartado de 'Reclamaciones' exhibiendo el billete y el resguardo de facturación, en su caso.</p><p class='text-justify'>La responsabilidad del transportista estará limitada (en servicios nacionales conforme art. 23 Ley 16/1987, de 30 de Julio), y expresamente a un máximo de € 300 en servicios internacionales operados por Alsa. En líneas internacionales la responsabilidad corresponde a la empresa que efectivamente efectúa el transporte conforme a la legislación que proceda. El transportista no responderá de los daños, pérdidas o averías que sufran los bultos de mano u otros objetos no confiados a su custodia.</p><p class='text-left'><b>BICICLETAS</b></p><p class='text-justify'>Las condiciones para el transporte de bicicletas varían en función de la empresa transportista:</p><p class='text-justify'>-ALSA / CONDA</p><p class='text-justify'>El transporte de bicicletas, tablas de surf o skis lleva añadido un suplemento, sobre el precio del billete, de € 5 en los servicios de corto recorrido y de € 10 en los servicios de largo recorrido.</p><p class='text-justify'>Se admite un total de cuatro unidades, entre bicicletas y tablas de surf por coche (una por billete). Deben ir convenientemente desmontadas y embaladas.</p><p class='text-justify'>En los servicios internacionales, únicamente se permite el transporte de bicicletas en la línea España-Marruecos, previa reserva y pago de su importe.</p><p class='text-justify'>-LA UNION / LA BURUNDESA / HIFE</p><p class='text-justify'>Deben ir convenientemente desmontadas y embaladas. Consulte el importe del suplemento.</p><p class='text-justify'>-COMES / THERPASA</p><p class='text-justify'>Deben ir convenientemente desmontadas y embaladas. El transporte es gratuito.</p><p class='text-left'><b>MASCOTAS</b></p><p class='text-justify'>Según la Normativa Legal Vigente, ningún animal de compañía puede acceder al habitáculo reservado a los pasajeros en un autobús. La única excepción, son los perros guías de los invidentes, que sí podrán viajar junto a los viajeros.</p><p class='text-justify'>En caso de que la Compañía permita el transporte de mascotas, los perros o gatos viajarán en las bodegas, en el interior de jaulas o cestas especiales proporcionadas por el viajero que deben estar adaptadas para este uso, quedando totalmente prohibido transportarlos fuera de dichas jaulas o cestas.</p><p class='text-justify'>Con carácter general, el traslado de estos animales se realiza bajo la entera responsabilidad de sus propietarios, que viajarán necesariamente en el mismo servicio que el animal.</p><p class='text-justify'>El viajero debe presentarse al embarque, acompañado del animal, con una antelación de 15 minutos, introduciendo personalmente el animal en la jaula situándola en el autocar, según las indicaciones del conductor. El animal estará en buenas condiciones físicas, higiénicas y anímicas para el traslado, no siendo obligatorio, aunque si recomendable, el uso del bozal en caso de perros.</p><p class='text-justify'>El desembarque del animal será igualmente realizado por su propietario, procurando que no haya personas en las proximidades a fin de evitar circunstancias incómodas o peligrosas, que pudieran afectar al resto de los viajeros.</p><p class='text-justify'>Únicamente se admite un sólo perro o gato por autobús.</p><p class='text-justify'>El coste del transporte varía en función de la Compañía. Rogamos consulte en cada caso.</p><p class='text-left'><b>Anulación y cambio de billetes</b></p><p class='text-justify'>La anulación y el cambio de los billetes vendidos a través de la web de <b>RESERTRIP</b> se podrán realizar en <a href='www.resertrip.com'>www.resertrip.com</a> al menos 2 horas antes de la salida del servicio y con la condición de que el billete no se encuentre impreso en taquilla. Se recomienda realizar estas operaciones en horario comercial puesto que las empresas de transporte realizan tareas nocturnas de mantenimiento y el servicio podría no estar disponible. Si el billete está impreso en taquilla, la operación se tendrá que realizar en los puntos de venta de cada compañía.</p><p class='text-justify'>En caso de anulación, se devolverá al viajero el importe del billete deduciendo un 10% si se solicita con al menos 48 horas de antelación a la salida del servicio y un 20% si es solicitada entre las 48 y las 2 horas anteriores a la salida del autobús. En ningún caso se devolverá el coste de gestión (ver condiciones específicas de cambio y anulación).</p><p class='text-justify'>En caso de anulación, siempre que posea su billete impreso y no exista oficina de la empresa emisora del trayecto, debe enviar su billete directamente a <b>RESERTRIP</b> para efectuar dicha anulación.</p><p class='text-justify'>El billete únicamente será válido para la fecha y hora que figure en el mismo. La no presentación del viajero en el lugar y momento de la salida conllevará la pérdida del viaje y no dará derecho al cambio del billete o devolución de su importe.</p><p class='text-justify'>Los billetes de promoción especial no admiten anulaciones y cambios.</p><p class='text-justify'>Los billetes adquiridos en Agencias de Viajes e Internet, una vez impresos en taquilla, solo admiten cambios y anulación en los propios puntos de venta.</p><p class='text-justify'>El cambio de la fecha del viaje solamente es posible si se solicita con al menos 2 horas de antelación al inicio del servicio, y estará condicionado a la existencia de plazas disponibles en la nueva fecha solicitada. Sólo está permitido un cambio por billete. El cambio de hora o fecha es gratuito, excepto para las empresas incluidas en apartado de Condiciones específicas de cambio y anulación.</p><p class='text-justify'>Estas condiciones, se aplican a las siguientes Empresas: DAIBUS, HIFE, DAMAS, LYCAR, GRUPO SUBUS, THERPASA, LA UNION, LA UNION ALAVESA, AGREDA, LINEBUS, SAIZ TOUR, EXPORTBUS, LA SERRANA, BUS ALMERIA MADRID, BURUNDESA y TRANSPORTES COMES.</p><p class='text-left'><b>Condiciones específicas de cambio y anulación</b></p><p class='text-justify'>PARA LOS BILLETES DE ALSA: En caso de anulación, la empresa devolverá al viajero el importe íntegro del billete si se solicita con al menos 48 horas de antelación a la salida del servicio. Si la anulación es solicitada con una antelación de entre 48 y 24 horas, la empresa devolverá el importe del billete deduciendo un 10%. En caso de que la anulación se solicite con menos de 24 horas de antelación, la deducción aplicable será del 20% del importe del billete.</p><p class='text-justify'>En caso de billetes que hayan sido previamente cambiados, se aplicará un 20% de deducción de su importe cuando se solicite con más de 48 horas de antelación. Para este tipo de billetes, los gastos de anulación serán del 30% cuando se solicite con una antelación de entre 48 y 24 horas y de un 40% de su importe, cuando se solicite con menos de 24 horas de antelación respecto al inicio del servicio.</p><p class='text-justify'>Se admite, SIN gastos, un solo cambio por billete cuando se solicite con al menos 48 horas de antelación a la fecha del servicio. Se aplicará un recargo adicional del 5% del precio del billete para aquellos cambios que se soliciten con una antelación de 24 a 48 horas. En caso de que el cambio se solicite con menos de 24 horas de antelación, se aplicará un recargo del 10% sobre el precio del billete. El cierre de un billete se considera como cambio.</p><p class='text-justify'>Se aplicará un recargo del 20% en el segundo y sucesivos cambios de billetes cuando se soliciten con más de 24 horas de antelación. En el caso de que estos cambios se soliciten con menos de 24 horas de antelación el recargo será del 30% sobre el precio del billete.</p><p class='text-justify'>Los cambios en billetes internacionales no conllevan recargo.</p><p class='text-justify'>IMPORTANTE: Cuando se realice un cambio o cierre de billete no se podrá elegir la plaza ya que la empresa la asigna automáticamente.</p><p class='text-justify'>Los cambios únicamente podrán afectar a la fecha u hora del servicio, no siendo posible realizar cambio alguno sobre el trayecto, datos personales del/os viajero/s, plaza asignada y/o número de autobús.</p><p class='text-left'><b>Cierre de billetes con vuelta abierta (*)</b></p><p class='text-justify'>Si en el billete de ida y vuelta no figuran consignados el día, hora, asiento y vehículo relativos al regreso, el viajero deberá presentarse en la oficina correspondiente de ventas de la empresa con la mayor antelación posible (8 días si se trata de líneas internacionales) para confirmar el regreso, que estará condicionado a la existencia de plazas disponibles en la fecha solicitada. La confirmación del regreso no conlleva ningún gasto.</p><p class='text-justify'>Si el billete no está impreso en taquilla, la operación de cierre se puede realizar en <a href='www.resertrip.com'>www.resertrip.com</a>.</p><p class='text-justify'>Consulte la validez del billete de ida con vuelta abierta, ya que varía en función de la Compañía. Las empresas Daibus, La Unión, La Burundesa y Alosa exigen que los billetes lleven consignados todos los datos en ambos sentidos en el momento de la compra.</p><p class='text-left'><b>Precio de los billetes</b></p><p class='text-justify'>El importe total de los billetes comprados por Internet, se compone del precio del billete según las tarifas vigentes en la concesión, más la cantidad adicional expresada en concepto de coste de gestión que cobra la parte vendedora. El coste de gestión se aplicará a cada billete, considerándose los billetes de ida y vuelta como un único billete a efectos de dicho coste.</p><p class='text-justify'>Coste aplicado a los billetes con vuelta abierta (OPEN) de la compañía ALSA: El importe a cobrar es de € 1,40 (IVA incluido) por viajero. En los billetes combinados o con transbordo sólo se aplica un coste. Este coste no es anulable ni reembolsable.</p><p class='text-left'><b>Refuerzos y asignación de plazas</b></p><p class='text-justify'>En los servicios nacionales e internacionales, la Empresa se reserva la posibilidad de realizar el servicio mediante vehículos de empresas colaboradoras cuando las circunstancias así lo requieran, y en particular, para hacer frente a intensificaciones de tráfico, pudiendo éstos no reunir necesariamente las mismas características de confort que los propios. La Empresa se reserva el derecho a modificar la plaza asignada al viajero en caso de que las condiciones de explotación así lo exijan.</p><p class='text-justify'>Con Daibus, los vehículos contratados para reforzar la línea (número de coche 2 y sucesivos) realizan 2 paradas durante el trayecto a fin de cumplir lo establecido en la legislación vigente en materia de tiempos de conducción y descanso.</p><p class='text-left'><b>Prohibición de fumar</b></p><p class='text-justify'>Queda absolutamente prohibido fumar en el vehículo (Art. 6 R.D. 1293/1999).</p><p class='text-left'><b>Reclamaciones</b></p><p class='text-justify'>Existe un libro de reclamaciones a disposición del viajero en los lugares de origen y destino de los servicios nacionales. Si el viajero desea efectuar algún tipo de reclamación contra la empresa transportista, deberá formularla en el plazo más breve posible desde la fecha en que se haya prestado o se hubiere debido prestar el servicio de transporte y, en todo caso, dentro del plazo máximo de los tres meses siguientes. La reclamación será tramitada conforme a lo dispuesto en la legislación vigente.<p class='text-justify'>Con la empresa Daibus existen hojas de quejas y sugerencias en sus administraciones.</p><p class='text-left'><b>Descuentos</b></p><p class='text-justify'>La compra de billetes por medio de Internet permite la aplicación de descuentos en función de la política comercial de cada empresa.</p><p class='text-justify'>Es imprescindible para acceder al autobús la presentación al conductor de la documentación acreditativa que confiere el derecho al descuento.</p><p class='text-justify'>Para la utilización de este tipo de billetes es imprescindible que el viajero disponga del documento vigente que acredite que es el beneficiario de dicho descuento. En el momento de acceder al autobús, el viajero deberá mostrar el citado documento al conductor. En caso de incumplir este requisito, el personal de conducción tiene la obligación de impedir la utilización del billete y en ningún caso se podrá abonar la diferencia económica teniendo que adquirir otro billete completo si se desea viajar.</p><p class='text-left'><b>Titularidad del billete</b></p><p class='text-justify'>Los billetes adquiridos por Internet son nominativos personales e intransferibles. Para su utilización se requiere la comprobación de un documento personal del viajero y que este dato corresponda con el número de identificación personal reflejado en el billete.</p><p class='text-justify'>Para viajar es necesario la presentación de un documento personal, tanto si se accede directamente al autobús con el billete impreso en la web <b>RESERTRIP</b>, como si se solicita la impresión física del billete en el punto de venta.</p><p class='text-justify'>En los billetes adquiridos por Internet para menores de edad que carezcan de documentación, será necesario reflejar el documento de la persona que acompaña al menor en el apartado de la web reservado para ello. La no correspondencia de los datos personales necesarios supondrá la anulación automática del billete.</p><p class='text-left'><b>Proceso de compra</b></p><p class='text-justify'>Para realizar la compra del billete deberá seguir los 4 pasos indicados en la web.</p><p class='text-justify'>Desde que selecciona su asiento en el paso 2, hasta que pulsa el botón 'pagar' en la página de pago, tendrá un período de 5 minutos para finalizar la operación de compra.</p><p class='text-justify'>Sólo después de introducir el número de tarjeta financiera y fecha de caducidad de la misma y pulsar el botón 'Pagar' en el Paso 4, se dará por realizada la compra, con el cargo del importe correspondiente.</p><p class='text-justify'>Una vez terminado el proceso de compra, le recomendamos que pulse el botón IMPRIMIR que aparecerá en su pantalla en el 'Resultado de la Compra'. Si no desea imprimir el billete, o no le es posible, por favor, anote el localizador en un lugar seguro para solicitar la impresión del billete en la taquilla de la empresa transportista.</p><p class='text-left'><b>Texto legal</b></p><p class='text-justify'>En cumplimiento de lo dispuesto en la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, le informamos que los datos personales facilitados serán incluidos en un fichero titularidad de la empresa con la finalidad de llevar a cabo las gestiones correspondientes a la compra del billete seleccionado.</p><p class='text-justify'>Asimismo, le informamos que los datos facilitados como consecuencia de la compra se almacenarán en DATOS <b>RESERTRIP</b> y además serán transferidos a los sistemas de las compañías concesionarias de líneas regulares de transporte de viajeros. Tanto DATOS <b>RESERTRIP</b> como las compañías concesionarias se responsabilizan de su confidencialidad en los términos exigidos legalmente, de acuerdo con sus políticas específicas de privacidad.</p><p class='text-justify'>Los datos señalados con un asterisco son de cumplimentación obligatoria, suponiendo su ausencia la imposibilidad de gestionar la compra seleccionada.</p><p class='text-justify'>El envío de sus datos implica aceptar y consentir el tratamiento de los mismos, que serán incorporados a un fichero debidamente inscrito en el Registro General de Protección de Datos.</p><p class='text-justify'>Entendemos que los datos facilitados son del propio usuario y que son ciertos, reservándose <b>RESERTRIP</b> el derecho a excluir de los servicios ofertados a todo usuario que haya facilitado datos falsos, sin perjuicio de las demás acciones que procedan en Derecho.</p><p class='text-justify'>El usuario se hace responsable de comunicar a <b>RESERTRIP</b> cualquier modificación de los datos personales facilitados.</p><p class='text-justify'>El ejercicio de los derechos de acceso, rectificación, cancelación y oposición, podrá llevarse a cabo, conforme a lo dispuesto en la normativa vigente, mediante solicitud dirigida a nuestra dirección de correo electrónico info@resertrip.com o a la dirección postal: <b>RESERTRIP</b> S.L. (<b>RESERTRIP</b>), Avenida General Perón 26, Madrid 28020, adjuntando en todo caso, fotocopia de su D.N.I o documento equivalente válido en derecho que permita acreditar su identidad.</p><p class='text-left'><b>Factura</b></p><p class='text-justify'>Si el cliente desea la factura de sus billetes, puede utilizar la opción “facturar” al final del proceso de compra o si el billete está impreso, remitirlo por correo a la dirección Avenida General Perón 26, Madrid 28020, indicando los datos de la factura y la dirección de envío de la misma. Desde Movelia se le remitirá en aproximadamente 5 días la factura solicitada. Si en el proceso de compra no ha podido solicitar su factura puede enviarnos un correo al info@resertrip.com y desde ahí solicitarnos la misma con todos sus datos personales y los del billete.</p><p class='text-left'><b>Cambios de autobús</b></p><p class='text-justify'>De acuerdo con la legislación de transportes algunos de los trayectos pueden realizarse mediante conexión de servicios con combinación de horarios de una parada determinada y expedición única de billetes, lo que requeriría un cambio de autobús en dicha parada.</p><p class='text-left'><b>Condiciones sujetas a las políticas de cada empresa</b></p><p class='text-justify'>La empresa Hife solo admite 15 Kgs de equipaje por cada pasajero. En líneas internacionales se admiten 25 kg.</p><p class='text-justify'>En la línea MURCIA-AEROPUERTO DE BARAJAS el equipaje admitido es de 1 maleta con dimensiones máximas 80x60x40 y con un peso máximo de 30 kgs. Se permite un bolso de mano o similar, que se pueda colocar en la bandeja porta-equipajes de la parte superior del autobús. Las dimensiones máximas del equipaje de mano son 20x20x40 cms. con un peso máximo de 5 kgs. Si por volumen, no es posible colocarlo en dicho compartimento, sería considerado como una maleta más y transportado en la bodega del autocar. En caso de escasez de espacio en el maletero del autobus, este equipaje no será aceptado, por lo que se recomienda a los clientes que, para evitar problemas en el momento del embarque, sean muy estrictos con el tamaño del equipaje.</p><p class='text-justify'>Los coches de los bebés se pueden llevar sin coste. Al ser transportado en la bodega del autobús, tendrá que plegarse lo máximo posible y se recomienda embalar o proteger con un plástico o similar, con el fin de que no se dañe o ensucie.</p><p class='text-left'><b>Acceso al bus</b></p><p class='text-justify'>En líneas nacionales, se podrá acceder al bus únicamente con el número de localizador y DNI, excepto en las empresas Hife, Autobuses la Unión, La Burundesa y Trasnportes Generales Comes.</p><p class='text-justify'>En estas empresas, el viajero deberá dirigirse, bien con el billete impreso directamente al conductor, o dirigirse a taquilla de la empresa transportista 30m. antes de la salida, con el número de localizador y su documentación personal, para solicitar la impresión del mismo.</p><p class='text-justify'>En el caso de la línea Madrid - Toledo de la compañía ALSA, será imprescindible presentar el billete impreso directamente al conductor o dirigirse a taquilla 30 minutos antes, con el localizador y documentación personal, para solicitar la impresión del mismo. </p><p class='text-justify'>En trayectos internacionales, es necesario que el cliente se presente en la oficina de check in 30m. antes de la salida, con el billete impreso y su documentación personal en regla.</p><p class='text-justify'>La línea internacional España-Francia-Suiza-Polonia, cuenta con un transbordo en Barcelona, por lo que el viajero debe dirigirse al Punto de Venta Alsa para obtener el billete desde la localidad de origen hasta Barcelona.</p><p class='text-left'><b>Documentación</b></p>C<p class='text-justify'>ada pasajero debe llevar la documentación necesaria (pasaporte, visados,etc.) para cruzar las fronteras, según las leyes del país o países por los que transiten. Si por causas de no llevar la documentación o no tenerla en regla, el viajero no fuese admitido al embarque, o se le prohíba la entrada en algún país, todos los gastos originados serán a su cargo, incluidos los de retorno y no procederá el reembolso del billete no utilizado.</p><p class='text-justify'>El billete debe ser conservado por el viajero durante todo el trayecto, tanto de ida como de regreso. En caso de extravío del billete, puede obtener un duplicado del mismo en <a href='www.resertrip.com'>www.resertrip.com</a> o llamando a nuestro Departamento de Atención al cliente 902 64 64 28.</p><p class='text-left'><b>Menores</b></p><p class='text-justify'>En líneas internacionales, los menores de 16 años deben viajar acompañados de un adulto legalmente autorizado. Los jóvenes con edades comprendidas entre 16 y 18 años, necesitan pasaporte y autorización policial para viajar.</p><p class='text-justify'>En líneas nacionales, las condiciones de viaje para el transporte de menores sin acompañante varían en función de la empresa transportista. Rogamos consulten en cada caso.</p><p class='text-left'><b>Medios de Pago</b></p><p class='text-justify'>El pago con tarjeta financiera de crédito o débito (Visa, Mastercard, 4B, Maestro) son los únicos medios de pago aceptados en <a href='www.resertrip.com'>www.resertrip.com</a> </p>"
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
        "SORT": {
          "ORDER_BY": "Ordenar por:",
          "COMPANY": "Empresas",
          "HORARY": "Horario de Salida",
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
        "REDIRECT" : "En breve seras redireccionado a la página de búsqueda automáticamente"
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
          "RETURN": "Vuelta"
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
          "TOTALFEE" : "Coste de gestión:"
        }
      },
      "CANCEL": {
        "TITLE": "Te presentamos tu lista de billetes",
        "CANCELMSG": "Esta lista de billetes ya se encuentra anulada",
        "BUTTON" : "Anular",
        "EXPIRED" : "Esta Compra ya ha caducado",
        "SECTION" : "Tramo"
      }
    };

})();
