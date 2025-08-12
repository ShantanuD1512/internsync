import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewPostedInternships = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orgUser = location.state;
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        if (orgUser?.organizationId) {
            axios.get(`http://localhost:8080/api/org/internship/all/${orgUser.organizationId}`)
                .then(res => setInternships(res.data))
                .catch(err => console.error("Failed to fetch internships", err));
        }
    }, [orgUser]);

    const handleBack = () => {
        navigate('/org-dashboard', { state: orgUser });
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                {/* Back Button */}
                <button onClick={handleBack} style={styles.backButton}>
                    ← Back to Dashboard
                </button>

                <h2 style={styles.heading}>📃 Posted Internships</h2>
                <p style={styles.subtext}>
                    Internships posted by <strong>{orgUser?.name || 'your organization'}</strong>
                </p>
            </div>

            {internships.length === 0 ? (
                <p style={styles.noData}>No internships posted yet.</p>
            ) : (
                <div style={styles.grid}>
                    {internships.map((internship, index) => (
                        <div key={index} style={styles.card}>
                            <h3 style={styles.cardTitle}>{internship.title}</h3>
                            <p><strong>Description:</strong> {internship.description}</p>
                            <p><strong>Location:</strong> {internship.location}</p>
                            <p><strong>Mode:</strong> {internship.mode}</p>
                            <p><strong>Duration:</strong> {internship.duration}</p>
                            <p><strong>Stipend:</strong> {internship.stipend}</p>
                            <p><strong>Deadline:</strong> {new Date(internship.deadline).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    wrapper: {
        padding: '20px',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: '20px',
        top: '0',
        padding: '8px 14px',
        fontSize: '14px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    },
    heading: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    subtext: {
        color: '#555',
        fontSize: '16px',
        marginTop: '5px',
    },
    noData: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#888',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '350px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease',
    },
    cardTitle: {
        marginBottom: '12px',
        fontSize: '20px',
        color: '#34495e',
    },
};

export default ViewPostedInternships;
