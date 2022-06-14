
FROM node:14-alpine 
WORKDIR  /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

#stage de server nginx pour démarer app

