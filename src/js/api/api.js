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
            'INSERT INTO Profile (name, username, token, email, profilepic, city, category, specialities, availability, photosprovided, createdAt, updatedAt, employment, education) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [profile.name, profile.username, profile.token, profile.email, profile.profile_pic, profile.city, profile.category, profile.specialities, profile.availability, profile.instagramauthorized, new Date(), new Date(), profile.employment, profile.education],
            function(err, result) {
              if (err) {
                callback(err);
                console.log(err);
              }
              else {
                conn.query(
                  'SELECT id, name, username, token, email, profilepic, city, category, specialities, availability, photosprovided, createdAt, updatedAt, education, employment FROM Profile WHERE id = ?', [result.insertId],
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
      console.log(review);
      conn.query(
        'INSERT INTO Reviews (text, score, reviewertoken, reviewerusername, profileusername, createdAt) VALUES (?, ?, ?, ?, ?, ?)', [review.text, review.score, review.token, review.reviewerusername, review.profileusername, new Date()],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            conn.query(
              'SELECT id, text, score, reviewertoken, reviewerusername, profileusername, createdAt FROM Reviews WHERE id = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                  console.log(err);
                }
                else {
                  console.log(result[0]);
                  callback(null, result[0]);
                }
              });
          }
        }
      );
    },
    createPhoto: function(photo, token, callback) {
      conn.query(
        'INSERT INTO Photos (photourl, token) VALUES (?, ?)', [photo, token],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            conn.query(
              'SELECT id, photourl, token FROM Photos WHERE id = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                  console.log(err);
                }
                else {
                  console.log(result[0]);
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
          p.name AS name, 
          p.profilepic AS profilepic,
          p.email as email,
          p.city AS city,
          p.category AS category,
          p.id,
          p.specialities as specialities,
          p.availability as availability,
          p.createdAt AS profileCreatedAt,
          p.updatedAt AS profileUpdatedAt,
          p.token as profileToken,
          p.photosprovided as photosprovided,
          p.education as education,
          p.employment as employment,
          ROUND(AVG(r.score), 1) as profileScore,
          COUNT(r.id) as totalReviews
        FROM Profile p
          LEFT JOIN Reviews r ON r.profileusername = p.username
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
                token: res.token,
                photosprovided: res.photosprovided,
                name: res.name,
                profile_pic: res.profilepic,
                specialities: res.specialities,
                category : res.profileData,
                profileCategory: res.category,
                availability: res.availability,
                city: res.city,
                createdAt: res.profileCreatedAt,
                updatedAt: res.profileUpdatedAt,
                profileScore: res.profileScore,
                profileReviews: res.totalReviews,
                employment: res.employment,
                education: res.education
              };
            });
            callback(null, mappedResults);
          }
        }
      );
    },
    getEmail: function(username, callback) {
      console.log(username);
      conn.query(`
        SELECT
          email
        FROM Profile
          WHERE username = ?`, [username], 
        function(err, email) {
          if (err) {
            console.log(err, "this is an error");
          } else {
            console.log(email, "this is an email!")
          return callback(null, email);
          }
        }
      );
    },
    getMyProfile: function(token, callback) {
      console.log(token);
      conn.query(`
        SELECT
          username
        FROM Profile
          WHERE token = ?`, [token], 
        function(err, username) {
          if (err) {
            console.log(err, "this is an error");
          } else {
            console.log(username, "this is an email!")
          return callback(null, username);
          }
        }
      );
    },
    getSingleProfile: function(username, callback) {
      conn.query(`
        SELECT 
          p.username AS username, 
          p.name AS name, 
          p.profilepic AS profilepic,
          p.email as email,
          p.city AS city,
          p.category AS category,
          p.id,
          p.specialities as specialities,
          p.availability as availability,
          p.education as education,
          p.employment as employment,
          DATE_FORMAT(p.createdAt,'%d/%m/%Y') as profileCreatedAt,
          p.updatedAt AS profileUpdatedAt,
          p.token as profileToken,
          p.photosprovided as photosprovided,
          ROUND(AVG(r.score), 1) as profileScore,
          COUNT(r.id) as totalReviews
        FROM Profile p
          LEFT JOIN Reviews r ON r.profileusername = p.username
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
                username: res.username,
                token: res.profileToken,
                photosprovided: res.photosprovided,
                name: res.name,
                profile_pic: res.profilepic,
                specialities: res.specialities,
                category : res.profileData,
                profileCategory: res.category,
                availability: res.availability,
                employment: res.employment,
                education: res.education,
                city: res.city,
                createdAt: res.profileCreatedAt,
                updatedAt: res.profileUpdatedAt,
                profileScore: res.profileScore,
                profileReviews: res.totalReviews
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
      getallPhotosForProfile: function(token, callback) {

      conn.query(`
        SELECT 
          p.id as id,
          p.photourl as url
        FROM Photos p
          WHERE token = ?`, [token],
        function(err, results) {
          if (err) {
            callback(err);
          }
          else {
            var mappedResults = results.map(function(res) {
              return {
                url: res.url,
                id: res.id
                };
            })
            callback(null, mappedResults);
          }
        }
      );
    },
    getReviewsForProfile: function(options, profileusername, callback) {
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
          r.text AS text, 
          r.score AS score,
          DATE_FORMAT(r.createdAt,'%d/%m/%Y') AS reviewCreatedAt, 
          r.reviewertoken as reviewertoken,
          r.reviewerusername as reviewerusername,
          r.profileusername as profileusername
        FROM Reviews r
          WHERE profileusername = ?
        ORDER BY reviewCreatedAt DESC LIMIT ? OFFSET ?`, [profileusername, limit, offset],
        function(err, results) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            var mappedResults = results.map(function(res) {
              console.log(res);
              return {
                reviewId: res.id,
                reviewText: res.text,
                reviewScore: res.score,
                reviewCreatedAt: res.reviewCreatedAt,
                profileusername : res.profileusername,
                reviewertoken: res.reviewertoken,
                reviewerusername: res.reviewerusername
              };
            })
            callback(null, mappedResults);
          }
        }
      );
    }
  }
}



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



