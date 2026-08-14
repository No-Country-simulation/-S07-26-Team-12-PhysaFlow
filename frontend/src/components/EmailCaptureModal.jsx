import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { screenSize } from "./hooks/screenSize";
import Loader from "./reusableComponents/Loader";

export default function EmailCaptureModal({ onClose }) {
  const { isMobile } = screenSize();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) return;

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailError("Ingresá tu email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError("Ingresá un email válido");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    // Simula la respuesta del backend hasta que exista el endpoint real.
    setTimeout(() => {
      navigate("/full-result", {
        state: { showUnlockSuccess: true },
      });
    }, 900);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex bg-green-darker/35 backdrop-blur-sm ${
        isMobile ? "items-end px-0 py-0" : "items-center justify-center px-4 py-8"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-capture-title"
    >
      <div
        className={`relative w-full bg-white shadow-2xl ${
          isMobile
            ? "max-h-[calc(100dvh-120px)] max-w-none rounded-t-[24px] px-4 pb-7 pt-6"
            : "max-w-[520px] rounded-[24px] px-7 py-10 sm:px-11 sm:py-11"
        }`}
      >
        {isMobile && (
          <span className="absolute left-1/2 top-2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-green-lightest" />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          disabled={isLoading}
          className={`absolute right-5 top-4 text-2xl leading-none text-green-dark transition hover:text-green-darker ${
            isMobile ? "sr-only" : ""
          }`}
        >
          &times;
        </button>

        <p
          className={`font-data font-medium tracking-[0.12em] text-gold-darker ${
            isMobile ? "text-[8px]" : "text-[11px]"
          }`}
        >
          DESBLOQUEÁ TU ANÁLISIS COMPLETO
        </p>

        <h2
          id="email-capture-title"
          className={`font-title font-semibold leading-tight text-green-darker ${
            isMobile ? "mt-4 text-[17px]" : "mt-6 text-[28px] sm:text-[30px]"
          }`}
        >
          Vas bien — profundicemos
        </h2>

        {!isMobile && (
          <p className="mt-5 text-sm leading-6 text-green-dark">
            Con tu email desbloqueás lo que sigue, sin costo:
          </p>
        )}

        <ul
          className={`text-green-darker ${
            isMobile ? "mt-3 space-y-2 text-[9px]" : "mt-5 space-y-3 text-sm"
          }`}
        >
          <li className="flex items-start gap-2">
            <span className={`flex shrink-0 items-center justify-center rounded-full bg-green-lightest font-bold text-green-dark ${isMobile ? "mt-px h-3 w-3 text-[8px]" : "h-4 w-4 text-xs"}`}>
              ✓
            </span>
            <span>
              <strong className="block font-semibold">Comparación de escenarios</strong>
              {!isMobile && <span className="text-xs text-green-dark">Actual vs. optimizado, lado a lado</span>}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className={`flex shrink-0 items-center justify-center rounded-full bg-green-lightest font-bold text-green-dark ${isMobile ? "mt-px h-3 w-3 text-[8px]" : "h-4 w-4 text-xs"}`}>
              ✓
            </span>
            <span>
              <strong className="block font-semibold">Breakdown por capa</strong>
              {!isMobile && <span className="text-xs text-green-dark">Facility, IT y Workload en detalle, con causas</span>}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className={`flex shrink-0 items-center justify-center rounded-full bg-green-lightest font-bold text-green-dark ${isMobile ? "mt-px h-3 w-3 text-[8px]" : "h-4 w-4 text-xs"}`}>
              ✓
            </span>
            <span>
              <strong className="block font-semibold">PDF descargable</strong>
              {!isMobile && <span className="text-xs text-green-dark">Para llevar a tu equipo o a finanzas</span>}
            </span>
          </li>
        </ul>

        <form
          className={isMobile ? "mt-4" : "mt-6"}
          noValidate
          onSubmit={handleSubmit}
        >
          <label htmlFor="capture-email" className="sr-only">
            Tu email
          </label>
          <input
            id="capture-email"
            name="email"
            type="email"
            placeholder="nombre@empresa.com"
            value={email}
            onChange={(event) => {
              if (isLoading) return;
              setEmail(event.target.value);
              setEmailError("");
            }}
            disabled={isLoading}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "capture-email-error" : undefined}
            className={`w-full rounded-xl border bg-[#f7f5eb] text-green-darker outline-none placeholder:text-green-dark/80 focus:ring-2 focus:ring-green-light/30 disabled:cursor-not-allowed disabled:opacity-60 ${
              emailError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                : "border-green-lightest focus:border-green-light"
            } ${
              isMobile ? "px-3 py-2.5 text-[10px]" : "px-4 py-3 text-sm"
            }`}
          />
          {emailError && (
            <p
              id="capture-email-error"
              role="alert"
              className={`mt-2 text-red-600 ${isMobile ? "text-[9px]" : "text-xs"}`}
            >
              {emailError}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-3 w-full rounded-xl bg-gold-dark px-4 font-semibold text-green-darker transition hover:bg-gold-darker focus:outline-none focus:ring-2 focus:ring-gold-dark/50 ${
              isMobile ? "py-2.5 text-[10px]" : "py-3 text-sm"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader size="sm" />
              </span>
            ) : isMobile ? (
              "Desbloquear análisis →"
            ) : (
              "Desbloquear análisis completo →"
            )}
          </button>
        </form>

        {!isMobile && (
          <p className="mt-5 text-xs leading-5 text-green-dark">
            Sin spam. Un email de bienvenida y nada más, salvo que quieras más.
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className={`font-semibold text-green-dark transition hover:text-green-darker ${
            isMobile ? "mt-3 block w-full text-center text-[9px]" : "mt-4 text-left text-sm"
          }`}
        >
          Seguir con mi resultado básico →
        </button>
      </div>
    </div>
  );
}
