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
    <div className="home-container">
      <Header/>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-circle">E</div>
          </div>

          <h1 className="hero-title">Encontre o seu Equilíbrio</h1>

          <p className="hero-subtitle">
            Seu espaço seguro com recursos e técnicas de saúde mental. <br />
            Cuide de você com compaixão e sem julgamentos.
          </p>

          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn-primary">
                  Ir para Dashboard <ArrowRight className="icon" />
                </Link>

                <Link href="/diary" className="btn-outline">
                  Abrir Diário Emocional
                </Link>
              </>
            ) : (
              <>
                <a className="btn-primary-inicial">
                  Começar Agora <ArrowRight className="icon" />
                </a>

                <a href="#features" className="btn-outline">
                  Conhecer Mais
                </a>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-item">
              <p className="stat-number">24/7</p>
              <p className="stat-text">Disponível sempre</p>
            </div>

            <div className="stat-item">
              <p className="stat-number">100%</p>
              <p className="stat-text">Seguro e privado</p>
            </div>

            <div className="stat-item">
              <p className="stat-number">∞</p>
              <p className="stat-text">Sem julgamentos</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features-section">
        <h2 className="features-title">O que você encontra no Equilibre</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Heart size={26} />
            </div>
            <h3 className="feature-title">Diário Emocional</h3>
            <p className="feature-text">
              Registre seu humor diariamente e acompanhe suas emoções com
              segurança e privacidade.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Lightbulb size={26} />
            </div>
            <h3 className="feature-title">Exercícios Curtos</h3>
            <p className="feature-text">
              Técnicas de respiração, grounding e mindfulness para momentos de
              ansiedade e estresse.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={26} />
            </div>
            <h3 className="feature-title">Chat de Apoio</h3>
            <p className="feature-text">
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
      <button className="crisis-button">🆘</button>
      <Footer/>
    </div>
  );
}
//href={getLoginUrl()}