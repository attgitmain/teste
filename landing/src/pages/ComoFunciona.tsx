
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Bot, Zap, Users, ArrowRight, Play, Smartphone, Monitor, Globe, Shield, Rocket, CheckCircle, Star, TrendingUp } from "lucide-react";

const ComoFunciona = () => {
  const etapas = [
    {
      numero: "01",
      titulo: "Conecte seu WhatsApp",
      descricao: "Integração simples e segura com sua conta do WhatsApp Business",
      icon: Smartphone,
      gradient: "from-blue-500 to-sky-500"
    },
    {
      numero: "02", 
      titulo: "Configure o Chatbot",
      descricao: "Crie fluxos inteligentes com nossa IA avançada em minutos",
      icon: Bot,
      gradient: "from-sky-500 to-cyan-500"
    },
    {
      numero: "03",
      titulo: "Automatize Tudo",
      descricao: "Deixe nossa tecnologia trabalhar 24/7 para você",
      icon: Zap,
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const recursos = [
    {
      titulo: "Multi-Atendimento Inteligente",
      descricao: "Gerencie milhares de conversas simultaneamente com IA",
      icon: Users,
      stats: "99.9% Uptime"
    },
    {
      titulo: "Integração Universal",
      descricao: "Conecte com CRM, ERP e mais de 100+ ferramentas",
      icon: Globe,
      stats: "100+ Integrações"
    },
    {
      titulo: "Segurança Enterprise",
      descricao: "Criptografia de ponta a ponta e conformidade LGPD",
      icon: Shield,
      stats: "100% Seguro"
    }
  ];

  const faqs = [
    {
      pergunta: "O que é o Chatbot da LoopChat?",
      resposta: "É uma plataforma de multi atendimento para WhatsApp com IA avançada que automatiza e otimiza todo seu processo de atendimento ao cliente.",
      ativo: true
    },
    {
      pergunta: "O celular precisa estar online?",
      resposta: "Não! Nossa solução é baseada na API oficial do WhatsApp Business, funcionando 24/7 sem depender do seu celular.",
      ativo: false
    },
    {
      pergunta: "Existe fidelidade nos planos?",
      resposta: "Não exigimos fidelidade. Você pode cancelar quando quiser, mas temos certeza que não vai querer sair!",
      ativo: false
    },
    {
      pergunta: "Preciso instalar algum app?",
      resposta: "Não é necessário instalar nada. Tudo funciona direto no navegador, com acesso completo via web.",
      ativo: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-cyan-500/10"></div>
        <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-sky-300/20 rounded-full blur-3xl animate-float delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent animate-fade-in">
              COMO FUNCIONA
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-200">
              Descubra como nossa tecnologia revoluciona seu atendimento em apenas 3 passos simples
            </p>
          </div>

          {/* Etapas do Processo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {etapas.map((etapa, index) => {
              const IconComponent = etapa.icon;
              return (
                <div key={index} className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 group animate-fade-in delay-${index * 200}`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r ${etapa.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    
                    <div className={`text-4xl sm:text-6xl font-black text-transparent bg-gradient-to-r ${etapa.gradient} bg-clip-text mb-3 sm:mb-4`}>
                      {etapa.numero}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{etapa.titulo}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{etapa.descricao}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recursos Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {recursos.map((recurso, index) => {
              const IconComponent = recurso.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{recurso.titulo}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">{recurso.descricao}</p>
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{recurso.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Principais Funcionalidades */}
          <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white mb-16 sm:mb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-black mb-4">Recursos que Fazem a Diferença</h2>
                <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
                  Tecnologia de ponta para revolucionar seu negócio
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
                  <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-300 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">IA Conversacional</h3>
                  <p className="text-sm sm:text-base text-blue-100">ChatGPT integrado para respostas humanizadas</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
                  <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Automação Total</h3>
                  <p className="text-sm sm:text-base text-blue-100">Fluxos infinitos e personalizáveis</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-green-300 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Multi-Departamentos</h3>
                  <p className="text-sm sm:text-base text-blue-100">Organize por setores e especialidades</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo e FAQ Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-16 sm:mb-20">
            {/* Demo Video */}
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white ml-1" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">Veja Nossa Demo</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">Descubra como funciona na prática</p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Assistir Agora
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-xl ${faq.ativo ? 'ring-2 ring-blue-500/50' : ''}`}>
                  <div className="bg-gradient-to-r from-blue-500 to-sky-500 text-white p-4 sm:p-6 flex items-center justify-between cursor-pointer">
                    <span className="font-bold text-sm sm:text-base">{faq.pergunta}</span>
                    <button className="text-xl sm:text-2xl font-bold">
                      {faq.ativo ? '-' : '+'}
                    </button>
                  </div>
                  
                  {faq.ativo && (
                    <div className="p-4 sm:p-6 bg-white/90">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.resposta}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <Rocket className="h-16 w-16 sm:h-20 sm:w-20 text-cyan-300 mx-auto mb-4 sm:mb-6 animate-float" />
                <h2 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
                  Conheça a Revolução do Atendimento
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
                  Prepare-se para interagir com uma inteligência artificial avançada que vai além das respostas convencionais. 
                  Nosso chatbot utiliza o poderoso ChatGPT para oferecer uma experiência única e enriquecedora.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
                  <div className="flex items-center space-x-2 text-cyan-200">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm sm:text-base font-medium">Teste Grátis por 7 dias</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cyan-200">
                    <Star className="h-5 w-5" />
                    <span className="text-sm sm:text-base font-medium">Sem fidelidade</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cyan-200">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm sm:text-base font-medium">100% Seguro</span>
                  </div>
                </div>
                
                <button className="bg-white text-blue-600 px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-black text-lg sm:text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center space-x-3 mx-auto">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>TESTE NOSSA DEMO AGORA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComoFunciona;
