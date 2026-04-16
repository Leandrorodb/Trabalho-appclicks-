import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Search, Home, Menu, UserCircle, LogOut, Settings, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setShowDropdown(false);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Buscar', path: '/search', icon: Search },
    { name: 'Agendamentos', path: '/dashboard', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0 md:pl-64">
      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 md:right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-[16px] shadow-lg border text-[14px] font-bold text-white bg-slate-900 border-slate-700 transition-all transform duration-300 translate-y-0">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-xl">A</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-blue-600">AppCliques</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-between px-4 py-3 w-full rounded-xl transition-colors text-slate-600 hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <UserCircle className="w-5 h-5" />
              <span className="font-medium text-[14px]">Minha Conta</span>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-slate-200 rounded-[16px] shadow-lg p-2 flex flex-col gap-1">
               <button onClick={() => showToast("Acesso ao perfil em desenvolvimento")} className="flex items-center gap-2 px-3 py-2 text-slate-600 text-[13px] hover:bg-slate-50 hover:text-blue-600 rounded-lg text-left">
                  <Settings className="w-4 h-4" /> Configurações
               </button>
               <button onClick={() => showToast("Sessão finalizada com sucesso")} className="flex items-center gap-2 px-3 py-2 text-slate-600 text-[13px] hover:bg-rose-50 hover:text-rose-600 rounded-lg text-left">
                  <LogOut className="w-4 h-4" /> Sair
               </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-50 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-extrabold">A</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-blue-600">AppCliques</span>
        </Link>
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="p-2 text-slate-600 relative z-10 hover:bg-slate-100 rounded-full">
            <UserCircle className="w-6 h-6" />
          </button>
          
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-0 bg-transparent" onClick={() => setShowDropdown(false)}></div>
              <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-slate-200 rounded-[16px] shadow-lg p-2 flex flex-col gap-1 z-50">
                 <button onClick={() => showToast("Acesso ao perfil em desenvolvimento")} className="flex items-center gap-2 px-3 py-2 text-slate-600 text-[13px] hover:bg-slate-50 hover:text-blue-600 rounded-lg text-left font-medium">
                    <Settings className="w-4 h-4" /> Configurações
                 </button>
                 <button onClick={() => showToast("Sessão finalizada com sucesso")} className="flex items-center gap-2 px-3 py-2 text-slate-600 text-[13px] hover:bg-rose-50 hover:text-rose-600 rounded-lg text-left font-medium">
                    <LogOut className="w-4 h-4" /> Sair
                 </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex items-center justify-around pb-safe z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-3 flex-1",
                isActive ? "text-blue-600" : "text-slate-500"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:block fixed bottom-5 left-10 text-[11px] text-slate-500 bg-white/80 px-3 py-1 rounded-full border border-slate-200 z-[60]">
        <strong>AppCliques MVP</strong> | Proposta CBL Act Phase | Product Mgmt Academic Project
      </div>
    </div>
  );
}
