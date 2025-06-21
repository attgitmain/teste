
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="h-8 w-8" />
              <span className="text-xl font-bold">Loopchat</span>
              <span className="text-sm opacity-80">Tecnologia</span>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-medium mb-2">Receba novidades e promoções.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-colors">
                  ON
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Acesso Rápido</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-200 transition-colors">→ Início</Link></li>
              <li><Link to="/como-funciona" className="hover:text-blue-200 transition-colors">→ Como Funciona</Link></li>
              <li><Link to="/funcionalidades" className="hover:text-blue-200 transition-colors">→ Funcionalidades</Link></li>
              <li><Link to="/planos" className="hover:text-blue-200 transition-colors">→ Quanto custa</Link></li>
              <li><Link to="/contato" className="hover:text-blue-200 transition-colors">→ Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>44988270151</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>44988270151</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>aatendesolucao@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <a
              href="https://app.atendesolucao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors mb-4 inline-block text-center"
            >
              ÁREA DO CLIENTE
            </a>
            <a
              href="https://app.atendesolucao.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-400 transition-colors block w-full text-center"
            >
              Teste grátis 3 dias!
            </a>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© 2024 Loopchat Tecnologia. CNPJ 49.554.559/0001-52 Avenida Paulista, nº 1471 - São Paulo SP ©. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
