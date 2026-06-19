import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';

const infoContent: Record<string, { title: string, content: React.ReactNode }> = {
  'politica-privacidade': {
    title: 'Política de Privacidade',
    content: (
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>A presente Política de Privacidade descreve como o DUET Desportivo recolhe, utiliza e protege os seus dados.</p>
        <h3 className="font-bold text-[#091747]">1. Recolha de Dados</h3>
        <p>Recolhemos dados necessários para a sua participação em torneios e gestão da sua conta.</p>
        <h3 className="font-bold text-[#091747]">2. Uso de Informação</h3>
        <p>Os seus dados são usados para personalizar a sua experiência e garantir a segurança das transações.</p>
      </div>
    )
  },
  'termos-condicoes': {
    title: 'Termos e Condições',
    content: (
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>Ao utilizar o DUET Desportivo, você concorda com os nossos termos de serviço.</p>
        <h3 className="font-bold text-[#091747]">1. Elegibilidade</h3>
        <p>Deve ter pelo menos 18 anos para participar nas competições com valor monetário.</p>
      </div>
    )
  },
  'ajuda': {
    title: 'Centro de Ajuda',
    content: (
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>Encontre aqui respostas para as suas dúvidas.</p>
        <h3 className="font-bold text-[#091747]">Como participar?</h3>
        <p>Escolha uma categoria na página inicial e entre num torneio ativo.</p>
      </div>
    )
  }
};

export default function InfoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = slug ? infoContent[slug] : null;

  if (!data) return <div className="p-8 text-center text-gray-500">Página não encontrada.</div>;

  return (
    <div className="flex flex-col flex-1">
      <div className="h-[46px] border-b border-gray-200 bg-white px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">{data.title}</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10">
          <div className="flex items-center justify-center mb-8">
             <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
                <Info className="w-8 h-8 text-[#FFC000]" />
             </div>
          </div>
          <h1 className="text-2xl font-black text-[#091747] text-center mb-8">{data.title}</h1>
          <div className="prose prose-orange max-w-none">
            {data.content}
          </div>
        </div>
      </div>
    </div>
  );
}
