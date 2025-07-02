import React, { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'

const APIContext = createContext()

export const useAPI = () => {
  const context = useContext(APIContext)
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider')
  }
  return context
}

export const APIProvider = ({ children }) => {
  const { token } = useAuth()
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://5001-i58p5t6eh54x6o6kmi4l1-18ada3b1.manusvm.computer'

  const makeRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro na requisição')
      }
      
      return data
    } catch (error) {
      throw error
    }
  }

  // Métodos específicos da API
  const getDashboardStats = () => makeRequest('/api/dashboard/stats')
  
  const scanOpportunities = () => makeRequest('/api/arbitrage/scan', { method: 'POST' })
  
  const executePurchase = (opportunity) => makeRequest('/api/arbitrage/execute', {
    method: 'POST',
    body: JSON.stringify(opportunity)
  })
  
  const getTransactions = () => makeRequest('/api/arbitrage/transactions')
  
  const getAIPredictions = () => makeRequest('/api/ai/predictions')
  
  const chatWithAI = (message) => makeRequest('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  })
  
  const updateSettings = (settings) => makeRequest('/api/settings/update', {
    method: 'PUT',
    body: JSON.stringify(settings)
  })

  const value = {
    makeRequest,
    getDashboardStats,
    scanOpportunities,
    executePurchase,
    getTransactions,
    getAIPredictions,
    chatWithAI,
    updateSettings
  }

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  )
}

