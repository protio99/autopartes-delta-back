const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validatorHandler');
const AuthService = require('./../services/authService')
const {
  recoveryPasswordSchema,
  resetPasswordSchema,
  // verifyTokenSchema
  
} = require('../schema/authSchema');

const router = express.Router();

const service = new AuthService()
router.post('/login',
passport.authenticate('local',{session: false}),
  async (req, res, next) => {
  
    try {
      const user = req.user
      res.json(service.signToken(user))
      
    } catch (error) {
        next(error);
    }
  }
);

router.post('/recovery',
validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
  
    try {
      const {email} = req.body;
      const rta = await service.sendRecovery(email)
      res.json(rta)   
    } catch (error) {
        next(error);
    }
  }
);
router.post(
  '/get-user',
  
  async (req, res, next) => {
    try {
      const {token} = req.body;
      const user = await service.getUserInfo(token);
      res.status(201).json(user);
      
    } catch (error) {
        next(error);
    }
  }
);

router.post('/change-password',
validatorHandler(resetPasswordSchema, 'body'),
  async (req, res, next) => {
  
    try {
      const {token, newPassword} = req.body;
      const rta = await service.changePassword(token, newPassword)
      res.json(rta)   
    } catch (error) {
        next(error);
    }
  }
);

router.post('/change-password-user-loged',
// validatorHandler(resetPasswordSchema, 'body'),
passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
  
    try {
      const idUser = req.user.sub
      const {currentPassword,newPassword,} = req.body;
      const rta = await service.changePasswordUserLoged(idUser, currentPassword, newPassword)
      res.json(rta)   
    } catch (error) {
        next(error);
    }
  }
);



module.exports = router;
