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
// NOTE: MUST USE FUNCTION FOR BINDING OF THIS!!!
userSchema.pre('save', function(next) {
  // Get access to the user model.
  const user = this;
  // Generate a salt, then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if(err) next(err);
    // hash (encrypt) our password using the salt.
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) next(err);
      // Overwrite plain text password
      // with encrypted password.
      user.password = hash;
      next();
    });
  });
});

// NOTE: MUST USE FUNCTION FOR BINDING OF THIS!!!
userSchema.methods.comparePassword = function(canidatePassword, callback) {
  bcrypt.compare(canidatePassword, this.password, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
}

// Create the model class
const User = mongoose.model('users', userSchema);


// Export the model
export default User;
