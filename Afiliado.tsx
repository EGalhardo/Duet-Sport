import React from 'react';
import { ArrowLeft, Copy, Share2, CheckCircle, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Afiliado() {
  const [copied, setCopied] = React.useState(false);
  const link = "https://duetdesportivo.com/afiliado?ref=123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Afiliado</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <img src="https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-orange-100" />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#091747]">Edlasio Galhardo</h1>
              <p className="text-xs text-[#FFB10A] font-bold uppercase tracking-widest">Afiliado Premium</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
             {[
               { label: 'N-Indicados', value: '127' },
               { label: 'Total Ganho', value: '1.250k Kz' },
               { label: 'Rend. Mensal', value: '125k Kz' }
             ].map((s, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-black text-[#091747]">{s.value}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase">{s.label}</p>
                </div>
             ))}
          </div>

          <div className="bg-transparent rounded-2xl p-4 md:p-6 border-2 border-gray-200">
             <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Link de Afiliado</p>
             <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono text-gray-700 overflow-hidden truncate">
                  {link}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#FFB10A] text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap active:scale-95 transition-all"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                  <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-[#FFB10A] hover:border-[#FFB10A] transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white rounded-3xl border border-gray-200 p-6">
              <h3 className="font-bold text-[#091747] mb-4">Como funciona?</h3>
              <ul className="space-y-4">
                 {[
                   'Partilha o teu link com amigos',
                   'Eles registam-se e participam',
                   'Recebes comissões por cada torneio'
                 ].map((text, i) => (
                   <li key={i} className="flex gap-3 items-start text-xs text-gray-600">
                     <div className="w-5 h-5 rounded-full bg-orange-100 text-[#FFB10A] flex items-center justify-center font-bold shrink-0">{i+1}</div>
                     {text}
                   </li>
                 ))}
              </ul>
           </div>
           
           <div className="bg-gradient-to-br from-[#FFB10A] to-[#FF6B00] rounded-3xl p-6 text-white">
              <Smartphone className="w-10 h-10 mb-4 opacity-50 text-white" />
              <h3 className="text-lg font-bold mb-2">Convida via Whatsapp</h3>
              <p className="text-xs opacity-90 leading-relaxed mb-6">
                A forma mais rápida de crescer a tua rede é partilhando diretamente com os teus contactos.
              </p>
              <button className="w-full bg-white text-[#FFB10A] font-bold py-3 rounded-xl">
                 Enviar Convite
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
