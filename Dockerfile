FROM node

MAINTAINER Bill

RUN mkdir -p /src
WORKDIR src

COPY package.json /src
RUN npm install

COPY . /src

EXPOSE 8080

CMD ["npm", "start"]
