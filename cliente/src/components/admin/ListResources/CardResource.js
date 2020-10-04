import React, { useState } from "react";
import { Button, Card, List, notification } from "antd";
import {
  DeleteOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import "./ListResources.scss";
import {
  deleteResouceApi,
  getInfoResourceApi,
  activateResourceApi,
} from "../../../api/resources";
import { getAccessTokenApi } from "../../../api/auth";
import Modal from "../../modal";
import Calendar from "../../calendar";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../../utils/constants";

export default function CardResource(props) {
  const {
    listado,
    setReloadListado,
    viewUsersActives,
    newLoan,
    setNewLoan,
  } = props;

  const [infoPrestamo, setInfoPrestamo] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [idRecurso, setIdRecurso] = useState("");

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessTokenDecoded = jwtDecode(accessToken);

  //elimina un recurso
  const deleteResource = async (id) => {
    const result = await deleteResouceApi(id);
    if (!result.ok) {
      notification["error"]({
        message: result.message,
      });
    } else {
      notification["success"]({
        message: result.message,
      });
      setReloadListado(true);
    }
  };

  const activateResource = (id, active) => {
    const accessToken = getAccessTokenApi();

    activateResourceApi(accessToken, id, !active)
      .then((response) => {
        notification["success"]({ message: response });
        setReloadListado(true);
      })
      .catch((err) => {
        notification["error"]({ message: err });
      });
  };

  // abre el modal de prestamo
  const abrirModalPrestamo = (lista, id) => {
    setIsVisibleModal(true);
    setModalTitle("Solicitud de Recurso");
    setModalContent(
      <Calendar
        typeLoan={"resource"}
        idResource={id}
        newLoan={newLoan}
        setNewLoan={setNewLoan}
        infoPrestamo={lista}
      />
    );
  };

  /* la idea es traer la informacion del préstamo
    y luego enviarla al modal para presentarla */
  //IMPORTANTE
  const infoCalendar = (id) => {
    const lista = [];
    var fechaAuxIni;
    var fechaNuevaIni;
    var fechaAuxFin;
    var fechaNuevaFin;
    getInfoResourceApi(id).then((response) => {
      if (response.listado.length > 0) {
        response.listado.map((item) => {
          fechaAuxIni = new Date(item.fechaInicio);
          fechaNuevaIni = new Date(
            fechaAuxIni.getFullYear(),
            fechaAuxIni.getMonth(),
            fechaAuxIni.getDate(),
            fechaAuxIni.getHours() + 5,
            fechaAuxIni.getMinutes()
          );

          fechaAuxFin = new Date(item.fechaEntrega);
          fechaNuevaFin = new Date(
            fechaAuxFin.getFullYear(),
            fechaAuxFin.getMonth(),
            fechaAuxFin.getDate(),
            fechaAuxFin.getHours() + 5,
            fechaAuxFin.getMinutes()
          );
          lista.push({
            text: item.usuario + " - " + item.email,
            //startDate: moment(item.fechaInicio, "DD MM YYYY hh:mm:ss"),
            startDate: fechaNuevaIni,
            //endDate: moment(item.fechaEntrega, "DD MM YYYY hh:mm:ss"),
            endDate: fechaNuevaFin,
            id: item.idSpace,
          });
        });
      }
      abrirModalPrestamo(lista, id);
    });
  };

  return (
    <div>
      {listado.map((item) => (
        <div className="cards">
          <Card
            title={item.name}
            style={{ marginTop: 16 }}
            type="inner"
            extra={
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    disabled={!viewUsersActives}
                    onClick={() => infoCalendar(item._id)}
                  >
                    <ClockCircleOutlined />
                  </Button>,
                  <div>
                    {accessTokenDecoded.role === "admin" ? (
                      <div>
                        <Button
                          type={item.state ? "danger" : "primary"}
                          onClick={() => activateResource(item._id, item.state)}
                        >
                          {item.state ? <StopOutlined /> : <CheckOutlined />}
                        </Button>
                        ,
                        {accessTokenDecoded.role === "admin" ? (
                          <Button
                            type="danger"
                            disabled={!viewUsersActives}
                            onClick={() => deleteResource(item._id)}
                          >
                            <DeleteOutlined />
                          </Button>
                        ) : (
                          <div />
                        )}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>,
                ]}
              />
            }
          >
            <p className="text_card">{item.code}</p>
            <p>{item.description}</p>
          </Card>
        </div>
      ))}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
