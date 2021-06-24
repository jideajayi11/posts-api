import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// userSchema.statics.findByLogin = async (login) => {
//   let user = await this.findOne({
//     username: login,
//   });
 
//   if (!user) {
//     user = await this.findOne({ email: login });
//   }
 
//   return user;
// };

userSchema.pre('remove', (next) => {
  this.model('Post').deleteMany({ user: this._id }, next);
});
 
const User = mongoose.model('User', userSchema);
 
export default User;
