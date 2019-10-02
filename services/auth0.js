import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { domainToUnicode } from 'url';


class Auth0 {

    constructor(){
        this.auth0 = new auth0.WebAuth({
                domain: 'dev--6tt3x9z.auth0.com',
                clientID: '7NRcfteyB8NkNgooxYr0VDxKZ1sV3sp0',
                redirectUri: 'http://localhost:3000/callback',
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
                    console.log(err);
                }
            })
        });
        
    }

    setSession(authResult){
        //Save Tokenns!!!!!!!
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // localStorage.setItem('access_token', authResult.accessToken);
        Cookies.set('user', authResult.idTokenPayload);
        Cookies.set('jwt', authResult.idToken);
        Cookies.set('expiresAt', expiresAt);

    }

    logout(){
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');
        
        this.auth0.logout({
            redirectTo: '',
            clientID: '7NRcfteyB8NkNgooxYr0VDxKZ1sV3sp0'
        });
    }

    login() {
        this.auth0.authorize();
    }

    isAuthenticated(){
        const expiresAt = Cookies.getJSON('expiresAt');
        return new Date().getTime() < expiresAt;
    }

    verifyToken(token){
        if(token){
            const decodedToken = jwt.decode(token);
            const expiresAt = decodedToken.exp * 1000;

            return (decodedToken && new Date().getTime() < expiresAt ? decodedToken : undefined)
        }
        return undefined
    }

    clientAuth(){
        // return this.isAuthenticated();
        const token = Cookies.getJSON('jwt');
        const verifiedToken = this.verifyToken(token);
        return verifiedToken;
    }

    serverAuth(req){
        if(req.headers.cookie){
            // const expiresAtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('expiresAt='));
            // if(!expiresAtCookie) { return undefined };
            // const expiresAt = expiresAtCookie.split("=")[1];
            // return new Date().getTime() < expiresAt;

            const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
            if(!tokenCookie) { return undefined };
            const token = tokenCookie.split("=")[1];
            const verifiedToken = this.verifyToken(token);
            return verifiedToken;
        }

        return undefined;
    }
}

const auth0Client = new Auth0();
export default auth0Client;