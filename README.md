# Desafio Puma - Lista de Usuários Favoritos do Git

## Sobre o Projeto
Este projeto foi desenvolvido como parte do **Desafio Puma**, proporcionando uma aplicação completa com **backend em Express** e **frontend em React**. O objetivo principal é permitir que usuários busquem perfis no GitHub, os adicionem a uma lista de favoritos e gerenciem essa lista de forma intuitiva.

A aplicação conta com uma interface simples e responsiva, garantindo uma experiência fluida ao usuário.

## Link do Desafio  
[Repositório Oficial](https://github.com/jsfelix/puma-code-challenge)

## Funcionalidades
- **Buscar usuários do GitHub** pelo nome de usuário.  
- **Adicionar usuários a uma lista de favoritos**.  
- **Marcar um usuário com estrela**, destacando-o como favorito principal.  
- **Remover usuários da lista**.  
- **Redirecionar para o perfil oficial do usuário no GitHub** com um clique.  

## Tecnologias Utilizadas
### **Backend (API)**
- **Node.js**
- **Express**
- **Cors**
- **Dotenv** (para configuração de variáveis de ambiente)
- **Mongoose** (para configuração com o banco de dados)

### **Frontend**
- **React**
- **Vite**
- **React Icons** (para ícones)


## Como Executar
### ** Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/puma-code-challenge.git
cd puma-code-challenge
```

### ** Configurar e Executar o Backend**
```sh
cd backend
npm install
npm run dev
```
> O backend rodará em `http://localhost:port` -> port deve ser definido em .env

### ** Configurar e Executar o Frontend**
```sh
cd frontend
npm install
npm run dev
```
> O frontend rodará em `http://localhost:5173`



