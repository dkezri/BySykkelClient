FROM node
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]