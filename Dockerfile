# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Default nginx configuration is fine for standard SPAs, 
# but we might need a custom one if there's routing.
# For now, let's stick to the basics.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
