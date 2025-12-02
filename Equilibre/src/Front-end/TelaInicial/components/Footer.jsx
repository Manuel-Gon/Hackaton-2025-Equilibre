import { Heart, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import "./Footer.css"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="container-rodape">

        {/* Grid principal */}
        <div className="grade-rodape">

          {/* Brand */}
          <div className="marquinha-rodape">
            <div className="footer-logo-area">
              <div className="logo-rodape">E</div>
              <span className="titulo-rodape">Equilibre</span>
            </div>
            <p className="descricao-rodape">
              Sua plataforma de apoio à saúde mental. Encontre equilíbrio, cuidado e esperança.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="cabecalho-rodape">Navegação</h3>
            <ul className="lista-rodape">
              <li><Link href="/" className="link-rodape">Início</Link></li>
              <li><Link href="/about" className="link-rodape">Sobre</Link></li>
              <li><Link href="/resources" className="link-rodape">Recursos</Link></li>
              <li><Link href="/contact" className="link-rodape">Contato</Link></li>
            </ul>
          </div>

          {/* Saúde Mental */}
          <div>
            <h3 className="cabecalho-rodape">Saúde Mental</h3>
            <ul className="lista-rodape">
              <li><Link href="/topics/anxiety" className="link-rodape">Ansiedade</Link></li>
              <li><Link href="/topics/stress" className="link-rodape">Estresse</Link></li>
              <li><Link href="/topics/depression" className="link-rodape">Depressão</Link></li>
              <li><Link href="/crisis" className="link-rodape">Em Crise?</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="cabecalho-rodape">Contato</h3>
            <ul className="lista-rodape">
              <li className="item-contato-rodape">
                <Mail className="icone-rodape" />
                <a href="mailto:support@equilibre.com" className="link-rodape">
                  support@equilibre.com
                </a>
              </li>

              <li className="item-contato-rodape">
                <Phone className="icone-rodape" />
                <a href="tel:+5511999999999" className="link-rodape">
                  +55 (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divisao-rodape">
          <div className="parte-baixa-rodape">
            <p className="copia-rodape">
              © {currentYear} Equilibre. Todos os direitos reservados.
            </p>

            <div className="parte-baixa-botoes-rodape">
              <Link href="/privacy" className="link-rodape">Privacidade</Link>
              <Link href="/terms" className="link-rodape">Termos</Link>
              <a
                href="https://www.instagram.com/equilibre"
                target="_blank"
                rel="noopener noreferrer"
                className="link-rodape"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="coracao-rodape">
            <Heart className="icone-coracao-rodape" />
            <span>Feito com cuidado para sua saúde mental</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
