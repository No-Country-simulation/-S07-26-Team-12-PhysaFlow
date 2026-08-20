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
            <div className={`${(!isMobile && !isTablet) ? "w-1/2":"w-full"} flex items-center justify-center  `}>
                <img 
                src="https://res.cloudinary.com/duaoa6n1z/image/upload/v1787197834/Nocountry/Screenshot_2026-08-19_at_10.48.56_p.m._nypqsd.png" 
                alt="datacenter"
                className="w-3/4 h-auto object-contain border rounded"
                />
            </div>
          </div>
   
        </PageConainer>
  )
}