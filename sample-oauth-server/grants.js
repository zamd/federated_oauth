const oauth2orize = require('oauth2orize'),
	debug = require('debug')('sample-server'),
	ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const server = oauth2orize.createServer();

//register wmrm extensions... 
server.grant(require('oauth2orize-response-mode').extensions());
server.grant(require('oauth2orize-wmrm').extensions());

server.grant(oauth2orize.grant.token({
	modes: {
    web_message: require('oauth2orize-wmrm')
  }},
	function(client, user, ares, done) {
		const token = user.accessToken;
		debug(`issuing token to "${client.id}"`);
		done(null,token);
}));

server.serializeClient(function(client, done){
	//TODO: implementation serialization...
	debug(`serializing client "${client.id}"...`);
	done(null, client.id);
});

server.deserializeClient(function(id, done) {
	debug(`deserializing client "${id}"...`);
	done(null, {id: id});
});

module.exports.authorizationGrantDirect = [
	ensureLoggedIn(),
	//passport.authenticate('auth0',{session:true}), //RO authentication...
	server.authorization(function(clientID, redirectURI,done)
	{
		var client = {
			id: clientID,
			redirectURI: redirectURI
		};
		//TODO: Treating redirectUri as webOrigin for now
		const webOrigin = redirectURI; 
		//TODO: validation... 
		done(null, client, redirectURI, webOrigin);
	}),
	function(req,res,next){
		//Simulate authorization dailaog approval: 
		req.query["transaction_id"] = req.oauth2.transactionID;

		next();
	},
	function(req,res,next){
		debug(`waiting for RO consent...`);
		//Simulate consent delay at AS
		setTimeout(next, 1);
	},
	server.decision(function(req, done){
		debug(`processing RO consent approval...`);
		//Extract any extra params from req *here* to save in authorization transaction... 
		var params = req.oauth2.req;
		done(null,params);
	})
];
