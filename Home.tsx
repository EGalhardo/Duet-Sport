import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES } from '../constants';
import { Category } from '../types';
import CategoryCard from '../components/home/CategoryCard';
import InfoModal from '../components/home/InfoModal';

export default function Home() {
  const { auth } = useAppContext();
  const navigate = useNavigate();
  const [infoCategory, setInfoCategory] = React.useState<Category | null>(null);

  // No onboarding redirect to guarantee Home is the very first screen


  return (
    <div className="flex flex-col flex-1">
      <InfoModal 
        isOpen={!!infoCategory} 
        onClose={() => setInfoCategory(null)} 
        category={infoCategory} 
        onEntrar={(path) => {
          setInfoCategory(null);
          navigate(path);
        }}
      />
      <div className="p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-4 text-center"
        >
          <img 
            src="https://i.postimg.cc/9XT19dr9/l-OGOMARCA-OFICIAL-2.gif" 
            alt="DUET Logo" 
            className="object-contain mx-auto w-full max-w-[18rem] sm:max-w-[21rem] md:max-w-[28rem] lg:max-w-[36rem] aspect-square"
          />
        </motion.div>

        <div className="w-[90%] h-px bg-gray-300 my-6 mx-auto" />

        <h1 className="font-dancing font-bold text-[#ffae00] text-center mb-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tighter">
          CATEGORIAS
        </h1>

        <div className="w-full max-w-6xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center justify-center">
            {CATEGORIES.map((cat) => (
              <CategoryCard 
                key={cat.id} 
                category={cat} 
                onInfoClick={(category) => setInfoCategory(category)}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-auto bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-black text-[#091747] uppercase tracking-wider mb-4">Plataforma</h3>
              <ul className="space-y-2">
                <li><Link to="/tutorial" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Como funciona</Link></li>
                <li><Link to="/classificacao" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Classificação Global</Link></li>
                <li><Link to="/opinioes-sugestoes" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Opinião & Sugestões</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#091747] uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/info/politica-privacidade" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Privacidade</Link></li>
                <li><Link to="/info/termos-condicoes" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Termos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#091747] uppercase tracking-wider mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><Link to="/info/ajuda" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Ajuda</Link></li>
                <li><Link to="/contacto" className="text-sm font-bold text-[#364153] hover:text-[#FFB10A]">Contacto</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
               <img src="https://i.postimg.cc/Pr21PzHM/DUET-LOGO.png" alt="DUET" className="h-8 mb-4" />
               <p className="text-xs font-bold text-[#364153]">© 2026 DUET</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
