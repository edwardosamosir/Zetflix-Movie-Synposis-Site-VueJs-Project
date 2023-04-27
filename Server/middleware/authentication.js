const { decodeToken } = require("../helpers/jwt-encode-decode");
const { User, Customer} = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "AccessTokenMissing" };
    }

    const payload = decodeToken(access_token);
    const userData = await User.findByPk(payload.id)

    if(!userData){
        throw { name: "InvalidToken" };
    }

    req.user = {
      id: userData.id,
      role: userData.role,
      email: userData.email
    }
    
    // console.log(req.user.email)
    // console.log(req.user.id)
    next()
  } catch (err) {
      next(err)
  }
};

const customerAuthentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "AccessTokenMissing" };
    }

    const payload = decodeToken(access_token);
    const userData = await Customer.findByPk(payload.id)

    if(!userData){
        throw { name: "InvalidToken" };
    }

    req.user = {
      id: userData.id,
      role: userData.role,
      email: userData.email
    }
    
    // console.log(req.user.email)
    // console.log(req.user.id)
    next()
  } catch (err) {
      next(err)
  }
};



module.exports = {authentication, customerAuthentication};
