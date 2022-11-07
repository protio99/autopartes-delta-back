const bcrypt = require('bcrypt');

async function hashVerify() {

const pass = 'daniela123';
const passHash = '$2b$10$8eK1xpi6OWrs7/v58U0beu52P/8S7W9U4ecOvjaUVxoqC9rxXf1mK'
const isMatch = await bcrypt.compare(pass,passHash);
console.log(isMatch)
}    

hashVerify();