import React from "react";
import ListResources from "../../../components/basic/Resources/ListResources";

export default function Resource() {
  //TO DO: obtener mediante useState los recursos de la base de datos
  // y pasarselo por los props a ListResources
  return (
    <div>
      <ListResources></ListResources>
      {/* {<h1>Estamos en prestamos...</h1>} */}
    </div>
  );
}
