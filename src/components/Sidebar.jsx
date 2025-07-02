import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Search, 
  Bot, 
  History, 
  Settings, 
  X,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react'

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation()

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Search,
      label: 'Scanner IA',
      path: '/scanner',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Bot,
      label: 'Assistente IA',
      path: '/ai-assistant',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: History,
      label: 'Transações',
      path: '/transactions',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Settings,
      label: 'Configurações',
      path: '/settings',
      color: 'from-gray-500 to-slate-500'
    }
  ]

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={open ? "open" : "closed"}
        className="fixed left-0 top-0 h-full w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 z-50 lg:relative lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Menu Principal</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="lg:hidden text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-4 border border-green-500/20"
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-green-400 text-sm font-semibold">Lucro Hoje</p>
                    <p className="text-white text-lg font-bold">€1,247</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20"
              >
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-purple-400 text-sm font-semibold">IA Ativa</p>
                    <p className="text-white text-lg font-bold">24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/20"
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-blue-400 text-sm font-semibold">Oportunidades</p>
                    <p className="text-white text-lg font-bold">148</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path
                return (
                  <motion.li
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={item.path} onClick={() => setOpen(false)}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive 
                            ? `bg-gradient-to-r ${item.color}` 
                            : 'bg-white/10'
                        }`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
              <p className="text-purple-400 text-sm font-semibold mb-1">🚀 Status do Sistema</p>
              <p className="text-white text-sm">IA funcionando perfeitamente</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar

