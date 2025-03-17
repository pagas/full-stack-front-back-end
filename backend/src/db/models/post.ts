import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { IUser } from './user.js'

// Define an interface representing a document in MongoDB
export interface IPost extends Document {
  _id: Types.ObjectId
  title: string
  author: Types.ObjectId | IUser
  contents?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// Define the schema
const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contents: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true },
)

export const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema)
