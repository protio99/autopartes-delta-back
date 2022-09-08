const jwt = require('jsonwebtoken')

const secret = 'myCat'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE2NjI1OTEzNTh9.Mu16XJIWOM22uzamJNozDdGwBurvFs_t_olZxXmfCvY'

function verifyToken(token,secret) {
    return jwt.verify(token,secret)
    
}

const payload = verifyToken(token,secret)
console.log(payload)