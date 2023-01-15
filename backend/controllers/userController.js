const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/pool');

const emailValidator = require('email-validator');

// SIGNUP
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        };
        console.log(user);

        pool.query(`SELECT * FROM "users" WHERE email = $1`, [req.body.email],
            (error, userFound) => {
                if (error) {
                    console.log(error)
                    return res.status(401).json({
                        error: error
                    });
                }
                if (userFound.rowCount != 0) {
                    console.log('Email already registered');
                    return res.status(401).json('Already registered');
                } else {
                    pool.query(`INSERT INTO "users"(firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
                        [user.firstName, user.lastName, user.email, user.password],
                        (error) => {
                            if (error) {
                                console.log(error)
                                throw error
                            }
                            console.log('User has been registered')
                            return res.status(201).json('User registered successfully!')
                        })
                }
            });
    }
    )
};

// LOGIN
exports.login = (req, res, next) => {
    pool.query(`SELECT * FROM "users" WHERE email = $1`,
        [req.body.email],
        (error, user) => {
            if (error) {
                console.log(error)
                return res.status(401).json({
                    error: error,
                });
            }
            if (user.rowCount == 0) {
                return res.status(401).json('User is not valid');
            }
            if (user.rowCount != 0) {
                bcrypt.compare(req.body.password, user.rows[0].password).then(
                    (valid) => {
                        if (!valid) {
                            return res.status(401).json('Incorrect password!');
                        }
                        const token = jwt.sign(
                            { userId: user.rows[0].userid },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' });
                        res.status(200).json({
                            userId: user.rows[0].userid,
                            token: token
                        });
                    }
                )
            }
        }
    )
};


// GET ONE USER
exports.getOneUser = (req, res, next) => {
    const id = req.params.id;

    pool.query(`SELECT * FROM "users" WHERE userid = $1`,
        [id],
        (error, users) => {
            if (error) {
                res.status(401).json({
                    error: error,
                });
            }
            console.log(users.rows)

            pool.query(`SELECT * FROM "posts" WHERE userid = $1 ORDER BY creationDate DESC`,
                [id],
                (error, posts) => {
                    if (error) {
                        res.status(401).json({
                            error: error
                        })
                    }
                    console.log(posts.rows)
                })
        })
}


// DELETE USER
exports.deleteUser = (req, res, next) => {
    const id = req.params.id;

    pool.query(`SELECT * FROM "posts" WHERE userid = $1`,
        [id],
        (error) => {
            if (error) {
                throw error
            }
            pool.query(`DELETE FROM "users" WHERE userid = $1`,
                [id],
                (error) => {
                    if (error) {
                        throw error
                    }
                    console.log('User deleted successfully')
                    res.status(201).json('User deleted sucessfully')
                })
        })

}