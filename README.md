<p align="center">
  <img width="460" height="300" src="./identidade_visual/clubeamigo.svg">
</p>

# Club Amigos do GRAACC
Um app de doação com sistema de fidelidade

# Stack
 - backend = Servidor rest para responder requisições.
 - frontVUE = Frontend desenvolvido em vue para gerenciar aplicação.
 - mobile = Aplicativo híbrido para interação com o serviço.
 - mongo = Servidor MongoDB para banco de dados.
 
# Instalação
E nescessario antes de contruir os container a criação do arquivo ".env" dentro da pasta "./frontend".

# .env Exemplo
O endereço informado é o endereço externo do servidor backend.
```bash
VUE_APP_API_URL=http://localhost:3000
```

# Atenção
Antes de subir o container do backend e nescessário criar uma variável de ambiente (HOTS=localhost) no container com o endereço do banco de dados (mongoDB).
 
# Build APP
Para mais informações ler o arquivo /app/readme.md

```bash
# Install dependences
npm install

# Build app
quasar build -m [android|ios]

```

## Quick Start
 
Start the application (DOCKER)

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# To re-build
docker-compose build

#With Portainer

docker-compose -f docker-compose.yml build 
docker tag app-dev4 127.0.0.1:5000/app-dev4
docker push 127.0.0.1:9000/app-dev4
```
 