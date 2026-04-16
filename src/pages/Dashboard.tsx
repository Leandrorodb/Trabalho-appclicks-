import { useState } from 'react';
import { Calendar, Clock, MapPin, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_APPOINTMENTS } from '../data/mock';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [toastMessage, setToastMessage] = useState<{title: string, type: 'success' | 'error'} | null>(null);

  const showToast = (title: string, type: 'success' | 'error') => {
    setToastMessage({ title, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancel = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    showToast("Agendamento cancelado com sucesso.", "error");
  };

  const handlePay = (id: string) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'Confirmado' } : app));
    showToast("Pagamento processado. Horário confirmado!", "success");
  };

  const filteredAppointments = appointments.filter(app => {
    if (activeTab === 'upcoming') {
      return app.status === 'Confirmado' || app.status === 'Pendente';
    } else {
      return app.status === 'Realizado' || app.status === 'Cancelado';
    }
  });

  return (
    <div className="space-y-6 fade-in pb-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-4 md:right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-[16px] shadow-lg border text-[14px] font-bold text-white transition-all transform duration-300 translate-y-0 ${toastMessage.type === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-slate-700'}`}>
          {toastMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5"/>}
          {toastMessage.title}
        </div>
      )}

      <div>
        <h1 className="text-[28px] font-bold mb-2 text-slate-900">Meus Agendamentos</h1>
        <p className="text-slate-500 font-medium">Acompanhe seus serviços marcados e histórico.</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 font-medium transition-colors relative ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Próximos
          {activeTab === 'upcoming' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-t-full"></div>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`pb-3 font-medium transition-colors relative ${activeTab === 'past' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Histórico
          {activeTab === 'past' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-t-full"></div>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[20px] border border-slate-200 text-slate-500 font-medium">
              Nenhum agendamento encontrado nesta categoria.
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-[16px] border border-slate-200 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="border-l-[3px] border-blue-600 pl-3">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-2 ${
                    appointment.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : 
                    appointment.status === 'Pendente' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {appointment.status}
                  </span>
                  <h3 className="font-bold text-[16px] leading-tight mb-1">{appointment.serviceName}</h3>
                  <p className="text-slate-500 text-[13px]">com {appointment.providerName}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[18px] text-blue-600">R$ {appointment.price.toFixed(2)}</span>
                  <button className="block ml-auto mt-2 text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
  
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 text-[13px] font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {appointment.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {appointment.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  No local
                </div>
              </div>
              
              {appointment.status === 'Pendente' && (
                <div className="mt-5 pt-5 border-t border-slate-200 flex gap-2">
                  <button 
                    onClick={() => handleCancel(appointment.id)}
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-[13px] hover:bg-slate-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => handlePay(appointment.id)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-[13px] hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Pagar agora
                  </button>
                </div>
              )}
            </div>
          )))}
        </div>
        
        {/* Real Estate / Analytics Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-100 rounded-[16px] p-6">
            <h2 className="text-[14px] uppercase tracking-wider text-slate-500 font-semibold mb-6">Resumo do Mês</h2>
            <div className="flex justify-between items-center text-center">
              <div>
                <div className="text-2xl font-bold text-slate-900">12</div>
                <div className="text-[11px] text-slate-500 font-medium">Agendados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">08</div>
                <div className="text-[11px] text-slate-500 font-medium">Concluídos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">R$ 450</div>
                <div className="text-[11px] text-slate-500 font-medium">Investido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
