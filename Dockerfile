# Dockerfile

# Node.js 이미지를 기반으로 함
FROM node:14-alpine as builder

# 앱 디렉토리 생성 및 설정
WORKDIR /usr/src/app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 추가
COPY . .

# 앱 빌드
RUN npm run build

# Nginx 이미지를 기반으로 함
FROM nginx:alpine

# Nginx 설정 및 앱 빌드 결과물 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist .
