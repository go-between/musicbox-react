FROM node:10

ENV APP_DIR=/app
WORKDIR $APP_DIR

ADD package.json $APP_DIR/package.json
ADD package-lock.json $APP_DIR/package-lock.json

RUN npm install

EXPOSE 8080

CMD echo "Commands: `npm start`"
