# Cadastro de carro

**Requisitos funcionais** 
- Deve ser possível cadastrar um novo carro.


**Regras de Negócio** 

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado com disponibilidade por padrão.
- Usuário responsável pelo cadastro deve ser um administrador.

# Listagem de carros #

**Requisitos funcionais**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros pelo nome da categoria.
- Deve ser possível listar todos os carros pelo nome da marca.
- Deve ser possível listar todos os carros pelo nome do carro.


**Regras de Negócio** 
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro #

**Requisitos funcionais**
- Deve ser possível cadastrar uma especificação para um carro.

**Regras de Negócio**
- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.


# Cadastro de imagens do carro #

**Requisitos funcionais**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**Requisitos não funcionais**
- Utilizar o multer para upload de arquivos.

**Regras de Negócio**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro #

**Requisitos funcionais**
- Deve ser possível cadastrar um aluguel.


**Regras de Negócio**
- O aluguel deve ter duração minima de uma 24 horas.
- Não deve possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
