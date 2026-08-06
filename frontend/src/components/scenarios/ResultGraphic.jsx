import Spacing from "../spacing/Spacing";




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
            value:10,
            color:"#1B4632"
        }

    ];

export default function ResultGraphic() {
  return (
    <div className="p-2 border border-dashed border-green-dark rounded">
      <div className="flex justify-around">
        <h3>Capacidad retenida por capa — Facility → IT → Workload</h3>
        <div className="flex justify-center items-center ">
          <div className="flex flex-justify-center items-center pr-3">
            <div className="bg-green-dark rounded-full w-3 h-3" />
            <p className="data-small pl-2 text-green-dark">Actual</p>
          </div>
          <div className="flex flex-justify-center items-center">
            <div className="bg-gold-dark rounded-full w-3 h-3" />
            <p className="data-small pl-2 text-green-dark">Optimizado</p>
          </div>
        </div>
      </div>
      <Spacing size="md" />
     
    </div>
  );
}
