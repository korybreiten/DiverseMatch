const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const SALT_ROUNDS = 6;

const contactListSchema = new mongoose.Schema([
  {
    type: Object,
    service: String,
    contactInfo: String
  }
], {
  timestamps: true
});

const matchRequestsSchema = new mongoose.Schema([
  {
    type: Object,
  }
], {
  timestamps: true
});

const matchListSchema = new mongoose.Schema([
  {
    type: Object
  }
], {
  timestamps: true
});

const interestsSchema = new mongoose.Schema([
  {
    type: Object,
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}
  }
], {
  timestamps: true
});

const dislikesSchema = new mongoose.Schema([
  {
    type: Object,
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}
  }
], {
  timestamps: true
});

const photoAlbumSchema = new mongoose.Schema([
  {
    type: Object
  }
], {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, unique: false},
  password: String,
  contactList: [contactListSchema],  // ways to talk to matches, kept private
  matchRequests: [matchRequestsSchema], // user likes another user
  matchList: [matchListSchema], // list of users with two way match
  matchScore: Number, // the score to show match strength
  matchIntNum: Number, // how many interests match
  matchDisNum: Number, // how many dislikes match
  mismatchNum: Number, // how many mismatches of interests/dislikes
  ageRange: Number,  // 1 = (18-24), 2 = (25-30), etc.
  seekRange: Number, // same as above
  interests: [interestsSchema],
  dislikes: [dislikesSchema],
  avatar: String,
  photoAlbum: [photoAlbumSchema]
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});
/// in controller

// this is if you populate the user
userSchema.set('toObject', {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  }
});


// DO NOT DEFINE instance methods with arrow functions, 
// they prevent the binding of this
userSchema.pre('save', function(next) {
  // 'this' will be set to the current document
  const user = this;
  // check to see if the user has been modified, if not proceed 
  // in the middleware chain
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
    console.log(cb, ' this is cb')
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);