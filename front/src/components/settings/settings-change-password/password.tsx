import { Form, Input, Button } from "antd";
import { formItemLayout, forForm, tailFormItemLayout } from "components/settings/settings-edit-contacts/styles";
import { IPassword } from "./model";
import { useChangePasswordMutation } from "../settingsStore";
import { useNavigate } from "react-router-dom";
import { notify } from "services/hooks/notificationHook";


const SettingsPassword = () => {

  const [changePassword] = useChangePasswordMutation()
  const navigate = useNavigate();

  const handleChange = async (values: IPassword) => {
    try {
      const { error }: any = await changePassword(values)
      if (error.data.message === 'Некоректний пароль ') {
        notify(error.data.message)
      }
      else {
        notify("Успішно")
        navigate('/')
      }
    } catch (e) {
      alert(e)
    }
  }

  return (<section>
    <h1>Зміна паролю</h1>
    <Form
      {...formItemLayout}
      name="edit-user-password"
      onFinish={handleChange}
      style={forForm}
      scrollToFirstError
    >
      <Form.Item
        name="oldPassword"
        label="Старий пароль"
        rules={[
          {
            required: true,
            message: 'Введіть свій старий пароль!',
            whitespace: true,
          },
        ]}>
        <Input type="password" />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="Новий пароль"
        rules={[
          {
            required: true,
            message: 'Введіть свій новий пароль!',
            whitespace: true,
          },
        ]}>
        <Input type="password" />
      </Form.Item>

      <Form.Item
        {...tailFormItemLayout}>
        <Button
          type="primary" htmlType="submit"
        >
          Зберегти
        </Button>
      </Form.Item>
    </Form>
  </section>)
}

export default SettingsPassword;