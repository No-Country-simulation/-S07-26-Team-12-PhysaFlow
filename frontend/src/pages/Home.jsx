import PageConainer from "../components/PageContainer";

export default function Home() {
  return (
        <PageConainer>
        <p className="display-hero">Bienvenido a Physaflow</p> 
        <h1 className="display-h1">Capacidad estancada</h1>    
        <h2 className="display-h2">El mapa de fuga entre capas</h2>
        <p className="body-large">Tres datos. Un resultado en segundos.</p>
        <p className="body-regular">Estimado direccional según valor de mercado por MW.</p>
        <p className="label-eyebrow">MOMENTO 01 · INPUT </p>
        <p className="data-big">38.4 MW</p>
        <p className="data-medium">−9.6 MW en overhead</p>
        <p className="data-small">42 MW instalados</p>
        </PageConainer>
  )
}