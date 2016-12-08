import User from '../model/user';


const Authentication = {
  signup: function(req, res, next) {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(422).send({ error: 'You must provide email & password'});
    }
    // See if a user with a given email exists.
    User.findOne({ email }, function(err, existingUser) {
      if(err) { return next(err); }
      // If a user with email does exist, return error.
      if(existingUser) { return res.status(422).send({ error: 'Email is in use.'}); }

      const user = new User({ email, password });

      user.save()
          .then(user => {
            res.json({ success: true });
          })
          .catch(err => {
            next(err);
          });

      // user.save(function(err) {
      //   if(err) { return next(err); }
      //   // Respond to request indicating the user was created.
      //   res.json({ success: true });
      // });
    });

    // If a user with email does not exist, create and save user record.

    // Respond to request indicating the user was created.

  },
}

export default Authentication;
