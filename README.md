# Thynk Burger - Sistema de Pedidos

## Descrição

Thynk Burger é um sistema de gerenciamento de pedidos para uma hamburgueria. O sistema permite aos clientes fazerem pedidos online, e à equipe do restaurante gerenciar esses pedidos desde a cozinha até a entrega.

## Funcionalidades

- Página inicial com menu de produtos
- Carrinho de compras
- Formulário de dados do cliente
- Página de acompanhamento do pedido na cozinha
- Página para motoboys visualizarem detalhes da entrega
- Confirmação de pedido entregue
- Listagem de todos os pedidos
- Funcionalidade para limpar histórico de pedidos

## Tecnologias Utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Java com Spring Boot
- Banco de Dados: H2 (banco de dados em memória)

## Configuração e Instalação

### Pré-requisitos

- Java JDK 11 ou superior
- Maven

### Backend

1. Navegue até a pasta do backend:
cd Restaurante


2. Instale as dependências:
mvn install


3. Execute o aplicativo:
mvn spring-boot:run

### Frontend (Node.js Application)

1. Navegue até a pasta do frontend:
cd Restaurante

2. Execute o aplicativo:
node app.js


## Uso

- Após iniciar tanto o backend quanto o frontend, abra um navegador e acesse `http://localhost:3000`
- Use a interface para fazer pedidos e gerenciar o sistema
