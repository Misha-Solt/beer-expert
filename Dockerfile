FROM node:18
WORKDIR /usr/src/app
COPY . . 
RUN npm ci
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]
