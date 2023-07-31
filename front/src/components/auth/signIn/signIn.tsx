import {useNavigate} from "react-router-dom";
import {GoogleOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Input} from 'antd';


import {useLoginUserMutation} from "components/auth/authStore";
import {forForm, formItemLayout, tailFormItemLayout} from "./styles";
import {ISignIn, ISignInSuccess} from "./model";
import {useAppDispatch} from "services/hooks/reduxHooks";
import {setUser} from "services/userSlice";
import {notify} from "services/hooks/notificationHook";





const SignIn = () => {
  const [signInUser] = useLoginUserMutation();
    // const userGoogle =  useGoogleUserQuery();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

// for form
  const handleCreate = async (values: ISignIn) => {
    try {
      const {data, error}: any  = await signInUser(values)
      if (error) notify(error.data.message)
      else {
          dispatch(setUser({
              token: data.token,
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              email: values.email,
              userRole: data.userRole,
              cardNumber: data.cardNumber,
              id: data.id
          }
          ))
        notify('Успішно')
        navigate('/')
      }
    } catch (e) {
      console.log(e + '');
      alert(e)
    }
  }
// for google button
    const googleLogin = async () =>{
        let timer: NodeJS.Timeout | null = null;
        const googleLoginURL = `${process.env.REACT_APP_BASE_URL}/google`
        const newWindow = await window.open(googleLoginURL, '_blank','width=500, height=600');

        if (newWindow){
            timer = setInterval( () =>{
                if(newWindow.closed){

                    dispatch(setUser({
                            token: '',
                            firstName: '',
                            lastName: '',
                            phoneNumber: ''
                        }
                    ))

                    if(timer) clearInterval(timer)
                }
            })
        }
    }


  return (
      <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleCreate}
          scrollToFirstError
          style={forForm}
      >
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Введіть валідну електрону пошту',
              },
              {
                required: true,
                message: 'Введіть свою електрону пошту',
              },
            ]}
            labelAlign={"left"}
        >
          <Input/>
        </Form.Item>

        <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Введіть свій пароль!',
              },
            ]}
            hasFeedback
            labelAlign={"left"}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout} shouldUpdate>
          {() => (
              <Button type="primary" htmlType="submit"
                      disabled={
                          !form.isFieldsTouched(true) ||
                          form.getFieldsError().filter(({ errors }) => errors.length)
                              .length > 0}
              >
                Увійти
              </Button>
          )}
        </Form.Item>
       </Form>
  )
};

export default SignIn
