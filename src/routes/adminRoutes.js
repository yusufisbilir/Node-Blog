const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/',adminController.admin_index);
router.get('/add',adminController.admin_add);
router.post('/add',adminController.admin_add_post);
router.delete('/delete/:id',adminController.admin_delete);

module.exports = router;