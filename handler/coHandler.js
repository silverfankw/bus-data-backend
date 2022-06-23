const coMap = { "kmb": "", "ctb": "", "nwfb": "" }

const lwbRoutes = [
    'A31', 'A32', 'A33', 'A33X', 'A34', 'A36', 'A37', 'A41', 'A41P', 'A43', 'A43P', 'A47X',
    'E31', 'E32', 'E32A', 'E33', 'E33P', 'E36', 'E36A', 'E36P', 'E36S', 'E37', 'E37C', 'E41', 'E41', 'E42', 'E42C', 'E42P', 'E43',
    'NA31', 'NA32', 'NA33', 'NA36', 'NA37', 'NA40', 'NA41', 'NA43', 'NA47',
    'N30', 'N31', 'N42', 'N42A', 'N42P', 'N64',
    'R8', 'R33', 'R42',
    'S1', 'S64', 'S64C', 'S64P', 'S64X', 'S65',
    'X1', 'X33', 'X36', 'X40', 'X43', 'X47'
]

const joinCompany = co => co.join(', ')

module.exports = { joinCompany }