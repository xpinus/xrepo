# 设置基础镜像
FROM node:20-bullseye-slim AS builder

WORKDIR /webapp

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./
COPY packages/ ./packages
COPY apps/ ./apps

RUN npm install -g pnpm@9.3.0 --registry https://registry.npmmirror.com
RUN pnpm install --registry https://registry.npmmirror.com
RUN pnpm run build

FROM nginx AS production

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY --from=builder /webapp/apps/docs/dist  /usr/share/nginx/html/

ADD ops/docs/nginx.conf /etc/nginx/nginx.conf
