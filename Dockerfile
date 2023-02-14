FROM node:18

WORKDIR /usr/src/

COPY . .

EXPOSE 4000

RUN npm i

CMD ["npm", "run", "dev:docker"]