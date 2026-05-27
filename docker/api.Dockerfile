FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/recommendation/package.json packages/recommendation/package.json
RUN npm install

FROM deps AS build
COPY . .
RUN npm run prisma:generate --workspace @plass/api && npm run build --workspace @plass/api

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "@plass/api"]
