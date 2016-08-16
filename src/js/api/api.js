
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '',
  database: 'onset'
});

function OnsetAPI(conn) {
  return {
    createUser: function(user, callback) {
          conn.query(
            'INSERT INTO User (username, email, nickname, profilepic, city, typeOfLogin, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [user.username, user.email, user.nickname, user.profilepic, user.city, user.typeOfLogin, new Date()],
            function(err, result) {
              if (err) {
                callback(err);
              }
              else {
                conn.query(
                  'SELECT id, username, email, nickname, profilepic, city, typeOfLogin, createdAt FROM User WHERE id = ?', [result.insertId],
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
            'INSERT INTO User (userId, profile_type, profile_data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', 
            [profile.userId, profile.type, profile.data, new Date(), new Date()],
            function(err, result) {
              if (err) {
                callback(err);
              }
              else {
                conn.query(
                  'SELECT id, username, email, nickname, profilepic, city, typeOfLogin, createdAt FROM User WHERE id = ?', [result.insertId],
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
        'INSERT INTO Reviews (text, score, userId, postId, parentId, createdAt) VALUES (?, ?, ?, ?, ?, ?)', [review.text, review.score, review.userId, review.postId, review.parentId, new Date()],
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
              'SELECT text, userId, postId, parentId, createdAt FROM comments WHERE id = ?', [result.insertId],
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
          r.score AS score
          r.createdAt AS reviewCreatedAt, 
          r.userId as userId,
          u.username as username,
          p.profileID as profileId,
          p.nickname as profileNickname,
          AVG(r.score) as profileScore,
          COUNT(r.id) as totalReviews
        FROM reviews
          LEFT JOIN user u ON r.userId=u.id
          LEFT JOIN profile p ON p.id=r.profileId
          GROUP by p.id
          WHERE r.profileId = ?
        ORDER BY reviewCreatedAt DESC LIMIT ? OFFSET ?`, [profileId, limit, offset],
        function(err, results) {
          if (err) {
            console.log(err);
            callback(err);
          }
          else {
            // console.log(results);
            var mappedResults = results.map(function(res) {
              return {
                reviewId: res.id,
                reviewText: res.reviewText,
                reviewScore: res.reviewScore,
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