const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getBook);
router.post('/', controller.addBook);
router.get('/:id', controller.getBookById);
router.patch('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;