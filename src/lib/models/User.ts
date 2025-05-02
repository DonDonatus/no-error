// 1. MongoDB User Schema (src/lib/models/User.ts)
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Measurement interface
export interface IMeasurement {
  chest: string;
  neck: string;
  trouserLength: string;
  shoulderWidth: string;
  trouserWaist: string;
  armLength: string;
  hipCircumference: string;
  sleeveLength: string;
}

// Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  measurements?: IMeasurement;
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    measurements: {
      chest: String,
      neck: String,
      trouserLength: String,
      shoulderWidth: String,
      trouserWaist: String,
      armLength: String,
      hipCircumference: String,
      sleeveLength: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
);

// Create and export the User model
const UserModel: Model<IUser> = 
  mongoose.models.User as Model<IUser> || mongoose.model<IUser>('User', userSchema);

export default UserModel;