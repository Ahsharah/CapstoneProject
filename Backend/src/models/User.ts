import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
name: string;
email: string;
password: string;
createdAt: Date;
}

const UserSchema: Schema = new Schema({
name: {
type: String,
required: [true, 'Please add a name'],
},
email: {
type: String,
required: [true, 'Please add an email'],
unique: true,
match: [
/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
'Please add a valid email',
],
},
password: {
type: String,
required: [true, 'Please add a password'],
minlength: 6,
select: false,
},
createdAt: {
type: Date,
default: Date.now,
},
});

export default mongoose.model<IUser>('User', UserSchema);

