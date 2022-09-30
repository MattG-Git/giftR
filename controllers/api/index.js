const router = require('express').Router();
const userRoutes = require('./userRoutes');
const peopleRoutes = require('./peopleRoutes');
const giftRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/people', peopleRoutes);
router.use('/gift', giftRoutes);

module.exports = router;
