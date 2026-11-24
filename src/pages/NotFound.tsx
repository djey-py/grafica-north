import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-16 md:py-24" aria-labelledby="not-found-title">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-electric/15 blur-[110px]" />
      <div className="shell relative">
        <div className="card mx-auto flex max-w-3xl flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
          <Compass className="h-10 w-10 text-aqua" aria-hidden="true" />
          <p className="gradient-text mt-5 text-7xl leading-none font-extrabold tracking-tight md:text-9xl">404</p>
          <h1 id="not-found-title" className="mt-6 text-xl font-extrabold tracking-[0.12em] text-white uppercase md:text-2xl">
            Página não encontrada
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
            A página que procura não existe ou foi movida.
          </p>
          <Link to="/" className="btn btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </section>
  );
}
