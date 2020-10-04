import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { createSpaceApi } from "../../../api/spaces";
import "./CreateSpace.scss";

export default function CreateSpace(props) {
  // este codigo funciona
  const { setIsVisibleModal } = props;
  const { TextArea } = Input;

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    state: true,
  });

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const changeForm = (e) => {
    if (e.target.name === "state") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onFinish = async (values) => {
    const name = inputs.name;

    if (!name) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const result = await createSpaceApi(inputs);

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
      name: "",
      description: "",
      state: true,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onChange={changeForm}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item {...layout} label="Nombre">
        <Input
          name="name"
          placeholder="Por favor ingrese el nombre del espacio"
          value={inputs.name}
        />
      </Form.Item>

      <Form.Item {...layout} label="Descripción">
        <TextArea
          name="description"
          placeholder="Por favor ingrese una descripcion"
          value={inputs.description}
        />
      </Form.Item>

      <Form.Item className="alinear__guardar">
        <Button htmlType="submit" className="alinear__guardar__button">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
}
