import React from 'react';
import { ArrowLeft, PlayCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const tutorials = [
  { title: 'Como Criar uma Conta', duration: '5:30', sub: 'Aprende a registar-te no DUET e configurar o teu perfil.' },
  { title: 'Como Participar em Torneios', duration: '8:15', sub: 'Guia completo para join e competir em torneios.' },
  { title: 'Como Depositar e Levantar', duration: '6:45', sub: 'Aprende a gerir a tua carteira no DUET.' },
];

export default function Tutorial() {
  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Video-Tutorial</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="font-dancing text-3xl md:text-5xl font-bold text-[#FFB10A] mb-4">Aprende a Usar o DUET</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Descobre tutoriais em vídeo que te vão ajudar a navegar e aproveitar ao máximo todas as funcionalidades do DUET.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((video, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-200 overflow-hidden group cursor-pointer hover:border-[#FFB10A] transition-all duration-300">
               <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-[#FFB10A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1 fill-current" />
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                    {video.duration}
                  </span>
               </div>
               <div className="p-5">
                  <h3 className="font-bold text-[#091747] mb-2 group-hover:text-[#FFB10A] transition-colors">{video.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{video.sub}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
