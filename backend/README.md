# PhysaFlow — Documentación del Backend

API REST del **Stranded Capacity Calculator**: una herramienta que permite a operadores de data centers estimar en pocos minutos cuánta capacidad están desperdiciando y cuánto les cuesta eso por año.

> Repositorio: [No-Country-simulation/-S07-26-Team-12-PhysaFlow](https://github.com/No-Country-simulation/-S07-26-Team-12-PhysaFlow)
> Carpeta documentada: `backend/`

---

## Tabla de contenidos

1. [Arquitectura](#1-arquitectura)
2. [Instalación](#2-instalación)
3. [Variables de entorno](#3-variables-de-entorno)
4. [Scripts](#4-scripts)
5. [Swagger](#5-swagger)
6. [Base de datos](#6-base-de-datos)
7. [Modelos](#7-modelos)
8. [Rutas](#8-rutas)

---

## 1. Arquitectura

El backend sigue una **arquitectura en capas** separando responsabilidades en: rutas → controladores → servicios → repositorios → modelos. Esto facilita testear la lógica de negocio de forma aislada y mantener el acceso a datos desacoplado del resto de la app.

```
backend/
├── src/
│   ├── app.js                  # Punto de entrada: configura Express, Swagger y arranca el server
│   ├── config/
│   │   ├── database.js         # Conexión a PostgreSQL con Sequelize
│   │   └── swagger.js          # Definición OpenAPI (swagger-jsdoc)
│   ├── routes/                 # Definición de endpoints (Express Router)
│   │   ├── index.routes.js     # Router raíz que agrupa todas las sub-rutas
│   │   ├── calculation.routes.js
│   │   ├── lead.routes.js
│   │   └── sharedResult.routes.js
│   ├── controllers/             # Reciben el request, delegan al service y arman la respuesta HTTP
│   │   └── calculation.controller.js
│   ├── services/                # Lógica de negocio (cálculos, reglas, orquestación)
│   │   ├── calculation.service.js
│   │   ├── lead.service.js
│   │   └── sharedResult.service.js
│   ├── repositories/             # Acceso a datos (abstrae las queries de Sequelize)
│   │   ├── CalculationRepository.js
│   │   ├── LeadRepository.js
│   │   └── SharedResultRepository.js
│   ├── models/                   # Definición de entidades Sequelize + asociaciones
│   │   ├── index.models.js       # Registra las relaciones entre modelos
│   │   ├── Lead.model.js
│   │   ├── calculation.model.js
│   │   └── SharedResult.model.js
│   ├── dto/                      # Validación y transformación de datos de entrada
│   │   └── calculation.dto.js
│   ├── middlewares/
│   │   └── errorHandler.js       # Manejo centralizado de errores
│   └── utils/
│       ├── AppError.js           # Clase de error custom (statusCode, isOperational)
│       ├── catchAsync.js         # Wrapper para evitar try/catch repetido en controllers
│       └── calculationFormula.js # Fórmulas puras del cálculo de capacidad varada
├── scripts/
│   ├── seed.js                   # Puebla la base de datos con datos de prueba
│   └── reset-calculations.js     # Resetea la tabla `calculations`
├── package.json
└── .env.example
```

**Flujo de una request** (ejemplo con `POST /api/calculations/calculate`):

```
Cliente → routes → DTO (valida input) → controller → service (lógica/fórmulas)
        → repository (Sequelize) → PostgreSQL
```

Si algo falla en cualquier capa, se lanza un `AppError` (o un error de Sequelize) que es capturado por `catchAsync` y resuelto centralizadamente en `errorHandler.js`.

**Stack principal:**

| Tecnología | Uso |
|---|---|
| Node.js + Express 5 | Servidor HTTP / routing |
| Sequelize + `pg`/`pg-hstore` | ORM sobre PostgreSQL |
| swagger-jsdoc + swagger-ui-express | Documentación OpenAPI |
| validator | Validaciones de datos en el DTO |
| dotenv | Carga de variables de entorno |
| nodemon | Recarga automática en desarrollo |
| ES Modules (`"type": "module"`) | Sintaxis `import`/`export` nativa |

---

## 2. Instalación

### Requisitos previos

- Node.js 18+
- Una base de datos PostgreSQL accesible (local o en la nube "Neon")
- npm (o pnpm, el repo incluye `pnpm-lock.yaml` como alternativa)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/No-Country-simulation/-S07-26-Team-12-PhysaFlow.git
cd -S07-26-Team-12-PhysaFlow/backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales (ver sección siguiente)

# 4. Levantar el servidor en modo desarrollo
npm run dev
```

Por defecto, el servidor queda disponible en `http://localhost:3000`. Al arrancar, Sequelize sincroniza los modelos con la base de datos (`sequelize.sync({ alter: true })`), por lo que no es necesario correr migraciones manuales para tener las tablas creadas.

Podés verificar que todo esté funcionando con:

```bash
curl http://localhost:3000/health
```

---

## 3. Variables de entorno

El archivo `.env.example` en `backend/` define las variables necesarias. Copiarlo como `.env` y completar los valores reales (nunca commitear el `.env`).

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NODE_ENV` | Entorno de ejecución. Cambia el comportamiento del `errorHandler` (respuestas detalladas en `development`, genéricas en `production`) | `development` |
| `PORT` | Puerto en el que escucha el servidor Express | `3000` |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL usada por Sequelize | `postgres://usuario:password@host:5432/db` |
| `DB_DIALECT` | Dialecto de la base de datos (uso informativo, Sequelize ya se configura como `postgres` en `config/database.js`) | `postgres` |
| `DB_LOGGING` | Habilita/deshabilita el log de queries SQL en consola | `false` |
| `SHARE_TOKEN_SECRET` | Secreto para firmar tokens de resultados compartidos (**uso futuro**, aún no implementado en el código) | `your_share_token_secret` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | Configuración de envío de emails (**uso futuro**, aún no implementado) | — |
| `FRONTEND_URL` | URL del frontend, pensada para configurar CORS de forma más restrictiva a futuro | `http://localhost:3001` |
| `SWAGGER_ENABLED` | Flag para habilitar/deshabilitar la documentación Swagger (**uso futuro**; actualmente `/api-docs` se monta siempre) | `true` |

> ⚠️ La conexión a PostgreSQL se realiza con SSL forzado (`ssl.require: true`, `rejectUnauthorized: false`), pensado para proveedores cloud como Render. Si trabajás con una base local sin SSL, puede que necesites ajustar `src/config/database.js`.

---

## 4. Scripts

Definidos en `backend/package.json`:

| Comando | Descripción |
|---|---|
| `npm start` | Levanta el servidor en modo producción (`node src/app.js`) |
| `npm run dev` | Levanta el servidor en modo desarrollo con recarga automática (`nodemon src/app.js`) |
| `npm run seed` | Ejecuta `scripts/seed.js`: limpia las tablas `Lead`, `Calculation` y `SharedResult`, y las puebla con datos de prueba (3 leads, 10 cálculos, 4 resultados compartidos) |

Además, hay un script auxiliar que **no** está registrado en `package.json` y debe ejecutarse manualmente con Node:

```bash
node scripts/reset-calculations.js
```

Este script elimina la tabla `calculations` y su tipo ENUM asociado (`enum_calculations_cooling_type`) en PostgreSQL. Es útil cuando cambia la estructura del modelo `Calculation` y hace falta que `sequelize.sync({ alter: true })` la recree desde cero al reiniciar el servidor.

---

## 5. Swagger

La documentación interactiva de la API se genera con `swagger-jsdoc` a partir de comentarios `@swagger` escritos directamente en los archivos de `src/routes/**/*.js`, y se sirve con `swagger-ui-express`.

- **Configuración:** `src/config/swagger.js`
- **URL local:** `http://localhost:3000/api-docs`
- **Especificación OpenAPI:** `3.0.3`

En `swagger.js` ya están definidos:

- Los **tags** de la API: `Health`, `Lead`, `Calculation`, `SharedResult`.
- Los **schemas** reutilizables (`Lead`, `Calculation`, `SharedResult`), reflejando la forma de cada modelo.
- **Respuestas comunes reutilizables** vía `$ref`: `BadRequest` (400), `NotFound` (404), `ValidationError` (422), `InternalServerError` (500).

Cada endpoint implementado documenta su propio bloque `@swagger` justo encima de la definición de la ruta (ver ejemplo en `POST /api/calculations/calculate` dentro de `calculation.routes.js`), incluyendo `requestBody`, ejemplos (`examples`) y las posibles respuestas.

> Pendiente (marcado como `TODO` en el código): agregar `securitySchemes` cuando se implemente autenticación, y sumar la URL del servidor de producción a `servers` una vez desplegado.

---

## 6. Base de datos

- **Motor:** PostgreSQL
- **ORM:** Sequelize 6, conectado vía `DATABASE_URL` con SSL habilitado (`src/config/database.js`)
- **Sincronización:** al arrancar el servidor, `sequelize.sync({ alter: true })` crea o actualiza automáticamente las tablas según los modelos definidos (no hay carpeta de migraciones formales; el esquema vive en el código de los modelos)

### Relaciones entre entidades

```
Lead (1) ────── hasMany ──────► Calculation (N)
Calculation (N) ── belongsTo (opcional) ──► Lead (1)
   lead_id puede ser NULL → onDelete: SET NULL

Calculation (1) ────── hasMany ──────► SharedResult (N)
SharedResult (N) ── belongsTo ──► Calculation (1)
   onDelete: CASCADE
```

Estas relaciones se declaran en `src/models/index.models.js`, que es el archivo que centraliza las asociaciones entre modelos (se importa una sola vez desde `app.js`).

---

## Notas finales

- El manejo de errores es centralizado: cualquier error lanzado dentro de un controller envuelto en `catchAsync` termina en `middlewares/errorHandler.js`, que distingue entre errores operacionales (`AppError`), errores de Sequelize (`SequelizeValidationError`, `SequelizeUniqueConstraintError`) y errores no controlados, devolviendo un formato de respuesta consistente (`{ success, message, ... }`).
- Todavía no hay autenticación implementada. Varios puntos del código (controller y service de `Calculation`) tienen `TODO`s previendo que, cuando exista auth, el `lead_id` se obtenga desde `req.user.id` en lugar de quedar en `null`.
- No hay `Dockerfile` ni configuración de infraestructura como código en el repo; el despliegue actual se gestiona manualmente en Render.

---

*Documento generado a partir del código fuente en las ramas `main` y `develop` del repositorio, en agosto de 2026.*
****
