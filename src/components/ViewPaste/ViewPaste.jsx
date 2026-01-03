import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPaste } from "../../services/api";
import "./ViewPaste.css";

const ViewPaste = () => {

    let id = useParams();
    const [paste, setPaste] = useState('');
    const [load, setLoad] = useState(true);
    const [error, setError] = useState('');

    id = id.id

    console.log("ID", id);

    useEffect(() => {
        const loadPast = async () => {
            try {
                const data = await fetchPaste(id);
                setPaste(data);
                console.log("Daata", data);

            } catch (err) {
                setError(err.response?.data?.error || 'Paste not found');
            } finally {
                setLoad(false)
            }
        };
        loadPast();
    }, [id]);

    if (load) {
        return (
            <div className="view-paste-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading paste..</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-paste-container">
                <div className="error-box">
                    <h1>404</h1>
                    <p>{error}</p>
                    <Link to="/" className="btn-home">← Create New Paste</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="view-paste-container">
            <div className="paste-header">
                <h1>Paste Content</h1>
                <Link to="/" className="btn-home">← Create New</Link>
            </div>

            <div className="paste-info">
                {paste.remaining_views !== null && (
                    <div className="info-badge">
                         {paste.remaining_views} views remaining
                    </div>
                )}
                {paste.expires_at && (
                    <div className="info-badge">
                         Expires: {new Date(paste.expires_at).toLocaleString()}
                    </div>
                )}
            </div>

            <div className="paste-content">
                <pre>{paste.content}</pre>
            </div>
        </div>
    )
}

export default ViewPaste