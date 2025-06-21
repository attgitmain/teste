import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, ArrowRightLeft, Zap, Send, Calendar, Hash, MessageSquare, BarChart3, 
  GitBranch, TrendingUp, Clock, Shield, MapPin, Database, Target, FileText,
  Cpu, Activity, Globe, Filter, Download, Settings, CheckCircle, Star,
  Sparkles, Bot, Smartphone, Gauge, AlertTriangle, DollarSign, Rocket
} from "lucide-react";

const Funcionalidades = () => {
  const modulosEspeciais = [
    {
      icon: Cpu,
      titulo: "Módulo de Maturação de Chips",
      subtitulo: "A SOLUÇÃO para Chips Bloqueados",
      problema: "Seus chips são bloqueados constantemente?",
      solucao: "Acabou o problema! Sistema inteligente que aquece seus chips WhatsApp gradualmente",
      descricao: "Tecnologia revolucionária que resolve definitivamente o maior problema dos empreendedores digitais: chips bloqueados pelo WhatsApp",
      recursos: [
        "Aquecimento Inteligente - Simulação de conversas reais",
        "Zero Bloqueios - Taxa de sucesso de 97.3%",
        "Automação Total - Funciona 24h sem intervenção",
        "ROI Garantido - Economize até R$ 50.000/mês em chips"
      ],
      color: "from-red-500 via-orange-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
      borderColor: "border-red-300",
      destaque: "🔥 EXCLUSIVO",
      valor: "Valor: R$ 15.000/mês",
      economia: "Economia: R$ 50.000/mês"
    },
    {
      icon: MapPin,
      titulo: "Módulo de Extração por CEP",
      subtitulo: "A SOLUÇÃO para Falta de Leads",
      problema: "Gastando muito dinheiro comprando listas?",
      solucao: "Pare de gastar! Extraia leads qualificados automaticamente por localização",
      descricao: "Sistema que resolve o segundo maior problema: custo alto de aquisição de leads. Extraia contatos segmentados por CEP de forma 100% automatizada",
      recursos: [
        "Leads Infinitos - Base com mais de 180 milhões de contatos",
        "Segmentação Perfeita - Por idade, renda, comportamento",
        "Custo Zero - Pare de pagar R$ 5,00 por lead",
        "Conversão 300% Maior - Leads ultra qualificados"
      ],
      color: "from-blue-500 via-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-300",
      destaque: "💎 PREMIUM",
      valor: "Valor: R$ 8.000/mês",
      economia: "Economia: R$ 25.000/mês"
    }
  ];

  const funcionalidades = [
    {
      icon: Users,
      titulo: "Vários Atendentes",
      descricao: "Cadastre toda a sua equipe no painel, dividindo por departamentos. Assim, cada atendente recebe o atendimento de forma organizada e você pode acompanhar todos eles em tempo real.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: ArrowRightLeft,
      titulo: "Respostas Rápidas",
      descricao: "Agora você pode incluir arquivos nas respostas para uma comunicação mais completa. Com o auto resposta, basta digitar '/' para acessar a sua lista de mensagens pré cadastradas",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Bot,
      titulo: "ChatGPT IA Integrada",
      descricao: "A integração do ChatGPT em um chatbot é uma oportunidade para melhorar a experiência do usuário e fornecer um serviço mais eficiente e natural.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Send,
      titulo: "Envios Em Massa",
      descricao: "Envie mensagens para todos os seus contatos com nosso módulo campanha, que já está incluso em todos os planos.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Calendar,
      titulo: "Agendamentos",
      descricao: "Agende o envio de mensagens para os seus clientes, garantindo um retorno e o acompanhamento do atendimento.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Hash,
      titulo: "Kanban",
      descricao: "O Kanban proporciona uma abordagem visual, flexível e orientada para o progresso contínuo no gerenciamento de projetos e processos.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: GitBranch,
      titulo: "Setores E Filas",
      descricao: "Cada atendimento pode ser atribuído a uma fila (departamento), facilitando a organização e priorização dos atendimentos.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: BarChart3,
      titulo: "Identificação",
      descricao: "Todas as mensagens enviadas pelo sistema, levam o nome do atendente antes do texto. Assim o seu cliente sempre sabe com quem está falando.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: MessageSquare,
      titulo: "ChatBOT",
      descricao: "Deixe a tecnologia trabalhar por você! Crie chatbots para separar seus atendimentos e levantar informações importantes de forma automática",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: ArrowRightLeft,
      titulo: "Transferência",
      descricao: "Todos os atendimentos podem ser transferidos para outro atendente.",
      color: "from-sky-500 to-blue-500"
    },
    {
      icon: GitBranch,
      titulo: "Flow Builder",
      descricao: "Criação de fluxo inteligente para facilitar no atendimento do seu negócio.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Hash,
      titulo: "Tag's",
      descricao: "Classifique os atendimentos com TAGs para melhor gestão dos seus clientes",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-purple-700 text-sm font-bold mb-8 border border-purple-200 animate-fade-in">
              <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Recursos Revolucionários
              </span>
              <Star className="h-4 w-4 ml-2 text-yellow-500 animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight animate-fade-in delay-300">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FUNCIONALIDADES
              </span>
            </h1>
            
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in delay-500">
              Descubra todos os recursos que fazem do Loopchat a 
              <span className="text-purple-600 font-bold"> plataforma mais completa </span>
              do mercado
            </p>
          </div>

          {/* SEÇÃO DOS PROBLEMAS RESOLVIDOS */}
          <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl p-2 mb-16 animate-fade-in delay-700">
            <div className="bg-white rounded-3xl p-12 text-center">
              <div className="flex items-center justify-center mb-8">
                <AlertTriangle className="h-16 w-16 text-red-500 mr-4 animate-bounce" />
                <h2 className="text-5xl font-black text-gray-900">
                  OS 2 MAIORES 
                  <span className="text-red-600"> PROBLEMAS </span>
                  RESOLVIDOS
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                  <div className="text-4xl mb-4">😤</div>
                  <h3 className="text-2xl font-bold text-red-700 mb-4">PROBLEMA #1</h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    "Meus chips WhatsApp são bloqueados toda semana! 
                    Já perdi mais de R$ 30.000 em chips queimados!"
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="text-4xl mb-4">💸</div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">PROBLEMA #2</h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    "Gasto uma fortuna comprando listas de leads caras 
                    que não convertem. Já gastei R$ 80.000 este ano!"
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 mb-4">
                  ✅ <span className="text-green-600">AGORA TEMOS A SOLUÇÃO DEFINITIVA!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Módulos Especiais Aprimorados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            {modulosEspeciais.map((modulo, index) => (
              <div key={index} className={`group ${modulo.bgColor} rounded-3xl p-2 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-4 ${modulo.borderColor} relative overflow-hidden animate-fade-in animate-pulse`} style={{animationDelay: `${index * 200}ms`}}>
                
                {/* Badge Destaque */}
                <div className="absolute -top-4 -right-4 z-20">
                  <div className={`bg-gradient-to-r ${modulo.color} text-white px-6 py-2 rounded-full text-sm font-black shadow-xl animate-bounce`}>
                    {modulo.destaque}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-10 relative overflow-hidden">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    {/* Header com Problema/Solução */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-20 h-20 bg-gradient-to-r ${modulo.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                          <modulo.icon className="h-10 w-10 text-white drop-shadow-lg" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-black text-gray-900 mb-1">
                            {modulo.titulo}
                          </h3>
                          <div className={`text-lg font-black bg-gradient-to-r ${modulo.color} bg-clip-text text-transparent`}>
                            {modulo.subtitulo}
                          </div>
                        </div>
                      </div>

                      {/* Problema Identificado */}
                      <div className="bg-red-50 rounded-2xl p-6 mb-6 border-2 border-red-200">
                        <div className="flex items-center mb-3">
                          <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                          <span className="text-red-700 font-bold text-lg">PROBLEMA IDENTIFICADO:</span>
                        </div>
                        <p className="text-red-800 font-semibold text-lg">
                          {modulo.problema}
                        </p>
                      </div>

                      {/* Solução */}
                      <div className="bg-green-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
                        <div className="flex items-center mb-3">
                          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                          <span className="text-green-700 font-bold text-lg">NOSSA SOLUÇÃO:</span>
                        </div>
                        <p className="text-green-800 font-semibold text-lg">
                          {modulo.solucao}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed font-medium text-lg mb-8">
                      {modulo.descricao}
                    </p>

                    {/* Recursos com Benefícios */}
                    <div className="space-y-4 mb-8">
                      {modulo.recursos.map((recurso, idx) => (
                        <div key={idx} className="flex items-center space-x-3 group/item hover:scale-105 transition-transform bg-white/50 rounded-xl p-4 border border-gray-200">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-gray-800 font-bold text-lg group-hover/item:text-gray-900 transition-colors">
                            {recurso}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Valor e Economia */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-red-50 rounded-xl p-4 text-center border-2 border-red-200">
                        <div className="text-red-600 font-bold text-sm mb-1">INVESTIMENTO</div>
                        <div className="text-red-800 font-black text-xl">{modulo.valor}</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-200">
                        <div className="text-green-600 font-bold text-sm mb-1">VOCÊ ECONOMIZA</div>
                        <div className="text-green-800 font-black text-xl">{modulo.economia}</div>
                      </div>
                    </div>

                    {/* ROI Calculation */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center mb-8">
                      <div className="text-white font-black text-2xl mb-2">
                        🚀 ROI: 300% em 30 dias
                      </div>
                      <div className="text-yellow-100 font-semibold">
                        Para cada R$ 1 investido, você ganha R$ 3 de volta
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="space-y-4">
                      <button className={`w-full bg-gradient-to-r ${modulo.color} text-white py-6 px-8 rounded-2xl font-black text-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse`}>
                        🔥 QUERO RESOLVER MEU PROBLEMA AGORA!
                      </button>
                      
                      <div className="text-center text-sm text-gray-600">
                        ⚡ Ativação instantânea • 🛡️ Garantia de 30 dias • 📞 Suporte 24/7
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prova Social dos Módulos */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-16 mb-20 text-white relative overflow-hidden animate-fade-in delay-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-5xl font-black mb-8">
                🎯 RESULTADOS DOS NOSSOS CLIENTES
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-4xl font-black text-yellow-300 mb-2">R$ 2.3M</div>
                  <div className="text-green-100 font-bold">Economizado em chips por nossos clientes</div>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-4xl font-black text-yellow-300 mb-2">89%</div>
                  <div className="text-green-100 font-bold">Redução no custo de aquisição de leads</div>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-4xl font-black text-yellow-300 mb-2">847%</div>
                  <div className="text-green-100 font-bold">Aumento médio em vendas</div>
                </div>
              </div>

              <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-2xl font-bold mb-4">
                  💬 "Em 30 dias economizei R$ 45.000 que gastava com listas de leads. 
                  O módulo de extração por CEP é simplesmente SENSACIONAL!"
                </p>
                <div className="text-green-200 font-semibold">
                  - João Silva, CEO da MegaVendas (faturamento: R$ 2.5M/mês)
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-16 mb-20 text-white relative overflow-hidden animate-fade-in delay-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-5xl font-black mb-4">Resultados Comprovados</h3>
                <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                  Tecnologia que transforma números em resultados extraordinários
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-5xl font-black text-white mb-3 flex items-center justify-center">
                    <Shield className="h-10 w-10 mr-2" />
                    90%
                  </div>
                  <div className="text-purple-100 font-semibold">Menos bloqueios de chips</div>
                </div>
                
                <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-5xl font-black text-white mb-3 flex items-center justify-center">
                    <Target className="h-10 w-10 mr-2" />
                    70%
                  </div>
                  <div className="text-purple-100 font-semibold">Economia em leads</div>
                </div>
                
                <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-5xl font-black text-white mb-3 flex items-center justify-center">
                    <Gauge className="h-10 w-10 mr-2" />
                    500%
                  </div>
                  <div className="text-purple-100 font-semibold">Aumento em conversões</div>
                </div>
                
                <div className="text-center group hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-5xl font-black text-white mb-3 flex items-center justify-center">
                    <Activity className="h-10 w-10 mr-2" />
                    99.9%
                  </div>
                  <div className="text-purple-100 font-semibold">Taxa de entrega</div>
                </div>
              </div>
            </div>
          </div>

          {/* Funcionalidades Grid */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-4">
                Recursos <span className="text-purple-600">Completos</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tudo que você precisa para automatizar e potencializar seu WhatsApp
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {funcionalidades.map((funcionalidade, index) => (
                <div key={index} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${funcionalidade.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      <funcionalidade.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                      {funcionalidade.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {funcionalidade.descricao}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-purple-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center animate-fade-in delay-1500">
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-6xl font-black mb-8 leading-tight">
                  Pronto para 
                  <span className="text-yellow-300"> Revolucionar </span>
                  seu WhatsApp?
                </h3>
                
                <p className="text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Teste todos esses recursos incríveis por 
                  <span className="text-yellow-300 font-bold"> 7 dias grátis </span>
                  e veja a transformação no seu negócio
                </p>
                
                <a
                  href="https://app.atendesolucao.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white text-purple-600 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <Sparkles className="h-6 w-6" />
                    <span>Começar Teste Grátis</span>
                  </span>
                </a>

                <div className="mt-8 text-sm text-purple-200">
                  ✅ Sem cartão de crédito • ✅ Configuração em 5 minutos • ✅ Suporte 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Funcionalidades;
