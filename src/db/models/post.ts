import mongoose, { Schema, Document, Model } from 'mongoose'

// Define an interface representing a document in MongoDB
export interface IPost extends Document {
  title: string
  author?: string
  contents?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// Define the schema
const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    author: { type: String },
    contents: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true },
)

export const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema)
