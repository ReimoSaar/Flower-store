FROM node:12
WORKDIR '/frontend'

COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn","start"]