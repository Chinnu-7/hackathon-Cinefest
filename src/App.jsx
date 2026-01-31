import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ScriptAnalysis from './components/ScriptAnalysis'
import Feasibility from './components/Feasibility'
import VisualPlanning from './components/VisualPlanning'
import FootageSearch from './components/FootageSearch'
import Continuity from './components/Continuity'
import TakeSelection from './components/TakeSelection'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'script':
        return <ScriptAnalysis />;
      case 'feasibility':
        return <Feasibility />;
      case 'visuals':
        return <VisualPlanning />;
      case 'continuity':
        return <Continuity />;
      case 'footage':
        return <FootageSearch />;
      case 'takes':
        return <TakeSelection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
