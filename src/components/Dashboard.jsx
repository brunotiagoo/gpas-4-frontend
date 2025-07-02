import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAPI } from '../contexts/APIContext'
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap, 
  Bot,
  Globe,
  Star,
  ArrowUp,
  ArrowDown,
  Play,
  Pause
} from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { getDashboardStats } = useAPI()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
        // Dados mock para demonstração
        setStats({
          user: {
            name: 'Utilizador Demo',
            subscription_tier: 'professional',
            auto_trading_enabled: true
          },
          stats: {
            total_profit: 15247.50,
            total_transactions: 156,
            average_roi: 304,
            pending_transactions: 23,
            active_transactions: 12,
            success_rate: 87.5,
            daily_budget_used: 2500,
            daily_budget_total: 5000
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [getDashboardStats])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Lucro Total',
      value: `€${stats?.stats?.total_profit?.toLocaleString() || '0'}`,
      change: '+23.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'ROI Médio',
      value: `${stats?.stats?.average_roi || 0}%`,
      change: '+12.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Oportunidades',
      value: stats?.stats?.pending_transactions || 0,
      change: '+45',
      changeType: 'positive',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Taxa de Sucesso',
      value: `${stats?.stats?.success_rate || 0}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: Star,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bem-vindo de volta, {stats?.user?.name}! 👋
          </h1>
          <p className="text-gray-300">
            A sua IA está a trabalhar 24/7 para maximizar os seus lucros
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-semibold">IA Ativa</span>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Bot className="w-4 h-4 mr-2" />
            Falar com IA
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'positive' ? (
                        <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className={`text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Status */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bot className="w-5 h-5 mr-2 text-purple-400" />
                Status da IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Trading</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Ativo</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Monitoring</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">24/7</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Orçamento Diário</span>
                <span className="text-white">
                  €{stats?.stats?.daily_budget_used || 0} / €{stats?.stats?.daily_budget_total || 0}
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((stats?.stats?.daily_budget_used || 0) / (stats?.stats?.daily_budget_total || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Opportunities */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Oportunidades Recentes
                </div>
                <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                  Ver Todas
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    product: 'iPhone 15 Pro 256GB',
                    source: 'AliExpress',
                    target: 'Amazon UK',
                    profit: 275,
                    roi: 312,
                    status: 'Executando'
                  },
                  {
                    product: 'MacBook Air M2',
                    source: 'Alibaba',
                    target: 'eBay Global',
                    profit: 420,
                    roi: 285,
                    status: 'Analisando'
                  },
                  {
                    product: 'AirPods Pro 2',
                    source: 'DHgate',
                    target: 'Amazon DE',
                    profit: 85,
                    roi: 245,
                    status: 'Pendente'
                  }
                ].map((opportunity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{opportunity.product}</h4>
                      <p className="text-gray-400 text-sm">
                        {opportunity.source} → {opportunity.target}
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-green-400 font-bold">€{opportunity.profit}</p>
                      <p className="text-gray-400 text-sm">{opportunity.roi}% ROI</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      opportunity.status === 'Executando' 
                        ? 'bg-green-500/20 text-green-400'
                        : opportunity.status === 'Analisando'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {opportunity.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12">
                <Bot className="w-4 h-4 mr-2" />
                Scan IA
              </Button>
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 h-12">
                <Globe className="w-4 h-4 mr-2" />
                Mercados Globais
              </Button>
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 h-12">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 h-12">
                <Target className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard

