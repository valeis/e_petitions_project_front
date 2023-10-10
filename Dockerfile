FROM node:16
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm i
RUN npm list
ADD . .
ENTRYPOINT ["npm", "run", "dev"] 