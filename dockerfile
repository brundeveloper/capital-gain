FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY src/ ./src/

RUN addgroup -g 1001 -S nodejs && \
    adduser -S capital-gain -u 1001

RUN npm link

USER capital-gain