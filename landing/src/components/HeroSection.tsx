
import { MessageCircle, CheckCircle, Users, Bot, Zap, Play, ArrowRight, Star, Sparkles, TrendingUp, Shield, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Animated Dots */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-sky-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-12 animate-fade-in">
            {/* Super Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full text-sky-700 text-sm font-bold border border-sky-200 group hover:scale-105 transition-transform cursor-pointer">
              <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                #1 Plataforma de Automação WhatsApp
              </span>
              <Star className="h-4 w-4 ml-2 text-yellow-500 animate-pulse" />
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black leading-none">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Revolução
                </span>
                <br />
                <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                  WhatsApp
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  IA Avançada
                </span>
              </h1>
              
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                Transforme conversas em 
                <span className="text-sky-600 font-bold"> vendas automáticas </span>
                com nossa plataforma de IA mais avançada do mercado
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="group relative bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-sky-500/50 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Play className="h-6 w-6" />
                  <span>Ver Demonstração</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="group border-3 border-sky-500 text-sky-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 transform">
                <MessageCircle className="h-6 w-6" />
                <span>Teste Grátis 7 Dias</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-sky-200">
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-4xl font-black text-gray-900 mb-2">50k+</div>
                <div className="text-sm text-gray-600 font-semibold">Empresas Ativas</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-4xl font-black text-gray-900 mb-2">10M+</div>
                <div className="text-sm text-gray-600 font-semibold">Mensagens/Mês</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-4xl font-black text-gray-900 mb-2">99.9%</div>
                <div className="text-sm text-gray-600 font-semibold">Uptime</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-4xl font-black text-gray-900 mb-2">500%</div>
                <div className="text-sm text-gray-600 font-semibold">ROI Médio</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative animate-fade-in delay-300">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden">
              
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <img 
                    src="/uploads/c708d5eb-cee4-459c-8430-62d08e173534.png"
                    alt="Loopchat" 
                    className="w-16 h-16 drop-shadow-2xl"
                  />
                  <div>
                    <span className="text-3xl font-black">Loopchat</span>
                    <div className="text-sky-200 text-sm font-semibold">IA AVANÇADA</div>
                  </div>
                </div>
                
                <h3 className="text-4xl font-bold mb-8 leading-tight">
                  IA que Converte
                  <br />
                  <span className="text-yellow-300">Leads em Vendas</span>
                  <br />
                  Automaticamente
                </h3>
                
                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bot className="h-5 w-5 text-yellow-300" />
                    </div>
                    <span className="text-sky-100 font-medium">Chatbot 24/7 sempre ativo</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="h-5 w-5 text-yellow-300" />
                    </div>
                    <span className="text-sky-100 font-medium">Respostas em menos de 1 segundo</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-5 w-5 text-yellow-300" />
                    </div>
                    <span className="text-sky-100 font-medium">Aumento de 500% nas conversões</span>
                  </div>
                </div>

                {/* Live Demo Chat */}
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="text-xs text-sky-200 mb-4 font-semibold flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Demonstração ao vivo
                  </div>
                  
                  <div className="bg-white/20 rounded-2xl p-4 text-sm animate-fade-in">
                    <div className="text-sky-200 text-xs mb-2 font-semibold">Cliente:</div>
                    <div className="text-white">Oi, quero saber sobre os preços do Loopchat</div>
                  </div>
                  
                  <div className="bg-sky-400/50 rounded-2xl p-4 text-sm ml-4 animate-fade-in delay-1000">
                    <div className="text-sky-100 text-xs mb-2 font-semibold flex items-center">
                      <Bot className="h-3 w-3 mr-1" />
                      Loopchat IA:
                    </div>
                    <div className="text-white">Olá! 👋 Ficamos felizes em ajudar! Temos 3 planos incríveis que se adaptam perfeitamente ao seu negócio. Posso mostrar qual é o ideal para você?</div>
                  </div>
                  
                  <div className="bg-green-400/30 rounded-2xl p-3 text-xs text-center animate-fade-in delay-2000">
                    <div className="flex items-center justify-center space-x-2 text-green-100">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-semibold">Lead convertido automaticamente!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl animate-float border border-sky-100">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-gray-700">Online agora</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">15.847 usuários ativos</div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl animate-float delay-1000 border border-sky-100">
              <div className="text-center">
                <div className="text-3xl font-black text-green-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 mr-1" />
                  ↗ 847%
                </div>
                <div className="text-xs text-gray-600 font-semibold">Conversões</div>
                <div className="text-xs text-gray-500">esta semana</div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl animate-float delay-500 text-white">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-bold">100% Seguro</span>
              </div>
            </div>

            <div className="absolute top-1/4 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-2xl animate-float delay-1500 text-white">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-bold">&lt; 1s</span>
              </div>
              <div className="text-xs opacity-90">Resposta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
