#Simple OAuth server facade implicit grant

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
