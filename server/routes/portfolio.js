const express = require('express');
const router = express.Router();

const portfolioCtrl = require('../controllers/portfolio');
const authService = require('../services/auth');

router.post('', authService.checkJWT, authService.CheckRole("siteOwner"), portfolioCtrl.savePortfolio);

router.get('', portfolioCtrl.getPortfolios);

router.get('/:id', portfolioCtrl.getPortfolioById);

router.patch('/:id', authService.checkJWT, authService.CheckRole("siteOwner"), portfolioCtrl.updatePortfolio);

router.delete('/:id', authService.checkJWT, authService.CheckRole("siteOwner"), portfolioCtrl.deletePortfolio);

module.exports = router;