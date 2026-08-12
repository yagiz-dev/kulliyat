FROM node:24-bookworm-slim AS build
WORKDIR /workspace

RUN npm install --global npm@11.6.1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
