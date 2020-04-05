import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { getCookieFromReq } from '../healpers/utils';

const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {

    constructor(){
        this.auth0 = new auth0.WebAuth({
                domain: 'dev--6tt3x9z.auth0.com',
                clientID: CLIENT_ID,
                redirectUri: `${process.env.BASE_URL}/callback`,
                responseType: 'token id_token',
                scope: 'openid'
            });


        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    handleAuthentication(){

        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if(authResult && authResult.accessToken && authResult.idToken){
                    this.setSession(authResult);
                    resolve();
                } else if(err){
                    reject(err);
                    console.error(err);
                }
            })
        });
        
    }

    setSession(authResult){
        //Save Tokenns!!!!!!!
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // localStorage.setItem('access_token', authResult.accessToken);
        // Cookies.set('user', authResult.idTokenPayload);
        Cookies.set('jwt', authResult.idToken);
        // Cookies.set('expiresAt', expiresAt);

    }

    logout(){
        // Cookies.remove('user');
        Cookies.remove('jwt');
        // Cookies.remove('expiresAt');
        
        this.auth0.logout({
            redirectTo: '',
            clientID: CLIENT_ID
        });
    }

    login() {
        this.auth0.authorize();
    }

    isAuthenticated(){
        const expiresAt = Cookies.getJSON('expiresAt');
        return new Date().getTime() < expiresAt;
    }

    async getJWKS(){
        const res = await axios.get('https://dev--6tt3x9z.auth0.com/.well-known/jwks.json');
        const jwks = res.data;
        return jwks;
    }

    async verifyToken(token){
        if(token){
            const decodedToken = jwt.decode(token, {complete : true});

            if(!decodedToken) { return undefined; }

            const jwks = await this.getJWKS();
            
            const jwk = jwks.keys[0];
            // BUILD CERTIFICATE
            let cert = jwk.x5c[0];
            cert = cert.match(/.{1,64}/g).join('\n');
            cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
            
            if(jwk.kid === decodedToken.header.kid){
                try{
                    const verifiedToken = jwt.verify(token, cert);
                    const expiresAt = verifiedToken.exp * 1000;
                    return (verifiedToken && new Date().getTime() < expiresAt ? verifiedToken : undefined)

                } catch(err){
                    return undefined;
                }
            }
            
        }
        return undefined
    }

    async clientAuth(){
        // return this.isAuthenticated();
        const token = Cookies.getJSON('jwt');
        const verifiedToken = await this.verifyToken(token);
        return verifiedToken;
    }

    async serverAuth(req){
        if(req.headers.cookie){
            // const expiresAtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('expiresAt='));
            // if(!expiresAtCookie) { return undefined };
            // const expiresAt = expiresAtCookie.split("=")[1];
            // return new Date().getTime() < expiresAt;

            const token = getCookieFromReq(req, 'jwt');
            const verifiedToken = await this.verifyToken(token);
            return verifiedToken;
        }

        return undefined;
    }
}

const auth0Client = new Auth0();
export default auth0Client;