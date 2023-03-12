# App build step
FROM node:18-alpine AS builder

RUN mkdir /app

COPY . /app

RUN cd /app && npm install && npm run build

# App run step
FROM node:18-alpine as app

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/

RUN cd /app && \
    npm install --production

WORKDIR /app

EXPOSE 3000
CMD ["node", "build"]

