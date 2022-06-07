const router = require('express').Router();
const { requiresAuth } = require("express-openid-connect");

router.get('/', (req, res, next)=> {
  const user = req.oidc.user;  
  res.render("home", { user })
});


module.exports = router;

