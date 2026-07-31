import InputForm from "../components/inputsform/inputForm";
 
export default function CalculatorPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header — logo + volver */}
      <header className="w-full flex items-center px-4 py-3">
        <span className="text-sm">Header — logo</span>
        <span className="text-sm ml-4">&larr; Volver</span>
      </header>
 
      {/* Contenido principal: formulario + panel de ayuda */}
      <main className="w-full flex-1 flex flex-col md:flex-row gap-8 px-6 py-8">
        {/* Columna izquierda: formulario */}
        <section className="w-full md:w-1/2 flex justify-center">
          <InputForm />
        </section>
 
        {/* Columna derecha: panel de ayuda / ejemplo de datos */}
        <aside className="w-full md:w-1/2 flex items-center justify-center border border-dashed min-h-[300px]">
          <p className="text-sm text-center">
            Panel de ayuda / ejemplo de datos
            <br />
            — definido en Sprint 3 —
          </p>
        </aside>
      </main>
    </div>
  );
}