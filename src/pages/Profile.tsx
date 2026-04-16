import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Clock, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { MOCK_PROVIDERS, MOCK_APPOINTMENTS } from '../data/mock';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = MOCK_PROVIDERS.find(p => p.id === id);
  
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStep, setBookingStep] = useState<'service' | 'time' | 'success'>('service');

  if (!provider) {
    return <div className="p-8 text-center">Profissional não encontrado.</div>;
  }

  const handleBook = () => {
    // Simulando um agendamento bem-sucedido
    // Numa app real, enviaríamos para API
    setBookingStep('success');
  };

  const getServiceData = () => provider.services.find(s => s.id === selectedService);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Provider Header */}
      <div className="bg-white rounded-[20px] p-6 md:p-8 border border-slate-200 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <img 
          src={provider.avatarUrl} 
          alt={provider.name}
          className="w-32 h-32 rounded-2xl object-cover bg-slate-200"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1">
          <h1 className="text-[28px] font-bold mb-1 text-slate-900">{provider.name}</h1>
          <p className="text-slate-500 text-[15px] mb-3">{provider.profession}</p>
          
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="flex items-center gap-1 font-bold text-[14px] text-amber-500">
              ★ {provider.rating.toFixed(1)}
            </div>
            <div className="text-[13px] text-slate-500">
              ({provider.reviewsCount} avaliações)
            </div>
          </div>
          
          <p className="text-slate-600 text-[14px] md:text-[15px] leading-relaxed">
            {provider.bio}
          </p>
        </div>
      </div>

      {bookingStep === 'success' ? (
        <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-200 flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">Agendamento Confirmado!</h2>
          <p className="text-emerald-700 mb-6 max-w-md mx-auto text-[15px]">
            Seu horário com <strong>{provider.name}</strong> para o serviço de <strong>{getServiceData()?.name}</strong> foi reservado com sucesso para <strong>{selectedDate}</strong> às <strong>{selectedTime}</strong>.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Ver meus agendamentos
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Services List */}
            <section className="bg-white rounded-2xl p-6 border border-slate-200">
              <h2 className="text-[14px] uppercase tracking-wider text-slate-500 font-semibold mb-4">Serviços</h2>
              <div className="space-y-3">
                {provider.services.map((service) => (
                  <label 
                    key={service.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-[1.5px] cursor-pointer transition-colors ${selectedService === service.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}
                  >
                    <input 
                      type="radio" 
                      name="service" 
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={() => setSelectedService(service.id)}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <span className="font-bold text-slate-900">{service.name}</span>
                        <span className="font-bold text-blue-600">R$ {service.price.toFixed(2)}</span>
                      </div>
                      <p className="text-slate-500 text-[13px] mb-2">{service.description}</p>
                      <div className="flex items-center gap-1 text-[12px] font-medium text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {service.durationMinutes} minutos
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            {/* Booking Panel */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 sticky top-24">
              <h3 className="font-bold text-[16px] mb-4 text-slate-900">Resumo e Agendamento</h3>
              
              {!selectedService ? (
                <div className="text-[13px] text-slate-500 text-center py-6 bg-slate-50 rounded-xl border border-slate-200">
                  Selecione um serviço ao lado para continuar
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-200">
                    <p className="font-semibold text-slate-900 text-[15px]">{getServiceData()?.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[13px] text-slate-500">{getServiceData()?.durationMinutes} min</span>
                      <span className="font-bold text-lg text-blue-600">R$ {getServiceData()?.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Data</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-[10px] border border-slate-200 rounded-xl text-[14px] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Horário</label>
                      <select 
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-[10px] border border-slate-200 rounded-xl text-[14px] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                      >
                        <option value="">Selecione...</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:30">11:30</option>
                        <option value="14:00">14:00</option>
                        <option value="15:30">15:30</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleBook}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
