const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models')

const emailValidator = require('email-validator');
const user = require('../models/user');

// SIGNUP
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        //TODOCheck first to see is user with email already exsist
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        });
        console.log(user);
        user.save().then(
            () => {
                res.status(201).json({
                    message: 'User was added successfully!'

                })
            }).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
    });
}



// LOGIN
exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
                if (!valid) {
                    return res.status(401).json('Incorrect password!');
                }
                const token = jwt.sign(
                    { userId: user.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' });
                res.status(200).json({
                    userId: user.id,
                    token: token
                });
            }
        )
    })
};



// DELETE USER
exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.destroy({
        where: {
            id: id
        }
    }).then(() => {

        console.log('User deleted successfully')
        res.status(200).json('User deleted sucessfully')
    })


}