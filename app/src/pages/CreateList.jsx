import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gift, Calendar, DollarSign, User, Sparkles, Upload, Check, Image } from 'lucide-react';

// Componente de paso del wizard
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
            ${index < currentStep 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : index === currentStep
              ? 'bg-purple-600/20 text-purple-400 border-2 border-purple-500'
              : 'bg-gray-800 text-gray-500'
            }
          `}>
            {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`
              w-12 h-1 rounded-full transition-all duration-300
              ${index < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-800'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Componente de input personalizado
const CustomInput = ({ icon: Icon, label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all duration-200"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default function CreateList() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    eventName: '',
    recipient: '',
    eventDate: '',
    budget: '',
    description: '',
    useAI: false,
    image: null
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Información del Evento</h2>
              <p className="text-gray-400">Comencemos con los detalles básicos</p>
            </div>
            <CustomInput
              icon={Gift}
              label="Nombre del Evento"
              value={formData.eventName}
              onChange={(value) => setFormData({ ...formData, eventName: value })}
              placeholder="Ej: Cumpleaños de María"
            />
            <CustomInput
              icon={User}
              label="Destinatario"
              value={formData.recipient}
              onChange={(value) => setFormData({ ...formData, recipient: value })}
              placeholder="Ej: María García"
            />
            <CustomInput
              icon={Calendar}
              label="Fecha del Evento"
              type="date"
              value={formData.eventDate}
              onChange={(value) => setFormData({ ...formData, eventDate: value })}
            />
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Presupuesto y Detalles</h2>
              <p className="text-gray-400">Define tu presupuesto y añade una descripción</p>
            </div>
            <CustomInput
              icon={DollarSign}
              label="Presupuesto"
              type="number"
              value={formData.budget}
              onChange={(value) => setFormData({ ...formData, budget: value })}
              placeholder="Ej: 100"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all duration-200 resize-none"
                placeholder="Añade detalles sobre el evento, gustos del destinatario, etc."
                rows={4}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Imagen y IA</h2>
              <p className="text-gray-400">Personaliza tu lista con una imagen y activa la IA</p>
            </div>
            
            {/* Upload de imagen */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Imagen del Evento</label>
              <div className="relative">
                <div className="w-full h-48 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center hover:border-purple-500 transition-colors cursor-pointer">
                  {formData.image ? (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                      <Image className="w-full h-full object-cover rounded-xl" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">imagen-subida.jpg</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-gray-400 text-sm">Arrastra una imagen o haz clic para subir</p>
                      <p className="text-gray-500 text-xs mt-1">PNG, JPG hasta 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Toggle IA */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setFormData({ ...formData, useAI: !formData.useAI })}
                    className={`
                      w-14 h-8 rounded-full transition-all duration-300 relative
                      ${formData.useAI ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'}
                    `}
                  >
                    <div className={`
                      absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300
                      ${formData.useAI ? 'translate-x-7' : 'translate-x-1'}
                    `} />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Activar Generador IA</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Permite que nuestra IA sugiera los mejores regalos basándose en los gustos y preferencias del destinatario
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">¡Lista Creada!</h2>
              <p className="text-gray-400">Tu lista de regalos está lista para compartir</p>
            </div>
            
            {/* Resumen */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Resumen de la Lista</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Evento:</span>
                  <span className="text-white font-medium">{formData.eventName || 'Sin nombre'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Destinatario:</span>
                  <span className="text-white font-medium">{formData.recipient || 'Sin especificar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fecha:</span>
                  <span className="text-white font-medium">{formData.eventDate || 'Sin fecha'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Presupuesto:</span>
                  <span className="text-white font-medium">${formData.budget || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Generador IA:</span>
                  <span className={`font-medium ${formData.useAI ? 'text-green-400' : 'text-gray-500'}`}>
                    {formData.useAI ? 'Activado' : 'Desactivado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full py-3 px-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>Añadir Regalos</span>
              </button>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9 9 0 10-7.432 0M12 3v1m0 16v1m9-9h-1M4 12H3" />
                </svg>
                <span>Compartir Lista</span>
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Form container */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-800">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className={`
                  py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2
                  ${currentStep === 0 
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white'
                  }
                `}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                className={`
                  py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2
                  ${currentStep === totalSteps - 1
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                  }
                `}
                disabled={currentStep === totalSteps - 1}
              >
                <span>Siguiente</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}