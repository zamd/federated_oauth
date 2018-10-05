# federated_oauth
Basic Oauth server to enable `OAuth implicit authorization` and `Silent login (checkSession)` on the Same Origin. This helps mitigate ITP2 issues and can also enables long lived sessions. The long-lived session is implemented by transalating `response_mode=web_message` to `grant_type=refresh_token`. 

```This model has inherent flaw where it sends access_tokens issued to a confidential backend to the browser, which can results in "trust breach" if the Resource server is making authorization decisions based on client_type.  ```

# Flow

![alt text](/img/long-lived-session.png "Sequence diagram")

# Running locally 


```bash
git clone git@github.com:zamd/federated_oauth.git

cd ./federated_oauth

npm run build
```

## Configure server

- Create .env file in `sample-oauth-server` folder, and specify CLIENT_SECRET="{secret}"
- Setup nginx reverse proxy to forward HTTPS traffic to localhost:3000
```bash
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    server {
    listen  443 ssl;
    server_name xauth.io;
    ssl_certificate /Users/zamd/letsecr/manage.servepics.com/fullchain.pem;
    ssl_certificate_key /Users/zamd/letsecr/manage.servepics.com/privkey.pem;

    location /{
        proxy_set_header X-Forwarded-Host $host:$server_port;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass  http://localhost:3000;
    }
  }
}
```

- Add mapping to you local domain `xauth.io: 127.0.0.1` in `/etc/hosts` file

## Start server

```bash
cd ./sample-oauth-server
npm start
```
## Start client in a second window

```bash
cd ./quickstart_app
npm start
```
