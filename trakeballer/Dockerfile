FROM node:20-slim
WORKDIR /app
RUN chown node:node /app
COPY --chown=node:node package*.json ./
USER node
RUN npm install --omit=dev
COPY --chown=node:node . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
