### Install deps for Production Target
# cache node_modules as multi-stage
FROM node:14-alpine as deps
COPY /package*.json /app/
WORKDIR /app
# ignore dev deps
RUN npm install --only=production

### Production Target
FROM node:14-alpine as production
COPY /src /app
COPY --from=deps /app/node_modules /app/node_modules
# nonroot
USER node
# cd /app
WORKDIR /app
# pid 1
ENTRYPOINT [ "npm", "run", "production" ]

### Development Target
# does not use previous stages
FROM node:14-alpine as development
COPY /package*.json /app/
WORKDIR /app
RUN npm install
COPY /src /app
ENTRYPOINT [ "npm", "run", "development" ]