import React from 'react';

function About() {
  const stats = [
    { number: "35%", text: "Average reduction in response time in high-risk areas." },
    { number: "1200+", text: "High-risk zones monitored monthly." },
    { number: "500+", text: "Potential lives saved annually with optimized deployment." },
    { number: "2M+", text: "Historical crash data points analyzed." },
  ];

  return (
    <div className="page-content container">
      {/* Hero / Intro */}
      <h1>About CrashCast</h1>
      <p>
        CrashCast is a cutting-edge emergency response platform designed to help dispatchers strategically deploy ambulances based on predictive analytics. 
        Our mission is simple: reduce emergency response times and save lives by placing resources exactly where they are needed most.
      </p>

      {/* Mission & Vision */}
      <h2>Our Mission & Vision</h2>
      <p>
        Driving a car is easy...until it becomes a situation of life or death. Car accidents are unpredictable, but response efficiency doesn’t have to be. 
        We combine real-time data, historical crash analysis, and geographic insights to aid emergency teams with actionable intelligence. 
        Our vision is safer roads and faster, smarter emergency response everywhere.
      </p>

      {/* How It Works */}
      <h2>How It Works</h2>
      <p>
        CrashCast leverages advanced data analysis and visualization tools to predict high-risk locations. Here’s how dispatchers use it:
      </p>
      <ul>
        <li><strong>Predictive Hotspots:</strong> Analyze historical accident data, traffic density, and environmental conditions to identify locations with a higher likelihood of crashes.</li>
        <li><strong>Interactive Heatmaps:</strong> Visualize high-risk zones on a dynamic map to optimize ambulance placement and coverage.</li>
        <li><strong>Real-Time Updates:</strong> Monitor ongoing incidents and adjust ambulance locations as conditions change.</li>
        <li><strong>Search & Plan:</strong> Search any region and see predictive analytics, allowing for informed, data-driven deployment decisions.</li>
      </ul>

      {/* Stats & Impact */}
      <h2>Our Impact</h2>
      <p>
        Every number tells a story of faster response times and lives potentially saved:
      </p>
      <div className="stats-carousel-section">
        <div className="stats-carousel-container">
          {stats.map((stat, index) => (
            <div className="stat-box" key={index}>
              <span className="stat-number">{stat.number}</span>
              <p className="stat-text">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
      <p>
        By strategically placing ambulances in high-risk areas, CrashCast helps dispatchers reduce average response times by up to 35%, ensuring that help arrives when seconds matter most.
      </p>

      {/* Philosophy / Team */}
      <h2>Why It Matters</h2>
      <p>
        At CrashCast, we believe that every second counts. Emergencies demand speed, precision, and insight. Beyond that, data should assist those who save lives. 
        Our team is dedicated to creating tools that give dispatchers a smarter way to protect communities and make roads safer for everyone.
      </p>

      {/* Call to Action */}
      <h2>Get Involved</h2>
      <p>
        Whether you're a dispatcher, city planner, or policy maker, CrashCast provides the tools to make smarter decisions for emergency response. Join us in leveraging data to save lives and improve safety on the roads.
      </p>
    </div>
  );
}

export default About;
