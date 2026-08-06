import { Link } from "react-router-dom";
import { screenSize } from "../components/hooks/screenSize";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import RoundedButton from "../components/reusableComponents/RoundedButton";



export default function Home() {
  const{isMobile, isTablet}=screenSize()

  return (
        <PageConainer>
          <div className={`flex ${(isMobile || isTablet) ? "flex-col" :"flex-row"} h-full `}>
            <div className={`${(!isMobile && !isTablet) ? "w-1/2":"w-full"} flex flex-col justify-center content-center`}>
            <h1 className="display-hero">
              Calculá la capacidad estancada de tu datacenter
            </h1>
            <Spacing size="xs"/>
            <p >Identificá cuánto MW perdés por sobreaprovisionamiento, en minutos</p>
            <Spacing size="lg"/>
            <div className={`${(isMobile || isTablet) ? "flex justify-center" :""}`}>
              <Link to="/form">
                <RoundedButton text="Calcula ahora" color="green"/>
              </Link>
            </div>
            </div>
            {(isMobile || isTablet) && <Spacing/>}
            <div className={`${(!isMobile && !isTablet) ? "w-1/2":"w-full"} flex items-center justify-center `}>
                <img 
                src="https://img.magnific.com/foto-gratis/centro-datos-moderno-que-brinda-servicios-nube-lo-que-permite-empresas-acceder-recursos-informaticos-almacenamiento-demanda-traves-internet-animacion-renderizado-3d-infraestructura-sala-servidores_482257-65963.jpg?semt=ais_test_b&w=740&q=80" 
                alt="datacenter"
                className="w-full h-auto object-contain"
                />
            </div>
          </div>
        </PageConainer>
  )
}