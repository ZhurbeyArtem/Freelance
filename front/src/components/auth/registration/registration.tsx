import {useNavigate} from "react-router-dom";
import {GoogleOutlined} from '@ant-design/icons';
import {
    Form,
    Input,
    Checkbox,
    Button,
    Divider,
    Radio
} from 'antd';

import { confirmValue } from "./registrationHooks";
import {useRegistrationUserMutation} from "components/auth/authStore";
import {formItemLayout, tailFormItemLayout, forForm, forRadio, forRadioButton} from "./styles";
import {IRegistration} from "./model";
import {useAppDispatch} from "services/hooks/reduxHooks";
import {setUser} from "services/userSlice";
import {notify} from "services/hooks/notificationHook";


const Registration = () => {
    const [registrationUser] = useRegistrationUserMutation();
    // const userGoogle =  useGoogleUserQuery();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();

// for form
    const handleCreate = async (values: IRegistration)  => {
        try {
            const {data: user}: any = await registrationUser(values)
            if (user.status === 400) notify(user.message)
            else {
                dispatch(setUser({
                    token: user.token,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    email: values.email,
                    userRole: values.userRole,
                }))
                notify('Успішно')
                navigate('/')
            }
        } catch (e) {
            console.log(e + '')
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

            <Form.Item name="userRole"
                       label="Ваша роль?"
                       rules={[
                           {
                               required: true,
                               message: 'Виберіть свою роль!',
                               whitespace: true,
                           },
                       ]}
                       labelAlign={"left"}
            >
                <Radio.Group style={forRadio} >
                    <Radio.Button value="Freelancer" style={forRadioButton}>Фрілансер</Radio.Button>
                    <Radio.Button value="Employer" style={forRadioButton}>Замовник</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="firstName"
                label="Ім'я"
                tooltip="Яке ваше і'мя?"
                rules={[
                    {
                        required: true,
                        message: 'Будьласк введіть своє ім\'я!',
                        whitespace: true,
                    },
                ]}
                labelAlign={"left"}

            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Прізвище"
                tooltip="Яке ваше прізвище?"
                rules={[
                    {
                        required: true,
                        message: 'Будьласка введіть своє прізвище!',
                        whitespace: true,
                    },
                ]}
                labelAlign={"left"}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Номер телефону"
                rules={[
                    {
                        required: true,
                        message: 'Будьласка введіть свій номер телефону!',
                    },
                    {
                        len: 13,
                        message: 'Номер телефонеу повинен бути написаний в таком форматі +380502226582',
                    },
                ]}
                labelAlign={"left"}
            >
                <Input
                />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Введіть валідну електрону пошту!',
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
                    {
                        min: 8,
                        message: 'Мінімальна довжина паролю 8 символів'
                    }
                ]}
                hasFeedback
                labelAlign={"left"}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Повторіть пароль"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Повторіть пароль!',
                    },
                    confirmValue
                ]}



                labelAlign={"left"}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    Я прочитав <a href="">правила</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} shouldUpdate>
                {() => (
                    <Button type="primary" htmlType="submit"
                            disabled={
                        !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length)
                                    .length > 0}
                    >
                        Зареєструватись
                    </Button>
                )}
            </Form.Item>
      
        </Form>

    );

};

export default Registration