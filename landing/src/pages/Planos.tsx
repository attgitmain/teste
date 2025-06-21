import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Star, Zap, Shield, Rocket, Users, MessageCircle, BarChart3, Calendar, FileText, Target } from "lucide-react";

const Planos = () => {
  const planos = [
    {
      nome: "LIGHT",
      preco: "R$249,90",
      periodo: "MENSAL",
      whatsapp: "1 WhatsApp",
      atendentes: "3 Atendentes",
      recursos: [
        "Dashboard Facilitada",
        "Auto Atendimento/Robô",
        "Construtor de Fluxo",
        "Relatórios Básicos",
        "Agendamentos",
        "Suporte por Email",
        "Integração Básica",
        "CRM Básico"
      ],
      icon: Zap,
      gradient: "from-blue-400 to-sky-500",
      popular: false
    },
    {
      nome: "Master",
      preco: "R$429,90",
      periodo: "MENSAL",
      whatsapp: "2 WhatsApp",
      atendentes: "7 Atendentes",
      recursos: [
        "Dashboard Avançada",
        "Facebook / Instagram",
        "Telegram Integrado",
        "Construtor de Fluxo Pro",
        "Integrações Avançadas",
        "Auto Atendimento IA",
        "Relatórios Completos",
        "Suporte Prioritário",
        "CRM Completo com Tags",
        "Histórico de Conversas"
      ],
      icon: Star,
      gradient: "from-sky-500 to-blue-600",
      popular: true
    },
    {
      nome: "Diamante",
      preco: "R$689,90",
      periodo: "MENSAL",
      whatsapp: "3 WhatsApp",
      atendentes: "20 Atendentes",
      recursos: [
        "Dashboard Premium",
        "API Oficial WhatsApp",
        "Multi-Plataformas",
        "Construtor de Fluxo Enterprise",
        "Inteligência Artificial Avançada",
        "Disparos em Massa Ilimitados",
        "Relatórios Executivos",
        "Suporte 24/7 Dedicado",
        "CRM Enterprise + Analytics",
        "Automação de Vendas"
      ],
      icon: Rocket,
      gradient: "from-indigo-500 to-purple-600",
      popular: false
    }
  ];

  const recursosCRM = [
    {
      icon: Users,
      titulo: "Gestão de Contatos",
      descricao: "Organize todos seus clientes em um só lugar com informações detalhadas",
      gradient: "from-blue-500 to-sky-600"
    },
    {
      icon: MessageCircle,
      titulo: "Histórico Completo",
      descricao: "Acesse todo histórico de conversas e interações com cada cliente",
      gradient: "from-sky-500 to-blue-600"
    },
    {
      icon: Target,
      titulo: "Tags e Segmentação",
      descricao: "Classifique clientes por tags para campanhas direcionadas",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: Calendar,
      titulo: "Agendamentos",
      descricao: "Gerencie compromissos e follow-ups automaticamente",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: BarChart3,
      titulo: "Analytics Avançado",
      descricao: "Relatórios detalhados sobre performance e conversões",
      gradient: "from-sky-600 to-indigo-600"
    },
    {
      icon: FileText,
      titulo: "Notas e Observações",
      descricao: "Adicione observações importantes sobre cada cliente",
      gradient: "from-blue-500 to-indigo-500"
    }
  ];

  const recursosExtras = [
    { nome: "Inteligência Artificial", descricao: "Respostas automáticas inteligentes" },
    { nome: "Notificação de Faturas", descricao: "ASaas, SGA, EVO, Siprov integrados" },
    { nome: "Segunda Via de Boleto", descricao: "ASaas, MK-Auth, IXC, Siprov" },
    { nome: "Relatórios Avançados", descricao: "Analytics completo e insights" },
    { nome: "Backup Automático", descricao: "Seus dados sempre seguros" },
    { nome: "API Personalizada", descricao: "Integre com seus sistemas" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              Escolha Seu Plano
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-200">
              Soluções completas para automatizar seu WhatsApp e revolucionar seu atendimento
            </p>
          </div>

          {/* Planos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {planos.map((plano, index) => {
              const IconComponent = plano.icon;
              return (
                <div 
                  key={index} 
                  className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 group ${
                    plano.popular ? 'ring-4 ring-sky-500/50 shadow-sky-500/20' : ''
                  }`}
                >
                  {plano.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        MAIS POPULAR
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plano.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-gray-500 mb-2 tracking-wider">PLANO</h3>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">{plano.nome}</h2>
                    <div className={`inline-block bg-gradient-to-r ${plano.gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      {plano.periodo}
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-5xl font-black text-gray-900 mb-2">{plano.preco}</div>
                    <div className="text-lg font-bold text-sky-600 mb-2">{plano.whatsapp}</div>
                    <div className="text-lg font-bold text-blue-600">{plano.atendentes}</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plano.recursos.map((recurso, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className={`w-6 h-6 bg-gradient-to-r ${plano.gradient} rounded-full flex items-center justify-center mr-3 shadow-md`}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium">{recurso}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full bg-gradient-to-r ${plano.gradient} text-white py-4 rounded-2xl font-black text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                    Teste Grátis por 7 dias!
                  </button>
                </div>
              );
            })}
          </div>

          {/* Nova Seção CRM */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CRM Inteligente Integrado
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Gerencie todos seus clientes de forma profissional com nosso sistema CRM completo, 
                integrado diretamente ao seu WhatsApp Business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recursosCRM.map((recurso, index) => {
                const IconComponent = recurso.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50 group">
                    <div className={`w-16 h-16 bg-gradient-to-r ${recurso.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4">{recurso.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{recurso.descricao}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA CRM */}
            <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-12 shadow-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-black text-white mb-4">
                  Transforme Conversas em Vendas
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Com nosso CRM integrado, você nunca mais perde um lead. Gerencie todo o funil de vendas 
                  diretamente no WhatsApp e aumente suas conversões em até 300%
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full">
                    <span className="text-white font-bold">✓ Leads Organizados</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full">
                    <span className="text-white font-bold">✓ Follow-up Automático</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full">
                    <span className="text-white font-bold">✓ Relatórios de Vendas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recursos Extras Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Recursos Inclusos em Todos os Planos
              </h2>
              <p className="text-xl text-gray-600">
                Tecnologia de ponta para maximizar seus resultados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recursosExtras.map((recurso, index) => (
                <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-sky-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{recurso.nome}</h3>
                  <p className="text-gray-600">{recurso.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-12 shadow-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-4">
                  Pronto para Revolucionar seu Atendimento?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Junte-se a milhares de empresas que já transformaram seus resultados
                </p>
                <button className="bg-white text-sky-600 px-12 py-4 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:scale-105">
                  COMEÇAR TESTE GRÁTIS AGORA
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

export default Planos;
