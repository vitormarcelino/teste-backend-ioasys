FROM keymetrics/pm2:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN cp docker.env .env
EXPOSE 3000
CMD [ "pm2-runtime", "ecosystem.config.js"]