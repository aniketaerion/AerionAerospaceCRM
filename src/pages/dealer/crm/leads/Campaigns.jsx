// src/pages/dealer/crm/leads/Campaigns.jsx
import React, { useState } from 'react';

function Campaigns() {
    const initialCampaigns = [
        { id: 1, name: 'New Year Promo', channel: 'WhatsApp', audience: 'All Farmers', schedule: '2025-12-30 10:00', open: 0, clicks: 0, responses: 0 },
        { id: 2, name: 'Spring Sale', channel: 'Email', audience: 'All Dealers', schedule: '2025-04-01 09:00', open: 150, clicks: 45, responses: 20 }
    ];
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [showForm, setShowForm] = useState(false);
    const [newCampaign, setNewCampaign] = useState({
        name: '', channel: 'WhatsApp', audience: '', schedule: '', template: ''
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewCampaign(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Add new campaign with dummy metrics
        let scheduleStr = newCampaign.schedule;
        if (scheduleStr.includes('T')) {
            scheduleStr = scheduleStr.replace('T', ' ');
        }
        const newEntry = {
            id: campaigns.length + 1,
            name: newCampaign.name,
            channel: newCampaign.channel,
            audience: newCampaign.audience,
            schedule: scheduleStr,
            open: 0,
            clicks: 0,
            responses: 0
        };
        setCampaigns([...campaigns, newEntry]);
        // Reset form and close modal
        setNewCampaign({ name: '', channel: 'WhatsApp', audience: '', schedule: '', template: '' });
        setShowForm(false);
    };

    return (
        <div className="campaigns-page">
            <h1>Campaigns</h1>
            <button onClick={() => setShowForm(true)}>New Campaign</button>

            {showForm && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-content" style={{ background: '#fff', padding: '20px', maxWidth: '500px', margin: '100px auto' }}>
                        <h2>Create New Campaign</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Campaign Name:<br/>
                                    <input type="text" name="name" value={newCampaign.name} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div>
                                <label>Channel:<br/>
                                    <select name="channel" value={newCampaign.channel} onChange={handleInputChange}>
                                        <option>WhatsApp</option>
                                        <option>SMS</option>
                                        <option>Email</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>Audience Segment:<br/>
                                    <input type="text" name="audience" value={newCampaign.audience} onChange={handleInputChange} placeholder="e.g. All Dealers" required />
                                </label>
                            </div>
                            <div>
                                <label>Schedule Time:<br/>
                                    <input type="datetime-local" name="schedule" value={newCampaign.schedule} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div>
                                <label>Message Template:<br/>
                                    <textarea name="template" value={newCampaign.template} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <button type="submit">Create Campaign</button>
                                <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="campaign-list">
                <h2>All Campaigns</h2>
                <table className="campaign-table">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Channel</th>
                            <th>Audience</th>
                            <th>Schedule</th>
                            <th>Open</th>
                            <th>Clicks</th>
                            <th>Responses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(c => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.channel}</td>
                                <td>{c.audience}</td>
                                <td>{c.schedule}</td>
                                <td>{c.open}</td>
                                <td>{c.clicks}</td>
                                <td>{c.responses}</td>
                            </tr>
                        ))}
                        {campaigns.length === 0 && (
                            <tr>
                                <td colSpan="7">No campaigns found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Campaigns;
