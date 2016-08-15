(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.country.service
     * @description
     * # country.service
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
        .factory('countryService', countryService);

    countryService.$inject = [];

    function countryService() {
        var cnames_es = [{
            name: 'ABW',
            value: 'Aruba'
        }, {
            name: 'AFG',
            value: 'Afganistan'
        }, {
            name: 'AGO',
            value: 'Angola'
        }, {
            name: 'AIA',
            value: 'Anguilla'
        }, {
            name: 'ALA',
            value: 'Islas Aland'
        }, {
            name: 'ALB',
            value: 'Albania'
        }, {
            name: 'AND',
            value: 'Andorra'
        }, {
            name: 'ARE',
            value: 'Emiratos Arabes Unidos'
        }, {
            name: 'ARG',
            value: 'Argentina'
        }, {
            name: 'ARM',
            value: 'Armenia'
        }, {
            name: 'ASM',
            value: 'Samoa Americana'
        }, {
            name: 'ATA',
            value: 'Antartica'
        }, {
            name: 'ATF',
            value: 'Territorios Franceses del Sur'
        }, {
            name: 'ATG',
            value: 'Antigua y Barbuda'
        }, {
            name: 'AUS',
            value: 'Australia'
        }, {
            name: 'AUT',
            value: 'Austria'
        }, {
            name: 'AZE',
            value: 'Azerbaiyán'
        }, {
            name: 'BDI',
            value: 'Burundi'
        }, {
            name: 'BEL',
            value: 'Belgica'
        }, {
            name: 'BEN',
            value: 'Benin'
        }, {
            name: 'BES',
            value: 'Bonaire, San Eustaquio y Saba'
        }, {
            name: 'BFA',
            value: 'Burkina Faso'
        }, {
            name: 'BGD',
            value: 'Bangladesh'
        }, {
            name: 'BGR',
            value: 'Bulgaria'
        }, {
            name: 'BHR',
            value: 'Bahrein'
        }, {
            name: 'BHS',
            value: 'Bahamas'
        }, {
            name: 'BIH',
            value: 'Bosnia y Herzegovina'
        }, {
            name: 'BLM',
            value: 'San Bartolomé'
        }, {
            name: 'BLR',
            value: 'Bielorrusia'
        }, {
            name: 'BLZ',
            value: 'Belice'
        }, {
            name: 'BMU',
            value: 'Bermuda'
        }, {
            name: 'BOL',
            value: 'Bolivia, Estado Plurinacional de'
        }, {
            name: 'BRA',
            value: 'Brasil'
        }, {
            name: 'BRB',
            value: 'Barbados'
        }, {
            name: 'BRN',
            value: 'Brunei Darussalam'
        }, {
            name: 'BTN',
            value: 'Bhután'
        }, {
            name: 'BVT',
            value: 'Isla Bouvet'
        }, {
            name: 'BWA',
            value: 'Botswana'
        }, {
            name: 'CAF',
            value: 'República Centroafricana'
        }, {
            name: 'CAN',
            value: 'Canadá'
        }, {
            name: 'CCK',
            value: 'Islas Cocos (Keeling)'
        }, {
            name: 'CHE',
            value: 'Suiza'
        }, {
            name: 'CHL',
            value: 'Chile'
        }, {
            name: 'CHN',
            value: 'China'
        }, {
            name: 'CIV',
            value: 'Côte d\'Ivoire'
        }, {
            name: 'CMR',
            value: 'Camerún'
        }, {
            name: 'COD',
            value: 'Congo, la República Democrática del'
        }, {
            name: 'COG',
            value: 'Congo'
        }, {
            name: 'COK',
            value: 'Islas Cook'
        }, {
            name: 'COL',
            value: 'Colombia'
        }, {
            name: 'COM',
            value: 'Comoras'
        }, {
            name: 'CPV',
            value: 'Cabo Verde'
        }, {
            name: 'CRI',
            value: 'Costa Rica'
        }, {
            name: 'CUB',
            value: 'Cuba'
        }, {
            name: 'CUW',
            value: 'Curazao'
        }, {
            name: 'CXR',
            value: 'Islas Navidad'
        }, {
            name: 'CYM',
            value: 'Islas Caimán'
        }, {
            name: 'CYP',
            value: 'Chipre'
        }, {
            name: 'CZE',
            value: 'República Checa '
        }, {
            name: 'DEU',
            value: 'Alemania'
        }, {
            name: 'DJI',
            value: 'Djibouti'
        }, {
            name: 'DMA',
            value: 'Dominica'
        }, {
            name: 'DNK',
            value: 'Dinamarca'
        }, {
            name: 'DOM',
            value: 'República Dominicana'
        }, {
            name: 'DZA',
            value: 'Algelia'
        }, {
            name: 'ECU',
            value: 'Ecuador'
        }, {
            name: 'EGY',
            value: 'Egipto'
        }, {
            name: 'ERI',
            value: 'Eritrea'
        }, {
            name: 'ESH',
            value: 'Sahara Occidental'
        }, {
            name: 'ESP',
            value: 'España'
        }, {
            name: 'EST',
            value: 'Estonia'
        }, {
            name: 'ETH',
            value: 'Etiopía'
        }, {
            name: 'FIN',
            value: 'Finlandia'
        }, {
            name: 'FJI',
            value: 'Fiji'
        }, {
            name: 'FLK',
            value: 'Islas Malvinas (Falkland)'
        }, {
            name: 'FRA',
            value: 'Francia'
        }, {
            name: 'FRO',
            value: 'Islas Feroe'
        }, {
            name: 'FSM',
            value: 'Micronesia, Estados Federados de'
        }, {
            name: 'GAB',
            value: 'Gabón'
        }, {
            name: 'GBR',
            value: 'Reino Unido'
        }, {
            name: 'GEO',
            value: 'Georgia'
        }, {
            name: 'GGY',
            value: 'Guernsey'
        }, {
            name: 'GHA',
            value: 'Ghana'
        }, {
            name: 'GIB',
            value: 'Gibralta'
        }, {
            name: 'GIN',
            value: 'Guinea'
        }, {
            name: 'GLP',
            value: 'Guadelupe'
        }, {
            name: 'GMB',
            value: 'Gambia'
        }, {
            name: 'GNB',
            value: 'Guinea-Bissau'
        }, {
            name: 'GNQ',
            value: 'Guinea Ecuatorial'
        }, {
            name: 'GRC',
            value: 'Grecia'
        }, {
            name: 'GRD',
            value: 'Granada'
        }, {
            name: 'GRL',
            value: 'Groenlandia'
        }, {
            name: 'GTM',
            value: 'Guatemala'
        }, {
            name: 'GUF',
            value: 'Guayana Francesa'
        }, {
            name: 'GUM',
            value: 'Guam'
        }, {
            name: 'GUY',
            value: 'Guyana'
        }, {
            name: 'HKG',
            value: 'Hong Kong'
        }, {
            name: 'HMD',
            value: 'Islas Heard Island and McDonald'
        }, {
            name: 'HND',
            value: 'Honduras'
        }, {
            name: 'HRV',
            value: 'Croacia'
        }, {
            name: 'HTI',
            value: 'Haití'
        }, {
            name: 'HUN',
            value: 'Hungria'
        }, {
            name: 'IDN',
            value: 'Indonesia'
        }, {
            name: 'IMN',
            value: 'Isla de Man'
        }, {
            name: 'IND',
            value: 'India'
        }, {
            name: 'IOT',
            value: 'Territorio Británico del Océano Índico'
        }, {
            name: 'IRL',
            value: 'Irlanda'
        }, {
            name: 'IRN',
            value: 'Irán, República Islámica de'
        }, {
            name: 'IRQ',
            value: 'Irak'
        }, {
            name: 'ISL',
            value: 'Islandia'
        }, {
            name: 'ISR',
            value: 'Israel'
        }, {
            name: 'ITA',
            value: 'Italia'
        }, {
            name: 'JAM',
            value: 'Jamaica'
        }, {
            name: 'JEY',
            value: 'Jersey'
        }, {
            name: 'JOR',
            value: 'Jordan'
        }, {
            name: 'JPN',
            value: 'Japón'
        }, {
            name: 'KAZ',
            value: 'Kazajstán'
        }, {
            name: 'KEN',
            value: 'Kenia'
        }, {
            name: 'KGZ',
            value: 'Kirguistán'
        }, {
            name: 'KHM',
            value: 'Camboya'
        }, {
            name: 'KIR',
            value: 'Kiribati'
        }, {
            name: 'KNA',
            value: 'Saint Kitts and Nevis'
        }, {
            name: 'KOR',
            value: 'Corea del Sur'
        }, {
            name: 'KWT',
            value: 'Kuwait'
        }, {
            name: 'LAO',
            value: 'Lao People\'s República Democrática'
        }, {
            name: 'LBN',
            value: 'Líbano'
        }, {
            name: 'LBR',
            value: 'Liberia'
        }, {
            name: 'LBY',
            value: 'Jamahiriya Árabe Libia'
        }, {
            name: 'LCA',
            value: 'Santa Lucia'
        }, {
            name: 'LIE',
            value: 'Liechtenstein'
        }, {
            name: 'LKA',
            value: 'Sri Lanka'
        }, {
            name: 'LSO',
            value: 'Lesotho'
        }, {
            name: 'LTU',
            value: 'Lituania'
        }, {
            name: 'LUX',
            value: 'Luxemburgo'
        }, {
            name: 'LVA',
            value: 'Letonia'
        }, {
            name: 'MAC',
            value: 'Macao'
        }, {
            name: 'MAF',
            value: 'San Martín (parte francesa)'
        }, {
            name: 'MAR',
            value: 'Marruecos'
        }, {
            name: 'MCO',
            value: 'Monaco'
        }, {
            name: 'MDA',
            value: 'Moldova, República de'
        }, {
            name: 'MDG',
            value: 'Madagascar'
        }, {
            name: 'MDV',
            value: 'Maldivas'
        }, {
            name: 'MEX',
            value: 'México'
        }, {
            name: 'MHL',
            value: 'Islas Marshal'
        }, {
            name: 'MKD',
            value: 'Macedonia, la ex República Yugoslava de'
        }, {
            name: 'MLI',
            value: 'Mali'
        }, {
            name: 'MLT',
            value: 'Malta'
        }, {
            name: 'MMR',
            value: 'Myanmar'
        }, {
            name: 'MNE',
            value: 'Montenegro'
        }, {
            name: 'MNG',
            value: 'Mongolia'
        }, {
            name: 'MNP',
            value: 'Islas Marianas del Norte'
        }, {
            name: 'MOZ',
            value: 'Mozambique'
        }, {
            name: 'MRT',
            value: 'Mauritania'
        }, {
            name: 'MSR',
            value: 'Montserrat'
        }, {
            name: 'MTQ',
            value: 'Martinica'
        }, {
            name: 'MUS',
            value: 'Mauricio'
        }, {
            name: 'MWI',
            value: 'Malawi'
        }, {
            name: 'MYS',
            value: 'Malasia'
        }, {
            name: 'MYT',
            value: 'Mayotte'
        }, {
            name: 'NAM',
            value: 'Namibia'
        }, {
            name: 'NCL',
            value: 'Nueva Caledonia'
        }, {
            name: 'NER',
            value: 'Niger'
        }, {
            name: 'NFK',
            value: 'Islas Norfolk'
        }, {
            name: 'NGA',
            value: 'Nigeria'
        }, {
            name: 'NIC',
            value: 'Nicaragua'
        }, {
            name: 'NIU',
            value: 'Niue'
        }, {
            name: 'NLD',
            value: 'Paises Bajos'
        }, {
            name: 'NOR',
            value: 'Noruega'
        }, {
            name: 'NPL',
            value: 'Nepal'
        }, {
            name: 'NRU',
            value: 'Nauru'
        }, {
            name: 'NZL',
            value: 'Nueva Zelanda'
        }, {
            name: 'OMN',
            value: 'Omán'
        }, {
            name: 'PAK',
            value: 'Pakistán'
        }, {
            name: 'PAN',
            value: 'Panamá'
        }, {
            name: 'PCN',
            value: 'Pitcairn'
        }, {
            name: 'PER',
            value: 'Perú'
        }, {
            name: 'PHL',
            value: 'Filipinas'
        }, {
            name: 'PLW',
            value: 'Palau'
        }, {
            name: 'PNG',
            value: 'Papúa Nueva Guinea'
        }, {
            name: 'POL',
            value: 'Polonia'
        }, {
            name: 'PRI',
            value: 'Puerto Rico'
        }, {
            name: 'PRK',
            value: 'Corea Democrática Popular de la República'
        }, {
            name: 'PRT',
            value: 'Portugal'
        }, {
            name: 'PRY',
            value: 'Paraguay'
        }, {
            name: 'PSE',
            value: 'Palestina, Territorio Ocupado'
        }, {
            name: 'PYF',
            value: 'Polinesia Francesa'
        }, {
            name: 'QAT',
            value: 'Qatar'
        }, {
            name: 'REU',
            value: 'Reunión'
        }, {
            name: 'ROU',
            value: 'Rumanía'
        }, {
            name: 'RUS',
            value: 'Rusia'
        }, {
            name: 'RWA',
            value: 'Ruanda'
        }, {
            name: 'SAU',
            value: 'Arabia Saudita'
        }, {
            name: 'SDN',
            value: 'Sudán'
        }, {
            name: 'SEN',
            value: 'Senegal'
        }, {
            name: 'SGP',
            value: 'Singapur'
        }, {
            name: 'SGS',
            value: 'Georgia del Sur y las Islas Sandwich del Sur'
        }, {
            name: 'SHN',
            value: 'Santa Helena, Ascensión y Tristán da Cunha'
        }, {
            name: 'SJM',
            value: 'Svalbard y Jan Mayen'
        }, {
            name: 'SLB',
            value: 'Solomon Islands'
        }, {
            name: 'SLE',
            value: 'Sierra Leona'
        }, {
            name: 'SLV',
            value: 'El Salvador'
        }, {
            name: 'SMR',
            value: 'San Marino'
        }, {
            name: 'SOM',
            value: 'Somalia'
        }, {
            name: 'SPM',
            value: 'San Pedro y Miquelón'
        }, {
            name: 'SRB',
            value: 'Serbia'
        }, {
            name: 'STP',
            value: 'Santo Tomé y Príncipe'
        }, {
            name: 'SUR',
            value: 'Surinam'
        }, {
            name: 'SVK',
            value: 'Eslovaquia'
        }, {
            name: 'SVN',
            value: 'Eslovenia'
        }, {
            name: 'SWE',
            value: 'Suecia'
        }, {
            name: 'SWZ',
            value: 'Swazilandia'
        }, {
            name: 'SXM',
            value: 'Sint Maarten (parte neerlandesa)'
        }, {
            name: 'SYC',
            value: 'Seychelles'
        }, {
            name: 'SYR',
            value: 'Siria'
        }, {
            name: 'TCA',
            value: 'Islas Turcas y Caicos'
        }, {
            name: 'TCD',
            value: 'Chad'
        }, {
            name: 'TGO',
            value: 'Togo'
        }, {
            name: 'THA',
            value: 'Tailandia'
        }, {
            name: 'TJK',
            value: 'Tayikistán'
        }, {
            name: 'TKL',
            value: 'Tokelau'
        }, {
            name: 'TKM',
            value: 'Turkmenistán'
        }, {
            name: 'TLS',
            value: 'Timor-Leste'
        }, {
            name: 'TON',
            value: 'Tonga'
        }, {
            name: 'TTO',
            value: 'Trinidad y Tobago'
        }, {
            name: 'TUN',
            value: 'Túnez'
        }, {
            name: 'TUR',
            value: 'Turquía'
        }, {
            name: 'TUV',
            value: 'Tuvalu'
        }, {
            name: 'TWN',
            value: 'Taiwán, Provincia de China'
        }, {
            name: 'TZA',
            value: 'Tanzania, República Unida de'
        }, {
            name: 'UGA',
            value: 'Uganda'
        }, {
            name: 'UKR',
            value: 'Ucrania'
        }, {
            name: 'UMI',
            value: 'Estados Unidos Islas menores alejadas'
        }, {
            name: 'URY',
            value: 'Uruguay'
        }, {
            name: 'USA',
            value: 'Estados Unidos'
        }, {
            name: 'UZB',
            value: 'Uzbekistán'
        }, {
            name: 'VAT',
            value: 'Santa Sede (Ciudad del Vaticano)'
        }, {
            name: 'VCT',
            value: 'San Vicente y las Granadinas'
        }, {
            name: 'VEN',
            value: 'Venezuela, República Bolivariana de'
        }, {
            name: 'VGB',
            value: 'Islars Virgenes, Británicas'
        }, {
            name: 'VIR',
            value: 'Islas Virgenes,, U.S.'
        }, {
            name: 'VNM',
            value: 'Viet Nam'
        }, {
            name: 'VUT',
            value: 'Vanuatu'
        }, {
            name: 'WLF',
            value: 'Wallis and Futuna'
        }, {
            name: 'WSM',
            value: 'Samoa'
        }, {
            name: 'YEM',
            value: 'Yemen'
        }, {
            name: 'ZAF',
            value: 'Sudáfrica'
        }, {
            name: 'ZMB',
            value: 'Zambia'
        }, {
            name: 'ZWE',
            value: 'Zimbabwe '
        }];

        var cnames_en = [{
            name: 'ABW',
            value: 'Aruba'
        }, {
            name: 'AFG',
            value: 'Afghanistan'
        }, {
            name: 'AGO',
            value: 'Angola'
        }, {
            name: 'AIA',
            value: 'Anguilla'
        }, {
            name: 'ALA',
            value: 'Åland Islands'
        }, {
            name: 'ALB',
            value: 'Albania'
        }, {
            name: 'AND',
            value: 'Andorra'
        }, {
            name: 'ARE',
            value: 'United Arab Emirates'
        }, {
            name: 'ARG',
            value: 'Argentina'
        }, {
            name: 'ARM',
            value: 'Armenia'
        }, {
            name: 'ASM',
            value: 'American Samoa'
        }, {
            name: 'ATA',
            value: 'Antarctica'
        }, {
            name: 'ATF',
            value: 'French Southern Territories'
        }, {
            name: 'ATG',
            value: 'Antigua and Barbuda'
        }, {
            name: 'AUS',
            value: 'Australia'
        }, {
            name: 'AUT',
            value: 'Austria'
        }, {
            name: 'AZE',
            value: 'Azerbaijan'
        }, {
            name: 'BDI',
            value: 'Burundi'
        }, {
            name: 'BEL',
            value: 'Belgium'
        }, {
            name: 'BEN',
            value: 'Benin'
        }, {
            name: 'BES',
            value: 'Bonaire, Sint Eustatius and Saba'
        }, {
            name: 'BFA',
            value: 'Burkina Faso'
        }, {
            name: 'BGD',
            value: 'Bangladesh'
        }, {
            name: 'BGR',
            value: 'Bulgaria'
        }, {
            name: 'BHR',
            value: 'Bahrain'
        }, {
            name: 'BHS',
            value: 'Bahamas'
        }, {
            name: 'BIH',
            value: 'Bosnia and Herzegovina'
        }, {
            name: 'BLM',
            value: 'Saint Barthélemy'
        }, {
            name: 'BLR',
            value: 'Belarus'
        }, {
            name: 'BLZ',
            value: 'Belize'
        }, {
            name: 'BMU',
            value: 'Bermuda'
        }, {
            name: 'BOL',
            value: 'Bolivia, Plurinational State of'
        }, {
            name: 'BRA',
            value: 'Brazil'
        }, {
            name: 'BRB',
            value: 'Barbados'
        }, {
            name: 'BRN',
            value: 'Brunei Darussalam'
        }, {
            name: 'BTN',
            value: 'Bhutan'
        }, {
            name: 'BVT',
            value: 'Bouvet Island'
        }, {
            name: 'BWA',
            value: 'Botswana'
        }, {
            name: 'CAF',
            value: 'Central African Republic'
        }, {
            name: 'CAN',
            value: 'Canadá'
        }, {
            name: 'CCK',
            value: 'Cocos (Keeling) Islands'
        }, {
            name: 'CHE',
            value: 'Switzerland'
        }, {
            name: 'CHL',
            value: 'Chile'
        }, {
            name: 'CHN',
            value: 'China'
        }, {
            name: 'CIV',
            value: 'Côte d\'Ivoire'
        }, {
            name: 'CMR',
            value: 'Cameroon'
        }, {
            name: 'COD',
            value: 'Congo, the Democratic Republic of the'
        }, {
            name: 'COG',
            value: 'Congo'
        }, {
            name: 'COK',
            value: 'Cook Islands'
        }, {
            name: 'COL',
            value: 'Colombia'
        }, {
            name: 'COM',
            value: 'Comoros'
        }, {
            name: 'CPV',
            value: 'Cabo Verde'
        }, {
            name: 'CRI',
            value: 'Costa Rica'
        }, {
            name: 'CUB',
            value: 'Cuba'
        }, {
            name: 'CUW',
            value: 'Curaçao'
        }, {
            name: 'CXR',
            value: 'Christmas Island'
        }, {
            name: 'CYM',
            value: 'Cayman Islands'
        }, {
            name: 'CYP',
            value: 'Cyprus'
        }, {
            name: 'CZE',
            value: 'Czech Republic'
        }, {
            name: 'DEU',
            value: 'Germany'
        }, {
            name: 'DJI',
            value: 'Djibouti'
        }, {
            name: 'DMA',
            value: 'Dominica'
        }, {
            name: 'DNK',
            value: 'Denmark'
        }, {
            name: 'DOM',
            value: 'Dominican Republic'
        }, {
            name: 'DZA',
            value: 'Algeria'
        }, {
            name: 'ECU',
            value: 'Ecuador'
        }, {
            name: 'EGY',
            value: 'Egypt'
        }, {
            name: 'ERI',
            value: 'Eritrea'
        }, {
            name: 'ESH',
            value: 'Western Sahara'
        }, {
            name: 'ESP',
            value: 'Spain'
        }, {
            name: 'EST',
            value: 'Estonia'
        }, {
            name: 'ETH',
            value: 'Ethiopia'
        }, {
            name: 'FIN',
            value: 'Finland'
        }, {
            name: 'FJI',
            value: 'Fiji'
        }, {
            name: 'FLK',
            value: 'Falkland Islands (Malvinas)'
        }, {
            name: 'FRA',
            value: 'France'
        }, {
            name: 'FRO',
            value: 'Faroe Islands'
        }, {
            name: 'FSM',
            value: 'Micronesia, Federated States of'
        }, {
            name: 'GAB',
            value: 'Gabon'
        }, {
            name: 'GBR',
            value: 'United Kingdom'
        }, {
            name: 'GEO',
            value: 'Georgia'
        }, {
            name: 'GGY',
            value: 'Guernsey'
        }, {
            name: 'GHA',
            value: 'Ghana'
        }, {
            name: 'GIB',
            value: 'Gibraltar'
        }, {
            name: 'GIN',
            value: 'Guinea'
        }, {
            name: 'GLP',
            value: 'Guadeloupe'
        }, {
            name: 'GMB',
            value: 'Gambia'
        }, {
            name: 'GNB',
            value: 'Guinea-Bissau'
        }, {
            name: 'GNQ',
            value: 'Equatorial Guinea'
        }, {
            name: 'GRC',
            value: 'Greece'
        }, {
            name: 'GRD',
            value: 'Grenada'
        }, {
            name: 'GRL',
            value: 'Greenland'
        }, {
            name: 'GTM',
            value: 'Guatemala'
        }, {
            name: 'GUF',
            value: 'French Guiana'
        }, {
            name: 'GUM',
            value: 'Guam'
        }, {
            name: 'GUY',
            value: 'Guyana'
        }, {
            name: 'HKG',
            value: 'Hong Kong'
        }, {
            name: 'HMD',
            value: 'Heard Island and McDonald Islands'
        }, {
            name: 'HND',
            value: 'Honduras'
        }, {
            name: 'HRV',
            value: 'Croatia'
        }, {
            name: 'HTI',
            value: 'Haiti'
        }, {
            name: 'HUN',
            value: 'Hungary'
        }, {
            name: 'IDN',
            value: 'Indonesia'
        }, {
            name: 'IMN',
            value: 'Isle of Man'
        }, {
            name: 'IND',
            value: 'India'
        }, {
            name: 'IOT',
            value: 'British Indian Ocean Territory'
        }, {
            name: 'IRL',
            value: 'Ireland'
        }, {
            name: 'IRN',
            value: 'Iran, Islamic Republic of'
        }, {
            name: 'IRQ',
            value: 'Iraq'
        }, {
            name: 'ISL',
            value: 'Iceland'
        }, {
            name: 'ISR',
            value: 'Israel'
        }, {
            name: 'ITA',
            value: 'Italy'
        }, {
            name: 'JAM',
            value: 'Jamaica'
        }, {
            name: 'JEY',
            value: 'Jersey'
        }, {
            name: 'JOR',
            value: 'Jordan'
        }, {
            name: 'JPN',
            value: 'Japan'
        }, {
            name: 'KAZ',
            value: 'Kazakhstan'
        }, {
            name: 'KEN',
            value: 'Kenya'
        }, {
            name: 'KGZ',
            value: 'Kyrgyzstan'
        }, {
            name: 'KHM',
            value: 'Cambodia'
        }, {
            name: 'KIR',
            value: 'Kiribati'
        }, {
            name: 'KNA',
            value: 'Saint Kitts and Nevis'
        }, {
            name: 'KOR',
            value: 'Korea, Republic of'
        }, {
            name: 'KWT',
            value: 'Kuwait'
        }, {
            name: 'LAO',
            value: 'Lao People\'s Democratic Republic'
        }, {
            name: 'LBN',
            value: 'Lebanon'
        }, {
            name: 'LBR',
            value: 'Liberia'
        }, {
            name: 'LBY',
            value: 'Libya'
        }, {
            name: 'LCA',
            value: 'Saint Lucia'
        }, {
            name: 'LIE',
            value: 'Liechtenstein'
        }, {
            name: 'LKA',
            value: 'Sri Lanka'
        }, {
            name: 'LSO',
            value: 'Lesotho'
        }, {
            name: 'LTU',
            value: 'Lithuania'
        }, {
            name: 'LUX',
            value: 'Luxembourg'
        }, {
            name: 'LVA',
            value: 'Latvia'
        }, {
            name: 'MAC',
            value: 'Macao'
        }, {
            name: 'MAF',
            value: 'Saint Martin (French part)'
        }, {
            name: 'MAR',
            value: 'Morocco'
        }, {
            name: 'MCO',
            value: 'Monaco'
        }, {
            name: 'MDA',
            value: 'Moldova, Republic of'
        }, {
            name: 'MDG',
            value: 'Madagascar'
        }, {
            name: 'MDV',
            value: 'Maldives'
        }, {
            name: 'MEX',
            value: 'Mexico'
        }, {
            name: 'MHL',
            value: 'Marshall Islands'
        }, {
            name: 'MKD',
            value: 'Macedonia, the former Yugoslav Republic of'
        }, {
            name: 'MLI',
            value: 'Mali'
        }, {
            name: 'MLT',
            value: 'Malta'
        }, {
            name: 'MMR',
            value: 'Myanmar'
        }, {
            name: 'MNE',
            value: 'Montenegro'
        }, {
            name: 'MNG',
            value: 'Mongolia'
        }, {
            name: 'MNP',
            value: 'Northern Mariana Islands'
        }, {
            name: 'MOZ',
            value: 'Mozambique'
        }, {
            name: 'MRT',
            value: 'Mauritania'
        }, {
            name: 'MSR',
            value: 'Montserrat'
        }, {
            name: 'MTQ',
            value: 'Martinique'
        }, {
            name: 'MUS',
            value: 'Mauritius'
        }, {
            name: 'MWI',
            value: 'Malawi'
        }, {
            name: 'MYS',
            value: 'Malaysia'
        }, {
            name: 'MYT',
            value: 'Mayotte'
        }, {
            name: 'NAM',
            value: 'Namibia'
        }, {
            name: 'NCL',
            value: 'New Caledonia'
        }, {
            name: 'NER',
            value: 'Niger'
        }, {
            name: 'NFK',
            value: 'Norfolk Island'
        }, {
            name: 'NGA',
            value: 'Nigeria'
        }, {
            name: 'NIC',
            value: 'Nicaragua'
        }, {
            name: 'NIU',
            value: 'Niue'
        }, {
            name: 'NLD',
            value: 'Netherlands'
        }, {
            name: 'NOR',
            value: 'Norway'
        }, {
            name: 'NPL',
            value: 'Nepal'
        }, {
            name: 'NRU',
            value: 'Nauru'
        }, {
            name: 'NZL',
            value: 'New Zealand'
        }, {
            name: 'OMN',
            value: 'Oman'
        }, {
            name: 'PAK',
            value: 'Pakistan'
        }, {
            name: 'PAN',
            value: 'Panama'
        }, {
            name: 'PCN',
            value: 'Pitcairn'
        }, {
            name: 'PER',
            value: 'Perú'
        }, {
            name: 'PHL',
            value: 'Philippines'
        }, {
            name: 'PLW',
            value: 'Palau'
        }, {
            name: 'PNG',
            value: 'Papua New Guinea'
        }, {
            name: 'POL',
            value: 'Poland'
        }, {
            name: 'PRI',
            value: 'Puerto Rico'
        }, {
            name: 'PRK',
            value: 'Korea, Democratic People\'s Republic of'
        }, {
            name: 'PRT',
            value: 'Portugal'
        }, {
            name: 'PRY',
            value: 'Paraguay'
        }, {
            name: 'PSE',
            value: 'Palestine, State of'
        }, {
            name: 'PYF',
            value: 'French Polynesia'
        }, {
            name: 'QAT',
            value: 'Qatar'
        }, {
            name: 'REU',
            value: 'Réunion'
        }, {
            name: 'ROU',
            value: 'Romania'
        }, {
            name: 'RUS',
            value: 'Russian Federation'
        }, {
            name: 'RWA',
            value: 'Ruanda'
        }, {
            name: 'SAU',
            value: 'Saudi Arabia'
        }, {
            name: 'SDN',
            value: 'Sudan'
        }, {
            name: 'SEN',
            value: 'Senegal'
        }, {
            name: 'SGP',
            value: 'Singapore'
        }, {
            name: 'SGS',
            value: 'South Georgia and the South Sandwich Islands'
        }, {
            name: 'SHN',
            value: 'Saint Helena, Ascension and Tristan da Cunha'
        }, {
            name: 'SJM',
            value: 'Svalbard and Jan Mayen'
        }, {
            name: 'SLB',
            value: 'Solomon Islands'
        }, {
            name: 'SLE',
            value: 'Sierra Leone'
        }, {
            name: 'SLV',
            value: 'El Salvador'
        }, {
            name: 'SMR',
            value: 'San Marino'
        }, {
            name: 'SOM',
            value: 'Somalia'
        }, {
            name: 'SPM',
            value: 'Saint Pierre and Miquelon'
        }, {
            name: 'SRB',
            value: 'Serbia'
        }, {
            name: 'STP',
            value: 'Sao Tome and Principe'
        }, {
            name: 'SUR',
            value: 'Surinam'
        }, {
            name: 'SVK',
            value: 'Slovakia'
        }, {
            name: 'SVN',
            value: 'Slovenia'
        }, {
            name: 'SWE',
            value: 'Sweden'
        }, {
            name: 'SWZ',
            value: 'Swaziland'
        }, {
            name: 'SXM',
            value: 'Sint Maarten (Dutch part)'
        }, {
            name: 'SYC',
            value: 'Seychelles'
        }, {
            name: 'SYR',
            value: 'Syrian Arab Republic'
        }, {
            name: 'TCA',
            value: 'Turks and Caicos Islands'
        }, {
            name: 'TCD',
            value: 'Chad'
        }, {
            name: 'TGO',
            value: 'Togo'
        }, {
            name: 'THA',
            value: 'Thailand'
        }, {
            name: 'TJK',
            value: 'Tajikistan'
        }, {
            name: 'TKL',
            value: 'Tokelau'
        }, {
            name: 'TKM',
            value: 'Turkmenistán'
        }, {
            name: 'TLS',
            value: 'Timor-Leste'
        }, {
            name: 'TON',
            value: 'Tonga'
        }, {
            name: 'TTO',
            value: 'Trinidad and Tobago'
        }, {
            name: 'TUN',
            value: 'Tunisia'
        }, {
            name: 'TUR',
            value: 'Turkey'
        }, {
            name: 'TUV',
            value: 'Tuvalu'
        }, {
            name: 'TWN',
            value: 'Taiwan, Province of China'
        }, {
            name: 'TZA',
            value: 'Tanzania, United Republic of'
        }, {
            name: 'UGA',
            value: 'Uganda'
        }, {
            name: 'UKR',
            value: 'Ukraine'
        }, {
            name: 'UMI',
            value: 'United States Minor Outlying Islands'
        }, {
            name: 'URY',
            value: 'Uruguay'
        }, {
            name: 'USA',
            value: 'United States of America'
        }, {
            name: 'UZB',
            value: 'Uzbekistan'
        }, {
            name: 'VAT',
            value: 'Holy See (Vatican City State)'
        }, {
            name: 'VCT',
            value: 'Saint Vincent and the Grenadines'
        }, {
            name: 'VEN',
            value: 'Venezuela, Bolivarian Republic of'
        }, {
            name: 'VGB',
            value: 'Virgin Islands, British'
        }, {
            name: 'VIR',
            value: 'Virgin Islands, U.S.'
        }, {
            name: 'VNM',
            value: 'Viet Nam'
        }, {
            name: 'VUT',
            value: 'Vanuatu'
        }, {
            name: 'WLF',
            value: 'Wallis and Futuna'
        }, {
            name: 'WSM',
            value: 'Samoa'
        }, {
            name: 'YEM',
            value: 'Yemen'
        }, {
            name: 'ZAF',
            value: 'South Africa'
        }, {
            name: 'ZMB',
            value: 'Zambia'
        }, {
            name: 'ZWE',
            value: 'Zimbabwe '
        }];

        var cnames_fr = [{
            name: 'ABW',
            value: 'Aruba'
        }, {
            name: 'AFG',
            value: 'Afghanistan'
        }, {
            name: 'AGO',
            value: 'Angola'
        }, {
            name: 'AIA',
            value: 'Anguilla'
        }, {
            name: 'ALA',
            value: 'Îles Åland'
        }, {
            name: 'ALB',
            value: 'Albanie'
        }, {
            name: 'AND',
            value: 'Andorre'
        }, {
            name: 'ARE',
            value: 'Émirats arabes unis'
        }, {
            name: 'ARG',
            value: 'Argentine'
        }, {
            name: 'ARM',
            value: 'Arménie'
        }, {
            name: 'ASM',
            value: 'Samoa américaines'
        }, {
            name: 'ATA',
            value: 'Antarctique'
        }, {
            name: 'ATF',
            value: 'Terres australes et antarctiques françaises'
        }, {
            name: 'ATG',
            value: 'Antigua-et-Barbuda'
        }, {
            name: 'AUS',
            value: 'Australie'
        }, {
            name: 'AUT',
            value: 'Autriche'
        }, {
            name: 'AZE',
            value: 'Azerbaïdjan'
        }, {
            name: 'BDI',
            value: 'Burundi'
        }, {
            name: 'BEL',
            value: 'Belgique'
        }, {
            name: 'BEN',
            value: 'Bénin'
        }, {
            name: 'BES',
            value: 'Pays-Bas caribéens'
        }, {
            name: 'BFA',
            value: 'Burkina Faso'
        }, {
            name: 'BGD',
            value: 'Bangladesh'
        }, {
            name: 'BGR',
            value: 'Bulgarie'
        }, {
            name: 'BHR',
            value: 'Bahreïn'
        }, {
            name: 'BHS',
            value: 'Bahamas'
        }, {
            name: 'BIH',
            value: 'Bosnie-Herzégovine'
        }, {
            name: 'BLM',
            value: 'Saint-Barthélemy'
        }, {
            name: 'BLR',
            value: 'Biélorussie'
        }, {
            name: 'BLZ',
            value: 'Belize'
        }, {
            name: 'BMU',
            value: 'Bermudes'
        }, {
            name: 'BOL',
            value: 'Bolivie'
        }, {
            name: 'BRA',
            value: 'Brésil'
        }, {
            name: 'BRB',
            value: 'Barbade'
        }, {
            name: 'BRN',
            value: 'Brunei'
        }, {
            name: 'BTN',
            value: 'Bhoutan'
        }, {
            name: 'BVT',
            value: 'Île Bouvet'
        }, {
            name: 'BWA',
            value: 'Botswana'
        }, {
            name: 'CAF',
            value: 'République centrafricaine'
        }, {
            name: 'CAN',
            value: 'Canada'
        }, {
            name: 'CCK',
            value: 'République centrafricaine'
        }, {
            name: 'CHE',
            value: 'Suisse'
        }, {
            name: 'CHL',
            value: 'Chili'
        }, {
            name: 'CHN',
            value: 'Chine'
        }, {
            name: 'CIV',
            value: 'Côte d\'Ivoire'
        }, {
            name: 'CMR',
            value: 'Cameroun'
        }, {
            name: 'COD',
            value: 'République démocratique du Congo'
        }, {
            name: 'COG',
            value: 'République du Congo'
        }, {
            name: 'COK',
            value: 'Îles Cook'
        }, {
            name: 'COL',
            value: 'Colombie'
        }, {
            name: 'COM',
            value: 'Comores '
        }, {
            name: 'CPV',
            value: 'Cap-Vert'
        }, {
            name: 'CRI',
            value: 'Costa Rica'
        }, {
            name: 'CUB',
            value: 'Cuba'
        }, {
            name: 'CUW',
            value: 'Curaçao'
        }, {
            name: 'CXR',
            value: 'le Christmas'
        }, {
            name: 'CYM',
            value: 'Îles Caïmans'
        }, {
            name: 'CYP',
            value: 'Chypre '
        }, {
            name: 'CZE',
            value: 'République tchèque'
        }, {
            name: 'DEU',
            value: 'Allemagne'
        }, {
            name: 'DJI',
            value: 'Djibouti'
        }, {
            name: 'DMA',
            value: 'Dominique'
        }, {
            name: 'DNK',
            value: 'Danemark'
        }, {
            name: 'DOM',
            value: 'République dominicaine'
        }, {
            name: 'DZA',
            value: 'Algérie'
        }, {
            name: 'ECU',
            value: 'Équateur '
        }, {
            name: 'EGY',
            value: 'Égypte'
        }, {
            name: 'ERI',
            value: 'Érythrée'
        }, {
            name: 'ESH',
            value: 'République arabe sahraouie démocratique'
        }, {
            name: 'ESP',
            value: 'Espagne'
        }, {
            name: 'EST',
            value: 'Estonie'
        }, {
            name: 'ETH',
            value: 'Éthiopie'
        }, {
            name: 'FIN',
            value: 'Finlande'
        }, {
            name: 'FJI',
            value: 'Fidji'
        }, {
            name: 'FLK',
            value: 'Malouines'
        }, {
            name: 'FRA',
            value: 'France'
        }, {
            name: 'FRO',
            value: 'Îles Féroé'
        }, {
            name: 'FSM',
            value: 'Micronésie'
        }, {
            name: 'GAB',
            value: 'Gabon'
        }, {
            name: 'GBR',
            value: 'Royaume-Uni'
        }, {
            name: 'GEO',
            value: 'Géorgie '
        }, {
            name: 'GGY',
            value: 'Guernesey'
        }, {
            name: 'GHA',
            value: 'Ghana'
        }, {
            name: 'GIB',
            value: 'Gibraltar'
        }, {
            name: 'GIN',
            value: 'Guinée'
        }, {
            name: 'GLP',
            value: 'Guadeloupe'
        }, {
            name: 'GMB',
            value: 'Gambie'
        }, {
            name: 'GNB',
            value: 'Guinée-Bissau'
        }, {
            name: 'GNQ',
            value: 'Guinée équatoriale'
        }, {
            name: 'GRC',
            value: 'Grèce'
        }, {
            name: 'GRD',
            value: 'Grenade'
        }, {
            name: 'GRL',
            value: 'Groenland'
        }, {
            name: 'GTM',
            value: 'Guatemala'
        }, {
            name: 'GUF',
            value: 'Guyane'
        }, {
            name: 'GUM',
            value: 'Guam'
        }, {
            name: 'GUY',
            value: 'Guyana'
        }, {
            name: 'HKG',
            value: 'Hong Kong'
        }, {
            name: 'HMD',
            value: 'Îles Heard-et-MacDonald'
        }, {
            name: 'HND',
            value: 'Honduras'
        }, {
            name: 'HRV',
            value: 'Croatie'
        }, {
            name: 'HTI',
            value: 'Haïti'
        }, {
            name: 'HUN',
            value: 'Hongrie'
        }, {
            name: 'IDN',
            value: 'Indonésie'
        }, {
            name: 'IMN',
            value: 'Île de Man'
        }, {
            name: 'IND',
            value: 'Inde'
        }, {
            name: 'IOT',
            value: 'Territoire britannique de l\'océan Indien'
        }, {
            name: 'IRL',
            value: 'Irlande'
        }, {
            name: 'IRN',
            value: 'Iran'
        }, {
            name: 'IRQ',
            value: 'Irak'
        }, {
            name: 'ISL',
            value: 'Islande'
        }, {
            name: 'ISR',
            value: 'Israël'
        }, {
            name: 'ITA',
            value: 'Italie'
        }, {
            name: 'JAM',
            value: 'Jamaïque'
        }, {
            name: 'JEY',
            value: 'Jersey'
        }, {
            name: 'JOR',
            value: 'Jordanie'
        }, {
            name: 'JPN',
            value: 'Japon'
        }, {
            name: 'KAZ',
            value: 'Kazakhstan'
        }, {
            name: 'KEN',
            value: 'Kenya'
        }, {
            name: 'KGZ',
            value: 'Kirghizistan'
        }, {
            name: 'KHM',
            value: 'Cambodge'
        }, {
            name: 'KIR',
            value: 'Kiribati'
        }, {
            name: 'KNA',
            value: 'Saint-Christophe-et-Niévès'
        }, {
            name: 'KOR',
            value: 'Corée du Sud'
        }, {
            name: 'KWT',
            value: 'Koweït'
        }, {
            name: 'LAO',
            value: 'Laos'
        }, {
            name: 'LBN',
            value: 'Liban'
        }, {
            name: 'LBR',
            value: 'Liberia'
        }, {
            name: 'LBY',
            value: 'Libye'
        }, {
            name: 'LCA',
            value: 'Sainte-Lucie'
        }, {
            name: 'LIE',
            value: 'Liechtenstein'
        }, {
            name: 'LKA',
            value: 'Sri Lanka'
        }, {
            name: 'LSO',
            value: 'Lesotho'
        }, {
            name: 'LTU',
            value: 'Lituanie'
        }, {
            name: 'LUX',
            value: 'Luxembourg'
        }, {
            name: 'LVA',
            value: 'Lettonie'
        }, {
            name: 'MAC',
            value: 'Macao'
        }, {
            name: 'MAF',
            value: 'Saint-Martin'
        }, {
            name: 'MAR',
            value: 'Maroc'
        }, {
            name: 'MCO',
            value: 'Monaco'
        }, {
            name: 'MDA',
            value: 'Moldavie'
        }, {
            name: 'MDG',
            value: 'Madagascar'
        }, {
            name: 'MDV',
            value: 'Maldives'
        }, {
            name: 'MEX',
            value: 'Mexique'
        }, {
            name: 'MHL',
            value: 'Îles Marshall'
        }, {
            name: 'MKD',
            value: 'Macédoine'
        }, {
            name: 'MLI',
            value: 'Mali'
        }, {
            name: 'MLT',
            value: 'Malte'
        }, {
            name: 'MMR',
            value: 'Birmanie'
        }, {
            name: 'MNE',
            value: 'Monténégro'
        }, {
            name: 'MNG',
            value: 'Mongolie'
        }, {
            name: 'MNP',
            value: 'Îles Mariannes du Nord'
        }, {
            name: 'MOZ',
            value: 'Mozambique'
        }, {
            name: 'MRT',
            value: 'Mauritanie'
        }, {
            name: 'MSR',
            value: 'Montserrat'
        }, {
            name: 'MTQ',
            value: 'Martinique'
        }, {
            name: 'MUS',
            value: 'Maurice'
        }, {
            name: 'MWI',
            value: 'Malawi'
        }, {
            name: 'MYS',
            value: 'Malaisie'
        }, {
            name: 'MYT',
            value: 'Mayotte'
        }, {
            name: 'NAM',
            value: 'Namibie'
        }, {
            name: 'NCL',
            value: 'Nouvelle-Calédonie'
        }, {
            name: 'NER',
            value: 'Niger'
        }, {
            name: 'NFK',
            value: 'Île Norfolk'
        }, {
            name: 'NGA',
            value: 'Nigeria'
        }, {
            name: 'NIC',
            value: 'Nicaragua'
        }, {
            name: 'NIU',
            value: 'Niue'
        }, {
            name: 'NLD',
            value: 'Pays-Bas'
        }, {
            name: 'NOR',
            value: 'Norvège'
        }, {
            name: 'NPL',
            value: 'Nepal'
        }, {
            name: 'NRU',
            value: 'Nauru'
        }, {
            name: 'NZL',
            value: 'Nouvelle-Zélande'
        }, {
            name: 'OMN',
            value: 'Oman'
        }, {
            name: 'PAK',
            value: 'Pakistán'
        }, {
            name: 'PAN',
            value: 'Panamá'
        }, {
            name: 'PCN',
            value: 'Îles Pitcairn'
        }, {
            name: 'PER',
            value: 'Pérou'
        }, {
            name: 'PHL',
            value: 'Philippines'
        }, {
            name: 'PLW',
            value: 'Palaos'
        }, {
            name: 'PNG',
            value: 'Papouasie-Nouvelle-Guinée'
        }, {
            name: 'POL',
            value: 'Pologne'
        }, {
            name: 'PRI',
            value: 'Porto Rico'
        }, {
            name: 'PRK',
            value: 'Corée du Nord'
        }, {
            name: 'PRT',
            value: 'Portugal'
        }, {
            name: 'PRY',
            value: 'Paraguay'
        }, {
            name: 'PSE',
            value: 'Palestine'
        }, {
            name: 'PYF',
            value: 'Polynésie française'
        }, {
            name: 'QAT',
            value: 'Qatar'
        }, {
            name: 'REU',
            value: 'La Réunion'
        }, {
            name: 'ROU',
            value: 'Roumanie'
        }, {
            name: 'RUS',
            value: 'Russie'
        }, {
            name: 'RWA',
            value: 'Rwanda'
        }, {
            name: 'SAU',
            value: 'Arabie saoudite'
        }, {
            name: 'SDN',
            value: 'Soudan'
        }, {
            name: 'SEN',
            value: 'Sénégal'
        }, {
            name: 'SGP',
            value: 'Singapour'
        }, {
            name: 'SGS',
            value: 'Géorgie du Sud-et-les Îles Sandwich du Sud'
        }, {
            name: 'SHN',
            value: 'Sainte-Hélène, Ascension et Tristan da Cunha'
        }, {
            name: 'SJM',
            value: 'Svalbard et ile Jan Mayen'
        }, {
            name: 'SLB',
            value: 'Salomon'
        }, {
            name: 'SLE',
            value: 'Sierra Leone'
        }, {
            name: 'SLV',
            value: 'El Salvador'
        }, {
            name: 'SMR',
            value: 'Saint-Marin'
        }, {
            name: 'SOM',
            value: 'Somalie'
        }, {
            name: 'SPM',
            value: 'Saint-Pierre-et-Miquelon'
        }, {
            name: 'SRB',
            value: 'Serbie'
        }, {
            name: 'STP',
            value: 'Sao Tomé-et-Principe'
        }, {
            name: 'SUR',
            value: 'Suriname'
        }, {
            name: 'SVK',
            value: 'Slovaquie'
        }, {
            name: 'SVN',
            value: 'Slovénie'
        }, {
            name: 'SWE',
            value: 'Suède'
        }, {
            name: 'SWZ',
            value: 'Swaziland'
        }, {
            name: 'SXM',
            value: 'Sint Maarten'
        }, {
            name: 'SYC',
            value: 'Seychelles'
        }, {
            name: 'SYR',
            value: 'Syrie'
        }, {
            name: 'TCA',
            value: 'Îles Turques-et-Caïques'
        }, {
            name: 'TCD',
            value: 'Tchad'
        }, {
            name: 'TGO',
            value: 'Togo'
        }, {
            name: 'THA',
            value: 'Thaïlande'
        }, {
            name: 'TJK',
            value: 'Tadjikistan'
        }, {
            name: 'TKL',
            value: 'Tokelau'
        }, {
            name: 'TKM',
            value: 'Turkménistan'
        }, {
            name: 'TLS',
            value: 'Timor oriental'
        }, {
            name: 'TON',
            value: 'Tonga'
        }, {
            name: 'TTO',
            value: 'Trinité-et-Tobago'
        }, {
            name: 'TUN',
            value: 'Tunisie'
        }, {
            name: 'TUR',
            value: 'Turquie'
        }, {
            name: 'TUV',
            value: 'Tuvalu'
        }, {
            name: 'TWN',
            value: 'Taïwan / (République de Chine (Taïwan))'
        }, {
            name: 'TZA',
            value: 'Tanzanie'
        }, {
            name: 'UGA',
            value: 'Ouganda'
        }, {
            name: 'UKR',
            value: 'Ukraine'
        }, {
            name: 'UMI',
            value: 'Îles mineures éloignées des États-Unis'
        }, {
            name: 'URY',
            value: 'Uruguay'
        }, {
            name: 'USA',
            value: 'États-Unis'
        }, {
            name: 'UZB',
            value: 'Ouzbékistan'
        }, {
            name: 'VAT',
            value: 'Saint-Siège (État de la Cité du Vatican)'
        }, {
            name: 'VCT',
            value: 'Saint-Vincent-et-les Grenadines'
        }, {
            name: 'VEN',
            value: 'Venezuela'
        }, {
            name: 'VGB',
            value: 'Îles Vierges britanniques'
        }, {
            name: 'VIR',
            value: 'Îles Vierges des États-Unis'
        }, {
            name: 'VNM',
            value: 'Viêt Nam'
        }, {
            name: 'VUT',
            value: 'Vanuatu'
        }, {
            name: 'WLF',
            value: 'Wallis-et-Futuna'
        }, {
            name: 'WSM',
            value: 'Samoa'
        }, {
            name: 'YEM',
            value: 'Yemen'
        }, {
            name: 'ZAF',
            value: 'Afrique du Sud'
        }, {
            name: 'ZMB',
            value: 'Zambie'
        }, {
            name: 'ZWE',
            value: 'Zimbabwe '
        }];
        return {
            country_es: country_es,
            country_en: country_en,
            country_fr: country_fr
        }

        function country_es() {
            return cnames_es;
        }

        function country_en() {
            return cnames_en;
        }

        function country_fr() {
            return cnames_fr;
        }

    }
})();