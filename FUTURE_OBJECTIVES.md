# Objetivos Futuros

Este documento descreve as metas e funcionalidades planejadas para as próximas versões do sistema. Essas melhorias visam aumentar a usabilidade, escalabilidade e eficiência da plataforma.

## 1. Melhorias na Interface de Usuário (UI)

- **Objetivo:** Tornar a interface mais intuitiva e responsiva para diferentes dispositivos.
- **Tarefas:**
  - Redesenhar a página inicial para facilitar a navegação.
  - Adicionar suporte a temas (modo claro e escuro).
  - Implementar componentes acessíveis, como navegação por teclado e compatibilidade com leitores de tela.

## 2. Integração com APIs de Livrarias e Bibliotecas

- **Objetivo:** Permitir aos usuários verificar a disponibilidade de livros em livrarias e bibliotecas externas.
- **Tarefas:**
  - Desenvolver integração com APIs de grandes livrarias (ex.: Amazon, Google Books).
  - Implementar consulta de disponibilidade e preços em tempo real.
  - Adicionar links diretos para compra ou reserva de livros.

## 3. Integração com Redes Sociais

- **Objetivo:** Facilitar o compartilhamento de livros e listas de leitura nas redes sociais.
- **Tarefas:**
  - Implementar a opção de compartilhar diretamente no Facebook, Twitter e Instagram.
  - Criar um sistema de login usando redes sociais.

 ## 4. Integração com JWT para Autenticação e Autorização

- **Objetivo:** Implementar autenticação e autorização seguras usando JWT (JSON Web Token), garantindo que apenas usuários autorizados possam acessar certas funcionalidades do sistema.
- **Tarefas:**
  - Implementar a geração de tokens JWT no login do usuário, contendo as informações de autenticação.
  - Definir o tempo de expiração dos tokens para garantir a segurança.
  - Implementar um sistema de refresh tokens para renovar tokens JWT sem precisar de novo login.
  - Implementar uma funcionalidade de logout para invalidar tokens no lado do servidor (opcional, baseado na estratégia de blacklist ou remoção de refresh tokens).
  - Permitir que a autenticação com JWT funcione em conjunto com login de redes sociais (OAuth) e outras integrações de autenticação de terceiros.
  - Adicionar middleware para validar tokens JWT em todas as requisições protegidas.
  - Garantir que apenas usuários autenticados possam acessar rotas específicas (ex.: editar de perfil e review de livros).

---

À medida que novas ideias e demandas surgirem, este documento será atualizado para refletir as prioridades e os prazos de implementação.

