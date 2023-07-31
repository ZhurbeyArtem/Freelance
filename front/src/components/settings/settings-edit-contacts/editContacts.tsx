import React from "react";
import 'antd/dist/antd.css';
import { useDispatch, useSelector} from "react-redux";
import { ContactEditValues } from "./model";
import {
    Form,
    Input,
    Button
} from 'antd';

import {formItemLayout, tailFormItemLayout, forForm} from "./styles";
import { useChangeDataMutation } from "../settingsStore";
import { notify } from "services/hooks/notificationHook";
import { useAppDispatch } from "services/hooks/reduxHooks";
import { changeDataUser } from "services/userSlice";


const EditContacts = () => {
  const [changeData] = useChangeDataMutation()
  const dispatch = useAppDispatch()
  const {firstName, 
        lastName,
        phoneNumber,
        cardNumber
        } = useSelector((state:any) => state.user.user);
        
  const handleData = async (values:ContactEditValues) => {
      try {
    
        const result:any = await changeData(values)
  
     if(result.error.data === 'success') {
       notify("Успішно")
       dispatch(changeDataUser(values))
     }
      }catch (e){
          alert(e)
      }

  }
  return (
      <section>
        <h1>Налаштування особистих даних</h1>
        <Form 
            {...formItemLayout}
            name="edit-user-contacts"
            onFinish={handleData}
            style={forForm}
            scrollToFirstError
            fields={[
              {
                name: ["firstName"],
                value:firstName,
              },
              {
                name: ["lastName"],
                value:lastName,
              },
              {
                name: ["phoneNumber"],
                value:phoneNumber,
              },
              {
                name: ["cardNumber"],
                value: cardNumber,
              },
            ]}>
          <Form.Item
            name="firstName"
            label="Ім'я"
            rules={[
                {
                    required: true,
                    message: 'Будьласка введіть своє ім\'я!',
                    whitespace: true,
                },
            ]}>
            <Input type="firstName"/>
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Прізвище"
            rules={[
                {
                    required: true,
                    message: 'Будьласка введіть своє прізвище!',
                    whitespace: true,
                },
            ]}>
            <Input type="lastName"/>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Номер телефону"
            rules={[
                {
                    required: true,
                    message: 'Будьласка введіть свій номер телефону!',
                    whitespace: true,
                },
            ]}>
            <Input type="phone"/>
          </Form.Item>
        <Form.Item
          name="cardNumber"
          label="Номер картки"
          rules={[
            {
              required: true,
              message: 'Будьласка введіть номер своєї картки!',
              whitespace: true,
              len:16,
            },
          ]}>
          <Input type="cardNumber" />
        </Form.Item>
          <Form.Item
            {...tailFormItemLayout} shouldUpdate>
            <Button
              type="primary" htmlType="submit">
                Зберегти
              </Button>
          </Form.Item>
        </Form>
      </section>
  )
}

export default EditContacts;
