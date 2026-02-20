import { prisma } from 'config/client';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  comparePassword,
  handelGetUserById,
} from 'services/admin/user.service';

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
          session.messages = [];
        }
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          // throw new Error(`Username:${username} not found`);
          return callback(null, false, {
            message: `Username/password invalid`,
          });
        }

        //compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          // throw new Error('Invalid password');
          return callback(null, false, {
            message: `Username/password invalid`,
          });
        }
        return callback(null, user);
      },
    ),
  );
  passport.serializeUser(function (user: any, callback) {
    callback(null, { id: user.id, username: user.username });
  });

  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;
    //querry database
    const userInDB = await handelGetUserById(id);
    return callback(null, {
      ...userInDB,
    });
  });
};
export default configPassportLocal;
