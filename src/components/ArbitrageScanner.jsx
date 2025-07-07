import React, { useState, useEffect } from 'react'
import { useAPI } from '../contexts/APIContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Search, Play, Pause, RefreshCw, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'

const ArbitrageScanner = () => {
  const { scanOpportunities, getDashboardStats } = useAPI()
  const [scanning, setScanning] = useState(false)
  const [opportunities, setOpportunities] = useState([])
  const [scanProgress, setScanProgress] = useState(0)
  const [filters, setFilters] = useState({
    minROI: 25,
    maxPrice: 1000,
    category: 'all'
  })

  const startScan = async () => {
    setScanning(true)
    setScanProgress(0)
    
    try {
      // Simular progresso do scan
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 10
        })
      }, 500)

      const result = await scanOpportunities()
      setOpportunities(result.opportunities || [])
      setScanning(false)
    } catch (error) {
      console.error('Erro no scan:', error)
      setScanning(false)
    }
  }

  const mockOpportunities = [
    {
      id: 1,
      product: 'iPhone 15 Pro 128GB',
      source: 'AliExpress',
      target: 'Amazon US',
      sourcePrice: 650,
      targetPrice: 999,
      profit: 349,
      roi: 53.7,
      status: 'available',
      category: 'Electronics',
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      product: 'Smart Watch Series 8',
      source: 'DHgate',
      target: 'eBay',
      sourcePrice: 45,
      targetPrice: 199,
      profit: 154,
      roi: 342.2,
      status: 'analyzing',
      category: 'Electronics',
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      product: 'Wireless Headphones Pro',
      source: 'Alibaba',
      target: 'Amazon EU',
      sourcePrice: 25,
      targetPrice: 89,
      profit: 64,
      roi: 256.0,
      status: 'available',
      category: 'Audio',
      image: '/api/placeholder/100/100'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Scanner de Arbitragem</h1>
          <p className="text-gray-300">Encontre oportunidades de lucro em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={startScan}
            disabled={scanning}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {scanning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Iniciar Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Filtros de Scan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                ROI Mínimo (%)
              </label>
              <input
                type="number"
                value={filters.minROI}
                onChange={(e) => setFilters({...filters, minROI: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                min="0"
                max="1000"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Preço Máximo (€)
              </label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                min="0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Categoria
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="all">Todas</option>
                <option value="electronics">Eletrônicos</option>
                <option value="fashion">Moda</option>
                <option value="home">Casa</option>
                <option value="sports">Esportes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Progress */}
      {scanning && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Progresso do Scan</span>
              <span className="text-sm text-gray-400">{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Opportunities */}
      <div className="grid gap-4">
        {(opportunities.length > 0 ? opportunities : mockOpportunities).map((opportunity) => (
          <Card key={opportunity.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{opportunity.product}</h3>
                    <p className="text-sm text-gray-400">
                      {opportunity.source} → {opportunity.target}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {opportunity.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Preço Origem</div>
                    <div className="font-semibold text-white">€{opportunity.sourcePrice}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Preço Destino</div>
                    <div className="font-semibold text-white">€{opportunity.targetPrice}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Lucro</div>
                    <div className="font-semibold text-green-400">€{opportunity.profit}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">ROI</div>
                    <div className="font-semibold text-green-400">{opportunity.roi}%</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge 
                      variant={opportunity.status === 'available' ? 'default' : 'secondary'}
                      className={opportunity.status === 'available' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {opportunity.status === 'available' ? 'Disponível' : 'Analisando'}
                    </Badge>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Executar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ArbitrageScanner
