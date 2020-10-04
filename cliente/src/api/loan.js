//este archivo es para cargar los prestamos del usuario y para entregar los prestamos
import { basePath, apiVersion } from "./config";

export function EntregarLoanApi(data) {
  const url = `${basePath}/${apiVersion}/entregar-loan`;

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
      if (result) {
        return { ok: true, message: "Reserva Cancelada con éxito" };
      }
      return { ok: false, message: "Reserva no cancelada" };
    })
    .catch((err) => {
      return err.message;
    });
}

export function getLoanSpaceProfileApi(token) {
  const url = `${basePath}/${apiVersion}/get-loan-space-profile?id=${token}`;

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

export function getLoanResourceProfileApi(token) {
  const url = `${basePath}/${apiVersion}/get-loan-resource-profile?id=${token}`;

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

export function getLoanResourceApi(token) {
  const url = `${basePath}/${apiVersion}/get-loan-resource?email=${token}`;

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

export function getLoanSpaceApi(token) {
  const url = `${basePath}/${apiVersion}/get-loan-space?email=${token}`;

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
