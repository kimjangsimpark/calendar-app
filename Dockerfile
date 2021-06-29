FROM node:10-alpine

RUN mkdir /workspace
WORKDIR /workspace
COPY . ./

RUN npm i -g next
RUN npm ci
RUN npm run build
RUN rm -rf src

EXPOSE 3000
CMD ["npm", "start"]
