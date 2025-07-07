import React, { useState, useEffect, useRef } from 'react'
import { useAPI } from '../contexts/APIContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Send, Bot, User, Zap, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'

const AIAssistant = () => {
  const { chatWithAI, getAIPredictions } = useAPI()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '👋 Olá! Sou a sua IA de arbitragem. Como posso ajudá-lo hoje? Posso analisar mercados, sugerir produtos ou executar compras automáticas.',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [predictions, setPredictions] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadPredictions()
  }, [])

  const loadPredictions = async () => {
    try {
      const result = await getAIPredictions()
      setPredictions(result.predictions || mockPredictions)
    } catch (error) {
      console.error('Erro ao carregar previsões:', error)
      setPredictions(mockPredictions)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    try {
      const response = await chatWithAI(newMessage)
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.message || getAIResponse(newMessage),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Erro no chat:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(newMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('produto') || lowerMessage.includes('oportunidade')) {
      return '🎯 Baseado na minha análise, identifiquei 3 produtos com alto potencial: iPhone 15 Pro (ROI: 312%), Smart Watch Series 8 (ROI: 287%) e Wireless Headphones (ROI: 256%). Quer que execute uma compra automática?'
    } else if (lowerMessage.includes('executar') || lowerMessage.includes('comprar')) {
      return '💰 Perfeito! Vou executar a compra do iPhone 15 Pro. Comprando de AliExpress por €650 e vendendo na Amazon US por €999. Lucro esperado: €349 (53.7% ROI). Transação iniciada!'
    } else if (lowerMessage.includes('mercado') || lowerMessage.includes('tendencia')) {
      return '📈 Análise de mercado atual: Eletrônicos em alta (+15%), especialmente smartphones e wearables. China-Europa tem as melhores margens. Previsão: próximos 7 dias ideais para arbitragem.'
    } else if (lowerMessage.includes('risco') || lowerMessage.includes('seguro')) {
      return '🛡️ Gestão de risco ativa: Portfolio diversificado em 5 categorias, exposição máxima de 20% por produto. Taxa de sucesso histórica: 87.5%. Todos os produtos passam por validação de demanda.'
    } else {
      return '🤖 Entendi! Posso ajudá-lo com análise de mercado, execução de compras, gestão de risco ou previsões de tendências. O que gostaria de fazer?'
    }
  }

  const mockPredictions = [
    {
      id: 1,
      product: 'Smart Home Kit',
      confidence: 94,
      expectedROI: 275,
      timeframe: '3-7 dias',
      reason: 'Tendência crescente em automação residencial'
    },
    {
      id: 2,
      product: 'Gaming Headset Pro',
      confidence: 89,
      expectedROI: 198,
      timeframe: '1-5 dias',
      reason: 'Lançamento de jogo popular aumentou demanda'
    },
    {
      id: 3,
      product: 'Fitness Tracker V2',
      confidence: 92,
      expectedROI: 312,
      timeframe: '2-6 dias',
      reason: 'Sazonalidade fitness + influencer marketing'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Assistente de IA</h1>
          <p className="text-gray-300">Seu parceiro inteligente para arbitragem global</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">IA Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bot className="h-5 w-5 mr-2 text-purple-400" />
                Chat com IA
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }>
                          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-purple-600 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isTyping}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictions */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Previsões IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white text-sm">{prediction.product}</h4>
                    <Badge variant="outline" className="text-xs">
                      {prediction.confidence}% confiança
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ROI Esperado:</span>
                      <span className="text-green-400">{prediction.expectedROI}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prazo:</span>
                      <span className="text-gray-300">{prediction.timeframe}</span>
                    </div>
                    <p className="text-gray-400 mt-2">{prediction.reason}</p>
                  </div>
                  <Button size="sm" className="w-full mt-2 bg-purple-600 hover:bg-purple-700">
                    Executar Automático
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-gray-300 border-gray-600"
                onClick={() => setNewMessage('Quais são as melhores oportunidades agora?')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Melhores Oportunidades
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-gray-300 border-gray-600"
                onClick={() => setNewMessage('Executar compra automática do produto mais rentável')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Compra Automática
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-gray-300 border-gray-600"
                onClick={() => setNewMessage('Análise de risco do meu portfolio')}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Análise de Risco
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
