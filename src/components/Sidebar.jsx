import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const ambulanceData = [
  { id: 'AMB 147', status: 'Available - Station 3', type: 'available' },
  { id: 'AMB 088', status: 'En Route - Incident I-5 (ETA 5 min)', type: 'en-route' },
  { id: 'AMB 212', status: 'At Scene - Main St & Elm Ave', type: 'at-scene' },
  { id: 'AMB 102', status: 'Available - Station 1', type: 'available' },
];

function AmbulanceItem({ id, status, type }) {
  const isPulsing = type === 'at-scene' || type === 'en-route';
  return (
    <div className="ambulance-item">
      <span className={`status-dot ${type} ${isPulsing ? 'pulse' : ''}`}></span>
      <div className="ambulance-info">
        <strong>{id}</strong>
        <p>{status}</p>
      </div>
    </div>
  );
}

function Sidebar() {
  const [aiAlerts, setAiAlerts] = useState([
    { type: null, message: null },
    { type: null, message: null }
  ]);

  async function generateAlertSummary(prompt) {
    const geminiApiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            ALERT_TYPE: { type: SchemaType.STRING },
            ALERT: { type: SchemaType.STRING },
          }
        }
      }
    });
    const response = result.response;
    const processedResult = response.text() || '{}';
    const parsedData = JSON.parse(processedResult);
    return {
      type: parsedData.ALERT_TYPE || "Unknown",
      message: parsedData.ALERT || "No alert generated."
    };
  }

  useEffect(() => {
    async function fetchAlerts() {
      const alert1 = await generateAlertSummary("Generate a traffic alert. You have lots of freedom. Could be anything.");
      const alert2 = await generateAlertSummary("Generate a traffic alert that is different from the previous one. ");
      setAiAlerts([alert1, alert2]);
    }
    fetchAlerts().catch(() =>
      setAiAlerts([
        { type: "Error", message: "Could not generate alert." },
        { type: "Error", message: "Could not generate alert." }
      ])
    );
  }, []);

  return (
    <aside className="sidebar">
      <h2 style={{ marginTop: '2rem' }}>Emergency Resources Status</h2>

      <div className="sidebar-widget">
        <h3>Available Ambulances</h3>
        <div className="ambulance-list">
          {ambulanceData.map((amb) => (
            <AmbulanceItem
              key={amb.id}
              id={amb.id}
              status={amb.status}
              type={amb.type}
            />
          ))}
        </div>
      </div>

      <div className="sidebar-widget">
        <h3>News/Alerts Feed</h3>
        <div className="alert-feed">
          <div className="alert-item">
            <strong>{aiAlerts[0].type || "Loading..."}</strong> {aiAlerts[0].message || "Loading..."}
          </div>
          <div className="alert-item">
            <strong>{aiAlerts[1].type || "Loading..."}</strong> {aiAlerts[1].message || "Loading..."}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;