import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import type { Project } from "../types/project";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((p) => setProjects(p)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading projects...</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: 20 }}>Projects</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {projects.map((p) => (
          <div key={p.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}>
            <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
              <p style={{ color: '#555', marginTop: 8 }}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
