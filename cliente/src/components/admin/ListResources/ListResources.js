import React, { useState, useEffect } from "react";
import { Button, Switch, notification } from "antd";
import Modal from "../../modal";
import Create from "../CreateResources/";
import { getResourcesApi, createLoanResourceApi } from "../../../api/resources";
import CardResource from "./CardResource";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../../utils/constants";

import "./ListResources.scss";

const ListResources = (props) => {
  const [listado, setListado] = useState([]);
  const [reloadListado, setReloadListado] = useState(false);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessTokenDecoded = jwtDecode(accessToken);

  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [newLoan, setNewLoan] = useState({
    idRecurso: "",
    usuario: "",
    fechaInicio: "",
    fechaEntrega: "",
    email: "",
    reserva: false,
  });

  const createLoan = async (loan) => {
    if (!loan.usuario || !loan.fechaInicio || !loan.fechaEntrega) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const result = await createLoanResourceApi(loan);
      if (!result.ok) {
        notification["error"]({
          message: result.message,
        });
      } else {
        notification["success"]({
          message: result.message,
        });
      }
    }
  };

  useEffect(() => {
    if (newLoan.reserva) {
      createLoan(newLoan);
    }
  }, [newLoan, setNewLoan]);

  useEffect(() => {
    getResourcesApi(viewUsersActives).then((response) => {
      setListado(response.listado);
    });
    setReloadListado(false);
  }, [reloadListado, isVisibleModal]);

  /// cuando cambia el switch de los recursos debe consultar segun su estado
  /// limpia el listado y consulta de nuevo, mandando el estado actual

  const addResourceModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando recurso");
    setModalContent(<Create setIsVisibleModal={setIsVisibleModal} />);
  };

  //cuando cambia el suwitch vuelve a consultar sobre el estado solicitado(disponiple o no disponible)
  const cambioSwitch = () => {
    setViewUsersActives(!viewUsersActives);
    setReloadListado(true);
  };
  return (
    <div className="list-resources">
      <div className="list-resources__header">
        <div className="list-resources__header-switch">
          <Switch defaultChecked onChange={cambioSwitch} />
          <span>
            {viewUsersActives
              ? "Recursos Disponibles"
              : "Recursos no disponibles"}
          </span>
        </div>

        {accessTokenDecoded.role === "admin" ? (
          <Button type="primary" onClick={addResourceModal}>
            Nuevo recurso
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className="list-resources__card">
        <CardResource
          listado={listado}
          setReloadListado={setReloadListado}
          viewUsersActives={viewUsersActives}
          newLoan={newLoan}
          setNewLoan={setNewLoan}
        ></CardResource>
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default ListResources;
