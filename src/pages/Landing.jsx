import React from 'react';

function Landing() {
  return (
    <div className="landing-page">
      {/* HERO SECTION: THE CORE VALUE PROPOSITION 
        Focus: Proactive vs. Reactive and the life-saving time difference.
      */}
      <header className="hero-section">
        <h1>
          Turn a 10-Minute Response into a **2-Minute** Life-Saver.
        </h1>
        <p className="subtitle">
          CrashCast is the predictive ambulance dispatch platform that stages your assets
          **before** the 911 call comes in, giving patients the precious minutes they need.
        </p>
        <button className="cta-button">See the Predictive Map in Action</button>
      </header>

      <main>
        {/* STATISTICS SECTION 1: THE TIME-TO-TREATMENT IMPACT 
          Focus: Directly linking response time to patient survival and recovery.
        */}
        <section className="stat-grid-section impact-time">
          <h2>🚑 The Time-to-Treatment Impact: Every Minute Counts</h2>
          <div className="stat-grid">
            <div className="stat-card critical">
              <span className="stat-number">7%</span>
              <p className="stat-label">
                **Increase in Fatalities** for every 10-minute increase in ambulance journey time.
              </p>
            </div>

            <div className="stat-card">
              <span className="stat-number">2.6%</span>
              <p className="stat-label">
                Higher odds of a crash being fatal for every **1-minute** increase in EMS response time on freeways.
              </p>
            </div>

            <div className="stat-card">
              <span className="stat-number">6%</span>
              <p className="stat-label">
                Increased risk of **poor functional recovery** (long-term disability) for every 10-minute increase in pre-hospital time.
              </p>
            </div>
          </div>
          <blockquote className="insight-quote">
            CrashCast doesn't just save lives—it protects the **quality of life**.
          </blockquote>
        </section>

        <hr className="divider" />

        {/* STATISTICS SECTION 2: THE ECONOMIC & OPERATIONAL IMPACT 
          Focus: The business case—efficiency, cost, and maximizing readiness.
        */}
        <section className="stat-section operational-value">
          <h2>💵 Economic & Operational Value</h2>
          <div className="stat-row">
            <div className="stat-block large">
              <span className="stat-large">$340 Billion</span>
              <p className="stat-label">
                The total cost of motor vehicle crashes in the U.S. in 2019 alone. **Reduce medical costs** by reducing critical response time.
              </p>
            </div>
            <div className="stat-block small">
              <h3>Intelligent Deployment</h3>
              <p>
                An ambulance staged in the wrong location is a high-cost asset generating zero revenue. CrashCast ensures **data-driven deployment**, maximizing the readiness and impact of every unit.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* STATISTICS SECTION 3: THE "BIG PICTURE" CONTEXT 
          Focus: Scale and urgency of the problem.
        */}
        <section className="stat-section global-scale">
          <h2>📈 The Global Mandate</h2>
          <div className="stat-row">
            <div className="stat-block">
              <span className="stat-number-small">1.35 Million</span>
              <p className="stat-label">
                Lives lost globally on roadways every year. Road traffic crashes are the **leading cause of death for ages 5-29**.
              </p>
            </div>
            <div className="stat-block">
              <span className="stat-number-small">Every 10 Seconds</span>
              <p className="stat-label">
                The frequency of a car crash involving an injury in the U.S. Small improvements in efficiency have a **massive cumulative impact**.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING/RECAP: CALL TO ACTION 
        */}
        <section className="cta-recap">
          <h2>Stop Being Reactive. Start Being Predictive.</h2>
          <p>
            The current model forces you to wait for the 911 call. CrashCast predicts **where** that call is coming from, allowing your team to be **proactive**. Stage your ambulance 2 minutes away instead of 10.
          </p>
          <button className="cta-button secondary">Request a Demo Today</button>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 CrashCast. Predictive Dispatch Platform.</p>
      </footer>
    </div>
  );
}

export default Landing;