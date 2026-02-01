import React, { useState } from 'react';
import { Search, Play, Clock, Filter, List, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';

const FootageSearch = () => {
    const { navigateTo } = useApp();
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!query) return;
        setIsSearching(true);
        try {
            const data = await apiService.vision.searchFootage(query);
            setResults(data.results || []);
        } catch (err) {
            console.error("Search failed", err);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <button
                        className="btn-back"
                        onClick={() => navigateTo('dashboard')}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="gradient-text">Semantic Footage Search</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Search raw takes using natural language descriptions</p>
                    </div>
                </div>
            </header>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search
                            size={20}
                            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                        />
                        <input
                            type="text"
                            placeholder="e.g. 'Show me all cuts where Elias looks worried'"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '12px',
                                padding: '14px 14px 14px 48px',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0 30px', minWidth: '140px', justifyContent: 'center' }}
                        onClick={handleSearch}
                        disabled={isSearching}
                    >
                        {isSearching ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
                    </button>
                    <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isSearching ? 'Analyzing video embeddings...' : `Showing ${results.length} results for your project`}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn" style={{ padding: '6px', background: 'rgba(255,255,255,0.05)' }}><List size={18} /></button>
                    <button className="btn" style={{ padding: '6px', background: 'var(--primary-glow)', color: 'var(--primary)' }}><Play size={18} /></button>
                </div>
            </div>

            <div className="grid grid-cols-3">
                <AnimatePresence>
                    {!isSearching && results.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card"
                            style={{ padding: 0, overflow: 'hidden' }}
                        >
                            <div style={{ height: '180px', position: 'relative', background: '#000' }}>
                                <img
                                    src={res.thumbnail}
                                    alt="Thumbnail"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(4px)',
                                    cursor: 'pointer'
                                }}>
                                    <Play size={18} fill="white" color="white" />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '8px',
                                    right: '8px',
                                    background: 'rgba(0,0,0,0.7)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    color: 'white'
                                }}>
                                    {res.timestamp}
                                </div>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{res.description}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    <Clock size={12} /> Take 04 - Scene 12B
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FootageSearch;
