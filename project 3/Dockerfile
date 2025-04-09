FROM node:20-alpine

WORKDIR /usr/src/app

# Add global npm packages to PATH
ENV PATH=$PATH:/usr/local/bin

# Install PM2 globally
RUN npm install -g pm2

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.cjs"]