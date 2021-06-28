FROM node:10-alpine

RUN mkdir /workspace
WORKDIR /workspace
COPY . ./

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
