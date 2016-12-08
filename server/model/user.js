import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define our model.
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
});
// On Save Hook, encrypt password.
// Before saving a model, run this function.
userSchema.pre('save', function(next) {
  // Get access to the user model.
  const user = this;
  // Generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }
    // hash (encrypt) our password using the salt.
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }
      // Overwrite plain text password
      // with encrypted password.
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const User = mongoose.model('users', userSchema);


// Export the model
export default User;
