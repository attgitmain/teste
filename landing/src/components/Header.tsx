
import { MessageCircle, Menu, X, ChevronDown, Phone, Mail, Headphones } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuportOpen, setIsSuportOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-3xl shadow-2xl sticky top-0 z-50 border-b border-sky-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img
                src="/uploads/0a4ed3fa-67d6-40a4-a5c4-1b104d56f358.png"
                alt="Loopchat Logo" 
                className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
              />
              <div className="absolute -inset-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
            </div>
            <div>
              <span className="text-3xl font-black bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Loopchat
              </span>
              <div className="text-xs text-sky-600 font-bold tracking-wider opacity-80">TECNOLOGIA</div>
            </div>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            <Link 
              to="/como-funciona" 
              className={cn(
                "text-gray-700 hover:text-sky-600 transition-all duration-300 font-bold text-sm tracking-wide relative group py-2",
                isActive("/como-funciona") && "text-sky-600"
              )}
            >
              COMO FUNCIONA
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              {isActive("/como-funciona") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-blue-500"></div>}
            </Link>
            <Link 
              to="/planos" 
              className={cn(
                "text-gray-700 hover:text-sky-600 transition-all duration-300 font-bold text-sm tracking-wide relative group py-2",
                isActive("/planos") && "text-sky-600"
              )}
            >
              PLANOS
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              {isActive("/planos") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-blue-500"></div>}
            </Link>
            <Link 
              to="/funcionalidades" 
              className={cn(
                "text-gray-700 hover:text-sky-600 transition-all duration-300 font-bold text-sm tracking-wide relative group py-2",
                isActive("/funcionalidades") && "text-sky-600"
              )}
            >
              FUNCIONALIDADES
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              {isActive("/funcionalidades") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-blue-500"></div>}
            </Link>
            <Link 
              to="/white-label" 
              className={cn(
                "text-gray-700 hover:text-sky-600 transition-all duration-300 font-bold text-sm tracking-wide relative group py-2",
                isActive("/white-label") && "text-sky-600"
              )}
            >
              WHITE LABEL
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              {isActive("/white-label") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-blue-500"></div>}
            </Link>
            
            {/* Suporte Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-sky-600 transition-all duration-300 font-bold text-sm tracking-wide py-2"
                onMouseEnter={() => setIsSuportOpen(true)}
                onMouseLeave={() => setIsSuportOpen(false)}
              >
                <Headphones className="h-4 w-4" />
                <span>SUPORTE</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", isSuportOpen && "rotate-180")} />
              </button>
              
              {isSuportOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-sky-100 py-6 px-4 animate-fade-in"
                  onMouseEnter={() => setIsSuportOpen(true)}
                  onMouseLeave={() => setIsSuportOpen(false)}
                >
                  <Link 
                    to="/contato" 
                    className="flex items-center space-x-4 px-6 py-4 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 rounded-2xl transition-all duration-300 group/item"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-base">Contato</div>
                      <div className="text-sm text-gray-500">aatendesolucao@gmail.com</div>
                    </div>
                  </Link>
                  
                  <a
                    href="tel:44988270151"
                    className="flex items-center space-x-4 px-6 py-4 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 rounded-2xl transition-all duration-300 group/item"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-base">Telefone</div>
                      <div className="text-sm text-gray-500">44988270151</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://wa.me/5544988270151"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 px-6 py-4 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 rounded-2xl transition-all duration-300 group/item"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-base">WhatsApp</div>
                      <div className="text-sm text-gray-500">44988270151</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://app.atendesolucao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-sky-500 text-sky-600 px-8 py-3 rounded-2xl font-bold text-sm tracking-wide hover:bg-sky-50 transition-all duration-300"
            >
              ÁREA DO CLIENTE
            </a>
            <a
              href="https://app.atendesolucao.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm tracking-wide hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-sky-500/30 transform hover:scale-105 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>TESTE GRÁTIS 7 DIAS</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
            </a>
          </div>

          <button 
            className="lg:hidden p-3 rounded-2xl hover:bg-sky-50 transition-colors border border-sky-100 shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-sky-600" /> : <Menu className="h-6 w-6 text-sky-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-8 border-t border-sky-100 bg-white/95 backdrop-blur-3xl rounded-b-3xl mx-4 mb-4 shadow-2xl animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/como-funciona" 
                className="text-gray-700 hover:text-sky-600 font-bold py-4 px-6 rounded-2xl hover:bg-sky-50 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                COMO FUNCIONA
              </Link>
              <Link 
                to="/planos" 
                className="text-gray-700 hover:text-sky-600 font-bold py-4 px-6 rounded-2xl hover:bg-sky-50 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                PLANOS
              </Link>
              <Link 
                to="/funcionalidades" 
                className="text-gray-700 hover:text-sky-600 font-bold py-4 px-6 rounded-2xl hover:bg-sky-50 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                FUNCIONALIDADES
              </Link>
              <Link 
                to="/white-label" 
                className="text-gray-700 hover:text-sky-600 font-bold py-4 px-6 rounded-2xl hover:bg-sky-50 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                WHITE LABEL
              </Link>
              <Link
                to="/contato"
                className="text-gray-700 hover:text-sky-600 font-bold py-4 px-6 rounded-2xl hover:bg-sky-50 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                SUPORTE
              </Link>
              <a
                href="https://app.atendesolucao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-sky-600 font-bold py-4 px-6 rounded-2xl hover:bg-sky-50 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ÁREA DO CLIENTE
              </a>
              <div className="px-4 pt-4">
                <a
                  href="https://app.atendesolucao.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-2xl block text-center"
                >
                  TESTE GRÁTIS 7 DIAS
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
