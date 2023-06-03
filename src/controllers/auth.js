const express = require("express");
const router = express.Router();
const request = require("request"); // allows me to make curl/HTTP requests to another server from nodejs
const querystring = require("querystring");
const axios = require("axios");
const { LoginToken } = require("../models/index");

const client_id = "5c7e7b4931784167cbff";
const client_secret = "a71ca2f275ab21054c1f21e84ff181c29c6b8a96";

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/success", (req, res) => {
  res.redirect("http://localhost:3003/success");
});

router.get("/logout", (req, res) => {
  req.session.access_token = "";
  res.redirect("auth/login");
});

// http://localhost:3000/auth/callback?code=fa56a3c69069709a0668
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  await request(
    {
      uri: "https://github.com/login/oauth/access_token",
      qs: {
        client_id,
        client_secret,
        code,
      },
    },
    async (error, response, body) => {
      const { access_token } = querystring.parse(body);
      req.session.access_token = access_token;
      console.log(access_token);
      const loginToken = await LoginToken.create({ token: access_token });
      console.log(loginToken);
      res.redirect("http://localhost:3003?token=" + access_token);
      //&------------------------------------------------
      // await request(
      //   {
      //     uri: "https://api.github.com/user",
      //     headers: {
      //       Authorization: `token ${access_token}`,
      //       "User-Agent": "Mozilla/5.0",
      //     },
      //   },
      //   async (error, response, body) => {
      //     const data = querystring.parse(body);
      //     res.json(data);
      //   }
      // );
      //&------------------------------------------------
    }
  );
});

// http://localhost:3000/auth/token/'
router.get("/token", async (req, res) => {
  const token = await LoginToken.findOne({
    where: {
      token: req.headers.token,
    },
  });
  if (token) {
    req.session.access_token = req.headers.token;
    res.json(token);
  } else {
    res.json({ token: false });
  }
});

module.exports = router;