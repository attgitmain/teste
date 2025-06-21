
import { Bot, Zap, Users, BarChart3, MessageSquare, Shield, Clock, Globe, Sparkles, TrendingUp, Heart, Star } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Bot,
      title: "IA ChatGPT Integrada",
      description: "Respostas humanas e inteligentes 24/7 que convertem leads automaticamente",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      delay: "delay-100"
    },
    {
      icon: Zap,
      title: "Automação Extrema",
      description: "Fluxos inteligentes que trabalham sem parar, aumentando suas vendas",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      delay: "delay-200"
    },
    {
      icon: Users,
      title: "Multi Atendimento Pro",
      description: "Gerencie milhares de conversas simultâneas com eficiência total",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      delay: "delay-300"
    },
    {
      icon: MessageSquare,
      title: "Omnichannel Total",
      description: "WhatsApp, Instagram, Facebook, Telegram - tudo em uma plataforma",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      delay: "delay-400"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Relatórios em tempo real com insights que impulsionam resultados",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      delay: "delay-500"
    },
    {
      icon: Shield,
      title: "Segurança Militar",
      description: "Criptografia de ponta a ponta e proteção total dos seus dados",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      delay: "delay-600"
    },
    {
      icon: Clock,
      title: "Velocidade Extrema",
      description: "Respostas instantâneas em menos de 300ms - mais rápido que piscar",
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      delay: "delay-700"
    },
    {
      icon: Globe,
      title: "Integração Universal",
      description: "Conecte com qualquer CRM, ERP ou sistema que sua empresa usa",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      delay: "delay-800"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/20 rounded-full filter blur-3xl animate-morphing"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full filter blur-3xl animate-morphing delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full text-sky-700 text-sm font-bold mb-8 border border-sky-200 hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Recursos Revolucionários
            </span>
            <Star className="h-4 w-4 ml-2 text-yellow-500 animate-pulse" />
          </div>
          
          <h2 className="text-7xl font-black text-gray-900 mb-8 leading-tight">
            Tudo que sua empresa precisa em{" "}
            <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              uma plataforma
            </span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Descubra como nossa tecnologia revolucionária pode 
            <span className="text-sky-600 font-bold"> transformar completamente </span>
            o atendimento da sua empresa
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group cursor-pointer animate-fade-in ${feature.delay} hover-lift`}
            >
              <div className={`${feature.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50 relative overflow-hidden`}>
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-2xl relative z-10`}>
                  <feature.icon className="h-10 w-10 text-white drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-sky-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-12 mb-16 text-white relative overflow-hidden animate-fade-in delay-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-5xl font-black mb-4">Resultados que Impressionam</h3>
              <p className="text-xl text-sky-100 max-w-3xl mx-auto">
                Mais de 50.000 empresas já transformaram seus resultados com o Loopchat
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-6xl font-black text-white mb-3 flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 mr-2" />
                  847%
                </div>
                <div className="text-sky-100 font-semibold text-lg">Aumento médio em vendas</div>
              </div>
              
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-6xl font-black text-white mb-3">50k+</div>
                <div className="text-sky-100 font-semibold text-lg">Empresas ativas</div>
              </div>
              
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-6xl font-black text-white mb-3">10M+</div>
                <div className="text-sky-100 font-semibold text-lg">Mensagens por mês</div>
              </div>
              
              <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                <div className="text-6xl font-black text-white mb-3 flex items-center justify-center">
                  <Heart className="h-12 w-12 mr-2 text-red-300" />
                  99.9%
                </div>
                <div className="text-sky-100 font-semibold text-lg">Satisfação dos clientes</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in delay-1500">
          <div className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-6xl font-black mb-8 leading-tight">
                Pronto para 
                <span className="text-yellow-300"> Revolucionar </span>
                seu Negócio?
              </h3>
              
              <p className="text-2xl text-sky-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Junte-se a mais de 50.000 empresas que já automatizaram completamente 
                seu WhatsApp e <span className="text-yellow-300 font-bold">multiplicaram suas vendas</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://app.atendesolucao.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white text-sky-600 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl pulse-button"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <Sparkles className="h-6 w-6" />
                    <span>Começar Teste Grátis</span>
                  </span>
                </a>
                
                <button className="group border-3 border-white text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 transform">
                  <Globe className="h-6 w-6" />
                  <span>Ver Demonstração</span>
                </button>
              </div>

              <div className="mt-12 text-sm text-sky-200">
                ✅ Sem cartão de crédito • ✅ Configuração em 5 minutos • ✅ Suporte 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
