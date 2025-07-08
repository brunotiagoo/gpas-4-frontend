import React, { useState, useEffect } from 'react'
import { useAPI } from '../contexts/APIContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react'

const Transactions = () => {
  const { getTransactions } = useAPI()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState('30d')

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      const result = await getTransactions()
      setTransactions(result.transactions || mockTransactions)
    } catch (error) {
      console.error('Erro ao carregar transações:', error)
      setTransactions(mockTransactions)
    } finally {
      setLoading(false)
    }
  }

  const mockTransactions = [
    {
      id: 'TXN001',
      type: 'buy',
      product: 'iPhone 15 Pro 256GB',
      source: 'AliExpress',
      target: 'Amazon US',
      buyPrice: 650,
      sellPrice: 999,
      profit: 349,
      roi: 53.7,
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      quantity: 1,
      fees: 45.50,
      netProfit: 303.50
    },
    {
      id: 'TXN002',
      type: 'buy',
      product: 'Smart Watch Series 8',
      source: 'DHgate',
      target: 'eBay',
      buyPrice: 45,
      sellPrice: 199,
      profit: 154,
      roi: 342.2,
      status: 'pending',
      date: '2024-01-14T14:20:00Z',
      quantity: 2,
      fees: 23.80,
      netProfit: 130.20
    },
    {
      id: 'TXN003',
      type: 'sell',
      product: 'Wireless Headphones Pro',
      source: 'Alibaba',
      target: 'Amazon EU',
      buyPrice: 25,
      sellPrice: 89,
      profit: 64,
      roi: 256.0,
      status: 'processing',
      date: '2024-01-13T09:15:00Z',
      quantity: 5,
      fees: 32.10,
      netProfit: 287.90
    },
    {
      id: 'TXN004',
      type: 'buy',
      product: 'Gaming Keyboard RGB',
      source: 'AliExpress',
      target: 'Amazon US',
      buyPrice: 35,
      sellPrice: 79,
      profit: 44,
      roi: 125.7,
      status: 'failed',
      date: '2024-01-12T16:45:00Z',
      quantity: 3,
      fees: 11.85,
      netProfit: 0
    },
    {
      id: 'TXN005',
      type: 'sell',
      product: 'Fitness Tracker V2',
      source: 'DHgate',
      target: 'eBay',
      buyPrice: 28,
      sellPrice: 95,
      profit: 67,
      roi: 239.3,
      status: 'completed',
      date: '2024-01-11T11:30:00Z',
      quantity: 4,
      fees: 28.40,
      netProfit: 240.60
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'processing': return 'bg-blue-600'
      case 'failed': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Concluído'
      case 'pending': return 'Pendente'
      case 'processing': return 'Processando'
      case 'failed': return 'Falhou'
      default: return 'Desconhecido'
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || transaction.status === filter
    return matchesSearch && matchesFilter
  })

  const totalStats = transactions.reduce((acc, tx) => {
    if (tx.status === 'completed') {
      acc.totalProfit += tx.netProfit
      acc.totalTransactions += 1
      acc.totalROI += tx.roi
    }
    return acc
  }, { totalProfit: 0, totalTransactions: 0, totalROI: 0 })

  const avgROI = totalStats.totalTransactions > 0 ? totalStats.totalROI / totalStats.totalTransactions : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Transações</h1>
          <p className="text-gray-300">Histórico completo de operações de arbitragem</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={loadTransactions}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Lucro Total</p>
                <p className="text-2xl font-bold text-green-400">
                  €{totalStats.totalProfit.toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-green-600 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Transações</p>
                <p className="text-2xl font-bold text-white">
                  {totalStats.totalTransactions}
                </p>
              </div>
              <div className="p-2 bg-blue-600 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">ROI Médio</p>
                <p className="text-2xl font-bold text-purple-400">
                  {avgROI.toFixed(1)}%
                </p>
              </div>
              <div className="p-2 bg-purple-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Taxa Sucesso</p>
                <p className="text-2xl font-bold text-green-400">
                  {transactions.length > 0 ? 
                    ((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100).toFixed(1) : 0
                  }%
                </p>
              </div>
              <div className="p-2 bg-green-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="all">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin text-purple-400" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">ID</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Produto</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Rota</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Compra</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Venda</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Lucro</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">ROI</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Status</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Data</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-700">
                      <td className="py-4 text-sm text-gray-300">{transaction.id}</td>
                      <td className="py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{transaction.product}</div>
                          <div className="text-xs text-gray-400">Qty: {transaction.quantity}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-gray-300">
                          {transaction.source} → {transaction.target}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-300">€{transaction.buyPrice}</td>
                      <td className="py-4 text-sm text-gray-300">€{transaction.sellPrice}</td>
                      <td className="py-4">
                        <div className="text-sm font-medium text-green-400">
                          €{transaction.netProfit.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Taxa: €{transaction.fees.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className={`text-sm font-medium ${transaction.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.roi.toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                          {getStatusText(transaction.status)}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-gray-300">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Transactions
