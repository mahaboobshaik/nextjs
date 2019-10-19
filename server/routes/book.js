const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book');

router.post('', bookCtrl.saveBook);

router.get('', bookCtrl.getBook)

router.patch('/:id', bookCtrl.updateBook)

router.delete('/:id', bookCtrl.deleteBook)

module.exports = router;