var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require("../config")

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: Array,
    default: [],
    unique: true
  },
  created_At: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.statics.authenticate = (email, password, callback) => {
  Users.findOne({ email: email }).lean().exec((err, user) => {
    if (err) return callback(err)
    if (!user) return callback(null, null);
    bcrypt.compare(password, user.password, (err, result) => {
      if(err) return callback(err, null);
      if (result === true) return callback(null, user);
      return callback(null, null);
    })
  });
}

UserSchema.statics.changepwd = (userId, pwd, callback) => {
  Users.findById(userId).exec((error, ActualUser) => {
    if (err) return callback(error)

    if (ActualUser === null) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    } else {
      bcrypt.hash(pwd, 10, function (err, hash) {
        if (err) {
          return next(err);
        }
        ActualUser.password = hash;
        ActualUser.save().then((nModel) => {
          callback(null, nModel);
        }).catch((err) => callback(err))
      })
    }
  });
}

UserSchema.statics.getToken = (userId, callback) => {
  Users.findById(userId).lean().select("-password").exec((error, ActualUser) => {
    if (err) return callback(error)
    if (ActualUser === null) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    } else {
      try {
        return callback(null, jwt.sign({ ActualUser }, config.secret));
      } catch (err) {
        return callback(err)
      }
    }
  });
}

UserSchema.statics.decodeToken = (userToken, callback) => {
  try {
    jwt.verify(userToken, config.secret, (err, decoded) => {
      if (err) throw err;
      callback(null, decoded)
    });
  } catch (error) {
    callback(error)
  }
}

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  } else {
    next();
  }
});

var Users = mongoose.model('Users', UserSchema);

module.exports = Users;