import React, { useState, useEffect } from 'react'
import { useAPI } from '../contexts/APIContext'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Zap,
  AlertCircle,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'

const Settings = () => {
  const { updateSettings } = useAPI()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    // Perfil
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    country: 'PT',
    
    // Trading
    autoTrading: true,
    minROI: 25,
    maxInvestment: 5000,
    riskLevel: 'medium',
    tradingHours: 'always',
    
    // Notificações
    emailNotifications: true,
    pushNotifications: true,
    opportunityAlerts: true,
    profitAlerts: true,
    riskAlerts: true,
    
    // API Keys
    aliexpressKey: '',
    amazonKey: '',
    ebayKey: '',
    
    // Avançado
    webhookUrl: '',
    apiAccess: false,
    dataRetention: 90,
    twoFactorAuth: false
  })

  const handleSave = async (section) => {
    setLoading(true)
    try {
      await updateSettings(settings)
      // Mostrar notificação de sucesso
      console.log('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Configurações</h1>
          <p className="text-gray-300">Gerencie suas preferências e configurações da conta</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-400">Sincronizado</span>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 border-gray-700">
          <TabsTrigger value="profile" className="text-gray-300">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="trading" className="text-gray-300">
            <Zap className="h-4 w-4 mr-2" />
            Trading
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-gray-300">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-gray-300">
            <Globe className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-gray-300">
            <Shield className="h-4 w-4 mr-2" />
            Avançado
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="+351 123 456 789"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-gray-300">País</Label>
                  <Select value={settings.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PT">Portugal</SelectItem>
                      <SelectItem value="BR">Brasil</SelectItem>
                      <SelectItem value="ES">Espanha</SelectItem>
                      <SelectItem value="FR">França</SelectItem>
                      <SelectItem value="DE">Alemanha</SelectItem>
                      <SelectItem value="US">Estados Unidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => handleSave('profile')}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-gray-400">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  Alterar Senha
                </Button>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                  Desativar Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Tab */}
        <TabsContent value="trading" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Configurações de Trading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Auto Trading</Label>
                  <p className="text-sm text-gray-400">Permitir que a IA execute compras automaticamente</p>
                </div>
                <Switch
                  checked={settings.autoTrading}
                  onCheckedChange={(checked) => handleInputChange('autoTrading', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minROI" className="text-gray-300">ROI Mínimo (%)</Label>
                  <Input
                    id="minROI"
                    type="number"
                    value={settings.minROI}
                    onChange={(e) => handleInputChange('minROI', parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                    min="0"
                    max="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInvestment" className="text-gray-300">Investimento Máximo (€)</Label>
                  <Input
                    id="maxInvestment"
                    type="number"
                    value={settings.maxInvestment}
                    onChange={(e) => handleInputChange('maxInvestment', parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskLevel" className="text-gray-300">Nível de Risco</Label>
                  <Select value={settings.riskLevel} onValueChange={(value) => handleInputChange('riskLevel', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixo</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="high">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tradingHours" className="text-gray-300">Horário de Trading</Label>
                  <Select value={settings.tradingHours} onValueChange={(value) => handleInputChange('tradingHours', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">24/7</SelectItem>
                      <SelectItem value="business">Horário Comercial</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave('trading')}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Notificações por Email</Label>
                  <p className="text-sm text-gray-400">Receber atualizações importantes por email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Notificações Push</Label>
                  <p className="text-sm text-gray-400">Receber notificações em tempo real</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Alertas de Oportunidade</Label>
                  <p className="text-sm text-gray-400">Ser notificado sobre novas oportunidades</p>
                </div>
                <Switch
                  checked={settings.opportunityAlerts}
                  onCheckedChange={(checked) => handleInputChange('opportunityAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Alertas de Luc
