import mongoose, { Model, Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)
