import { useEffect, useState } from "react";
import {
  downloadCalculationPdf,
  getCalculation,
} from "../../services/calculatorService";

export default function useFullResult(id) {
  const [calculation, setCalculation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCalculation = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getCalculation(id);

        if (isMounted) setCalculation(response.data);
      } catch (fetchError) {
        console.error("Error loading full result:", fetchError);
        if (isMounted) setError("No pudimos cargar este resultado.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (id) fetchCalculation();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      await downloadCalculationPdf(id);
    } catch (downloadError) {
      console.error("Error downloading PDF:", downloadError);
      alert("No pudimos descargar el PDF. Intentá nuevamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    calculation,
    error,
    isDownloading,
    isLoading,
    handleDownloadPdf,
  };
}
