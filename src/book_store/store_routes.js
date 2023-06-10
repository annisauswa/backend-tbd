const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getStore);

module.exports = router;