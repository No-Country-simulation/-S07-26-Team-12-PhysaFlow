# PhysaFlow - Calculadora de Capacidad

Guía técnica para el desarrollo de la calculadora de capacidad desperdiciada en data centers. Esta herramienta permite a los operadores estimar en menos de 3 minutos cuánta capacidad están desperdiciando y cuánto les cuesta por año.

## Contexto del proyecto

PhysaFlow necesita una herramienta viral que cualquier operador de data center pueda usar rápidamente. El operador obtiene su resultado, lo comparte con un colega, y el colega quiere calcular el suyo.

### Los tres momentos del flujo

**Momento 1 — Input**
- Tamaño del facility en MW
- Utilización aproximada (%)
- Tipo de cooling
- Tres campos, sin fricción

**Momento 2 — Resultado básico**
- Inmediato, sin email, visible para todos
- Stranded capacity estimada en % y MW
- Pérdida financiera anual estimada en rango de dólares

**Momento 3 — Login / Registro**
- El operador que quiere más hace login o se registra (no es un gate, es un intercambio)
- Acceso a visualización de las tres capas con breakdown (facility, IT, workload)
- Comparar escenarios múltiples
- Descargar PDF con resultados
- Guardar cálculo en su historial personal

### Visualización icónica

La pieza más importante: visualización interactiva de las tres capas mostrando dónde se pierde capacidad entre ellas. Esta visualización debe convertirse en la imagen icónica asociada a PhysaFlow.

**Las tres capas:**
1. **Facility** — infraestructura física (cooling, energía, espacio)
2. **IT** — servidores, storage, networking
3. **Workload** — cargas de trabajo reales vs capacidad provisionada

## Decisiones técnicas obligatorias

| Tema | Decisión |
|---|---|
| Gestor de paquetes | Usar **npm**. |
| Lenguaje | **JavaScript** con React. No usar TypeScript. |
| Bundler | **Vite** |
| UI | React 19, Tailwind CSS |
| Arquitectura | **Feature-first** con screaming architecture |
| Paleta de colores | Forest-green y gold |

## Stack técnico

- **React 19** como librería principal de UI
- **JavaScript** como lenguaje del proyecto
- **Vite** como herramienta de desarrollo y build
- **Tailwind CSS** para todos los estilos
- **React Router v7** para navegación (`react-router`)
- **Framer Motion** para animaciones de la visualización de capas
- **Recharts** para gráficos de comparación de escenarios
- **jspdf** para generación de PDF descargable
- **Zustand** para estado global del flujo de la calculadora
- **Vercel** para deploy

## Arquitectura del proyecto

Estructura feature-first con screaming architecture:

```txt
src/
  app/
    router/
      AppRouter.jsx
    providers/
      AuthProvider.jsx
      CalculatorProvider.jsx
  features/
    auth/
      components/
        LoginForm/
          LoginForm.jsx
          LoginForm.module.css
        RegisterForm/
          RegisterForm.jsx
          RegisterForm.module.css
        AuthModal/
          AuthModal.jsx
          AuthModal.module.css
      pages/
        LoginPage.jsx
        RegisterPage.jsx
      hooks/
        useAuth.js
      services/
        authService.js
      lib/
        validation.js
    calculator/
      components/
        InputForm/
          InputForm.jsx
          InputForm.module.css
          fields/
            FacilitySizeField.jsx
            UtilizationField.jsx
            CoolingTypeField.jsx
        BasicResult/
          BasicResult.jsx
          BasicResult.module.css
          StrandedCapacityCard.jsx
          FinancialLossCard.jsx
        LayerVisualization/
          LayerVisualization.jsx
          LayerVisualization.module.css
          layers/
            FacilityLayer.jsx
            ITLayer.jsx
            WorkloadLayer.jsx
          animations/
            layerTransitions.js
        ScenarioComparison/
          ScenarioComparison.jsx
          ScenarioComparison.module.css
          ScenarioCard.jsx
        ShareableResult/
          ShareableResult.jsx
          ShareableResult.module.css
          generateShareImage.js
        PDFDownload/
          PDFDownload.jsx
          generatePDF.js
      pages/
        CalculatorPage.jsx
        CalculatorPage.module.css
      hooks/
        useCalculator.js
        useScenarios.js
        useLayerAnimation.js
      services/
        calculateStrandedCapacity.js
        calculateFinancialLoss.js
        generatePDFReport.js
      lib/
        constants.js
        calculations.js
        validation.js
    profile/
      components/
        CalculationHistory/
          CalculationHistory.jsx
          CalculationHistory.module.css
          HistoryCard.jsx
        ProfileHeader/
          ProfileHeader.jsx
          ProfileHeader.module.css
      pages/
        ProfilePage.jsx
        ProfilePage.module.css
      hooks/
        useCalculationHistory.js
      services/
        historyService.js
    landing/
      components/
        Hero/
        Features/
        CTA/
      pages/
        LandingPage.jsx
  shared/
    components/
      ui/
        Button.jsx
        Card.jsx
        Input.jsx
        Label.jsx
        Dialog.jsx
      layout/
        Header.jsx
        Footer.jsx
    hooks/
      useEmailValidation.js
    lib/
      utils.js
    styles/
      colors.js
      typography.js
    constants/
      coolingTypes.js
      calculationFormulas.js
```

## Paleta de colores

Sistema de diseño PhysaFlow con forest-green y gold:

```javascript
// src/shared/styles/colors.js
export const colors = {
  forest: {
    50: '#f0f9f4',
    100: '#e0f3e8',
    200: '#bfe6d0',
    300: '#9dd9b8',
    400: '#7bcc9f',
    500: '#2d6a4f', // primary
    600: '#245a42',
    700: '#1b4735',
    800: '#133528',
    900: '#0a231b',
  },
  gold: {
    50: '#fffdf5',
    100: '#fff9e6',
    200: '#fff3cc',
    300: '#ffedb3',
    400: '#ffd966',
    500: '#d4a017', // accent
    600: '#b8860b',
    700: '#8b6914',
    800: '#5f4a0f',
    900: '#332809',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  }
};
```

## Configuración de Tailwind

Extender Tailwind con la paleta PhysaFlow en `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2d6a4f',
          50: '#f0f9f4',
          100: '#e0f3e8',
          200: '#bfe6d0',
          300: '#9dd9b8',
          400: '#7bcc9f',
          500: '#2d6a4f',
          600: '#245a42',
          700: '#1b4735',
          800: '#133528',
          900: '#0a231b',
        },
        gold: {
          DEFAULT: '#d4a017',
          50: '#fffdf5',
          100: '#fff9e6',
          200: '#fff3cc',
          300: '#ffedb3',
          400: '#ffd966',
          500: '#d4a017',
          600: '#b8860b',
          700: '#8b6914',
          800: '#5f4a0f',
          900: '#332809',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## Flujo completo de la aplicación

```
1. Usuario llega a la landing page
   ↓
2. Hace clic en "Calcular mi capacidad"
   ↓
3. Completa el formulario (Momento 1 - Input)
   - facilitySize (MW)
   - utilization (%)
   - coolingType
   ↓
4. Ve el resultado básico inmediatamente (Momento 2)
   - Stranded capacity en % y MW
   - Pérdida financiera anual en rango $
   ↓
5. Opciones disponibles:
   a) Compartir resultado básico (sin login)
   b) Hacer Login / Registro para acceder a funcionalidades completas (Momento 3)
   ↓
6. Si hace login/registro:
   - Ve visualización de las 3 capas con breakdown completo
   - Puede comparar escenarios múltiples
   - Puede descargar PDF
   - Puede guardar el cálculo en su historial
   - Puede compartir resultado completo
   ↓
7. Perfil / Historial:
   - Ve todos sus cálculos anteriores
   - Puede reabrir y modificar cálculos guardados
   - Puede descargar PDF de cálculos anteriores
   - Puede compartir cualquier cálculo guardado
```


## Sistema de autenticación

El login/registro es la puerta a funcionalidades avanzadas. No es un gate molesto, es un intercambio de valor: el usuario obtiene historial, PDF y comparación de escenarios a cambio de crear una cuenta.

### Flujo de autenticación

```
1. Usuario ve resultado básico
   ↓
2. Hace clic en "Ver desglose completo" o "Descargar PDF"
   ↓
3. Se abre modal de login/registro
   ↓
4. Usuario se autentica (o registra)
   ↓
5. El cálculo actual se guarda automáticamente en su historial
   ↓
6. Usuario accede a:
   - Visualización completa de las 3 capas
   - Comparación de escenarios
   - Descarga de PDF
   - Perfil con historial de cálculos
```

## Perfil e historial de cálculos

El perfil del usuario muestra todos sus cálculos guardados, permitiendo reabrirlos, modificarlos, descargar PDF o compartirlos.


## Creación del proyecto

```bash
npm create vite@latest physaflow-calculator -- --template react
cd physaflow-calculator
npm install
```

Instalar dependencias:

```bash
npm install react-router@latest
npm install framer-motion@latest
npm install recharts@latest
npm install zustand@latest
npm install jspdf@latest
npm install tailwindcss@latest @tailwindcss/vite@latest
```

Configurar Tailwind en `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Importar Tailwind en `src/index.css`:

```css
@import "tailwindcss";
```

## Checklist para otra IA

Antes de generar código, la IA debe respetar estas reglas:

- [ ] Crear el proyecto con Vite, React y JavaScript usando `npm create vite@latest`
- [ ] No usar TypeScript, `.ts` ni `.tsx`
- [ ] Instalar dependencias con `@latest` cuando corresponda
- [ ] Configurar Tailwind CSS con `@tailwindcss/vite`
- [ ] Usar la paleta forest-green y gold definida en el diseño
- [ ] Mantener la arquitectura feature-first: lo específico vive en `src/features/<feature>`
- [ ] Separar componentes por responsabilidad (pages, components, hooks, services, lib)
- [ ] Usar Framer Motion para animaciones de la visualización de capas
- [ ] Usar Zustand para estado global del flujo de la calculadora
- [ ] Implementar los tres momentos del flujo (input, resultado básico, login/registro)
- [ ] La visualización de las tres capas debe ser interactiva y animada
- [ ] Permitir comparación de múltiples escenarios
- [ ] Generar PDF descargable con html2canvas + jspdf
- [ ] Diseñar el resultado compartible como imagen o resumen visual
- [ ] Implementar login/registro como puerta a funcionalidades avanzadas
- [ ] Implementar historial de cálculos guardados por usuario
- [ ] Implementar perfil de usuario con acceso a historial
- [ ] Permitir guardar, reabrir y modificar cálculos anteriores

## Criterio de éxito

Un desarrollador frontend puede tomar esta especificación y construir la calculadora sin necesitar hacer decisiones de diseño. La visualización de las tres capas es clara, memorable y distinta a cualquier cosa existente en la industria.

**Métricas de éxito:**
- Tiempo para completar el cálculo: < 3 minutos
- Tasa de conversión a registro/login: > 30%
- Tasa de compartir resultado: > 15%
- Descargas de PDF: > 20%
- Cálculos guardados por usuario activo: > 2

## Links útiles

- React: https://react.dev/
- Vite: https://vite.dev/
- Tailwind CSS: https://tailwindcss.com/
- Framer Motion: https://www.framer.com/motion/
- Recharts: https://recharts.org/
- Zustand: https://github.com/pmndrs/zustand
- React Router: https://reactrouter.com/
- Vercel: https://vercel.com/
- jsPDF: https://www.npmjs.com/package/jspdf
