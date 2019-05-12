# My Project Name

## Topicos

1. [Motivação](#Motivação)
2. [Estrutura de pastas](#Estruturadepastas)
3. [Instalando as dependencias](#Instalandoasdependencias)
4. [Buildando o projeto](#Buildandooprojeto)
5. [Testando o projeto](#Testandooprojeto)
6. [Publicando o projeto](#Publicandooprojeto)

## Motivação

## Estrutura de pastas

```
logger
│   README.md
│   arquivos de configuração (build, etc)
│
└─── dist (Contéudo com o build do projeto]
│
│
└─── src (Conteúdo de desenvolvimento do projeto)
│
│
└─── tests (Contéudo referente a tests, seguindo a mesma estrutura da src)

```

## Instalando as dependencias

Execute o seguinte comando no terminal: `npm i`

## Buildando o projeto

Execute o seguinte comando no terminal: `npm run build` este comando irá compilar o typescript e também adicionar os typings (Typescript) e seu arquivo de configuração NPM

## Testando o projeto

Execute no terminal o seguinte comando para rodar os testes unitários: `npm run test`

## Publicando o projeto

Execute no terminal após o _BUILD_ seguinte comando `npm run dist` _(Lembre-se de dar bump na versão do pacote!)_
