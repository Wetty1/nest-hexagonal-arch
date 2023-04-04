FROM node:16.16.0-slim

RUN apt update && apt install -y procps

USER node

WORKDIR /home/node/app

COPY . .

RUN yarn

RUN yarn build

# CMD [ "tail", "-f", "/dev/null"]
EXPOSE 3000

ENTRYPOINT [ "node", "dist/main"]
