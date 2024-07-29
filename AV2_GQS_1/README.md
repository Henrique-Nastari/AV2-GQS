Parte 1 da Atividade Avaliativa válida pela segunda unidade da disciplina de Gestão e Qualidade de Software do curso de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade Federal do Rio Grande do Norte (UFRN).

CRIANDO O AMBIENTE DE TRABALHO:

    - git clone https://github.com/Henrique-Nastari/AV2-GQS
    - npm init -y
    - npm install mocha chai nyc --save-dev
    - Configure scripts no seu package.json para facilitar a execução dos testes e da cobertura de código.
        {
            "name": "meu-projeto-teste",
            "version": "1.0.0",
            "scripts": {
                "test": "mocha"
            },
            "devDependencies": {
                "chai": "^4.3.4",
                "mocha": "^9.1.3",
                "sinon": "^11.1.2"
            }
        }

    - npm install eslint --save-dev
    - npx eslint --init
    - npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

    - Atualize seu arquivo de configuração do ESLint (.eslintrc.js ou .eslintrc.json) para incluir Prettier:
        {
            "extends": ["eslint:recommended", "plugin:prettier/recommended"],
            "plugins": ["prettier"],
            "rules": {
                "prettier/prettier": "error"
            }
        }

    - Crie um arquivo de configuração do Prettier, .prettierrc, na raiz do seu projeto:
        {
            "singleQuote": true,
            "trailingComma": "es5"
        }

    - Atualize seu arquivo de configuração do ESLint (por exemplo, .eslintrc.json) para incluir as regras do Prettier:    

        {
            "env": {
                "browser": true,
                "es2021": true
            },
            "extends": [
                "eslint:recommended",
                "plugin:prettier/recommended"
            ],
            "parserOptions": {
                "ecmaVersion": 12,
                "sourceType": "module"
            },
            "rules": {
                "prettier/prettier": "error"
            }
        }

RODANDO O TESTE:

    -cd test
    -npm test


