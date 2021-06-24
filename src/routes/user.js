import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { getToken } from '../helper/jwt'
 
const router = Router();
 
router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});
 
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

router.post('/register', async (req, res) => {
  if(req.context.userObj) {
    return res.status(409).send({ messsage: 'Email Exists' });
  }

  const hash = hashSync(req.body.password, Number(process.env.SALT_ROUND));
  const user = await req.context.models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  const { email, name } = user;
  const token = getToken({ email, name });

  return res.status(201).send({ token, messsage: 'success' });
});

router.post('/login', async (req, res) => {
  const user = req.context.userObj;

  if(user && compareSync(req.body.password, user.password)) {
    const { email, name } = user;
    const token = getToken({ email, name });

    return res.status(200).send({ token, messsage: 'success' });
  } else {
    return res.status(401).send({ messsage: 'auth failed' });
  }
});

export default router;
