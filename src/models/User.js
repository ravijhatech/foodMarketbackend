import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  image:String,
  public_id: String,
  otp:String,
  otpExpiry:String,
  resetToken: String,
  resetTokenExpiry: Date,
},{Timestamp:true});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
 
});

const UserInfo = mongoose.model('User', UserSchema);
export default UserInfo;