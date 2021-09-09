FROM node:15-alpine
WORKDIR /frontend
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]