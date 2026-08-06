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
  return (
    <PageConainer>
      
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
