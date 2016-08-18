// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root', 
//   password : '',
//   database: 'onset'
// });
// connection.connect();

var request = require("request");

module.exports = function OnsetAPI(conn) {
  return {
    createUser: function(user, callback) {
          conn.query(
            'INSERT INTO User (username, email, nickname, profilepic, typeOfLogin, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
            [user.username, user.email, user.nickname, user.profilepic, user.typeOfLogin, new Date()],
            function(err, result) {
              if (err) {
                callback(err);
              }
              else {
                conn.query(
                  'SELECT id, username, email, nickname, profilepic, typeOfLogin, createdAt FROM User WHERE id = ?', [result.insertId],
                  function(err, result) {
                    if (err) {
                      callback(err);
                    }
                    else {
                      callback(null, result[0]);
                    }
                  }
                );
              }
            }
          );
    },
    createProfile: function(profile, callback) {
        conn.query(
            'INSERT INTO Profile (name, username, token, email, profilepic, city, category, specialities, availability, photosprovided, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [profile.name, profile.username, profile.token, profile.email, profile.profile_pic, profile.city, profile.category, profile.specialities, profile.availability, profile.instagramauthorized, new Date(), new Date()],
            function(err, result) {
              if (err) {
                callback(err);
                console.log(err);
              }
              else {
                conn.query(
                  'SELECT id, name, username, token, email, profilepic, city, category, specialities, availability, photosprovided, createdAt, updatedAt FROM Profile WHERE id = ?', [result.insertId],
                  function(err, result) {
                    if (err) {
                      console.log(err);
                      callback(err);
                    }
                    else {
                      callback(null, result[0]);
                    }
                  }
                );
              }
            }
          );
    },
    createReview: function(review, callback) {
      if (!review.userId || !review.profileId) {
        callback(null, new Error('userId and postId required'));
        return;
      }
      conn.query(
        'INSERT INTO Reviews (text, score, userId, profileId, createdAt) VALUES (?, ?, ?, ?, ?)', [review.text, review.score, review.userId, review.profileId, new Date()],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            /*
            Post inserted successfully. Let's use the result.insertId to retrieve
            the post and send it to the caller!
            */
            conn.query(
              'SELECT id, text, score, userId, profileId, createdAt FROM Reviews WHERE id = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                }
                else {
                  callback(null, result[0]);
                }
              });
          }
        }
      );
    },
    getAllProfiles: function(options, category, city, sortingMethod, callback) {
      // In case we are called without an options parameter, shift all the parameters manually
      if (!callback) {
        callback = options;
        options = {};
      }
      var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
      var offset = (options.page || 0) * limit;

      conn.query(`
        SELECT 
          p.username AS username, 
          u.nickname AS nickname, 
          u.profilePic AS profilePic,
          u.typeOfLogin as typeOfLogin,
          u.email as email,
          p.city AS city,
          p.category AS category,
          u.createdAt AS userCreatedAt, 
          p.id,
          p.profile_type as profileType,
          p.profile_data as profileData,
          p.createdAt AS profileCreatedAt,
          p.updatedAt AS profileUpdatedAt,
          AVG(r.score) as profileScore,
          COUNT(r.id) as totalReviews
        FROM Profile p
          LEFT JOIN User u ON p.userId=u.id
          LEFT JOIN Reviews r ON r.profileId = p.id
          WHERE city = ? and category = ?
          GROUP by p.id
            ORDER BY ? DESC LIMIT ? OFFSET ?`, [city, category, sortingMethod, limit, offset],
        function(err, results) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            // console.log(results);
            var mappedResults = results.map(function(res) {
              return {
                profileId: res.id,
                username: res.username,
                nickname: res.nickname,
                profilePic: res.profilePic,
                profileType: res.profileType,
                profileData : res.profileData,
                profileCategory: res.category,
                city: res.city,
                createdAt: res.profileCreatedAt,
                updatedAt: res.profileUpdatedAt,
                profileScore: res.profileScore,
                profileReviews: res.totalReviews,
                userInfo: {
                  email: res.email,
                  username: res.username,
                  typeOfLogin: res.typeOfLogin
                }
              };
            });
            callback(null, mappedResults);
          }
        }
      );
    },
    getSingleProfile: function(username, callback) {
      conn.query(`
        SELECT 
          p.username, 
          u.nickname AS nickname, 
          u.profilePic AS profilePic,
          u.typeOfLogin as typeOfLogin,
          u.email as email,
          p.city AS city,
          p.category AS category,
          u.createdAt AS userCreatedAt, 
          p.id,
          p.profile_type as profileType,
          p.profile_data as profileData,
          p.createdAt AS profileCreatedAt,
          p.updatedAt AS profileUpdatedAt,
          AVG(r.score) as profileScore,
          COUNT(r.id) as totalReviews
        FROM Profile p
          LEFT JOIN User u ON p.userId=u.id
          LEFT JOIN Reviews r ON r.profileId = p.id
          WHERE p.username = ?
          GROUP by p.id`, [username],
        function(err, results) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            // console.log(results);
            var mappedResults = results.map(function(res) {
              return {
                profileId: res.id,
                nickname: res.nickname,
                username: res.username,
                profilePic: res.profilePic,
                profileType: res.profileType,
                profileData : res.profileData,
                profileCategory: res.category,
                city: res.city,
                createdAt: res.profileCreatedAt,
                updatedAt: res.profileUpdatedAt,
                profileScore: res.profileScore,
                profileReviews: res.totalReviews,
                userInfo: {
                  email: res.email,
                  typeOfLogin: res.typeOfLogin
                }
              };
            });
            callback(null, mappedResults);
          }
        }
      );
    },
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
      console.log(data);
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
      getInstagramProfile: function(userId, callback) {
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
      console.log(data);
      var instagramToken = data.identities[0].access_token;

      // This is the final request to the Instagram API, using the /self/ endpoint to retrieve the media based on the token
      var options = {
        method: "GET",
        url: `https://api.instagram.com/v1/users/self?access_token=${instagramToken}`
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
    getReviewsForProfile: function(options, profileId, callback) {
      // In case we are called without an options parameter, shift all the parameters manually
      if (!callback) {
        callback = options;
        options = {};
      }
      var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
      var offset = (options.page || 0) * limit;

      conn.query(`
        SELECT 
          r.id AS id, 
          r.text AS reviewText, 
          r.score AS score,
          r.createdAt AS reviewCreatedAt, 
          r.userId as userId,
          u.username as username,
          r.profileID as profileId
        FROM Reviews r
          LEFT JOIN User u ON userId=u.id
          LEFT JOIN Profile p ON p.id=profileId
          WHERE profileId = ?
        ORDER BY reviewCreatedAt DESC LIMIT ? OFFSET ?`, [profileId, limit, offset],
        function(err, results) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            var mappedResults = results.map(function(res) {
              return {
                reviewId: res.id,
                reviewText: res.reviewText,
                reviewScore: res.score,
                reviewCreatedAt: res.reviewCreatedAt,
                profileID : res.profileId,
                user: {
                  username: res.username,
                  id: res.userId
                }
              }
            })
            callback(null, mappedResults);
          }
        }
      );
    }
  }
}

// var onSetAPI = OnsetAPI(connection);

// onSetAPI.createUser({
//     username: "Jules",
//     email: "julian.binder@gmail.com",
//     nickname: "Julian Binder",
//     profilepic: "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-1/p160x160/10646684_10154550151650471_4084064332679043178_n.jpg?oh=ea71897c8f73618cd9fcd65d1d1fc533&oe=5813B257",
//     typeOfLogin: "Instagram"
//     }, function(err, user) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });
//Hi guys
// onSetAPI.createProfile({
//     userId: 8,
//     type: "artist",
//     data: "{category: Make-up Artist}",
//     city: "Montreal",
//     category: "Hair stylist"
//     }, function(err, profile) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         console.log(profile);
//     }
// });

// onSetAPI.createReview({
//     text: "Julian has the best hair, I want hair like him",
//     score: 9.9,
//     userId: 2,
//     profileId: 4
//     }, function(err, review) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         console.log(review);
//     }
// });

// onSetAPI.getReviewsForProfile({}, 3, function(err, reviews) {
//     if (err) {
//       console.log(err);
//     }
//     else{
//       console.log(reviews);
//     }
//   });
  
// onSetAPI.getAllProfiles({}, "Hair stylist", "Montreal", "profileCreatedAt", function(err, profiles) {
//     if (err) {
//       console.log(err);
//     }
//     else{
//       console.log(profiles);
//     }
//   });



