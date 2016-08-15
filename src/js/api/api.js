
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'JM_MM', 
  password : '',
  database: 'onset'
});

module.exports = function OnsetAPI(conn) {
  return {
    createUser: function(user, callback) {
        
    },
    createProfile: function(profile, callback) {

    },
    createReview: function(review, callback) {
      if (!review.userId || !review.profileId) {
        callback(null, new Error('userId and postId required'));
        return;
      }
      conn.query(
        'INSERT INTO reviews (text, score, userId, postId, parentId, createdAt) VALUES (?, ?, ?, ?, ?, ?)', [review.text, review.score, review.userId, review.postId, review.parentId, new Date()],
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
    }
  }
}