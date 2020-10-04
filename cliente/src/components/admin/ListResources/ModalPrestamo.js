import React, { useState,useEffect } from "react";
import { Form, Input, Button, DatePicker,notification} from "antd";
import { ACCESS_TOKEN} from "../../../utils/constants";
import "../CreateResources/CreateResource.scss"
import jwtDecode from "jwt-decode";
import { createLoanResourceApi } from "../../../api/resources";

export default function ModalPrestamo(props) {
  const {idRecurso, setIsVisibleModal,setReloadListado} = props;

  const [inputs, setInputs] = useState({
    idR: "",
    usuario: "",
    fechaInicio: "",
    fechaEntrega: "",
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
 
    setInputs({ ...inputs,
                ["idR"]:idRecurso,
                ["email"]: accessTokenDecoded.email, 
               });

  }, [idRecurso]);

  const onFinish = async (values) => {
    const usuario =  inputs.usuario;
    const fechaEntrega = inputs.fechaEntrega;

    if (!usuario || !fechaEntrega) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const result = await createLoanResourceApi(inputs);
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

  const resetForm = () => {
    const input = document.getElementsByTagName("input");

    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }

    setInputs({
      idR: null,
      usuario: null,
      fechaInicio: null,
      fechaEntrega: null,
      email: null
    });

    setFormValid({
      usuario: false,
      fechaEntrega: false,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, dateString) =>{
    var date = new Date(dateString)
    setInputs({ ...inputs,
                ["fechaEntrega"]: date});
  }

  const onChangeDateInitial = (date, dateString) =>{
    var date = new Date(dateString)
    setInputs({ ...inputs,
                ["fechaInicio"]: date});
  }


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

        <Form.Item  className="centrarFecha" label="Fecha Inicial">
            <DatePicker  format="YYYY-MM-DD" onChange={onChangeDateInitial}/>
        </Form.Item>

        <Form.Item  className="centrarFecha" label="Fecha Entrega">
            <DatePicker  format="YYYY-MM-DD" onChange={onChangeDate}/>
        </Form.Item>


        <Form.Item className="alinear__guardar">
            <Button htmlType="submit" className="alinear__guardar__button">
            Solicitar
            </Button>
        </Form.Item>
    </Form>
  );
}
