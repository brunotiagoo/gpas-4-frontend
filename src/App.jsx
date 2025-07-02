import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Componentes
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import ArbitrageScanner from './components/ArbitrageScanner'
import AIAssistant from './components/AIAssistant'
import Transactions from './components/Transactions'
import Settings from './components/Settings'

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { APIProvider } from './contexts/APIContext'

// Layout
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function AppContent() {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              user ? (
                <div className="flex h-screen">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-auto">
                      <Dashboard />
                    </main>
                  </div>
                </div>
              ) : <Navigate to="/login" />
            } />
            
            <Route path="/scanner" element={
              user ? (
                <div className="flex h-screen">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-auto">
                      <ArbitrageScanner />
                    </main>
                  </div>
                </div>
              ) : <Navigate to="/login" />
            } />
            
            <Route path="/ai-assistant" element={
              user ? (
                <div className="flex h-screen">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-auto">
                      <AIAssistant />
                    </main>
                  </div>
                </div>
              ) : <Navigate to="/login" />
            } />
            
            <Route path="/transactions" element={
              user ? (
                <div className="flex h-screen">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-auto">
                      <Transactions />
                    </main>
                  </div>
                </div>
              ) : <Navigate to="/login" />
            } />
            
            <Route path="/settings" element={
              user ? (
                <div className="flex h-screen">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-auto">
                      <Settings />
                    </main>
                  </div>
                </div>
              ) : <Navigate to="/login" />
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <APIProvider>
        <AppContent />
      </APIProvider>
    </AuthProvider>
  )
}

export default App

