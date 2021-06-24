import mongoose from 'mongoose';
 
const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
 
const Post = mongoose.model('Post', postSchema);
 
export default Post;
