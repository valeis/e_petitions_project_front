FROM node:18-alpine3.17 as builder

COPY package.json package-lock.json index.html .env.production \
 vite.config.ts tailwind.config.js postcss.config.js pnpm-lock.yaml \
 tsconfig.json /app/
COPY src  /app/src/
RUN cd /app/ && \
    npm ci && \
    npm run build

FROM nginx:1.18.0-alpine

COPY --from=builder /app/dist/ /var/lib/dist/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
