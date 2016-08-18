var request = require("request");

var options = { method: 'GET',
  url: 'https://onset.auth0.com/api/v2/users/instagram|1526590778',
  headers: { 'content-type': 'application/json', authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL29uc2V0LmF1dGgwLmNvbS8iLCJzdWIiOiJpbnN0YWdyYW18MTUyNjU5MDc3OCIsImF1ZCI6InBRWnluajlhZUI2RmdQb0tpaGs3SGx1R0dsTFl3cVdSIiwiZXhwIjoxNDcxNTY5MzI4LCJpYXQiOjE0NzE1MzMzMjh9.3JGpDF2notAT2iNsLfpuTOQoD978zTN8Wyq-5EHJpME' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

  getInstagramPhotos: function(userId, callback) {
  // This first request gets us an access token for the Auth0 Management API
  var options = {
    method: "POST",
    url: "https://onset.auth0.com/oauth/token",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      client_id: "nl1m9ITxdCRGqBS20PnsdkBP5khFjQFJ",
      client_secret: "5jqDRhZ0oqPT64d-Ecx7Bhr6w9nMP3VpM4rp99F63ncu1r2yrL8ZHkdO5cbwpUP5",
      audience: "https://onset.auth0.com/api/v2/",
      grant_type: "client_credentials"
    })
  };

  request(options, function (error, response, body) {
    if (error) {
      callback(error);
      return;
    }

    var data;
    try {
      data = JSON.parse(body);
    }
    catch(e) {
      callback(new Error('Unexpected response'));
      return;
    }

    // This second requests uses the token from step 1 to retrieve the Instagram access token for the requested user
    var options = {
      method: "GET",
      url: `https://onset.auth0.com/api/v2/users/${userId}`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${data.access_token}`
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      var data;
      try {
        data = JSON.parse(body);
      }
      catch(e) {
        callback('Unexpected response');
        return;
      }

      var instagramToken = data.identities[0].access_token;

      // This is the final request to the Instagram API, using the /self/ endpoint to retrieve the media based on the token
      var options = {
        method: "GET",
        url: `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instagramToken}`
      };

      request(options, function(error, response, body) {
        if (error) {
          callback(error);
          return;
        }

        var data;
        try {
          data = JSON.parse(body);
        }
        catch(e) {
          callback('Unexpected response');
          return;
        }

        callback(null, data.data);
      });
    });
  });
},