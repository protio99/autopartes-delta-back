const bcrypt = require('bcrypt');

async function hashVerify() {

const pass = 'daniela123';
const passHash = '$2b$10$7Ax3p30mjioDp2/9S.G16eu.8BcAiqMjAo.Qu7sg3tt2tUUftDfeK'
const isMatch = await bcrypt.compare(pass,passHash);
console.log(isMatch)
}    

hashVerify();