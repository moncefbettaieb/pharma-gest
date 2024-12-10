terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.15"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Define the Docker network (optional but recommended to link containers)
resource "docker_network" "nuxt_network" {
  name = "nuxt_network"
}

resource "docker_volume" "node_modules" {
  name = "node_modules"
}

# Déclaration des volumes Docker
resource "docker_volume" "mongo_data" {
  name   = "mongo-data"
}


# Déploiement de l'application principale (app)
resource "docker_image" "app_image" {
  name         = "salgado777/pharma-gest-web:latest"
  keep_locally = true
}

resource "docker_container" "app" {
  image = docker_image.app_image.image_id
  name  = "pharma-gest-web"
  restart = "always"

  ports {
    internal = 3000
    external = 3000
  }

  # Attach to network
  networks_advanced {
    name = docker_network.nuxt_network.name
  }

  volumes {
    container_path = "/app/node_module"
    volume_name = docker_volume.node_modules.name
  }

  depends_on = [
    docker_container.mongo
  ]

  command = ["npm", "run", "dev"]
}

# Base de données MongoDB
resource "docker_image" "mongo_image" {
  name         = "mongo:latest"
  keep_locally = true
}


resource "docker_container" "mongo" {
  image = docker_image.mongo_image.name
  name  = "mongo"

  ports {
    internal = 27017
    external = 27017
  }

  volumes {
    container_path = "/data/db"
    volume_name = docker_volume.mongo_data.name
  }
}