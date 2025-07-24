# Stage 1: Build the application ...
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# To create a production-ready build
RUN npm run build

# Stage 2: Serve the application using a lightweight server like nginx ...
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]