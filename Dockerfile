FROM node:18-alpine
COPY ./package.json /root/url-shortener/package.json
COPY ./package-lock.json /root/url-shortener/package-lock.json
COPY . .


WORKDIR /root/url-shortener
RUN yarn install --prod
CMD ["ts-node", "index.ts"]
