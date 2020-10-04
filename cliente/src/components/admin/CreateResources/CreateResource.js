import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Switch, notification } from "antd";
import { createResourceApi } from "../../../api/resources";
import "./CreateResource.scss";


export default function CreateResources(props) {
  // este codigo funciona
  const { setIsVisibleModal } = props;
  const [viewResourcesActives] = useState(true);
  const { TextArea } = Input;

  const [inputs, setInputs] = useState({
    code: "",
    name: "",
    description: "",
    state: true,
  });
  const [formValid, setFormValid] = useState({
    code: false,
    name: false,
    description: false,
    state: false,
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

  const inputValidation = (e) => {
    setInputs({
      ...inputs,
      ["state"]: e,
    });
  };

  const onFinish = async (values) => {
    const code = inputs.code;
    const name = inputs.name;
    const description = inputs.description;
    const state = inputs.state;

    if (!code || !name || !description) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const result = await createResourceApi(inputs);
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
      code: "",
      name: "",
      description: "",
      state: true,
    });

    setFormValid({
      code: false,
      name: false,
      description: false,
      state: false,
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
      <Form.Item {...layout} className="centrar" label="Código">
        <Input
          name="code"
          placeholder="Por favor ingrese el código del recurso"
          value={inputs.code}
        />
      </Form.Item>

      <Form.Item {...layout} label="Nombre">
        <Input
          name="name"
          placeholder="Por favor ingrese el nombre del recurso"
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
