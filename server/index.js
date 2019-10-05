const express = require('express')
const next = require('next');
const routes = require('../routes');

// SERVICE
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app)

const secretData = [
    {
        title: 'SecretData 1',
        description: 'Plans how to build spaceship'
    },
    {
        title: 'SecretData 2',
        description: 'My secret password'
    }
]

app.prepare()
    .then(() => {
        const server = express()
        
        // server.get('/portfolio/:id', (req, res) => {
        //     console.log('---------------serving /portfolio/:id of the requests!!!!!!!!!!!----------');
        //     const actualPage = '/portfolio'
        //     const queryParams = { id: req.params.id }
        //     app.render(req, res, actualPage, queryParams)
        //     console.log('----------------End serving /portfolio/:id of the requests!!!!!!!!!!!----------');
        // })

        server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
            return res.json(secretData);
        })

        server.get('/api/v1/onlysiteownwer', authService.checkJWT, authService.CheckRole('siteOwner'), (req, res) => {
            return res.json(secretData);
        })

        server.get('*', (req, res) => {
            // console.log('---------------serving all of the requests!!!!!!!!!!!----------');
            return handle(req, res)
        })

        server.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
              res.status(401).send({title: 'Unauthorized', details: 'Unauthorized Access'});
            }
        });

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })