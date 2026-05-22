FROM node:18-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/app/app.ts"]