import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  notification,
} from "antd";
import { ACCESS_TOKEN } from "../../../utils/constants";
import "../CreateResources/CreateResource.scss";
import jwtDecode from "jwt-decode";
import { createLoanSpaceApi } from "../../../api/spaces";

export default function ModalPrestamo(props) {
  const { idSpace, setIsVisibleModal, setReloadListado } = props;
  const [fechaInicial, setFechaInicial] = useState(null);
  const [initialTime, setInitialTime] = useState(null);
  const [finalTime, setFinalTime] = useState(null);
  // const [loan, setLoan] = useState({

  // });

  const [inputs, setInputs] = useState({
    idS: "",
    usuario: "",
    fechaInicio: null,
    fechaEntrega: null,
    email: "",
  });
  const [formValid, setFormValid] = useState({
    usuario: false,
    fechaEntrega: false,
  });

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const inputValidation = (e) => {
    setInputs({
      ...inputs,
    });
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem(ACCESS_TOKEN);
    const accessTokenDecoded = jwtDecode(refreshToken);

    setInputs({
      ...inputs,
      idS: idSpace,
      email: accessTokenDecoded.email,
    });
  }, [idSpace]);

  const onFinish = async (values) => {
    const usuario = inputs.usuario;
    const fechaEntrega = inputs.fechaEntrega;

    if (!usuario || !fechaEntrega || !initialTime || !finalTime) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      //asignar la hora a las fechas
      asignTime();

      const result = await createLoanSpaceApi(inputs);
      if (!result.ok) {
        notification["error"]({
          message: result.message,
        });
      } else {
        setIsVisibleModal(false);
        notification["success"]({
          message: result.message,
        });
        resetForm();
        setReloadListado(true);
      }
    }
  };

  const asignTime = () => {
    var initialTImeList = initialTime.split(":");
    var finalTimeList = finalTime.split(":");

    var initialDate = inputs["fechaInicio"];
    var finalDate = inputs["fechaEntrega"];

    initialDate.setHours(initialTImeList[0]);
    initialDate.setMinutes(initialTImeList[1]);
    finalDate.setHours(finalTimeList[0]);
    finalDate.setMinutes(finalTimeList[1]);

    setInputs({
      ...inputs,
      fechaInicio: initialDate,
      fechaEntrega: finalDate,
    });
  };

  const resetForm = () => {
    const input = document.getElementsByTagName("input");

    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }

    setInputs({
      idS: null,
      usuario: null,
      fechaInicio: null,
      fechaEntrega: null,
      email: null,
    });

    setFormValid({
      usuario: false,
      fechaEntrega: false,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, dateString) => {
    var dateFormat = new Date(dateString);
    setInputs({ ...inputs, fechaEntrega: dateFormat });
  };

  const onChangeDateInitial = (date, dateString) => {
    var dateFormat = new Date(dateString);
    setFechaInicial(date);
    setInputs({ ...inputs, fechaInicio: dateFormat });
  };

  const onChangeInitialTime = (time, timeString) => {
    setInitialTime(timeString);
  };
  const onChangeFinalTime = (time, timeString) => {
    setFinalTime(timeString);
  };

  return (
    <Form
      onFinish={onFinish}
      onChange={changeForm}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item {...layout} className="centrar" label="Nombre ">
        <Input
          name="usuario"
          placeholder="Por favor ingrese su nombre"
          value={inputs.code}
        />
      </Form.Item>

      <Form.Item className="centrarFecha" label="Fecha Inicial">
        <DatePicker format="YYYY-MM-DD" onChange={onChangeDateInitial} />
        <TimePicker onChange={onChangeInitialTime} />
      </Form.Item>

      <Form.Item className="centrarFecha" label="Fecha Entrega">
        <DatePicker format="YYYY-MM-DD" onChange={onChangeDate} />
        <TimePicker onChange={onChangeFinalTime} />
      </Form.Item>

      <Form.Item className="alinear__guardar">
        <Button htmlType="submit" className="alinear__guardar__button">
          Solicitar
        </Button>
      </Form.Item>
    </Form>
  );
}
