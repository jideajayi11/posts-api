import { verifyToken } from './jwt'

const findUserByEmail = async (req, res, next) => {
  if(req.body?.email) {
    const user = await req.context.models.User.find({
      email: req.body.email,
    });

    if(user[0]) {
      req.context.userObj = user[0];
    }
  }
  next();
};

const authorizeToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(/\s+/)[1];
  const result = verifyToken(token);

  if(result.error) {
    return res.status(401).send({ messsage: 'auth failed' });
  }

  const user = await req.context.models.User.find({
    email: result.email,
  });

  if(user[0]) {
    req.context.userObj = user[0];
  }

  next();
};

const findAuthUserPostById = async (req, res, next) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  );

  if(post === null || (JSON.stringify(post.user) !== JSON.stringify(req.context.userObj._id))) {
    return res.status(404).send({ message: 'post not found' })
  }

  req.context.currentPost = post;
  next();
};

export { findUserByEmail, authorizeToken, findAuthUserPostById };
