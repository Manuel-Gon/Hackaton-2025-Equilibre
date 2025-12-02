import useAuth from "../../hooks/useAuth.js";
// import { getLoginUrl } from "@/const";
import { ArrowRight, Heart, Lightbulb, Users } from "lucide-react";
import { Link } from "wouter";
import "./TelaInicial.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container-tela-inicial">
      <Header/>
      {/* HERO */}
      <section className="sessao-herois">
        <div className="conteudo-herois">
          <div className="logo-herois">
            <div className="circulo-logo">E</div>
          </div>

          <h1 className="titulo-herois">Encontre o seu Equilíbrio</h1>

<<<<<<< HEAD
          <p className="hero-subtitle">
            Seu espaço seguro com recursos e técnicas de saúde mental. <br />
=======
          <p className="subtitulo-herois">
            Seu espaço seguro para apoio, recursos e técnicas de saúde mental.
>>>>>>> 90db31584331659c7593a0563a206d91ad10a5b1
            Cuide de você com compaixão e sem julgamentos.
          </p>

          <div className="botoes-herois">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="botao-principal">
                  Ir para Dashboard <ArrowRight className="icon" />
                </Link>

                <Link href="/Diario" className="botao-dois-titulo">
                  Abrir Diário Emocional
                </Link>
              </>
            ) : (
              <>
                <a className="botao-principal">
                  Começar Agora <ArrowRight className="icon" />
                </a>

                <a href="#features" className="botao-dois-titulo">
                  Conhecer Mais
                </a>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grade-de-estatiticas">
            <div className="stat-item">
              <p className="numeros-status">24/7</p>
              <p className="status-textinho">Disponível sempre</p>
            </div>

            <div className="stat-item">
              <p className="numeros-status">100%</p>
              <p className="status-textinho">Seguro e privado</p>
            </div>

            <div className="stat-item">
              <p className="numeros-status">∞</p>
              <p className="status-textinho">Sem julgamentos</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="sessao-recursos">
        <h2 className="sessao-titulo">O que você encontra no Equilibre</h2>

        <div className="sessao-grade-recursos">
          <div className="card-recursos">
            <div className="icone-recursos">
              <Heart size={26} />
            </div>
            <h3 className="titulo-recursos">Diário Emocional</h3>
            <p className="textinho-recursos">
              Registre seu humor diariamente e acompanhe suas emoções com
              segurança e privacidade.
            </p>
          </div>

          <div className="card-recursos">
            <div className="icone-recursos">
              <Lightbulb size={26} />
            </div>
            <h3 className="titulo-recursos">Exercícios Curtos</h3>
            <p className="textinho-recursos">
              Técnicas de respiração, grounding e mindfulness para momentos de
              ansiedade e estresse.
            </p>
          </div>

          <div className="card-recursos">
            <div className="icone-recursos">
              <Users size={26} />
            </div>
            <h3 className="titulo-recursos">Chat de Apoio</h3>
            <p className="textinho-recursos">
              Converse com nosso chatbot de apoio que ouve sem julgamentos e
              oferece recursos.
            </p>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="features-cta">
            <a className="btn-primary">
              Comece sua Jornada Agora <ArrowRight className="icon" />
            </a>
          </div>
        )}
      </section>

      {/* CRISIS BUTTON */}
      <button className="botao-crise">🆘</button>
      <Footer/>
    </div>
  );
}
//href={getLoginUrl()}