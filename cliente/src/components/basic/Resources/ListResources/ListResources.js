import React, { useState } from "react";
import { Switch } from "antd";

import "./ListResources.scss";

export default function ListLoans(props) {
  const [viewResourcesActives, setViewResourcesActives] = useState(true);
  //recibir recurcos activos y no activos

  return (
    <div>
      <div>
        <Switch
          defaultChecked
          onChange={() => setViewResourcesActives(!viewResourcesActives)}
        />
        <span>
          {viewResourcesActives
            ? "Recursos disponibles"
            : "Recursos en prestamo"}
        </span>
      </div>

      <h1>Listando productos</h1>
    </div>
  );
}

function resources() {
  //recibe un recurso y lo renderiza
}
