## Sistema de Gerenciamento de Dispositivos

O sistema mostra um CRUD feito usando Angular v12, Node v12.21.0 e MySql v8.0.20 da Amazon RDS T2 Micro.
A parte do backend(feito em Nodejs) está rodando em uma instância do Amazon EC2 T2 Micro, e o frontend(Angular) está no Amazon S3 static bucket.

### Demo
<a href="http://deploy-app-dev-pessoal.s3-website-us-east-1.amazonaws.com" target="_blank">Acessar</a>
## Passos para a instalação do sistema em dev local

- Após realiazar o clone do projeto execute o comando cd gerenciamento-dispositivo-web
- cd backend
- npm install
- cd config
- É necessário fazer a configuração de acesso ao banco de dados no arquivo config.json, obs: manter o nome do banco de dados da config.json
- Executar o script_db.sql em um ambiente de sua preferência
- cd ..
- Configura o arquivo .env com o comando no terminal cp .env.example .env. Definir a porta do serviço e o modo de execução
- Executar o comando npm start server.js
- cd .. && cd gdwebapp
- npm install
- ng serve --open (caso tenha o Angula CLI toll instalado), caso não tenha execute o comando npm install -g @angular/cli 

## Até a próxima
