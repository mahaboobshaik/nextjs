import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../healpers/utils';

const axionInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 3000
})

const setAuthHeader = (req) => {
    const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt') ;
    if(token){
        return { headers: {'authorization': `Bearer ${token}`}}
    }
    return undefined;
}

const rejectPormise = (resError) => {
    let error = {};

    if(resError && resError.response && resError.response.data ){
        error = resError.response.data;
    } else {
        error = resError;
    }

    return Promise.reject(error);
}

export const getSecretData = async (req) => {
    const url = '/secret';
    return await axionInstance.get(url, setAuthHeader(req) ).then(response => response.data);
}

export const getPortfolios = async (req) => {
    return await axionInstance.get('/portfolios').then(response => response.data);
}

export const getPortfolioById = async (id) => {
    return await axionInstance.get(`/portfolios/${id}`).then(response => response.data);
}

export const createPortfolio = async (portfolioData) => {
    return await axionInstance.post('/portfolios', portfolioData, setAuthHeader())
            .then(response => response.data)
            .catch(error => rejectPormise(error));
}

export const updatePortfolio = async (portfolioData) => {
    return await axionInstance.patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
            .then(response => response.data)
            .catch(error => rejectPormise(error));
}

export const deletePortfolio = (portfolioId) => {
    return axionInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader()).then(resposne => resposne.data);
}