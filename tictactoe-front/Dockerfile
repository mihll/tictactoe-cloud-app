FROM node:18.12.1 as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/tictactoe-front /usr/share/nginx/html