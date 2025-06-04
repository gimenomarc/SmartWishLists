import React, { useState } from 'react';
import { Home, Gift, Plus, Settings, LogOut, Menu, X, Sparkles, TrendingUp, Calendar, Users } from 'lucide-react';

// Componente Sidebar
const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Gift, label: 'Mis Listas' },
    { icon: Plus, label: 'Crear Lista' },
    { icon: Settings, label: 'Configuración' },
  ];

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Gift Lists AI
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menu items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${item.active 
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// Componente de tarjeta estadística
const StatCard = ({ icon: Icon, title, value, trend, color }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">{trend}</span>
            </div>
          )}
        </div>
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta de acción
const ActionCard = ({ icon: Icon, title, description, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group text-left w-full"
    >
      <div className={`
        w-14 h-14 rounded-xl flex items-center justify-center mb-4
        bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300
      `}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300">
        <span className="text-sm font-medium">Empezar</span>
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userName = "María";

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    ¡Hola, {userName}! 👋
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Crea listas de regalos perfectas con ayuda de IA
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              icon={Gift} 
              title="Listas Creadas" 
              value="12" 
              trend="+20% este mes"
              color="from-purple-600 to-purple-700"
            />
            <StatCard 
              icon={Users} 
              title="Compartidas" 
              value="8" 
              color="from-pink-600 to-pink-700"
            />
            <StatCard 
              icon={Calendar} 
              title="Próximos Eventos" 
              value="3" 
              color="from-blue-600 to-blue-700"
            />
            <StatCard 
              icon={Sparkles} 
              title="Sugerencias IA" 
              value="45" 
              trend="+15% precisión"
              color="from-green-600 to-green-700"
            />
          </div>

          {/* Action cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              icon={Plus}
              title="Crear Nueva Lista"
              description="Diseña la lista perfecta con sugerencias de IA"
              color="from-purple-600 to-pink-600"
            />
            <ActionCard
              icon={Gift}
              title="Mis Listas"
              description="Gestiona y comparte tus listas de regalos"
              color="from-blue-600 to-cyan-600"
            />
            <ActionCard
              icon={Sparkles}
              title="Generador IA"
              description="Deja que la IA sugiera los mejores regalos"
              color="from-orange-600 to-red-600"
            />
          </div>

          {/* Recent activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h2>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-6 space-y-4">
                {[
                  { action: "Lista creada", item: "Cumpleaños de Ana", time: "Hace 2 horas" },
                  { action: "Regalo marcado", item: "Libro de cocina", time: "Hace 5 horas" },
                  { action: "Lista compartida", item: "Navidad 2024", time: "Ayer" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.item}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}