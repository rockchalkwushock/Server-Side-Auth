import jwt from 'jwt-simple';
import User from '../model/user';
import config from '../../config';

function tokenForUser(user) {
    // sub === subject
    // the subject of this token is this specific user.
    // iat === issued at time.
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export const signin = (req, res, next) => {
    // User has already had their email & password auth'd.
    // We just need to give them a token.
    res.send({ token: tokenForUser(req.user) });
}

export const signup = (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) res.status(422).send({error: 'You must provide email & password'});
    // See if a user with a given email exists.
    User.findOne({ email }, (err, existingUser) => {
        if (err) next(err);
        // If a user with email does exist, return error.
        if (existingUser) res.status(422).send({error: 'Email is in use.'});

        // Create new instance of User.
        const user = new User({email, password});

        // Save user to db.
        user.save()
            .then(user => {
            // Return JWT
              res.json({token: tokenForUser(user)});
            })
            // Return error message.
            .catch(err => res.status(422).json({ success: false, err }));
    });
}
