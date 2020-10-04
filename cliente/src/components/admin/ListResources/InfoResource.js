import React, { useState,useEffect } from "react";
import { Form, DatePicker} from "antd";
import moment from 'moment';

export default function InfoResource(props) {
  // este codigo funciona
  const {infoPrestamo} = props;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <div>
        {infoPrestamo.map(item => (
            <Form
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="Email">
                 <span className="ant-form-text">{item.email}</span>
              </Form.Item>

              <Form.Item label="Fecha de Inicio">
                <DatePicker format="YYYY-MM-DD" defaultValue={moment(item.fechaInicio, 'YYYY-MM-DD')} disabled />
              </Form.Item>

              <Form.Item label="Fecha de Entrega">
                <DatePicker format="YYYY-MM-DD" defaultValue={moment(item.fechaEntrega, 'YYYY-MM-DD')} disabled />
              </Form.Item>
              
              <Form.Item label="Usuario">
                <span className="ant-form-text">{item.usuario}</span>
              </Form.Item>
        
            </Form>
          ))}

      </div>
    
  );
}
