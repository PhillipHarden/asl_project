const express = require("express");
const router = express.Router();
const request = require("request"); // allows me to make curl/HTTP requests to another server from nodejs
const querystring = require("querystring");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  await request(
    {
      uri: "https://github.com/login/oauth/access_token",
      qs: {
        client_id: "5c7e7b4931784167cbff",
        client_secret: "9e20e364a191c8338d0a90db33214b4ff639f075",
        code,
      },
    },
    async (error, response, body) => {
      const { access_token } = querystring.parse(body);
      req.session.access_token = access_token;
      res.redirect("/");
      await request(
        {
          uri: "https://api.github.com/user",
          headers: {
            Authorization: `token ${access_token}`,
            "User-Agent": "Mozilla/5.0", //this is a lie
          },
        },
        // async (error, response, body) => {
        //   const obj = JSON.parse(body);
        //   const username = obj.login;
        //   console.log("User_name: (inside)" + username); // Output: "PhillipHarden"
        //   req.session.username = username;
        // }
      );      
    }
  );
});

module.exports = router;