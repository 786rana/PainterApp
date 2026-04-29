import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import { Project } from "../types/project";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {projects.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <img src={p.imageUrl} width={200} />
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;