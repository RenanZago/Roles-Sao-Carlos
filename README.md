# RoleSC - Projeto Web2

## Estrutura do Projeto

O projeto foi reorganizado seguindo as melhores práticas de desenvolvimento web, separando HTML, CSS e JavaScript em arquivos modulares.

### 📁 Estrutura de Pastas

```
projeto_entrega_1/
├── css/                          # Estilos CSS
│   ├── base.css                  # Estilos base e variáveis globais
│   ├── auth.css                  # Estilos para páginas de autenticação
│   ├── header.css                # Estilos do cabeçalho
│   ├── index.css                 # Estilos da página inicial
│   ├── calendario.css            # Estilos da página do calendário
│   ├── mapa.css                  # Estilos da página do mapa
│   ├── adicionar-evento.css      # Estilos da página de adicionar evento
│   └── detalhes.css              # Estilos da página de detalhes do evento
│
├── js/                           # Scripts JavaScript
│   ├── common.js                 # Funcionalidades compartilhadas
│   ├── index.js                  # Scripts da página inicial
│   ├── calendario.js             # Scripts do calendário
│   ├── mapa.js                   # Scripts do mapa
│   └── detalhes.js               # Scripts da página de detalhes
│
├── pages/                        # Páginas HTML
│   ├── index.html
│   ├── detalhes.html
│   ├── calendario.html
│   ├── mapa.html
│   ├── adicionar-evento.html
│   ├── login.html
│   ├── cadastro.html
│   └── esqueci-senha.html
│
└── README.md                     # Documentação do projeto
```

### 🎨 Organização do CSS

- **base.css**: Contém variáveis CSS, reset, tipografia e estilos compartilhados
- **auth.css**: Estilos específicos para páginas de login, cadastro e recuperação de senha
- **index.css**: Estilos da página inicial (hero, filtros, grid de eventos)
- **calendario.css**: Estilos do calendário FullCalendar
- **mapa.css**: Estilos do mapa Leaflet
- **adicionar-evento.css**: Estilos do formulário de adicionar evento
- **detalhes.css**: Estilos da página de detalhes do evento

### ⚙️ Organização do JavaScript

- **common.js**: Classes e funcionalidades compartilhadas (HeaderManager, FilterManager, ModalManager, TypingEffect)
- **index.js**: Funcionalidades específicas da página inicial
- **calendario.js**: Lógica do calendário FullCalendar
- **mapa.js**: Lógica do mapa Leaflet

### 📄 Páginas HTML

Todas as páginas HTML foram movidas para a raiz do projeto e atualizadas para usar os arquivos CSS e JS externos:

- `index.html` - Página inicial
- `login.html` - Página de login
- `cadastro.html` - Página de cadastro
- `esqueci-senha.html` - Página de recuperação de senha
- `calendario.html` - Página do calendário
- `mapa.html` - Página do mapa
- `adicionar-evento.html` - Página de adicionar evento
- `detalhes.html` - Página de detalhes do evento

### 📱 Responsividade

O projeto mantém o design responsivo com:
- Mobile First approach
- Breakpoints para tablet (768px) e desktop (1024px)
- Navegação adaptativa (hamburger menu para mobile, menu horizontal para desktop)

