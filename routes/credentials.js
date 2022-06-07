const router = require('express').Router(); 
const { requiresAuth } = require("express-openid-connect");
const { credentialsView, beginEmailVerification, completeEmailVerification } = require("../controllers/credentials.controller");

// navigate to profile page
router.get("/credentials", requiresAuth(), credentialsView);

router.post("/credentials/updateEmail", requiresAuth(), beginEmailVerification);
router.post("/credentials/verifyEmail", requiresAuth(), completeEmailVerification);


module.exports = router;