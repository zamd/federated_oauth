# federated_oauth
Basic oauth server to enable auth and checkSession using Same Origin. Also can enable long-lived session 

# Flow

![alt text](/img/long-lived-session.png "Sequence diagram")

# Running locally 


```bash
git clone git@github.com:zamd/federated_oauth.git

cd ./federated_oauth

npm run build
```

## Start server

- Create .env file in `sample-oauth-server` folder, and specify CLIENT_SECRET="{secret}"

```bash
cd ./sample-oauth-server
npm start
```
# Start client in a second window

```bash
cd ./quickstart_app
npm start
```
