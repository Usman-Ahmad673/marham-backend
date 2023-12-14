    const mongoose = require('mongoose');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');


    const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    }
});

    userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    });

    // JWT Token
    userSchema.methods.getJWTToken = function () {
    const token = jwt.sign({
        id: this._id,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_KEY,
    });
    return token;
    };

    module.exports = mongoose.model('User', userSchema);
