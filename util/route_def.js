const OVERNIGHT_ROUTE = []

const LWB_ROUTE = [
    'A31', 'A32', 'A33', 'A33X', 'A34', 'A36', 'A37', 'A38', 'A41', 'A41P', 'A43', 'A43P', 'A47X',
    'E31', 'E32', 'E32A', 'E33', 'E33P', 'E36', 'E36A', 'E36P', 'E36S', 
    'E37', 'E37C', 'E41', 'E41', 'E42', 'E42C', 'E42P', 'E43',
    'NA31', 'NA32', 'NA33', 'NA36', 'NA37', 'NA40', 'NA41', 'NA43', 'NA47',
    'N30', 'N31', 'N42', 'N42A', 'N42P', 'N64',
    'R8', 'R33', 'R42',
    'S1', 'S64', 'S64C', 'S64P', 'S64X', 'S65',
    'X1', 'X33', 'X36', 'X40', 'X43', 'X47'
]

const LWB_AIRPORT_ROUTE = ["A31", "A32", "A33", "A33X", "A34", "A36", "A37", "A38", "A41", "A41P", "A43", "A43P", "A47X"]

const LWB_EXTERNAL_ROUTE = [
    "E31", "E32", "E32A", "E33", "E33P", "E36", "E36A", "E36P", "E36S",
    "E37", "E37C", "E41", "E42", "E42C", "E42P", "E43"]

const LWB_LANTAU_ROUTE = ["R8", "S1", "S64", "S64C", "S64P", "S64X", "S65"]

const LWB_OVERNIGHT_ROUTE = ["NA31", "NA32", "NA33", "NA36", "NA37", "NA40", "NA41", "NA43", "NA47"]

const CTB_OVERNIGHT_ROUTE = [
    "N8X", "N11", "N20", "N21", "N21A", "N23", "N26", "N29",
    "N72", "N90", "969N", "N307", "N930", "N952", "N962", "N969"]

const CTB_EXTERNAL_ROUTE_NORMAL = ["E21", "E21A", "E21B", "E21C", "E21D", "E21X", "E22", "E22A", "E22C", "E22P", "E22S", "E22X", "E23", "E23A"]

const CTB_EXTERNAL_ROUTE_XHT = ["E11", "E11A", "E11B", "E11S"]

const CTB_LANTAU_S_ROUTE = ["S52", "S52A", "S52P", "S56"]

const NWFB_OVERNIGHT_ROUTE = ["N8", "N8P", "N796"]

const CITYFLYER_ROUTE = [
    "A10", "A11", "A17", "A21", "A22", "A23", "A26", "A29", "A29P",
    "NA10", "NA11", "NA12", "NA20", "NA21", "NA29"]

const NLB_OVERNIGHT_ROUTE = ["N1", "N35", "N37", "N38"]

const EXCLUSION_FOR_RED_BG = ["347", "388", "389", "629", "629M"]

const LWB_EVENT_ROUTE = ["R33", "R42", "X33", "X36", "X40", "X43"]

const XHT_EVENT_ROUTE = ["R108", "R307", "R603", "R673", "R678", "R680", "R930", "R934", "R936", "R948", "R960", "R961", "R962", "R968", "R969"]


// Define special color for different types of route

const IS_OVERNIGHT_ROUTE = route => route.match(/(^N)(\d|[A-Z]){1,4}/)
const IS_NLB_OVERNIGHT_ROUTE = route => NLB_OVERNIGHT_ROUTE.indexOf(route) > -1
const IS_CTB_NWFB_OVERNIGHT_ROUTE = route => [...CTB_OVERNIGHT_ROUTE, ...NWFB_OVERNIGHT_ROUTE].indexOf(route) > -1

const IS_XHT_OR_EHC_ROUTE = route =>
    route.match(/(^1)(\d){2}([A-Z])?/) || route.match(/(^3)(\d){2}([A-Z])?/) || route.match(/(^6)(\d){2}([A-Z])?/)
const IS_XHT_EVENT_ROUTE = route => XHT_EVENT_ROUTE.indexOf(route) > -1
const IS_CTB_EXTERNAL_ROUTE = route => CTB_EXTERNAL_ROUTE_NORMAL.indexOf(route) > -1
const IS_RED_BG_EXCLUSION = route => EXCLUSION_FOR_RED_BG.indexOf(route) > -1
const IS_RED_BG = route => (IS_XHT_OR_EHC_ROUTE(route) || IS_XHT_EVENT_ROUTE(route) || IS_CTB_EXTERNAL_ROUTE(route)) && !IS_RED_BG_EXCLUSION(route)

const IS_CITYFLYER_ROUTE = route => CITYFLYER_ROUTE.indexOf(route) > -1

const IS_WHC_ROUTE = route => route.match(/(^9)(\d|[A-Z]){2,4}/) || CTB_EXTERNAL_ROUTE_XHT.indexOf(route) > -1

const IS_LWB_ROUTE = route => LWB_ROUTE.indexOf(route) > -1
const IS_LWB_AIRPORT_ROUTE = route => LWB_AIRPORT_ROUTE.indexOf(route) > -1
const IS_LWB_EXTERNAL_ROUTE = route => LWB_EXTERNAL_ROUTE.indexOf(route) > -1
const IS_LWB_S_ROUTE = route => LWB_LANTAU_ROUTE.indexOf(route) > -1
const IS_LWB_EVENT_ROUTE = route => LWB_EVENT_ROUTE.indexOf(route) > -1
const IS_LWB_AIRPORT_OVERNIGHT_ROUTE = route => LWB_OVERNIGHT_ROUTE.indexOf(route) > -1


const IS_REGULAR_ROUTE = route => 
    (!IS_OVERNIGHT_ROUTE(route) && !IS_CTB_NWFB_OVERNIGHT_ROUTE(route) && !IS_XHT_OR_EHC_ROUTE(route) &&
    !IS_WHC_ROUTE(route) && !IS_LWB_EXTERNAL_ROUTE(route) && !IS_CITYFLYER_ROUTE(route) &&
    !IS_LWB_AIRPORT_ROUTE(route) && !IS_LWB_AIRPORT_OVERNIGHT_ROUTE(route) && !IS_LWB_S_ROUTE(route) && 
    !IS_LWB_EVENT_ROUTE(route) && !IS_XHT_EVENT_ROUTE(route))
    || IS_RED_BG_EXCLUSION(route)


module.exports = {
    IS_OVERNIGHT_ROUTE, IS_LWB_AIRPORT_OVERNIGHT_ROUTE, 
    IS_NLB_OVERNIGHT_ROUTE, IS_CTB_NWFB_OVERNIGHT_ROUTE, 
    IS_LWB_ROUTE, IS_LWB_AIRPORT_ROUTE, IS_XHT_OR_EHC_ROUTE, IS_XHT_EVENT_ROUTE, 
    IS_RED_BG_EXCLUSION, IS_RED_BG, IS_WHC_ROUTE, 
    IS_LWB_EXTERNAL_ROUTE, IS_LWB_S_ROUTE, IS_LWB_EVENT_ROUTE, 
    IS_CITYFLYER_ROUTE, IS_REGULAR_ROUTE
}