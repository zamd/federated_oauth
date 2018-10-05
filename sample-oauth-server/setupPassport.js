const passport = require('passport'),
	Auth0Startegy = require('passport-auth0');


	const auth0 = new Auth0Startegy({
		domain: "zulfiqar.auth0.com",
		clientID: "KPIfeI5dfozGJDiNBkV1vsKYI1BNCv96",
		clientSecret:process.env.CLIENT_SECRET,
		callbackURL: "https://xauth.io/login/callback",
		scope: "openid email profile offline_access",
		passReqToCallback: true
	
	}, (req, accessToken, refreshToken, extraParams, profile, done)=>{
		const user = {profile, accessToken, refreshToken};

		done(null, user);
	});
	passport.use(auth0);
	
	module.exports = passport;



