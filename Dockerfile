FROM node:latest as BUILD
WORKDIR /app
COPY *.js *.json .
RUN npm install
FROM node:latest
WORKDIR /app
COPY --from=build /app/ .
ENTRYPOINT ["npm", "run", "start"]