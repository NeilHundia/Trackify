import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('currency');

    const currencyOptions = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    ];

    const dateFormatOptions = [
        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
    ];

    return (
        <div className="settings-page">
            <h1 className="settings-title">Settings</h1>
            
            <div className="settings-container">
                <div className="settings-sidebar">
                    <button 
                        className={`settings-tab ${activeTab === 'currency' ? 'active' : ''}`}
                        onClick={() => setActiveTab('currency')}
                    >
                        Currency & Format
                    </button>
                    <button 
                        className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        Account
                    </button>
                    <button 
                        className={`settings-tab ${activeTab === 'display' ? 'active' : ''}`}
                        onClick={() => setActiveTab('display')}
                    >
                        Display
                    </button>
                    <button 
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notifications
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'currency' && (
                        <div className="settings-section">
                            <h2>Currency & Format Settings</h2>
                            
                            <div className="settings-group">
                                <label>Default Currency</label>
                                <select className="settings-select">
                                    {currencyOptions.map(currency => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.code} - {currency.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="settings-group">
                                <label>Date Format</label>
                                <select className="settings-select">
                                    {dateFormatOptions.map(format => (
                                        <option key={format.value} value={format.value}>
                                            {format.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="settings-group">
                                <label>Currency Display</label>
                                <div className="settings-radio-group">
                                    <label>
                                        <input type="radio" name="currencyPosition" value="before" />
                                        Before amount (e.g., $100)
                                    </label>
                                    <label>
                                        <input type="radio" name="currencyPosition" value="after" />
                                        After amount (e.g., 100$)
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="settings-section">
                            <h2>Account Settings</h2>
                            
                            <div className="settings-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    className="settings-input"
                                    value={user?.email || ''}
                                    readOnly
                                />
                            </div>

                            <div className="settings-group">
                                <label>Change Password</label>
                                <input 
                                    type="password" 
                                    className="settings-input"
                                    placeholder="Current Password"
                                />
                                <input 
                                    type="password" 
                                    className="settings-input"
                                    placeholder="New Password"
                                />
                                <input 
                                    type="password" 
                                    className="settings-input"
                                    placeholder="Confirm New Password"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'display' && (
                        <div className="settings-section">
                            <h2>Display Settings</h2>
                            
                            <div className="settings-group">
                                <label>Theme</label>
                                <div className="settings-radio-group">
                                    <label>
                                        <input type="radio" name="theme" value="light" />
                                        Light
                                    </label>
                                    <label>
                                        <input type="radio" name="theme" value="dark" />
                                        Dark
                                    </label>
                                </div>
                            </div>

                            <div className="settings-group">
                                <label>Number Format</label>
                                <div className="settings-radio-group">
                                    <label>
                                        <input type="radio" name="numberFormat" value="comma" />
                                        Use commas (1,234.56)
                                    </label>
                                    <label>
                                        <input type="radio" name="numberFormat" value="dot" />
                                        Use dots (1.234,56)
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h2>Notification Settings</h2>
                            
                            <div className="settings-group">
                                <label>Budget Alerts</label>
                                <div className="settings-checkbox-group">
                                    <label>
                                        <input type="checkbox" />
                                        Alert when approaching budget limit
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        Alert when exceeding budget
                                    </label>
                                </div>
                            </div>

                            <div className="settings-group">
                                <label>Monthly Reports</label>
                                <div className="settings-checkbox-group">
                                    <label>
                                        <input type="checkbox" />
                                        Send monthly expense summary
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        Send budget performance report
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings; 