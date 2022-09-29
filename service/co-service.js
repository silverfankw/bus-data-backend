const { IS_LWB_ROUTE } = require("../util/route_def")
const { companyMap } = require("../util/company_def")

const stringifyCompany = (rt, companyArr) => companyArr.reduce((result, company, index) => {
    const is_lwb_route = IS_LWB_ROUTE(rt) && company === 'kmb'
    return { 
        en: result.en.concat(is_lwb_route ? `LWB` : company.toUpperCase(), `${ index + 1 != companyArr.length ? ` & ` : ``}`),
        zh: result.zh.concat(is_lwb_route ? companyMap[`lwb`]: companyMap[company], `${ index + 1 != companyArr.length ? ` 及 ` : ``}`)
    }}
, {en: "", zh: ""})

module.exports = { stringifyCompany }