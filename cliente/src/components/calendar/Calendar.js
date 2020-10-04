import React from "react";
import { notification } from "antd";
import Scheduler from "devextreme-react/scheduler";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";

const currentDate = Date.now();
const views = ["day", "week", "workWeek", "month"];

export function Calendar(props) {
  const {
    infoPrestamo,
    idSpace,
    newLoan,
    setNewLoan,
    idResource,
    typeLoan,
  } = props;
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessTokenDecoded = jwtDecode(accessToken);
  //agregar reserva para spacios
  const onAppointmentAddedSpace = (e) => {
    notification.info({
      message: `¡Hola!`,
      description:
        "Para cancelar una reserva, revisa las reservas en tú PERFIL",
    });
    var fechaNuevaIni;
    var fechaNuevaFin;
    var fechaInicio;
    var fechaEntrega;
    fechaInicio = e.appointmentData.startDate;
    fechaNuevaIni = new Date(
      fechaInicio.getFullYear(),
      fechaInicio.getMonth(),
      fechaInicio.getDate(),
      fechaInicio.getHours() - 5,
      fechaInicio.getMinutes()
    );
    fechaInicio = fechaNuevaIni;

    fechaEntrega = e.appointmentData.endDate;
    fechaNuevaFin = new Date(
      fechaEntrega.getFullYear(),
      fechaEntrega.getMonth(),
      fechaEntrega.getDate(),
      fechaEntrega.getHours() - 5,
      fechaEntrega.getMinutes()
    );
    fechaEntrega = fechaNuevaFin;

    const email = accessTokenDecoded.email;
    const usuario = e.appointmentData.text;
    setNewLoan({
      ...newLoan,
      idSpace,
      usuario,
      fechaInicio,
      fechaEntrega,
      email,
      reserva: true,
    });
  };

  //agregar reserva para recursos
  //toco restar por la zona horaria
  const onAppointmentAddedResource = (e) => {
    notification.info({
      message: `¡Hola!`,
      description:
        "Para cancelar una reserva, revisa las reservas en tú PERFIL",
    });
    var fechaNuevaIni;
    var fechaNuevaFin;
    var fechaInicio;
    var fechaEntrega;
    fechaInicio = e.appointmentData.startDate;
    fechaNuevaIni = new Date(
      fechaInicio.getFullYear(),
      fechaInicio.getMonth(),
      fechaInicio.getDate(),
      fechaInicio.getHours() - 5,
      fechaInicio.getMinutes()
    );
    fechaInicio = fechaNuevaIni;

    fechaEntrega = e.appointmentData.endDate;
    fechaNuevaFin = new Date(
      fechaEntrega.getFullYear(),
      fechaEntrega.getMonth(),
      fechaEntrega.getDate(),
      fechaEntrega.getHours() - 5,
      fechaEntrega.getMinutes()
    );
    fechaEntrega = fechaNuevaFin;
    const email = accessTokenDecoded.email;
    const usuario = e.appointmentData.text;

    setNewLoan({
      ...newLoan,
      idRecurso: idResource,
      usuario,
      fechaInicio,
      fechaEntrega,
      email,
      reserva: true,
    });
  };

  const AppointmentTooltip = (e) => {
    debugger;
    return (
      <div>
        <span>¡Ups! ya está reservado</span>
      </div>
    );
  };

  return (
    <Scheduler
      dataSource={infoPrestamo}
      views={views}
      defaultCurrentView="day"
      defaultCurrentDate={currentDate}
      height={500}
      width={900}
      startDayHour={7}
      onAppointmentAdded={
        typeLoan === "space"
          ? onAppointmentAddedSpace
          : typeLoan === "resource"
          ? onAppointmentAddedResource
          : null
      }
      appointmentTooltipComponent={AppointmentTooltip}
    />
  );
}

export default Calendar;
