# Quantum Tutor - Frontend

Aplicação de tutoria inteligente para aprendizado de Computação Quântica.

## Visão Geral

O Quantum Tutor é uma plataforma educacional que oferece um chatbot tutor especializado em Computação Quântica, projetado para auxiliar estudantes em seu aprendizado. A aplicação contém 10 aulas diferentes, cada uma com um chatbot específico para o conteúdo da aula, alimentado por RAG (Retrieval Augmented Generation) com base nos materiais didáticos.

## Funcionalidades Principais

- **Sistema de Autenticação**: Login e registro de estudantes
- **Dashboard Personalizado**: Visão geral do progresso e recomendações de estudo
- **Interface de Chat**: Interação com tutor especializado para cada aula
- **Rastreamento de Progresso**: Análise de aprendizado e evolução do conhecimento
- **Painel Administrativo**: Para professores monitorarem o desempenho dos estudantes

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário
- **React Router**: Navegação entre páginas
- **Tailwind CSS**: Framework de CSS utilitário para estilização
- **Context API**: Gerenciamento de estado global
- **Axios**: Cliente HTTP para comunicação com API

## Estrutura do Projeto

O projeto segue uma arquitetura modular e limpa, organizada em:

- **components**: Componentes reutilizáveis da UI
- **context**: Gerenciamento de estado global com Context API
- **hooks**: Hooks personalizados para reutilização de lógica
- **layouts**: Layouts compartilhados entre páginas
- **pages**: Componentes de páginas completas
- **services**: Serviços para comunicação com API
- **utils**: Funções utilitárias e auxiliares

## Instalação e Execução

Para executar o projeto localmente:

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/quantum-tutor-frontend.git
cd quantum-tutor-frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

O aplicativo estará disponível em http://localhost:3000.

## Fluxo de Usuário

1. O usuário se registra ou faz login
2. Acessa o dashboard personalizado
3. Seleciona uma aula para estudar
4. Interage com o chatbot especializado para aprender conceitos quânticos
5. Visualiza seu progresso e estatísticas de aprendizado

## Integração com Backend

Este frontend foi projetado para se integrar com uma API REST desenvolvida especificamente para o Quantum Tutor. Para informações sobre a API, consulte o repositório do backend.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o projeto.