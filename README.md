# Prueba Técnica DevOps - Cristian Idrobo 

Este proyecto corresponde a la prueba técnica DevOps para **Devsu**, usando una aplicación Node.js. Incluye:

- Dockerización de la aplicación
- CI/CD con GitHub Actions
- Despliegue en Kubernetes local (Minikube)
- Integración con SonarCloud
- Escaneo de vulnerabilidades

---
##  Pasos para ejecutar el proyecto
- Clonar el repositorio usando git clone
- En la terminal del repositorio clonado ejecutar:
```bash
npm install
```
---
## 🐳 Dockerización

El proyecto cuenta con un `Dockerfile` optimizado para producción:

- Basado en `node:18-alpine`
- Usa `npm ci` para instalación limpia
- Incluye `healthcheck`
- Ejecuta como usuario sin privilegios

### Comandos útiles

```bash
docker build -t devsu_test .
docker-compose up -d --build
docker ps
docker logs devsu_app
```

---

## ⚙️ Pipeline CI/CD

Este pipeline está definido en `.github/workflows/ci.yml` y ejecuta:

1. **validate** → Verifica que se haga push a `main`
2. **build** → Instala dependencias y compila
3. **test** → Ejecuta tests unitarios con `Jest`
4. **vulnerability** → Escaneo de dependencias con `npm audit`
5. **sonar-analysis** → Análisis estático y cobertura con SonarCloud
6. **docker-publish** → Publica imagen en GitHub Container Registry (GHCR)
7. **deploy-k8s** → Despliega en Minikube con `kubectl`

### 📌 Variables necesarias

Se agrega estos **secrets** en el repositorio de GitHub:

- `GHCR_PAT` → Token de acceso para GHCR
- `SONAR_TOKEN`, `SONAR_ORG`, `SONAR_PROJECT_KEY` → SonarCloud

---

## ☸️ Kubernetes

Archivos disponibles en el directorio `/k8s`:

| Archivo            | Propósito                                                                 |
|--------------------|---------------------------------------------------------------------------|
| `configmap.yaml`   | Configuración no sensible (puerto, base de datos)                         |
| `secret.yaml`      | Credenciales sensibles (usuario/clave BD)                                 |
| `deployment.yaml`  | Despliegue con 2 réplicas, probes y variables de entorno                   |
| `service.yaml`     | Expone la app como ClusterIP                                               |
| `hpa.yaml`         | Escalado automático de pods según CPU                                     |
| `ingress.yaml`     | Expone la app como `http://nodejs-app.local` usando NGINX Ingress         |

---

## 🖥️ Minikube

### Pasos para pruebas locales:

```bash
minikube stop
minikube start
```

#### Redirección de puertos

```bash
kubectl port-forward svc/nodejs-app-svc 8000:80
```

#### Escalar a 0 réplicas (para pruebas)

```bash
kubectl scale deployment nodejs-app --replicas=0
```

#### Verificar despliegue

```bash
kubectl get pods
kubectl logs deployment/nodejs-app
```

---

## 🔍 Pruebas con Postman

Una vez desplegada la app, puedes probar los endpoints:

- `GET /api/users`
- `POST /api/users`
- `GET /health`

---
## 🔍 Enlaces
https://sonarcloud.io/project/overview?id=cfidrobo_PruebaDevsu_Idrobo_Cristian

https://github.com/cfidrobo/PruebaDevsu_Idrobo_Cristian

https://github.com/cfidrobo/PruebaDevsu_Idrobo_Cristian/actions
---
## 📬 Contacto

Cristian Fernando Idrobo Montalvo  
📧 cristianidrobo97@gmail.com  
🔗 GitHub: https://github.com/cfidrobo 

---
