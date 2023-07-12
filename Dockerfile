# Stage 1: Build the backend
FROM node:16

WORKDIR /app/backend
COPY backend/ .
RUN npm install
RUN npm run build

# Stage 2: Build the frontend
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install
RUN npm run build

# Stage 3: Create the final image
#WORKDIR /app
#COPY /app/backend/dist ./backend/dist
#COPY /app/frontend/dist ./frontend/dist
WORKDIR /app/backend
CMD ["node", "dist/src/main"]
