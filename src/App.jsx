import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ScriptAnalysis from './components/ScriptAnalysis'
import Feasibility from './components/Feasibility'
import VisualPlanning from './components/VisualPlanning'
import FootageSearch from './components/FootageSearch'
import Continuity from './components/Continuity'
import TakeSelection from './components/TakeSelection'
import SentimentAnalysis from './components/SentimentAnalysis'
import SceneIntentEngine from './components/SceneIntentEngine'
import ProductionHistory from './components/ProductionHistory'
import VideoPreviz from './components/VideoPreviz'
import StoryboardGenerator from './components/StoryboardGenerator'
import Auth from './components/Auth'
import './index.css'

const MainLayout = () => {
  const { activeTab, isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'script': return <ScriptAnalysis />;
      case 'feasibility': return <Feasibility />;
      case 'visuals': return <VisualPlanning />;
      case 'continuity': return <Continuity />;
      case 'footage': return <FootageSearch />;
      case 'takes': return <TakeSelection />;
      case 'sentiment': return <SentimentAnalysis />;
      case 'intent': return <SceneIntentEngine />;
      case 'video_previz': return <VideoPreviz />;
      case 'storyboard': return <StoryboardGenerator />;
      case 'history': return <ProductionHistory />;
      case 'settings': return (
        <div className="animate-in glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 className="gradient-text">Studio Settings</h2>
          <p style={{ color: 'var(--text-muted)' }}>Configuration module for Neural Renderer and API Endpoints.</p>
          <div className="badge badge-low" style={{ marginTop: '2rem' }}>v1.4.2 ALPHA</div>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  )
}

export default App
