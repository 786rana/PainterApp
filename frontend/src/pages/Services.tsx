/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getServices } from "../api/serviceApi";
import type { Service } from "../types/service";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((s) => setServices(s))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading services...</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: 20 }}>Services</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
        {services.map((s) => (
          <div key={s.id} style={{ background: '#fff', padding: 14, borderRadius: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
            <h3 style={{ marginBottom: 6 }}>{(s as any).title?.en || s.title}</h3>
            <p style={{ color: '#555' }}>{s.description}</p>
            <b>${s.price}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
