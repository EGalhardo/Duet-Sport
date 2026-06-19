import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ImagePreloader from './components/ImagePreloader';
import Classificacao from './pages/Classificacao';
import Liga from './pages/Liga';

// Lazy load components for better performance and scalability with automatic recovery for dynamic chunk failures
const safeLazy = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().catch((err) => {
      console.warn("Erro ao carregar o módulo, a recarregar a página...", err);
      const lastReload = sessionStorage.getItem('last-chunk-reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('last-chunk-reload', String(now));
        window.location.reload();
      }
      return { default: () => null };
    })
  );
};

const Home = safeLazy(() => import('./pages/Home'));
const Aposta = safeLazy(() => import('./pages/Aposta'));
const Carteira = safeLazy(() => import('./pages/Carteira'));
const Historico = safeLazy(() => import('./pages/Historico'));
const Favoritos = safeLazy(() => import('./pages/Favoritos'));
const Perfil = safeLazy(() => import('./pages/Perfil'));
const OpiniaoSugestoes = safeLazy(() => import('./pages/OpiniaoSugestoes'));
const TransactionPage = safeLazy(() => import('./pages/TransactionPage'));
const DadosPessoais = safeLazy(() => import('./pages/DadosPessoais'));
const Seguranca = safeLazy(() => import('./pages/Seguranca'));
const Tutorial = safeLazy(() => import('./pages/Tutorial'));
const Afiliado = safeLazy(() => import('./pages/Afiliado'));
const Definicoes = safeLazy(() => import('./pages/Definicoes'));
const TerminarSessao = safeLazy(() => import('./pages/TerminarSessao'));
const InfoPage = safeLazy(() => import('./pages/InfoPage'));

const LayoutAdmin = safeLazy(() => import('./components/admin/LayoutAdmin'));
const AdminDashboard = safeLazy(() => import('./pages/admin/AdminDashboard'));
const AdminPartidas = safeLazy(() => import('./pages/admin/AdminPartidas'));
const AdminResultados = safeLazy(() => import('./pages/admin/AdminResultados'));

// Loading component for Suspense
const PageLoader = ({ isOverlay = false }: { isOverlay?: boolean }) => (
  <div className={`flex flex-col items-center justify-center p-8 z-[500] ${isOverlay ? 'fixed inset-0 bg-white' : 'flex-1'}`}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#FFB10A] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-center text-[10px] font-black text-[#FFB10A] uppercase tracking-widest animate-pulse">
        A carregar...
      </p>
    </div>
  </div>
);

import { useAppContext } from './context/AppContext';
import { startNotificationSimulator, stopNotificationSimulator } from './services/notificationSimulator';
import AuthModal from './components/home/AuthModal';

const AppRoutes = () => {
  const location = useLocation();
  const { auth } = useAppContext();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Start active live notification sim loop
    startNotificationSimulator();
    
    // Auth trigger after 5 seconds if not logged in
    const timer = setTimeout(() => {
      if (!auth.isLoggedIn) {
        setShowAuthModal(true);
      }
    }, 5000);

    return () => {
      stopNotificationSimulator();
      clearTimeout(timer);
    };
  }, [auth.isLoggedIn]);

  return (
    <>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialTab="login" 
      />
      <Suspense fallback={<PageLoader isOverlay />}>
        <Routes>
          <Route path="/admin/*" element={
            <LayoutAdmin>
              <Routes>
                <Route path="" element={<AdminDashboard />} />
                <Route path="partidas" element={<AdminPartidas />} />
                <Route path="resultados" element={<AdminResultados />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </LayoutAdmin>
          } />
          
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/classificacao" element={<Classificacao />} />
                <Route path="/carteira" element={<Carteira />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/opinioes-sugestoes" element={<OpiniaoSugestoes />} />
                <Route path="/dados-pessoais" element={<DadosPessoais />} />
                <Route path="/seguranca" element={<Seguranca />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/afiliado" element={<Afiliado />} />
                <Route path="/definicoes" element={<Definicoes />} />
                <Route path="/logout" element={<TerminarSessao />} />
                <Route path="/info/:slug" element={<InfoPage />} />
                <Route path="/contacto" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Contacto - Em desenvolvimento</h1></div>} />
                
                <Route path="/liga/:category" element={<Liga />} />
                <Route path="/aposta/:category" element={<Aposta />} />

                <Route path="/depositar" element={<TransactionPage />} />
                <Route path="/levantar" element={<TransactionPage />} />
                <Route path="/transferir" element={<TransactionPage />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ImagePreloader />
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
