const bcrypt = require('bcrypt');

async function hash() {

const pass = 'daniela123';
const hash = await bcrypt.hash(pass,10);
console.log(hash)
}    

hash();