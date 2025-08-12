import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const [orgDetails, setOrgDetails] = useState({
    organizationId: '',
    userId: user.userId,
    orgName: '',
    registrationNumber: '',
    domainId: ''
  });

  const [domains, setDomains] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/org/user/${user.userId}`)
      .then(res => {
        const orgId = res.data;
        setOrgDetails(prev => ({ ...prev, organizationId: orgId }));
        axios.get("http://localhost:8080/api/org/organization")
          .then(response => {
            const org = response.data.find(o => o.organizationId === orgId);
            if (org) {
              setOrgDetails({
                organizationId: org.organizationId,
                userId: org.userId,
                orgName: org.orgName,
                registrationNumber: org.registrationNumber,
                domainId: org.domainId
              });
            }
          });
      });

    axios.get("http://localhost:8080/api/org/domains")
      .then(res => setDomains(res.data));
  }, [user.userId]);

  const handleChange = (e) => {
    setOrgDetails({ ...orgDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.put("http://localhost:8080/api/org/organization/update", orgDetails)
      .then(() => {
        alert("✅ Organization details updated!");
        navigate('/org-dashboard', { state: user });
      })
      .catch(() => alert("❌ Failed to update organization."));
  };

  // 🔹 Back Button handler
  const handleBack = () => {
    navigate('/org-dashboard', { state: user });
  };

  return (
    <div style={styles.container}>
      
      {/* 🔹 Back button now at top-left of page */}
      <button onClick={handleBack} style={styles.backButton}>
        ← Back to Dashboard
      </button>

      <div style={styles.card}>
        <h2 style={styles.heading}>⚙️ Edit Organization Profile</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Organization Name</label>
          <input
            type="text"
            name="orgName"
            value={orgDetails.orgName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter organization name"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={orgDetails.registrationNumber}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter registration number"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Domain</label>
          <select
            name="domainId"
            value={orgDetails.domainId}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">-- Select Domain --</option>
            {domains.map(d => (
              <option key={d.domainId} value={d.domainId}>{d.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          💾 Update Profile
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    position: 'relative' // 🔹 needed for absolute button positioning
  },
  // 🔹 Button now positioned at top-left of the page
  backButton: {
    position: 'absolute',
    left: '20px',
    top: '20px',
    padding: '8px 14px',
    fontSize: '14px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
    boxSizing: 'border-box'
  },
  heading: {
    fontSize: '22px',
    marginBottom: '25px',
    textAlign: 'center',
    color: '#333'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default EditProfile;
