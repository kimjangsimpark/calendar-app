FROM node:10-alpine

RUN apk add --no-cache libc6-compat

RUN mkdir /workspace
WORKDIR /workspace
COPY . ./

RUN npm ci
RUN npm run build
RUN rm -rf src

ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
