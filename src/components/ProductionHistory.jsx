import React, { useState, useEffect } from 'react';
import {
    History,
    FileText,
    Calendar,
    TrendingUp,
    User,
    MapPin,
    ExternalLink,
    Loader2,
    Database,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../services/apiService';
import { useApp } from '../context/AppContext';

const ProductionHistory = () => {
    const { user } = useApp();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await apiService.script.getHistory(user?.id || 1);
            setHistory(data.history || []);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredHistory = history.filter(item =>
        item.file_name.toLowerCase().includes(filter.toLowerCase()) ||
        item.tone.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
                        <Database size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Data Persistence Layer</span>
                    </div>
                    <h1 className="gradient-text">Production History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Historical script analyses retrieved from MySQL</p>
                </div>

                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search archives..."
                        style={{
                            padding: '10px 10px 10px 40px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '10px',
                            color: '#fff',
                            width: '250px'
                        }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <Loader2 className="spin" size={40} color="var(--primary)" />
                </div>
            ) : filteredHistory.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '5rem' }}>
                    <History size={48} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
                    <h3>No Archives Found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Analyze your first script to start building your production database.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredHistory.map((item, idx) => {
                        let analysis = {};
                        try {
                            analysis = typeof item.analysis_data === 'string' ? JSON.parse(item.analysis_data) : (item.analysis_data || {});
                        } catch (e) {
                            console.error("Parse error for history item", item.id);
                        }
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-card history-item"
                                whileHover={{ x: 5, borderColor: 'var(--primary)' }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem',
                                    borderLeft: `4px solid ${item.risk_score > 50 ? 'var(--accent)' : 'var(--primary)'}`
                                }}
                            >
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                    <div className="file-icon-box">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{item.file_name}</h4>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4px' }}>
                                            <span className="meta-info"><Calendar size={12} /> {new Date(item.created_at).toLocaleDateString()}</span>
                                            <span className="meta-info"><TrendingUp size={12} /> Risk Index: {item.risk_score}%</span>
                                            <span className="badge badge-low" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>{item.tone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
                                            <User size={12} /> {analysis?.characters?.length || 0} Characters
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                            <MapPin size={12} /> {analysis?.locations?.length || 0} Locations
                                        </div>
                                    </div>
                                    <button className="btn btn-outline" style={{ padding: '8px 16px' }}>
                                        <ExternalLink size={16} /> Restore
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            <style>{`
                .history-item {
                    transition: var(--transition);
                    cursor: pointer;
                }
                .file-icon-box {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    background: rgba(192, 132, 252, 0.1);
                    color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .meta-info {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ProductionHistory;
