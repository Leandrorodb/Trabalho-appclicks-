import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';
import { CATEGORIES, MOCK_PROVIDERS } from '../data/mock';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  const topProviders = MOCK_PROVIDERS.slice(0, 3);

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[20px] p-6 md:px-10 md:py-12 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Serviços Locais,<br/>em um clique.
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            Encontre profissionais verificados próximos a você.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="O que você precisa hoje? Ex: Encanador..." 
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 outline-none text-slate-900 focus:ring-4 focus:ring-blue-400/30"
              />
            </div>
            <button type="submit" className="bg-blue-600 border border-blue-400 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-sm">
              Buscar
            </button>
          </form>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="text-[14px] uppercase tracking-wider text-slate-500 font-semibold">Categorias</h2>
          <Link to="/search" className="flex items-center gap-1 hover:underline text-blue-600 font-medium text-[13px]">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/search?category=${cat.id}`}
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all group"
            >
              <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-md flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="text-sm font-bold">{cat.name.charAt(0)}</span>
              </div>
              <span className="text-[13px] font-medium leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Providers */}
      <section>
        <h2 className="text-[14px] uppercase tracking-wider text-slate-500 font-semibold mb-4 mt-6">Prestadores em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProviders.map((provider) => (
            <Link key={provider.id} to={`/provider/${provider.id}`} className="bg-white rounded-[16px] p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all flex flex-col h-full">
              <div className="flex gap-4 items-start mb-2">
                <img 
                  src={provider.avatarUrl} 
                  alt={provider.name} 
                  className="w-16 h-16 rounded-[12px] bg-slate-200 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight">{provider.name}</h3>
                  <p className="text-slate-500 text-[13px] mb-1">{provider.profession}</p>
                  <div className="flex items-center gap-1 text-[13px] font-bold text-amber-500">
                    ★ <span>{provider.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({provider.reviewsCount})</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-[13px] line-clamp-2 mt-auto mb-4">
                {provider.bio}
              </p>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-auto">
                <span className="text-blue-600 text-sm font-bold">R$ {provider.services[0]?.price}/serviço</span>
                <span className="text-blue-600 text-sm font-semibold hover:underline">Ver perfil</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
