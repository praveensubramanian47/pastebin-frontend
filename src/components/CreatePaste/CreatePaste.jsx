import React, { useState } from 'react';
import { createPaste } from "../../services/api";
import "./CreatePaste.css";

const CreatePaste = () => {
    const [content, setContent] = useState();
    const [ttlSeconds, setTtlSeconds] = useState();
    const [maxView, setMaxView] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [result, setResult] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Content cannot be empty');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = { content };
            if (ttlSeconds) data.ttl_seconds = parseInt(ttlSeconds);
            if (maxView) data.max_views = parseInt(maxView);

            


            const response = await createPaste(data);
            setResult(response)

            // Clear form
            setContent('');
            setTtlSeconds('');
            setMaxView('');
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to create paste';
            setError(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg)
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setContent('');
        setTtlSeconds('');
        setMaxView('');
        setError('');
        setResult(null);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result.url);
        alert('URL copied to clipboard');
    }

    return (
        <div className='container-fluid'>
            <div className="create-paste-container">
                <div className="header">
                    <h1> Pastebin</h1>
                    <p className="subtitle">Create and share text snippets easily</p>
                </div>

                {!result && (
                    <form onSubmit={handleSubmit} className="paste-form">
                        <div className="form-group">
                            <label htmlFor="content">Paste Content *</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter your text here..."
                                rows="12"
                                required
                            />
                        </div>

                        <div className="options-grid">
                            <div className="form-group">
                                <label htmlFor="ttl">Expiry Time (seconds)</label>
                                <input
                                    type="number"
                                    id="ttl"
                                    value={ttlSeconds}
                                    onChange={(e) => setTtlSeconds(e.target.value)}
                                    placeholder="Optional"
                                    min="1"
                                />
                                <small className="help-text">Leave empty for no expiry</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="maxViews">Maximum Views</label>
                                <input
                                    type="number"
                                    id="maxView"
                                    value={maxView}
                                    onChange={(e) => setMaxView
                                        (e.target.value)}
                                    placeholder="Optional"
                                    min="1"
                                />
                                <small className="help-text">Leave empty for unlimited views</small>
                            </div>
                        </div>

                        <div className="button-group">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Paste'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleClear}>
                                Clear
                            </button>
                        </div>
                    </form>
                )}



                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Creating your paste...</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="result-container">
                        <div className="result-title">Paste Created Successfully!</div>
                        <div className="url-box">
                            <input type="text" value={result.url} readOnly className="url-input" />
                            <button onClick={copyToClipboard} className="btn-copy">
                                Copy
                            </button>
                        </div>
                        <a href={`/p/${result.id}`} className="btn-visit">
                            Visit Paste →
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreatePaste