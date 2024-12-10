# Utiliser une version plus récente de Node.js
FROM node:22-alpine

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances et mettre à jour npm

RUN npm install
RUN npm rebuild bcrypt 
# Copier tout le reste des fichiers du projet
COPY . .

# Compiler l'application pour la production
RUN npm run build

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "start"]
