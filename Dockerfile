FROM node:18-alpine
RUN mkdir -p /root/url-shortener
WORKDIR /root/url-shortener

COPY ./package.json /root/url-shortener/package.json
# COPY ./package-lock.json /root/url-shortener/package-lock.json
RUN npm install

COPY . /root/url-shortener

RUN npm run build
CMD ["node", "./dist/index.js"]
EXPOSE 3000
