const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const nameSpace = `${process.env.NAMESPACE}/`;

// Middleware 
exports.checkJWT = jwt({ 
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 50,
        jwksUri: 'https://dev--6tt3x9z.auth0.com/.well-known/jwks.json'
    }),
    audience: '7NRcfteyB8NkNgooxYr0VDxKZ1sV3sp0',
    issuer: 'https://dev--6tt3x9z.auth0.com/',
    algorithms: ['RS256']
})

exports.CheckRole = role => (req, res, next) => {
    const user = req.user;
    if(user && (user[nameSpace+'role'] === role)){
        next();
    } else {
        return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access this data'})
    }
}