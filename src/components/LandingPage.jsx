import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Zap, 
  TrendingUp, 
  Bot, 
  Globe, 
  DollarSign, 
  Rocket,
  Brain,
  Target,
  Shield,
  Star
} from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GPAS 4.0
            </span>
          </motion.div>
          
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Começar Agora
              </Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                REVOLUÇÃO
              </span>
              <br />
              <span className="text-white">EM ARBITRAGEM</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              A primeira plataforma de arbitragem com <span className="text-purple-400 font-bold">IA Generativa</span> que 
              <span className="text-pink-400 font-bold"> executa compras automaticamente</span> e 
              <span className="text-green-400 font-bold"> gera lucros reais</span> 24/7
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4">
                <Rocket className="w-5 h-5 mr-2" />
                Começar a Ganhar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 text-lg px-8 py-4">
              <Bot className="w-5 h-5 mr-2" />
              Ver Demo da IA
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            {[
              { label: "ROI Médio", value: "304%", icon: TrendingUp },
              { label: "Oportunidades/Dia", value: "1,500+", icon: Target },
              { label: "Lucro Potencial", value: "€50K+", icon: DollarSign },
              { label: "Sucesso Rate", value: "87.5%", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SUPERA TUDO
              </span>
              <br />
              <span className="text-white">QUE EXISTE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enquanto outros apenas "encontram" oportunidades, nós <span className="text-purple-400 font-bold">EXECUTAMOS TUDO</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "IA Generativa Avançada",
                description: "GPT-4 integrado que prediz produtos virais antes dos preços subirem",
                color: "from-purple-500 to-blue-500"
              },
              {
                icon: Zap,
                title: "Execução Automática",
                description: "Compra produtos automaticamente quando detecta ROI > 25%",
                color: "from-pink-500 to-red-500"
              },
              {
                icon: Globe,
                title: "Arbitragem Global",
                description: "China → Europa/EUA com ROI de 300-500% comprovado",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: Bot,
                title: "Assistente Conversacional",
                description: "Chat com IA que gere todo o seu negócio automaticamente",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Gestão de Risco",
                description: "IA analisa riscos e diversifica automaticamente o portfolio",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: TrendingUp,
                title: "Previsões Virais",
                description: "Detecta produtos que vão explodir antes da concorrência",
                color: "from-cyan-500 to-blue-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PRONTO PARA FICAR RICO?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Junte-se à revolução da arbitragem com IA. Comece a gerar lucros reais hoje mesmo.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xl px-12 py-6">
                <Rocket className="w-6 h-6 mr-3" />
                COMEÇAR AGORA - GRÁTIS
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

