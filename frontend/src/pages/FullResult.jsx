import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import CapacityFlow from "../components/Flow/CapacityFlow";
import ResultGraphic from "../components/Flow/ResultGraphic";




export default function FullResult() {
  return (
    <PageConainer>
      <div className="">
        <h1 className="display-hero">Cálculo</h1>
        <Spacing size="lg"/>

        <ResultGraphic/>



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
      </div>
    </PageConainer>
  );
}
