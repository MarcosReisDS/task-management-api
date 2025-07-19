# 🚀 API RESTful com NestJS

Este projeto foi desenvolvido como parte da playlist [Curso de NestJS 2024](https://www.youtube.com/playlist?list=PLpcf8hdkpCYseV2ctwAhE4dY-AQ7v5D9S) no YouTube. A aplicação é uma API RESTful robusta utilizando NestJS com TypeScript, com foco em boas práticas, validação, autenticação e arquitetura escalável.

---

## 📦 Tecnologias utilizadas

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT (para autenticação)
- Docker

---

## ⚙️ Como executar localmente

### Pré-requisitos

- Node.js (>= 16)
- PostgreSQL
- Yarn ou npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/MarcosReisDS/task-management-api.git
cd task-management-api

# Instale as dependências
npm install

# Configure o .env com as variáveis de banco e JWT
cp .env.example .env

# Rode banco dados postgres no docker
docker compose up -d

# Rode as migrações (caso use Prisma)
npx prisma migrate dev

# Inicie a aplicação
npm run start:dev


