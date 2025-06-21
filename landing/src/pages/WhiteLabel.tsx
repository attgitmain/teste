
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Palette, 
  Rocket, 
  Crown, 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  Sparkles, 
  Star,
  Brain,
  Atom,
  Cpu,
  Heart,
  MessageSquare,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Diamond
} from "lucide-react";

const WhiteLabel = () => {
  const benefits = [
    {
      icon: Crown,
      title: "Marca Própria Quântica",
      description: "Transforme nossa tecnologia na SUA empresa. Seus clientes nunca saberão que não foi você quem criou.",
      color: "from-yellow-400 via-amber-500 to-orange-600",
      delay: "delay-100"
    },
    {
      icon: TrendingUp,
      title: "Receita Passiva Infinita",
      description: "Venda uma solução que você não precisa desenvolver. Lucro de 500% garantido desde o primeiro mês.",
      color: "from-green-400 via-emerald-500 to-teal-600",
      delay: "delay-200"
    },
    {
      icon: Rocket,
      title: "Lançamento em 24h",
      description: "Da configuração ao primeiro cliente pagando: menos de 1 dia. Sem desenvolvimento, sem bugs, sem dor de cabeça.",
      color: "from-purple-500 via-violet-500 to-indigo-600",
      delay: "delay-300"
    },
    {
      icon: Users,
      title: "Escalabilidade Exponencial",
      description: "Atenda milhares de clientes simultaneamente sem contratar um único funcionário adicional.",
      color: "from-blue-400 via-cyan-500 to-teal-500",
      delay: "delay-400"
    }
  ];

  const features = [
    {
      icon: Palette,
      title: "Personalização Total",
      description: "Logo, cores, domínio, interface - tudo com sua marca. Clientes pensarão que você é um gênio da tecnologia.",
      stats: "100% Customizável"
    },
    {
      icon: Shield,
      title: "Suporte Fantasma",
      description: "Nosso suporte técnico atenderá seus clientes como se fosse sua equipe. Eles nunca saberão a verdade.",
      stats: "24/7 Invisível"
    },
    {
      icon: Brain,
      title: "IA Treinada com Sua Voz",
      description: "A inteligência artificial aprende seu tom de voz e atende como se fosse você pessoalmente.",
      stats: "Personalidade Única"
    },
    {
      icon: Globe,
      title: "Multi-Idiomas Quântico",
      description: "Venda para qualquer país do mundo. Sistema traduz e adapta automaticamente para cada cultura.",
      stats: "180+ Idiomas"
    },
    {
      icon: BarChart3,
      title: "Analytics Proprietários",
      description: "Relatórios com sua marca que impressionam clientes e justificam qualquer valor que você cobrar.",
      stats: "ROI Comprovado"
    },
    {
      icon: Zap,
      title: "Updates Automáticos",
      description: "Sempre a tecnologia mais avançada sem você mover um dedo. Seus concorrentes ficarão para trás.",
      stats: "Sempre Atualizado"
    }
  ];

  const successStories = [
    {
      name: "TechSolutions Pro",
      industry: "Consultoria Tech",
      result: "+2.300% ROI",
      description: "De freelancer para empresa de R$ 50M/ano em 8 meses",
      icon: Rocket
    },
    {
      name: "Digital Empire",
      industry: "Marketing Digital",
      result: "+890 Clientes",
      description: "Virou referência nacional em automação sem escrever 1 linha de código",
      icon: Crown
    },
    {
      name: "Innovation Hub",
      industry: "Startup",
      result: "R$ 15M Série A",
      description: "Levantou investimento apresentando 'sua' tecnologia revolucionária",
      icon: Diamond
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <Header />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-mesh-gradient opacity-20 animate-gradient-shift"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-full filter blur-3xl animate-morphing"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 rounded-full filter blur-3xl animate-morphing delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative inline-flex items-center px-8 py-4 glass-ultra rounded-full text-purple-300 text-sm font-bold mb-8 border border-purple-500/30 hover:scale-110 transition-all duration-500 cursor-pointer neon-glow">
            <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" />
            <span className="relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent font-black tracking-wider">
              WHITE LABEL REVOLUCIONÁRIO
            </span>
            <Sparkles className="h-5 w-5 ml-3 animate-pulse text-yellow-400" />
          </div>

          <h1 className="text-7xl md:text-8xl font-black text-white mb-8 leading-tight">
            Seja o <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-shift">CRIADOR</span>
            <br />
            da Próxima Revolução
          </h1>

          <div className="glass-ultra rounded-3xl p-8 max-w-5xl mx-auto mb-12 border border-purple-500/30">
            <p className="text-2xl text-gray-200 leading-relaxed font-medium">
              Transforme nossa tecnologia quântica na <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent font-black">SUA empresa</span>.
              <br />
              Venda como se você tivesse criado a revolução da IA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-12 py-6 rounded-3xl text-xl font-black hover:from-purple-400 hover:via-pink-400 hover:to-yellow-400 transition-all duration-500 transform hover:scale-110 shadow-3xl neon-glow overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-purple-200/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Rocket className="h-7 w-7 animate-pulse" />
                <span>CRIAR MINHA EMPRESA AGORA</span>
              </span>
            </button>
            
            <button className="group glass-strong border-3 border-purple-400 text-purple-300 px-12 py-6 rounded-3xl text-xl font-black hover:bg-purple-400 hover:text-slate-900 transition-all duration-500 flex items-center justify-center space-x-3 hover:scale-110 transform neon-glow">
              <Globe className="h-7 w-7 animate-bounce" />
              <span>VER DEMONSTRAÇÃO</span>
            </button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-purple-200">
            <span className="flex items-center">
              ✅ <span className="ml-2 font-bold">Setup em 24h</span>
            </span>
            <span className="flex items-center">
              ✅ <span className="ml-2 font-bold">Marca 100% Sua</span>
            </span>
            <span className="flex items-center">
              ✅ <span className="ml-2 font-bold">Lucro Garantido</span>
            </span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white mb-6">
              Por que <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">Milhares</span> Escolheram
            </h2>
            <p className="text-2xl text-purple-200 max-w-4xl mx-auto">
              Transforme-se no guru da tecnologia da sua região sem escrever uma linha de código
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div key={index} className={`group cursor-pointer animate-fade-in ${benefit.delay} hover-lift transform-3d`}>
                <div className="glass-ultra rounded-3xl p-8 shadow-3xl hover:shadow-glow-purple transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-purple-500/30 relative overflow-hidden neon-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-purple-400/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-3xl relative z-10 neon-glow`}>
                    <benefit.icon className="h-10 w-10 text-white drop-shadow-2xl animate-pulse" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors duration-500">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-medium group-hover:text-white transition-colors duration-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white mb-6">
              Recursos <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">Exclusivos</span>
            </h2>
            <p className="text-2xl text-purple-200 max-w-4xl mx-auto">
              Tudo que você precisa para ser reconhecido como o maior especialista em IA da sua região
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group cursor-pointer hover-lift transform-3d">
                <div className="glass-ultra rounded-3xl p-8 shadow-3xl hover:shadow-glow-purple transition-all duration-700 border border-purple-500/30 relative overflow-hidden neon-glow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-glow-purple">
                      <feature.icon className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-400 font-bold">{feature.stats}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-medium group-hover:text-white transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white mb-6">
              Casos de <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">Sucesso Extraordinário</span>
            </h2>
            <p className="text-2xl text-purple-200 max-w-4xl mx-auto">
              Empresários comuns que se tornaram referência nacional usando nossa tecnologia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="group cursor-pointer hover-lift transform-3d">
                <div className="glass-ultra rounded-3xl p-8 shadow-3xl hover:shadow-glow-blue transition-all duration-700 border border-purple-500/30 relative overflow-hidden neon-glow">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-glow-blue">
                      <story.icon className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">{story.name}</h3>
                      <p className="text-purple-300 font-medium">{story.industry}</p>
                    </div>
                  </div>
                  
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4 animate-pulse">
                    {story.result}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed font-medium group-hover:text-white transition-colors duration-500">
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-ultra rounded-[3rem] p-20 text-white relative overflow-hidden shadow-3xl border border-purple-500/30 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-600/10 to-yellow-600/10 animate-gradient-shift"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-transparent rounded-full animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-8 py-4 glass-strong rounded-full text-yellow-300 text-lg font-bold mb-8 border border-yellow-500/30">
                <Star className="h-6 w-6 mr-3 animate-pulse" />
                <span>OFERTA LIMITADA - APENAS 50 VAGAS</span>
                <Star className="h-6 w-6 ml-3 animate-pulse" />
              </div>

              <h2 className="text-7xl font-black mb-8 leading-tight">
                Pronto para ser o 
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">PRÓXIMO MILIONÁRIO</span>
                <br />
                da Tecnologia?
              </h2>
              
              <p className="text-3xl text-purple-200 mb-12 max-w-5xl mx-auto leading-relaxed">
                Junte-se aos <span className="text-yellow-300 font-black">2.847 empresários</span> que já faturaram 
                <span className="text-green-400 font-black"> mais de R$ 500M </span> usando nossa plataforma White Label
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
                <button className="group relative bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-16 py-8 rounded-3xl text-2xl font-black hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 transition-all duration-500 transform hover:scale-110 shadow-3xl neon-glow overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-yellow-200/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-4">
                    <Crown className="h-8 w-8 animate-pulse" />
                    <span>COMEÇAR AGORA - R$ 497/mês</span>
                    <ArrowRight className="h-8 w-8 animate-bounce" />
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg text-purple-200">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                  <span className="font-bold">Setup Completo em 24h</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                  <span className="font-bold">Suporte Técnico Vitalício</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                  <span className="font-bold">Garantia de 30 dias</span>
                </div>
              </div>

              <div className="mt-12 p-6 glass-strong rounded-2xl border border-yellow-500/30">
                <p className="text-xl text-yellow-300 font-bold">
                  ⚡ BÔNUS ESPECIAL: Primeiros 25 clientes recebem consultoria estratégica GRATUITA de R$ 5.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float opacity-40"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `linear-gradient(45deg, ${['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)]}, ${['#9333ea', '#db2777', '#d97706', '#059669', '#2563eb'][Math.floor(Math.random() * 5)]})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              boxShadow: `0 0 ${5 + Math.random() * 10}px currentColor`
            }}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default WhiteLabel;
