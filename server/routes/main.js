const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('../../middleware/passport');

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  })

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/oauthcallback', passport.authenticate('google', {
  failureRedirect: '/' }),
  (req, res) => {
    console.log(req.user);
    res.cookie('loggedIn', true, {path: '/'});
    req.session.user = req.user;
    res.redirect('/');
  }
);

router.post('/api/stream-search', (req, res) => {
  console.log(req.body.channelname);
  res.sendStatus(201);
})

router.get('/logout', (req,res) => {
  res.clearCookie('loggedIn');
  req.logout();
  res.redirect('/');
})

router.get('/api/getcurrentuser', (req,res) => {
  res.send(req.user);
})
module.exports = router;