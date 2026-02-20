import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { handelLogin } from 'services/client/auth.service';

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(function verify(username, password, callback) {
      return handelLogin(username, password, callback);
    }),
  );
};
export default configPassportLocal;
