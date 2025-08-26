# build environment
FROM node:14-alpine as build

# Define build argument
ARG ENV

COPY ./api-models ../api-models
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json from the platform directory
COPY ./platform/package.json ./
# COPY ./platform/package-lock.json ./
# Install dependencies
RUN npm install
RUN npm install react-scripts@5.0.0 -g --silent

# Copy the rest of the application from the platform directory
COPY ./platform ./
# Build the application
RUN npm run build

# Run the custom build script instead of `npm run build`
RUN if [ "$ENV" = "production" ]; then echo "Uploading sourcemaps to Sentry..." && npm run sentry:sourcemaps; else echo "Skipping Sentry upload (ENV=$ENV)"; fi

# Production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
