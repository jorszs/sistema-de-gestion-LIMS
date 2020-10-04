import React from "react";
import { EntregarLoanApi } from "../../../api/loan";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, List, notification, Button, Tooltip } from "antd";
import moment from "moment";

export default function ListLoansProfile(props) {
  const { loans, setReloadLoans, email } = props;

  const EntregarLoan = async (id, idLoan) => {
    const data = {
      id: id,
      idLoan: idLoan,
      email: email,
    };
    const result = await EntregarLoanApi(data);
    notification["success"]({
      message: result.message,
    });
    setReloadLoans(true);
  };

  return (
    <div className="list-loans">
      {loans.length > 0 ? (
        loans.map((item) => (
          <div className="cards">
            <Card
              title={item.nombre}
              style={{ marginTop: 16 }}
              type="inner"
              extra={
                <List.Item
                  actions={[
                    <Tooltip title="Cancelar reserva">
                      <Button
                        type="danger"
                        onClick={() => EntregarLoan(item.id, item.idLoan)}
                      >
                        <ClockCircleOutlined />
                      </Button>
                    </Tooltip>,
                  ]}
                />
              }
            >
              <p>Usuario : {item.usuario}</p>
              <p>Descripción : {item.descripcion}</p>
              <p>
                Fecha Inicio :{" "}
                {moment(item.fechaInicio).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
              <p>
                Fecha Fin :{" "}
                {moment(item.fechaFin).format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </p>
              <p>Código : {item.hasOwnProperty("code") ? item.code : ""}</p>
            </Card>
          </div>
        ))
      ) : (
        <h1>NO HAY PRESTAMOS</h1>
      )}
    </div>
  );
}
