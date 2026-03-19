import { Github, Twitter, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-3 text-gradient">Notarial</h3>
            <p className="text-white/60 mb-4">
              Transferencia de inmuebles sin escribano, 100% legal, en menos de 20 minutos.
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://github.com/hernan2292/notarial" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="https://twitter.com/notarial" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="https://t.me/notarial" icon={<Send className="w-5 h-5" />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Producto</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Cómo funciona</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Recursos</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
            </ul>
          </div>
        </div>

        {/* Sponsors */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-center text-white/40 mb-4 text-sm">Powered by</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <SponsorBadge name="Scroll" />
            <SponsorBadge name="Crossmint" />
            <SponsorBadge name="World ID" />
            <SponsorBadge name="Wormhole" />
            <SponsorBadge name="Chainlink" />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {currentYear} Notarial. Hecho con ❤️ en Argentina para ETHArgentina 2025</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
    >
      {icon}
    </a>
  );
}

function SponsorBadge({ name }) {
  return (
    <div className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
      {name}
    </div>
  );
}
