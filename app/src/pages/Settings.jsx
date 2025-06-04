import React, { useState } from 'react';
import { User, Mail, Bell, Shield, Palette, Globe, LogOut, Camera, Save, Moon, Sun, Sparkles } from 'lucide-react';

// Componente de sección
const SettingsSection = ({ title, description, children }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        {description && <p className="text-gray-400 text-sm">{description}</p>}
      </div>
      {children}
    </div>
  );
};

// Componente de toggle
const Toggle = ({ label, description, value, onChange, icon: Icon }) => {
  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-800 last:border-0">
      <div className="flex items-start space-x-3">
        {Icon && (
          <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-white font-medium">{label}</p>
          {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`
          w-14 h-8 rounded-full transition-all duration-300 relative
          ${value ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'}
        `}
      >
        <div className={`
          absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300
          ${value ? 'translate-x-7' : 'translate-x-1'}
        `} />
      </button>
    </div>
  );
};

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'María García',
    email: 'maria@example.com',
    avatar: null
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    darkMode: true,
    language: 'es'
  });

  const [showSaveAnimation, setShowSaveAnimation] = useState(false);

  const handleSave = () => {
    setShowSaveAnimation(true);
    setTimeout(() => setShowSaveAnimation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Configuración</h1>
            <p className="text-gray-400 mt-1">Personaliza tu experiencia</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Perfil */}
          <SettingsSection
            title="Perfil"
            description="Actualiza tu información personal"
          >
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h4 className="text-white font-medium">Foto de perfil</h4>
                  <p className="text-gray-400 text-sm mt-1">JPG, PNG. Max 5MB</p>
                  <button className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                    Cambiar foto
                  </button>
                </div>
              </div>

              {/* Campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nombre completo</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Notificaciones */}
          <SettingsSection
            title="Notificaciones"
            description="Controla cómo te mantenemos informado"
          >
            <div className="space-y-1">
              <Toggle
                icon={Mail}
                label="Notificaciones por email"
                description="Recibe actualizaciones sobre tus listas por correo"
                value={preferences.emailNotifications}
                onChange={(value) => setPreferences({ ...preferences, emailNotifications: value })}
              />
              <Toggle
                icon={Bell}
                label="Notificaciones push"
                description="Recibe notificaciones en tu navegador"
                value={preferences.pushNotifications}
                onChange={(value) => setPreferences({ ...preferences, pushNotifications: value })}
              />
              <Toggle
                icon={Sparkles}
                label="Emails de marketing"
                description="Recibe tips y novedades sobre Gift Lists AI"
                value={preferences.marketingEmails}
                onChange={(value) => setPreferences({ ...preferences, marketingEmails: value })}
              />
            </div>
          </SettingsSection>

          {/* Apariencia */}
          <SettingsSection
            title="Apariencia"
            description="Personaliza el aspecto de la aplicación"
          >
            <div className="space-y-6">
              {/* Tema */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                    {preferences.darkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">Modo oscuro</p>
                    <p className="text-gray-400 text-sm">Reduce el cansancio visual en ambientes oscuros</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                  className={`
                    w-14 h-8 rounded-full transition-all duration-300 relative
                    ${preferences.darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'}
                  `}
                >
                  <div className={`
                    absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300
                    ${preferences.darkMode ? 'translate-x-7' : 'translate-x-1'}
                  `} />
                </button>
              </div>

              {/* Idioma */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Idioma</p>
                    <p className="text-gray-400 text-sm">Selecciona tu idioma preferido</p>
                  </div>
                </div>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white transition-all duration-200"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </SettingsSection>

          {/* Seguridad */}
          <SettingsSection
            title="Seguridad"
            description="Protege tu cuenta"
          >
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all duration-200 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">Cambiar contraseña</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </SettingsSection>

          {/* Acciones */}
          <div className="flex items-center justify-between pt-6">
            <button className="py-3 px-6 text-red-400 hover:text-red-300 font-medium transition-colors flex items-center space-x-2">
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
            
            <button
              onClick={handleSave}
              className="py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center space-x-2"
            >
              {showSaveAnimation ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Guardar cambios</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}