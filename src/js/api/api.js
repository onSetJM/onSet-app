var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '',
  database: 'onset'
});


module.exports = function RedditAPI(conn) {
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
            'INSERT INTO Profile (userId, profile_type, profile_data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', 
            [profile.userId, profile.type, profile.data, new Date(), new Date()],
            function(err, result) {
              if (err) {
                callback(err);
              }
              else {
                conn.query(
                  'SELECT id, userId, profile_type, profile_data, createdAt, updatedAt FROM Profile WHERE id = ?', [result.insertId],
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
          u.username AS username, 
          u.nickname AS nickname, 
          u.profilePic AS profilePic,
          u.typeOfLogin as typeOfLogin,
          u.email as email,
          u.city AS city, 
          u.createdAt AS userCreatedAt, 
          p.id AS id,
          p.profile_type as profileType,
          p.profile_data as profileData,
          p.createdAt AS profileCreatedAt,
          p.updatedAt AS profileUpdatedAt,
          AVG(r.score) as profileScore,
          COUNT(r.id) as totalReviews
        FROM profile p
          LEFT JOIN user u ON p.userId=u.id
          LEFT JOIN reviews r ON r.profileId = p.id
          GROUP by p.id
          WHERE u.city = ? AND p.profileData.category = ?
        ORDER BY ${sortingMethod} DESC LIMIT ? OFFSET ?`, [city, category, limit, offset],
        function(err, results) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            // console.log(results);
            var mappedResults = results.map(function(res) {
              return {
                id: res.id,
                nickname: res.nickname,
                profilePic: res.profilePic,
                profileType: res.profileType,
                profileData : res.profileData,
                createdAt: res.profilecreatedAt,
                updatedAt: res.profileUpdatedAt,
                profileScore: res.profileScore,
                profileReviews: res.totalReviews,
                user: {
                  id: res.userId,
                  email: res.email,
                  username: res.username,
                  typeOfLogin: res.typeOfLogin
                }
              }
            })
            callback(null, mappedResults);
          }
        }
      );
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
          r.profileID as profileId,
          u.nickname as profileNickname,
          AVG(r.score) as profileScore,
          COUNT(r.id) as totalReviews
        FROM Reviews r
          LEFT JOIN User u ON userId=u.id
          LEFT JOIN Profile p ON p.id=profileId
          WHERE profileId = ?
          GROUP by p.id
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
                profileID : res.profileID,
                profileNickname: res.profileNickname,
                profileScore: res.profileScore,
                profileTotalReviews: res.totalReviews,
                user: {
                  username: res.username,
                  id: res.userID
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

var onSetAPI = OnsetAPI(connection);
module.exports = onSetAPI;

// onSetAPI.createUser({
//     username: "MartiMax21",
//     email: "maxime.martin123@gmail.com",
//     nickname: "Maxime Martin",
//     profilepic: "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-1/p160x160/10646684_10154550151650471_4084064332679043178_n.jpg?oh=ea71897c8f73618cd9fcd65d1d1fc533&oe=5813B257",
//     city: "Montreal",
//     typeOfLogin: "Instagram"
//     }, function(err, user) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

// onSetAPI.createProfile({
//     userId: 2,
//     type: "artist",
//     data: "{category: Make-up Artist}"
//     }, function(err, profile) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         console.log(profile);
//     }
// });

// onSetAPI.createReview({
//     text: "Maxime is NOT the best make-up artist",
//     score: 1.5,
//     userId: 2,
//     profileId: 1
//     }, function(err, review) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         console.log(review);
//     }
// });

onSetAPI.getReviewsForProfile({}, 1, function(err, reviews) {
    if (err) {
      console.log(err);
    }
    else{
      console.log(reviews);
    }
  });

