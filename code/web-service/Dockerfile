FROM node:16 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-prod

FROM nginx:latest

COPY --from=builder app/dist/web /usr/share/nginx/html

EXPOSE 80