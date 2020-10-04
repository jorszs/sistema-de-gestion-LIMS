import React, { useState, useEffect } from "react";
import { Button, Switch, notification } from "antd";
import Modal from "../../modal";
import CardSpaces from "./CardSpaces";
import Create from "../CreateSpaces";
import { getSpacesApi, createLoanSpaceApi } from "../../../api/spaces";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../../utils/constants";

import "./ListSpaces.scss";

const ListSpaces = (props) => {
  const [listado, setListado] = useState([]);
  const [reloadListado, setReloadListado] = useState(false);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessTokenDecoded = jwtDecode(accessToken);
  const [newLoan, setNewLoan] = useState({
    idSpace: "",
    usuario: "",
    fechaInicio: "",
    fechaEntrega: "",
    reserva: false,
  });
  const createLoan = async (loan) => {
    if (!loan.usuario || !loan.fechaInicio || !loan.fechaEntrega) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const result = await createLoanSpaceApi(loan);
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
    getSpacesApi(viewUsersActives).then((response) => {
      setListado(response.listado);
    });
    setReloadListado(false);
  }, [reloadListado, isVisibleModal]);

  /// cuando cambia el switch de los recursos debe consultar segun su estado
  /// limpia el listado y consulta de nuevo, mandando el estado actual

  const addResourceModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando espacio");
    setModalContent(<Create setIsVisibleModal={setIsVisibleModal} />);
  };

  //cuando cambia el suwitch vuelve a consultar sobre el estado solicitado(disponiple o en prestamo)
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
              ? "Espacios Disponibles"
              : "Espacios no Disponibles"}
          </span>
        </div>
        {accessTokenDecoded.role === "admin" ? (
          <Button type="primary" onClick={addResourceModal}>
            Nuevo espacio
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className="list-resources__card">
        <CardSpaces
          listado={listado}
          setReloadListado={setReloadListado}
          viewUsersActives={viewUsersActives}
          newLoan={newLoan}
          setNewLoan={setNewLoan}
        ></CardSpaces>
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

export default ListSpaces;
