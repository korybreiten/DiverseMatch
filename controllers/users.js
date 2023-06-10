const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  join,
  login,
  getUsername
};

async function join(req, res) {
    try {
      const user = await User.create({username: req.body.username, password: req.body.password, email: req.body.email, avatar: req.body.avatar});
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.status(201).json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  }

async function login(req, res) {
  try {
    const user = await User.findOne({username: req.body.username});
    
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.status(201).json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


async function getUsername(req, res){
  try {
    const user = await User.findOne({username: req.params.username})
    res.status(200).json( user )
  } catch(err){
    return res.status(401).json(err)
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
