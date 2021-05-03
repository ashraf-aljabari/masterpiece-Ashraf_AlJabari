import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// user schema model.
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: 'noImage.png',
    },
    numberOfReports: {
      type: Number,
      default: 0,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// user model function for matching entered password
// with the encrypted password in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// user model function for checking if user password is
// modified after edit to change it in the db else
// keep it the same.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
