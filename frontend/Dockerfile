# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# ✅ FIXED: Use 'dist' instead of 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Optionally add custom nginx config:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




