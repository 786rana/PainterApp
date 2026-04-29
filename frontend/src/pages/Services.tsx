
import { useEffect, useState } from "react";
import { getServices } from "../api/serviceApi";
import { Service } from "../types/service";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <div>
      <h2>Services</h2>

      {services.map((s) => (
        <div key={s.id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <b>${s.price}</b>
        </div>
      ))}
    </div>
  );
};

export default Services;