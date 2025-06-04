import React, { useState } from 'react';
import { Search, Filter, Plus, Gift, Calendar, Users, Share2, CheckCircle, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

// Componente de tarjeta de lista
const ListCard = ({ list }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = (list.purchasedItems / list.totalItems) * 100;

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden group">
      {/* Imagen de cabecera */}
      <div className="relative h-48 bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
        {list.image && (
          <div className="absolute inset-0 bg-black/20"></div>
        )}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 bg-black/50 backdrop-blur-xl rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {/* Dropdown menu */}
            {menuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute top-10 right-0 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden z-20">
                  <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-3">
                    <Eye className="w-4 h-4" />
                    <span>Ver detalles</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-3">
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-3">
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors flex items-center space-x-3">
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Badge de estado */}
        <div className="absolute top-4 left-4">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl
            ${list.status === 'active' 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
            }
          `}>
            {list.status === 'active' ? 'Activa' : 'Completada'}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {list.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{list.recipient}</p>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
              <Gift className="w-4 h-4" />
              <span className="text-xs">Regalos</span>
            </div>
            <p className="text-white font-semibold">{list.totalItems}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Fecha</span>
            </div>
            <p className="text-white font-semibold">{list.eventDate}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Compartido</span>
            </div>
            <p className="text-white font-semibold">{list.sharedWith}</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progreso</span>
            <span className="text-purple-400">{list.purchasedItems}/{list.totalItems} comprados</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex space-x-2">
          <button className="flex-1 py-2 px-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
            <Eye className="w-4 h-4" />
            <span>Ver</span>
          </button>
          <button className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
            <Share2 className="w-4 h-4" />
            <span>Compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyLists() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Datos de ejemplo
  const lists = [
    {
      id: 1,
      name: "Cumpleaños de María",
      recipient: "María García",
      eventDate: "15 Dic",
      totalItems: 12,
      purchasedItems: 8,
      sharedWith: 5,
      status: "active",
      image: true
    },
    {
      id: 2,
      name: "Navidad 2024",
      recipient: "Familia",
      eventDate: "25 Dic",
      totalItems: 20,
      purchasedItems: 5,
      sharedWith: 10,
      status: "active",
      image: true
    },
    {
      id: 3,
      name: "Aniversario",
      recipient: "Carlos",
      eventDate: "14 Feb",
      totalItems: 8,
      purchasedItems: 8,
      sharedWith: 2,
      status: "completed",
      image: true
    },
    {
      id: 4,
      name: "Baby Shower Ana",
      recipient: "Ana Martínez",
      eventDate: "20 Mar",
      totalItems: 15,
      purchasedItems: 0,
      sharedWith: 8,
      status: "active",
      image: true
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-white">Mis Listas de Regalos</h1>
                <p className="text-gray-400 mt-1">Gestiona y comparte tus listas</p>
              </div>
              
              {/* Barra de búsqueda y filtros */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar listas..."
                    className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all duration-200 w-64"
                  />
                </div>
                
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="p-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Filter className="w-5 h-5" />
                </button>
                
                <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Nueva Lista</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Listas</p>
                  <p className="text-2xl font-bold text-white">{lists.length}</p>
                </div>
                <Gift className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Activas</p>
                  <p className="text-2xl font-bold text-white">{lists.filter(l => l.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Regalos</p>
                  <p className="text-2xl font-bold text-white">{lists.reduce((acc, l) => acc + l.totalItems, 0)}</p>
                </div>
                <Gift className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Compartidas</p>
                  <p className="text-2xl font-bold text-white">{lists.reduce((acc, l) => acc + l.sharedWith, 0)}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Grid de listas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}