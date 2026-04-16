import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { MOCK_PROVIDERS, CATEGORIES } from '../data/mock';

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || '');

  // Clear category if user starts typing in search
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (selectedCategory && e.target.value) {
      setSelectedCategory('');
    }
  };

  const filteredProviders = MOCK_PROVIDERS.filter(p => {
    const searchMatch = searchTerm 
      ? (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.profession.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    const categoryMatch = selectedCategory ? p.categoryId === selectedCategory : true;
    
    return searchMatch && categoryMatch;
  });

  return (
    <div className="space-y-6 fade-in relative">
      <div>
        <h1 className="text-[28px] font-bold mb-2">Buscar Profissionais</h1>
        <p className="text-slate-500">Encontre o especialista ideal para o seu serviço.</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder={
              selectedCategory 
                ? `Buscar em ${CATEGORIES.find(c => c.id === selectedCategory)?.name}...`
                : "Buscar por nome ou profissão..."
            }
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="w-full pl-12 pr-4 py-[10px] rounded-[20px] border border-slate-200 bg-white outline-none text-slate-900 text-[14px] focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <button onClick={() => setShowFilterModal(true)} className="flex items-center justify-center bg-white border border-slate-200 text-slate-700 px-5 rounded-[20px] hover:bg-slate-50">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {showFilterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm fade-in">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-xl relative">
            <button onClick={() => setShowFilterModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1 border border-slate-200">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Filtros</h2>
            
            <div className="space-y-4 text-[14px]">
              <div>
                <label className="block font-medium text-slate-700 mb-2">Avaliação mínima</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 border border-slate-200 rounded-lg hover:border-blue-600 hover:text-blue-600">4.5+</button>
                  <button className="flex-1 py-1.5 border border-slate-200 rounded-lg hover:border-blue-600 hover:text-blue-600">4.0+</button>
                  <button className="flex-1 py-1.5 border border-slate-200 rounded-lg bg-blue-50 text-blue-600 border-blue-600 font-medium">Todas</button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-2">Preço (R$)</label>
                 <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-blue-600"/>
                  <span className="text-slate-400 self-center">-</span>
                  <input type="number" placeholder="Max" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-blue-600"/>
                </div>
              </div>
            </div>

            <button onClick={() => setShowFilterModal(false)} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-8">
        {filteredProviders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-[20px] border border-slate-200">
            <p className="text-slate-500">Nenhum profissional encontrado com esse termo.</p>
          </div>
        ) : (
          filteredProviders.map(provider => (
            <Link 
              key={provider.id} 
              to={`/provider/${provider.id}`}
              className="bg-white p-4 sm:p-5 rounded-[20px] border border-slate-200 hover:border-blue-600 transition-colors flex flex-col sm:flex-row gap-5 sm:items-center"
            >
              <img 
                src={provider.avatarUrl} 
                alt={provider.name} 
                className="w-20 h-20 bg-slate-200 rounded-xl object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[16px] leading-tight mb-1 text-slate-900">{provider.name}</h3>
                    <p className="text-slate-500 text-[13px]">{provider.profession}</p>
                    <div className="flex items-center gap-1 text-[13px] font-bold text-amber-500 mt-1 mb-2">
                      ★ {provider.rating.toFixed(1)}
                      <span className="font-normal text-slate-500 ml-1">({provider.reviewsCount} avaliações)</span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                      Disponível
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] line-clamp-2">
                  {provider.bio}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
