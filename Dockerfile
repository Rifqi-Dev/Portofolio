FROM node.18.15 as build
WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html