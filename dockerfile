FROM node:10.16
WORKDIR /webstat
COPY ./Backend/ .
RUN ls
RUN npm install
CMD ["npm","start"]
