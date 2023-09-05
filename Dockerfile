FROM node:17.7.2 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:17.7.2
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:dd_prod"]
