# 💸 ShopWise – Gestión de Finanzas

Este es un proyecto web para gestionar y analizar operaciones financieros, desarrollado con **Vite, **HTML**, **CSS** y **JavaScript**, usando **json-server** como API REST simulada.  
Permite crear, listar, editar y eliminar operaciones y categorías, además de visualizar reportes de finanzas.

---


## ✅ Funcionalidades

- Crear, listar, editar y eliminar operaciones (compras y ventas)
- Crear, listar, editar y eliminar categorías
- Filtrar operaciones por tipo, categoría y fecha
- Visualizar reportes automáticos (categoría/producto/mes con más ventas y compras)
- Tabla de totales por mes y por categoría
- Sistema de login/logout básico

---


## 🚀 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [`json-server`](https://github.com/typicode/json-server) (puede ser global o local)

Verifica versiones con:

```bash
node -v
npm -v
```

---


## 📦 Instalación

1. **Instala las dependencias del frontend**

```bash
npm install
```

2. **Instala json-server**

Opción global (más práctico):

```bash
npm install -g json-server
```

O bien como dependencia local:

```bash
npm install json-server --save-dev
```

---

## 🛠️ Cómo Ejecutar el Proyecto

### 1. Inicia el backend (json-server)

```bash
npx json-server --watch public/databases/db.json --port 3000
```
### 2. Inicia el fronted (vite)

```bash
npm run dev
```

Esto levantará la API REST en:
👉 `http://localhost:3000/users` 
👉 `http://localhost:3000/operaciones`  
👉 `http://localhost:3000/categories`



## 🗂️ Estructura del Proyecto

- **public/**
  - **databases/db.json** – Base de datos para json-server
  - **icons/**, **images/** – Recursos multimedia

- **src/CSS/style.css** – Estilos generales del sistema

- **src/js/**
  - `categorias.js` – Gestión de categorías
  - `dashboard.js` – Lógica del dashboard
  - `guardian.js` – Protección y validaciones
  - `login.js` – Autenticación
  - `operaciones.js` – Alta, edición, borrado y filtros de operaciones
  - `reportes.js` – Generación y visualización de reportes

- **views/**
  - `categorias.html`
  - `dashboard.html`
  - `login.html`
  - `operaciones.html`
  - `reportes.html`

- **index.html** – Página de bienvenida

- **package.json / package-lock.json** – Configuración de dependencias para npm

- **README.md** – Este archivo

---


## ℹ️ Notas importantes

- El menú de usuario y la función de logout funcionan limpiando el `localStorage` y redirigiendo al inicio.
- No es necesario instalar ni revisar carpetas relacionadas a Vite, sólo usa el comando de arriba para json-server.

---