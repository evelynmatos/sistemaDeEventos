## Pasta Backend - API NodeJs
## Pasta Frontend - Angular

## Frontend do projeto foi criado em Angular 12.0.2

## Para gerar aplicação execute
  1. npm install 
  2. ng serve

## Npm install (para baixar as dependências do node.modules)
## Ng serve (para subir aplicação no localhost)

## Porta de desenvolvimento 
  http://localhost:4200
  
 
 ## Banco de Dados - Mysql
  Criação do Banco - executar scripts
  
  create database eventosdb;
  use eventosdb;
  
  CREATE TABLE eventos (
   id_evento int NOT NULL AUTO_INCREMENT,
   nome_evento varchar(100) NOT NULL,
   data datetime NOT NULL,
   ativo varchar(5) NOT NULL,
   valorTotal_evento varchar(10) NOT NULL,
   up_nota_fiscal varchar(500) DEFAULT NULL,
   PRIMARY KEY (id_evento)
 ); 
 
 CREATE TABLE participantes (
  id_participante int NOT NULL AUTO_INCREMENT,
  id_evento int NOT NULL,
  nome_participante varchar(100) NOT NULL,
  setor varchar(45) NOT NULL,
  patrocinador varchar(100) NOT NULL,
  valor_participante int NOT NULL,
  PRIMARY KEY (id_participante),
  KEY fk_participantes_eventos_idx (id_evento),
  CONSTRAINT fk_participantes_eventos FOREIGN KEY (id_evento) REFERENCES eventos (id_evento)
);

select participantes.id_participante,
participantes.nome_participante,
participantes.setor,
participantes.patrocinador,
participantes.valor_participante,
eventos.id_evento,
eventos.nome_evento,
eventos.data,
eventos.ativo,
eventos.valorTotal_evento,
eventos.up_nota_fiscal
from participantes 
inner join eventos 
on eventos.id_evento = participantes.id_evento;
  
 ## API - Node Js
 
 ## Porta de desenvolvimento 
  http://localhost:3000
 
 # Para executar API 
  1. npm install 
  2. npm start
  
  

