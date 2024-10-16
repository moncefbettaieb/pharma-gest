provider "kubernetes" {
  config_path = "~/.kube/config"
}

variable "env" {
  type = string
}

resource "kubernetes_namespace" "namespace" {
  metadata {
    name = var.env
  }
}

resource "kubernetes_namespace" "development" {
  metadata {
    name = "development"
  }
}

resource "kubernetes_namespace" "staging" {
  metadata {
    name = "staging"
  }
}

resource "kubernetes_namespace" "production" {
  metadata {
    name = "production"
  }
}

resource "kubernetes_deployment" "nuxt_app" {
  metadata {
    name = "nuxt-app"
    namespace = kubernetes_namespace.namespace.metadata[0].name
  }
  spec {
    replicas = 2
    template {
      metadata {
        labels = {
          app = "nuxt-app"
        }
      }
      spec {
        container {
          image = "monrepo/nuxt-app:latest"
          name  = "nuxt-app"
          ports {
            container_port = 3000
          }
        }
      }
    }
  }
}
