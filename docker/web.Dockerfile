FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/recommendation/package.json packages/recommendation/package.json
RUN npm install

FROM deps AS build
COPY . .
RUN npm run build --workspace @plass/web

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@plass/web"]
