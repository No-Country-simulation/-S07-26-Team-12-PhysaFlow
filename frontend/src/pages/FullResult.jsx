import { useLocation } from "react-router-dom";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import CapacityFlow from "../components/capacity/CapacityFlow";


 const layers = [

        {
            id:1,
            label:"Facility",
            value:22,
            color:"#6FA98A"
        },

        {
            id:2,
            label:"IT",
            value:17,
            
        },

        {
            id:3,
            label:"Workload",
            value:12,
            color:"#1B4632"
        }

    ];


export default function FullResult() {
  const { state } = useLocation();

  return (
    <PageConainer>
      {state?.showUnlockSuccess && (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 rounded-xl border border-green-lightest bg-green-lightest/60 px-4 py-3 text-sm text-green-darker"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-dark font-bold text-white">
            ✓
          </span>
          <span>
            <strong className="block">Análisis completo desbloqueado</strong>
            Ya podés consultar toda la información de tu resultado.
          </span>
        </div>
      )}
      
        <h1>El mapa de fuga entre capas</h1>
        <Spacing size="lg"/>      
        <CapacityFlow layers={layers}/>
        <Spacing/>
        <div className="flex justify-around">
          <p className="p-2 bg-gold-light rounded min-w-1/8 text-center">
            Comparar
          </p>
          <p className="p-2 bg-gold-light rounded min-w-1/8 text-center">PDF</p>
          <p className="p-2 bg-gold-light rounded min-w-1/8 text-center">
            share
          </p>
        </div>
     
    </PageConainer>
  );
}
