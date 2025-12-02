import { Heart, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import "./Footer.css"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Grid principal */}
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-area">
              <div className="footer-logo">E</div>
              <span className="footer-title">Equilibre</span>
            </div>
            <p className="footer-description">
              Sua plataforma de apoio à saúde mental. Encontre equilíbrio, cuidado e esperança.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="footer-heading">Navegação</h3>
            <ul className="footer-list">
              <li><Link href="/" className="footer-link">Início</Link></li>
              <li><Link href="/about" className="footer-link">Sobre</Link></li>
              <li><Link href="/resources" className="footer-link">Recursos</Link></li>
              <li><Link href="/contact" className="footer-link">Contato</Link></li>
            </ul>
          </div>

          {/* Saúde Mental */}
          <div>
            <h3 className="footer-heading">Saúde Mental</h3>
            <ul className="footer-list">
              <li><Link href="/topics/anxiety" className="footer-link">Ansiedade</Link></li>
              <li><Link href="/topics/stress" className="footer-link">Estresse</Link></li>
              <li><Link href="/topics/depression" className="footer-link">Depressão</Link></li>
              <li><Link href="/crisis" className="footer-link">Em Crise?</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="footer-heading">Contato</h3>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <Mail className="footer-icon" />
                <a href="mailto:support@equilibre.com" className="footer-link">
                  support@equilibre.com
                </a>
              </li>

              <li className="footer-contact-item">
                <Phone className="footer-icon" />
                <a href="tel:+5511999999999" className="footer-link">
                  +55 (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider">
          <div className="footer-bottom">
            <p className="footer-copy">
              © {currentYear} Equilibre. Todos os direitos reservados.
            </p>

            <div className="footer-bottom-links">
              <Link href="/privacy" className="footer-link">Privacidade</Link>
              <Link href="/terms" className="footer-link">Termos</Link>
              <a
                href="https://www.instagram.com/equilibre"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="footer-love">
            <Heart className="footer-heart-icon" />
            <span>Feito com cuidado para sua saúde mental</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
