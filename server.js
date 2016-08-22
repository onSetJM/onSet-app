var express = require('express');
var app = express();
var mysql = require('mysql');
var jwt = require('express-jwt');
var bodyParser = require("body-parser");
var request = require("request");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

function insertPhotos(arr, index, token) {
  if (index >= 0) {
    onSetAPI.createPhoto(arr[index].images.standard_resolution.url, token, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      else {
        insertPhotos(arr, index - 1, token);
      }
    });
  }
  return;
}

var authenticate = jwt({
  secret: new Buffer('OXT7scbPPikaP_mjFyutSPR2RcGr1GZ8Ew-6F_x4RLLLRwQCbFIX9Ou58CLtas9H', 'base64'),
  audience: 'pQZynj9aeB6FgPoKihk7HluGGlLYwqWR'
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onset'
});

var onSetAPI = require('./src/js/api/api')(connection);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ type: 'application/*+json' }));


// onSetAPI.getEmail("instagram|1526590778", function(err, email) {
//   if(err) {
//     console.log(err);
//   }
//   else{
//     console.log(email[0].email, "res!");
//   }
// });

app.post("/email", function(req, res) {
  
  onSetAPI.getEmail(req.body.profileUsername, function(err, email) {
      if (err) {
        res.status(400).send("Whoopsy! Something went wrong!");
      } 
      else {
        console.log(email[0].email);
        console.log("REQ", req.body);
       var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
          user: 'onsetwebsite@gmail.com',
          pass: 'onset123'
        }
      }));
      var mailOptions = {
        from: `${req.body.Name} <${req.body.Email}>`,
        to: email[0].email,
        subject: 'You have been contacted through onSet!',
        text: `You have been contacted by someone through onSet`,
        html: `
              <p>
                <p>You just got an email from ${req.body.Name} through onSet! Here are the details: </p>
                <ul>
                  <li>Contact Date: ${req.body.ContactDate}</li> 
                  <li>Name: ${req.body.Name}</li>
                  <li>City: ${req.body.ContacterCity}</li>
                  <li>Email: ${req.body.Email}</li>
                  <li>Phone Number: ${req.body.PhoneNumber}</li>
                  <li>Message: ${req.body.Message}</li>
                </ul>
              </p>`
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log("ERRORRRRRRRR", err);
        }
        else {
          console.log(`Message Sent: ${info.response}`);
        }
      });
    }
  }); 
});

app.post("/contactus", function(req, res) {
     var transporter = nodemailer.createTransport(smtpTransport({
      service: 'Gmail',
      auth: {
        user: 'onsetwebsite@gmail.com',
        pass: 'onset123'
      }
    }));
    var mailOptions = {
      from: `${req.body.Name} <${req.body.Email}>`,
      to: "onsetwebsite@gmail.com",
      subject: 'You have been contacted through onSet!',
      text: `You have been contacted by someone through onSet`,
      html: `
            <p>
              <p>You just got an email from ${req.body.Name} through onSet! Here are the details: </p>
              <ul>
                <li>Name: ${req.body.Name}</li>
                <li>Email: ${req.body.Email}</li>
                <li>Message: ${req.body.Message}</li>
              </ul>
            </p>`
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log("ERRORRRRRRRR", err);
      }
      else {
        console.log(`Message Sent: ${info.response}`);
      }
    });
});

// {ContactDate: this.refs.date.value, 
//               Name: this.refs.name.value,
//               ContacterCity: this.refs.city.value,
//               Email: this.refs.email.value,
//               PhoneNumber: this.refs.phonenumber.value,
//               Message: this.refs.msg.value
//             };
app.use(bodyParser.json({
  type: 'application/*+json'
}));
/* insert any app.get or app.post you need here */

app.post("/profile/photos", function(req, res) {
  // console.log(req.body.token);
  onSetAPI.getInstagramPhotos(req.body.token, function(err, photos) {
    if (err) {
      res.status(400).send("Whoopsy! Something went wrong!");
      console.log(err);
    }
    else {
      console.log(photos, "THIS IS THE PHOTOS ARRAY");
      insertPhotos(photos, photos.length - 1, req.body.token);
      res.send({
        success: true,
        photos: photos
      });
    }
  });
});

app.get('/getInstagramProfile', authenticate, function(req, res) {
  onSetAPI.getInstagramProfile(req.user.sub, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
    res.send(user);
    }
  })
});
app.get('/getInstagramProfileForReviews', function(req, res) {
  console.log(req.body);
  onSetAPI.getInstagramProfile(req.body.token, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
      res.send(user);
    }
  })
});

app.post('/createprofile', function(req, res) {
  // res.send(req.user);
  // console.log(req.user);
  onSetAPI.createProfile({
    specialities: req.body.specialities,
    city: req.body.city,
    category: req.body.category,
    token: req.body.token,
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    instagramauthorized: req.body.instagramauthorized,
    availability: req.body.availability,
    profile_pic: req.body.profile_pic,
    employment: req.body.employment,
    education: req.body.education
  }, function(err, profile) {
    if (err) {
      console.log(err);
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
      res.send({
        success: true,
        profile: profile
      });
    }
  });
});

app.post('/createareview', function(req, res) {
  onSetAPI.createReview({
    text: req.body.text,
    score: req.body.score,
    reviewertoken: req.body.reviewertoken,
    reviewerusername: req.body.reviewerusername,
    profileusername: req.body.profileusername
  }, function(err, review) {
    if (err) {
      res.status(400).send("Whoopsy! Something went wrong!");
      console.log(err);
    }
    else {
      console.log(review);
      res.send({
        success: true,
        review: review
      });
    }
  });
});

app.post('/searchprofiles', function(req, res) {
  onSetAPI.getAllProfiles({}, req.body.category, req.body.city, req.body.sortingMethod, function(err, profiles) {
    if (err) {
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
      res.send({
        success: true,
        profiles: profiles
      });
    }
  });
});

app.post('/profile', function(req, res) {
  console.log(req.body.username);
  onSetAPI.getSingleProfile(req.body.username, function(err, profile) {
    if (err) {
      console.log(err);
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
      console.log(profile[0]);
      res.send({
        success: true,
        profile: profile[0]
      });
    }
  });
});
app.post('/profilephotos', function(req, res) {
  console.log(req.body.token);
  onSetAPI.getallPhotosForProfile(req.body.token, function(err, photos) {
    if (err) {
      console.log(err);
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
      //console.log(profile[0]);
      res.send({
        success: true,
        photos: photos
      });
    }
  });
});

app.post('/myprofile', function(req, res){
    console.log(req.body.username);
    onSetAPI.getMyProfile(req.body.token
    , function(err, username) {
      if(err){
        console.log(err);
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        console.log(username[0]);
        res.send({success:true, username: username[0].username});
      }
    }
  );
});

app.post('/reviews', function(req, res){
    onSetAPI.getReviewsForProfile({},req.body.profileusername
    , function(err, reviews) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        console.log(reviews);
        res.send({success:true, reviews: reviews});
    }
  });
});

app.post('/searchresults', function(req, res) {
  console.log(req.body);
  onSetAPI.getAllProfiles({}, req.body.category, req.body.city, req.body.sortingMethod, function(err, profiles) {
    if (err) {
      console.log(err);
      res.status(400).send("Whoopsy! Something went wrong!");
    }
    else {
      console.log(profiles);
      res.send({
        success: true,
        profiles: profiles
      });
    }
  });

});

/*
This says: for any path NOT served by the middleware above, send the file called index.html instead.
For example, if the client requests http://server/step-2 the server will send the file index.html, which will start the same React app.
This will enable us to do url-based routing on the front-end.
*/

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});



app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});

// app.get('/login',
//   jwt({secret: }),
//   function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   });