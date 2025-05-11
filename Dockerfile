FROM node:latest as BUILD
WORKDIR /app
COPY . /app
RUN npm install
FROM node:latest
WORKDIR /app
COPY --from=build /app/ .
ENTRYPOINT ["npm", "run", "start"]