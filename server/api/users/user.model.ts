import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export interface IUserModel extends IUser, mongoose.Document {
  createJWT(): string;
  hashPassword(password: string, cb: (err: any, result: any) => any);
  comparePassword(password: string, cb: (err: any, isMatch: boolean) => any);
}

let userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  salt: String,
  firstName: String,
  lastName: String,
  streetAddress: String,
  state: String,
  zipCode: Number,
  phoneNumber: Number,
  secPhoneNumber: Number,
  companyName: String,
  isAdmin: Boolean,
  containers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

userSchema.method('hashPassword', function(password: string, done: Function) {
  this.salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
    if (err) return done(err);
    this.password = hash.toString('hex');
    done();
  });
});
userSchema.method('comparePassword', function(password: string, done: Function) {
  crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
    if (err) return done(err);
    done(null, hash.toString('hex') === this.password);
  });
});

// TODO: store jwt secret in process.env
// TODO: change the secret before publishing website to live
userSchema.method('createJWT', function() {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    isAdmin: this.isAdmin
  }, process.env.JWT_SECRET);
});

export let User = mongoose.model<IUserModel>('User', userSchema);
