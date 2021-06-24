import { Router } from 'express';
import { findAuthUserPostById } from '../helper/middleware';
 
const router = Router();
 
router.get('/', async (req, res) => {
  const posts = await req.context.models.Post.find({
    user: req.context.userObj._id,
  });

  if(!posts[0]) {
    return res.status(404).send({ message: 'no post found' })
  }

  return res.status(200).send(posts);
});
 
router.get('/:postId', findAuthUserPostById, async (req, res) => {
  return res.status(200).send(req.context.currentPost);
});
 
router.post('/', async (req, res) => {
  const post = await req.context.models.Post.create({
    text: req.body.text,
    user: req.context.userObj._id,
  });
 
  return res.status(201).send(post);
});

router.delete('/:postId', findAuthUserPostById, async (req, res) => {
  const post = req.context.currentPost;
  await post.remove();

  return res.status(204).send(post);
});

router.put('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findOneAndUpdate(
    { _id: req.params.postId, user: req.context.userObj._id },
    { text: req.body.text},
    { new: true }
  );

  return res.status(200).send(post);
});
 
export default router;
