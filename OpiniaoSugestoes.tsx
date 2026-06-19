import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Edit3, Send, Tag, MessageCircle, Star, Palette, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Opiniões', value: '127' },
  { label: 'Média Geral', value: '4.5' },
  { label: 'Utilizadores', value: '89' },
  { label: 'Categorias', value: '11' },
];

export default function OpiniaoSugestoes() {
  const [currentCategory, setCurrentCategory] = useState('futebol');
  const [ratings, setRatings] = useState({
    design: 0,
    intuitividade: 0,
    conteudo: 0
  });
  const [comment, setComment] = useState('');

  const categories = [
    { id: 'futebol', label: 'Futebol' },
    { id: 'basket', label: 'Basket' },
    { id: 'f1', label: 'F1' }
  ];

  const averageRating = (
    (ratings.design + ratings.intuitividade + ratings.conteudo) / (
      [ratings.design, ratings.intuitividade, ratings.conteudo].filter(r => r > 0).length || 1
    )
  ).toFixed(1);

  const criteria = [
    { id: 'design', label: 'Design (Estilo da Página)', icon: Palette },
    { id: 'intuitividade', label: 'Intuitividade (Facil uso)', icon: Zap },
    { id: 'conteudo', label: 'Conteúdo (Informação apresentada)', icon: BookOpen },
  ];

  const handleRating = (criterionId: string, value: number) => {
    setRatings(prev => ({ ...prev, [criterionId]: value }));
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-300 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto text-[#091747]">
          <Link to="/" className="text-[#091747] transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-black text-center uppercase tracking-tighter">Opinião & Sugestões</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-6 pb-12">
        <div className="bg-gradient-to-r from-[#FFB10A]/5 to-[#FF6B00]/5 rounded-3xl p-6 md:p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-gradient-to-br from-[#FFB10A] to-[#FF6B00] rounded-2xl p-4 text-center text-white">
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[10px] opacity-90 uppercase font-black tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-black text-[#091747] flex items-center gap-2 uppercase tracking-tight">
              <MessageSquare className="w-5 h-5 text-[#FFB10A]" />
              Categorias de Feedback
            </h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-2">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setCurrentCategory(cat.id)}
                className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shrink-0 ${
                  currentCategory === cat.id ? 'bg-[#FFB10A] text-white scale-105' : 'bg-white border border-gray-300 text-[#364153] hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-300 p-8 mb-8">
           <h3 className="text-[15px] font-black text-[#091747] mb-6 flex items-center gap-2 uppercase tracking-tight">
             <Edit3 className="w-5 h-5 text-[#FFB10A]" />
             Partilha a tua opinião em <span className="text-[#FFB10A]">{categories.find(c => c.id === currentCategory)?.label}</span>
           </h3>

           <div className="space-y-6">
              <div>
                <p className="text-[11px] font-black text-[#364153] uppercase tracking-widest mb-4">Avaliação por Critérios</p>
                <div className="space-y-3">
                  {criteria.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-300">
                      <div className="flex items-center gap-3">
                        <c.icon className="w-4 h-4 text-[#FFB10A]" />
                        <span className="text-[11px] font-black text-[#091747] uppercase tracking-tight">{c.label}</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(c.id, star)}
                            className="p-1 transition-all active:scale-110"
                          >
                            <Star 
                              className={`w-4 h-4 ${
                                ratings[c.id as keyof typeof ratings] >= star 
                                  ? 'fill-[#FFB10A] text-[#FFB10A]' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-orange-200 p-5 rounded-2xl flex items-center justify-between">
                <span className="text-[11px] font-black text-[#091747] uppercase tracking-widest">Média Geral</span>
                <span className="text-xl font-black text-[#FFB10A] italic">{averageRating}</span>
              </div>
              
              <div className="pt-2">
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-32 p-5 rounded-2xl border-2 border-gray-300 focus:border-[#FFB10A] outline-none text-[13px] transition-all bg-white font-bold text-[#091747] placeholder:text-[#364153]/50"
                  placeholder={`Partilha a tua opinião, sugestão ou feedback sobre ${categories.find(c => c.id === currentCategory)?.label}...`}
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#FFB10A] text-white font-black py-5 rounded-2xl hover:bg-[#FFC000] active:scale-[0.98] transition-all uppercase tracking-widest bg-gradient-to-r from-[#FFB10A] to-[#FF6B00]">
                <Send className="w-4 h-4" />
                Publicar Opinião
              </button>
           </div>
        </div>

         <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <MessageCircle className="w-5 h-5 text-[#FFB10A]" />
              <h3 className="font-black text-[#091747] uppercase tracking-tight">Últimos Comentários</h3>
            </div>
            
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-300 p-6 hover:border-[#FFB10A] transition-all">
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFB10A] to-[#FF6B00] shrink-0 flex items-center justify-center">
                     <span className="text-white font-black">U</span>
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                       <p className="font-black text-[#091747]">Utilizador #{i}</p>
                       <p className="text-[10px] text-[#364153] font-black uppercase tracking-widest">Há {i}h</p>
                     </div>
                     <p className="mt-3 text-sm text-[#364153] leading-relaxed font-bold">
                       {i === 1 
                         ? "As odds para os jogos da Liga Angolana estão muito competitivas. Gostaria de ver mais mercados de golos."
                         : "A interface de apostas de F1 é fantástica, muito intuitiva!"}
                     </p>
                     <div className="mt-4 flex items-center gap-2">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-100 text-[#FFB10A] text-[9px] font-black uppercase tracking-widest border border-orange-200">
                          <Tag className="w-3 h-3" /> {i === 1 ? 'Futebol' : 'F1'}
                        </span>
                     </div>
                   </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
