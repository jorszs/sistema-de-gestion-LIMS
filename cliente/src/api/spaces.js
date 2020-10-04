import { basePath, apiVersion } from "./config";

export function getSpacesReportApi(token) {
  const url = `${basePath}/${apiVersion}/get-spaces-report`;

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
export function getInfoSpaceApi(token) {
  const url = `${basePath}/${apiVersion}/get-info-space?id=${token}`;

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

// crea un prestamo de espacio
export function createLoanSpaceApi(data) {
  const url = `${basePath}/${apiVersion}/create-loan-space`;
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
        return { ok: true, message: "Solicitud de espacio aceptada!" };
      }
      return { ok: true, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

export function deleteSpaceApi(id) {
  const url = `${basePath}/${apiVersion}/delete-space?id=${id}`;

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
      if (result.space) {
        return { ok: true, message: "Espacio Eliminado" };
      }
      return { ok: true, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

export function createSpaceApi(data) {
  const url = `${basePath}/${apiVersion}/create-space`;
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
        return { ok: true, message: "Espacio Creado" };
      }
      return { ok: true, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

export function getSpacesApi(token) {
  const url = `${basePath}/${apiVersion}/get-spaces?state=${token}`;

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

export function activateSpaceApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-space/${userId}`;

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
