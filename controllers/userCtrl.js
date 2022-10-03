const userTable = require('../models/user');
const hashDetailTable = require('../models/hashDetail');
const bookShowTable = require('../models/bookShow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const sendEmailGrid = require('./mailSendGrid');

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await userTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      // console.log(name.split(' ')[0]);
      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendEmailGrid(
        name.split(' ')[0],
        email,
        url,
        'Verify your email address',
        'actvation'
      );

      res.json({
        success: true,
        msg: 'Register Success! Please activate your email to start.',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;
      const userexist = await userTable.findOne({ email });
      if (userexist)
        return res.json({ success: false, msg: 'This email already exists.' });

      const newUser = new userTable({
        name,
        email,
        password,
      });

      await newUser.save();

      res.json({
        success: true,
        msg: 'Account has been activated!',
        newUser,
      });
    } catch (err) {
      return res.json({ success: false, msg: 'Invalid Authentication.' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userTable.findOne({ email });
      if (!user)
        return res.json({ success: false, msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({ success: false, msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        success: true,
        access_token,
        isEmployer: user.isEmployer,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await userTable.findById(req.user.id).select('-password');

      res.json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  bookSeatForMovie: async (req, res) => {
    try {
      const { cinemaHall, timeSlot, seatNo, hashId, bookDate, movieId } =
        req.body;
      const booked = new bookShowTable({
        userId: req.user.id,
        hashId,
        cinemaHall,
        timeSlot,
        seatNo,
        bookDate,
        movieId,
      });
      const hashfind = await hashDetailTable.findOne({
        hashId: hashId,
      });

      if (hashfind) {
        const newdata = await hashDetailTable.findOneAndUpdate(
          { hashId: hashId },
          {
            seatBooked: [...hashfind.seatBooked, ...seatNo],
            bookedUserDet: [...hashfind.bookedUserDet, req.user.id],
          },
          { new: true }
        );
      } else {
        const hashinfo = new hashDetailTable({
          hashId,
          cinemaHall,
          timeSlot,
          bookedUserDet: [req.user.id],
          seatBooked: [...seatNo],
          movieId,
        });
        await hashinfo.save();
      }

      await booked.save();
      res.json({ success: true, info: booked });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBookedList: async (req, res) => {
    try {
      const { hashId } = req.body;
      const newdata = await hashDetailTable.findOne({ hashId });

      res.json({ success: true, list: newdata });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getUserBookedListbyhashId: async (req, res) => {
    try {
      const { hashId } = req.body;
      // console.log(hashId);
      const newdata = await bookShowTable.findOne({
        hashId,
        userId: req.user.id,
      });

      res.json({ success: true, list: newdata });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getMyBooked: async (req, res) => {
    try {
      const newdata = await bookShowTable
        .find({ userId: req.user.id })
        .sort({ date: -1 });

      res.json({ success: true, list: newdata });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const removeTmp = (pat) => {
  fs.unlink(pat, (err) => {
    if (err) throw err;
  });
};

module.exports = userCtrl;
