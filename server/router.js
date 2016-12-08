import passport from 'passport';
import { signin, signup } from './controllers/authentication';
import passportService from './services/passport';

// Session: false will turn cookies off since we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, signin);
  app.post('/signup', signup);
}
