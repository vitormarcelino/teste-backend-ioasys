# Sobre

Estes documento README tem como objetivo fornecer as informações necessárias para realização do projeto de avaliação de candidatos.

# 🏗 O que fazer?

- Você deve realizar um fork deste repositório e, ao finalizar, enviar o link do seu repositório para a nossa equipe. Lembre-se, NÃO é necessário criar um Pull Request para isso, nós iremos avaliar e retornar por email o resultado do seu teste.

# 🚨 Requisitos

- A API deverá ser construída em **NodeJS** ou **Rails**
- Implementar autenticação e deverá seguir o padrão **JWT**, lembrando que o token a ser recebido deverá ser no formato **Bearer**
- Caso seja desenvolvida em NodeJS o seu projeto terá que ser implementado em **ExpressJS** ou **SailsJS**
- Para a comunicação com o banco de dados utilize algum **ORM**/**ODM**
- Bancos relacionais permitidos:
  - MySQL
  - MariaDB
  - Postgre
- Bancos não relacionais permitidos:
  - MongoDB
- Sua API deverá seguir os padrões Rest na construção das rotas e retornos
- Sua API deverá conter a collection/variáveis do postman ou algum endpoint da documentação em openapi para a realização do teste
- É desejável que o teste esteja na liguagem  **JavaScript** buscando avaliar o entendimento completo da linguagem e não de estruturas ou dependências que abstraiam determinadas definições não alheias ao ECMAScript. No entanto, testes realizados em **TypeScript** também serão aceitos.

# 🕵🏻‍♂️ Itens a serem avaliados

- Estrutura do Projeto
- Segurança da API, como autenticação, senhas salvas no banco, SQL Injection e outros
- Boas práticas da Linguagem/Framework
- Seu projeto deverá seguir tudo o que foi exigido na seção [O que desenvolver?](##--o-que-desenvolver)
- Migrations para a criação das tabelas do banco relacional

# 🎁 Extra

Esses itens não são obrigatórios, porém desejados.

- Testes unitários
- Linter
- Code Formater

**Obs.: Lembrando que o uso de algum linter ou code formater irá depender da linguagem que sua API for criada**

# 🖥 O que desenvolver?

Você deverá criar uma API que o site [IMDb](https://www.imdb.com/) irá consultar para exibir seu conteúdo, sua API deve conter as seguintes features:

- Admin

  - Cadastro
  - Edição
  - Exclusão lógica (Desativação)

- Usuário

  - Cadastro
  - Edição
  - Exclusão lógica (Desativação)

- Filmes

  - Cadastro (Somente um usuário administrador poderá realizar esse cadastro)
  - Voto (A contagem dos votos será feita por usuário de 0-4 que indica quanto o usuário gostou do filme)
  - Listagem (deverá ter filtro por diretor, nome, gênero e/ou atores)
  - Detalhe do filme trazendo todas as informações sobre o filme, inclusive a média dos votos

**Obs.: Apenas os usuários poderão votar nos filmes e a API deverá validar quem é o usuário que está acessando, ou seja, se é admin ou não**

# 🔗 Links

- Documentação JWT https://jwt.io/
- Frameworks NodeJS:

  1. https://expressjs.com/pt-br/
  2. https://sailsjs.com/

- Guideline rails http://guides.rubyonrails.org/index.html

# 👨‍💻️ Exemplo de Requisições

## Autenticação
- Admin 
```
curl --request POST \
  --url https://ioasys.vitormarcelino.com.br/admin/authenticate \
  --header 'content-type: application/json' \
  --data '{
	"username": "admin_ioasys",
	"password": "ioasys@2021"
}'
```

- Usuários
```
curl --request POST \
  --url https://ioasys.vitormarcelino.com.br/user/authenticate \
  --header 'content-type: application/json' \
  --data '{
	"email": "jose.silva@email.com",
	"password": "pass@123!"
}'
```

## Admin
- Listagem
```
curl --request GET \
  --url https://ioasys.vitormarcelino.com.br/admins \
  --header 'authorization: Bearer TOKEN'
```
- Criação
```
curl --request POST \
  --url https://ioasys.vitormarcelino.com.br/admin \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
	"username": "usuario",
	"password": "pass@123!",
	"email": "usuario@email.com"
}'
```
- Exibição
```
curl --request GET \
  --url https://ioasys.vitormarcelino.com.br/admin/ID_ADMIN \
  --header 'authorization: Bearer TOKEN'
```
- Atualização
```
curl --request PATCH \
  --url https://ioasys.vitormarcelino.com.br/admin/ID_ADMIN \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
	"username": "usuario",
	"password": "pass@123!",
	"email": "usuario@email.com"
}'
```
- Deleção
```
curl --request DELETE \
  --header 'authorization: Bearer TOKEN' \
  --url https://ioasys.vitormarcelino.com.br/admin/ID_ADMIN
```

## Usuários
- Listagem
```
curl --request GET \
  --url https://ioasys.vitormarcelino.com.br/users \
  --header 'authorization: Bearer TOKEN'
```
- Criação
```
curl --request POST \
  --url https://ioasys.vitormarcelino.com.br/user \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
	"name": "João da Silva",
	"password": "pass@123!",
	"email": "joao.silva@email.com",
	"birthday": "1993-11-05 00:00:00"
}'
```
- Exibição
```
curl --request GET \
  --url https://ioasys.vitormarcelino.com.br/user/ID_USER \
  --header 'authorization: Bearer TOKEN'  
```
- Atualização
```
curl --request PATCH \
  --url https://ioasys.vitormarcelino.com.br/user/ID_USER \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
	"name": "João da Silva",
	"password": "pass@123!",
	"email": "joao.silva@email.com",
	"birthday": "1993-11-05 00:00:00"
}'
```
- Deleção
```
curl --request DELETE \
  --header 'authorization: Bearer TOKEN' \
  --url https://ioasys.vitormarcelino.com.br/user/ID_USER
```

## Filmes
- Listagem
Os parâmetros genre, director e actors são opcionais, para aplicar filtros no resultado.
```
curl --request GET \
  --url https://ioasys.vitormarcelino.com.br/movies?genre=Sci-Fi&director=Robert Zemeckis&actors=Christopher Lloyd \
  --header 'authorization: Bearer TOKEN'
```
- Criação
```
curl --request POST \
  --url https://ioasys.vitormarcelino.com.br/movie \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "title": "Back to the Future",
    "synopsis": "Marty McFly, a 17 year old high school student gets lost in 1955 by an accident, 30 years back in time. With the help of his friend Dr. Emmet Brown, he is desperately trying to find his way back to the future in the year 1985. It becomes a battle against the clock.",
    "director": "Robert Zemeckis",
    "genre": "Sci-Fi",
    "actors": "Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover"
}'
```
- Exibição
```
curl --request GET \
  --url https://ioasys.vitormarcelino.com.br/movie/ID_MOVIE \
  --header 'authorization: Bearer TOKEN'  
```
- Atualização
```
curl --request PATCH \
  --url https://ioasys.vitormarcelino.com.br/movie/ID_MOVIE \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "title": "Back to the Future",
    "synopsis": "Marty McFly, a 17 year old high school student gets lost in 1955 by an accident, 30 years back in time. With the help of his friend Dr. Emmet Brown, he is desperately trying to find his way back to the future in the year 1985. It becomes a battle against the clock.",
    "director": "Robert Zemeckis",
    "genre": "Sci-Fi",
    "actors": "Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover"
}'
```
- Deleção
```
curl --request DELETE \
  --header 'authorization: Bearer TOKEN' \
  --url https://ioasys.vitormarcelino.com.br/movie/ID_MOVIE
```
- Voto
```
curl --request POST \
  --url https://ioasys.vitormarcelino.com.br/movie/ID_MOVIE/vote \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
	"note": 3
}'
```

# Collection Postman
É possível importar o arquivo `postman_collection.json` no Postman, e realizar os testes da API. Ainda no Postman é nencessário criar um Environment com a variável **base_url** e nela definir a url do projeto, exemplo: https://ioasys.vitormarcelino.com.br ou http://127.0.0.1:3000

# Demo
É possível validar toda a api através do ambiente de homologação, através da url: https://ioasys.vitormarcelino.com.br

# Rodar o projeto
Para rodar o projeto, é necessário clonar este repositório, e seguir os passos a seguir, utilizando Docker ou o NodeJS (>=14) da Máquina.

## Usando Docker

Rodar `docker-compose up -d`, e a aplicação estará disponível na porta 3000 da máquina

## Usando NodeJS da Máquina

- Copiar o arquivo .env.example para .env, e configurar as variáveis de ambiente, como as configurações de configuração do banco de dados.
- Rodar `npm install`
- Rodar `npm run start`