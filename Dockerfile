FROM node:16-alpine3.17

WORKDIR /app

COPY package.json  ./

RUN npm install && \
    npm list

COPY . .

CMD ["npm", "run", "dev"]
