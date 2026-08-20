import { Link } from "react-router-dom";
import PageConainer from "../components/PageContainer";
import RoundedButton from "../components/reusableComponents/RoundedButton";
import Spacing from "../components/spacing/Spacing";

export default function NotFound() {
  return (
    <PageConainer>
      <div className="flex flex-col justfy-center items-center">
        <Spacing/>
        <h1 className="display-hero text-9xl" >404</h1>
        <h1 className="text-7xl">pagina no encontrada</h1>
        <Spacing/>
        <Link to="/form">
          <RoundedButton text="Calcular mi capacidad" color="gold" />
        </Link>
      </div>
    </PageConainer>
  );
}
