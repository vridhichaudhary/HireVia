const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = require('./prisma');
const dotenv = require('dotenv');

dotenv.config();

// JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
    console.error("Please add JWT_SECRET to your Render Environment Variables.");
    process.exit(1); // Stop server immediately to avoid confusing stack traces
}

passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: jwt_payload.id },
            });
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    // Check if user with same email exists
                    user = await prisma.user.findUnique({
                        where: { email: profile.emails[0].value },
                    });

                    if (user) {
                        // Update existing user with googleId
                        user = await prisma.user.update({
                            where: { email: profile.emails[0].value },
                            data: { googleId: profile.id, avatar: profile.photos[0].value },
                        });
                    } else {
                        // Create new user
                        user = await prisma.user.create({
                            data: {
                                googleId: profile.id,
                                email: profile.emails[0].value,
                                name: profile.displayName,
                                avatar: profile.photos[0].value,
                                role: 'USER',
                            },
                        });
                    }
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Not using sessions since we use JWT
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
