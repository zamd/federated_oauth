const router = require('express').Router(),
	grants = require('./grants');

router.get('/authorize',grants.authorizationGrantDirect);

module.exports = router;