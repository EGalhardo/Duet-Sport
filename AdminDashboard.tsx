import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, Users, Activity, Sparkles, RefreshCw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Padrão Suspeito Detetado',
      desc: 'Contas @joao_master e @carlos_dev criaram 15 Duelos Privados seguidos entre si com vitória alternada. Risco de lavagem de saldo: 94%.',
      icon: ShieldAlert,
      color: 'red'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Anomalia de WinRate',
      desc: 'Utilizador @pedro_f1 tem um WinRate de 98.5% nas últimas 40 apostas da F1. Pode estar a explorar um atraso (delay) na API de resolução.',
      icon: Activity,
      color: 'orange'
    }
  ]);

  const stats = [
    { title: 'Receita Kz (Hoje)', value: '145.000', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100' },
    { title: 'Apostas Ativas', value: '342', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: 'Utilizadores Online', value: '1,024', icon: Users, color: 'text-purple-500', bg: 'bg-purple-100' },
    { title: 'Alertas de Fraude', value: alerts.length.toString(), icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleResolveAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Mock chart data for commissions
  const chartData = [
    { day: 'Seg', amount: 45000, height: '45%' },
    { day: 'Ter', amount: 52000, height: '52%' },
    { day: 'Qua', amount: 38000, height: '38%' },
    { day: 'Qui', amount: 65000, height: '65%' },
    { day: 'Sex', amount: 89000, height: '89%' },
    { day: 'Sáb', amount: 145000, height: '100%' },
    { day: 'Dom', amount: 112000, height: '80%' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#091747] uppercase italic tracking-tight">Dashboard IA</h1>
          <p className="text-sm font-bold text-gray-500">Visão geral do sistema e alertas de risco.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar Dados
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-black text-[#091747]">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk & Analytics Module */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[#091747] text-lg uppercase italic">Radar de Fraude (IA)</h3>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          
          <div className="space-y-4 flex-1">
            <AnimatePresence>
              {alerts.length > 0 ? alerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  className={`p-4 bg-${alert.color}-50 border border-${alert.color}-100 rounded-xl flex items-start gap-4`}
                >
                  <alert.icon className={`w-5 h-5 text-${alert.color}-500 shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <h4 className={`text-sm font-black text-${alert.color}-900 uppercase`}>{alert.title}</h4>
                    <p className={`text-xs font-medium text-${alert.color}-700 mt-1 leading-relaxed`} dangerouslySetInnerHTML={{ __html: alert.desc }} />
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => handleResolveAlert(alert.id)}
                        className={`px-3 py-1.5 bg-${alert.color}-600 text-white text-[10px] font-black uppercase rounded-lg hover:bg-${alert.color}-700 transition-colors`}
                      >
                        {alert.type === 'critical' ? 'Bloquear Contas' : 'Rever Histórico'}
                      </button>
                      <button 
                        onClick={() => handleResolveAlert(alert.id)}
                        className={`px-3 py-1.5 bg-white text-${alert.color}-600 border border-${alert.color}-200 text-[10px] font-black uppercase rounded-lg hover:bg-${alert.color}-50 transition-colors`}
                      >
                        Ignorar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 bg-green-50 rounded-xl border-2 border-dashed border-green-200"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="font-black text-green-800 uppercase">Sistema Seguro</h4>
                  <p className="text-xs font-bold text-green-600 mt-1">A IA não detetou anomalias ou padrões suspeitos na rede.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[#091747] text-lg uppercase italic">Receita Kz (7 Dias)</h3>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          
          <div className="flex-1 min-h-[250px] flex items-end justify-between gap-2 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 flex-1 group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#091747] text-white text-[9px] font-black px-2 py-1 rounded absolute -mt-8 pointer-events-none whitespace-nowrap z-10">
                  {data.amount.toLocaleString()} Kz
                </div>
                
                <div className="w-full relative h-48 bg-slate-100 rounded-t-sm flex items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: data.height }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className={`w-full rounded-t-sm ${idx === chartData.length - 1 ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-[#FFB10A]'}`}
                  />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}