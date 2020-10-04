import { basePath, apiVersion } from "./config";
// servicios sobre los recursos

//trae todos los recursos para el reporte
export function getResourcesReportApi(token) {
  const url = `${basePath}/${apiVersion}/get-resources-report`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

//trae informacion de un prestamo
export function getInfoResourceApi(token) {
  const url = `${basePath}/${apiVersion}/get-info-resource?id=${token}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

//crea un prestamo de un recurso
export function createLoanResourceApi(data) {
  const url = `${basePath}/${apiVersion}/create-loan-resource`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.resource) {
        return { ok: true, message: "Solicitud de recurso aceptada!" };
      }
      return { ok: true, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

//elimina un recurso
export function deleteResouceApi(id) {
  const url = `${basePath}/${apiVersion}/delete-resource?id=${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.resource) {
        return { ok: true, message: "Recurso Eliminado" };
      }
      return { ok: true, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

//crea un recurso
export function createResourceApi(data) {
  const url = `${basePath}/${apiVersion}/create-resource`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.resource) {
        return { ok: true, message: "Recurso Creado" };
      }
      return { ok: false, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

//trae todos los recursos segun su estado
export function getResourcesApi(token) {
  const url = `${basePath}/${apiVersion}/get-resources?state=${token}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function activateResourceApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-resource/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      state: status,
    }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
