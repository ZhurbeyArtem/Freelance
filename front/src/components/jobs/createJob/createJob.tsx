import React from 'react';
import {Button, Form, Input, InputNumber, Select} from "antd";
import {useNavigate} from "react-router-dom";

import {forForm, layout, forButton} from "./styles";
import {useCreateJobMutation, useTagListQuery} from "../homeStore";
import {form, futureJob} from "./model";
import {notify} from "services/hooks/notificationHook";
import {getNameTags} from "./jobHooks";

const { Option } = Select;

const CreateJob = () => {
    const {data: tags} = useTagListQuery()
    const [job] =  useCreateJobMutation()
    // const formData = new FormData();
    const navigate = useNavigate();

     const onFinish = async (values: form<futureJob>) => {
     try {
        console.log(values)
         if( !values.suffix ) values.suffix = '$'
         values.job.hourlyRate = values.job.hourlyRate + ' ' + values.suffix
        //  formData.append('file', values.job.file);
        //  console.log(formData)
        //  values.job.file = values.job.file.file

         const result: any =  await job( values.job )
         
         if( result.data.status === 400 ) notify( result.data.message )
         else {
             notify("Успішно")
             navigate('/')
         }
     }catch (e){
         console.log(e)
         alert(e)
     }
    };

    const suffixSelector = (
        <Form.Item name="suffix" noStyle >
            <Select style={{ width: 70 }} defaultValue='$'>
                <Option value="$">$</Option>
                <Option value="€">€</Option>
            </Select>
        </Form.Item>
    );


    return (
        <>
        <Form {...layout} name="nest-messages" onFinish={onFinish}  style={forForm}>
            <Form.Item name={['job', 'title']} label="Заговолок" rules={[{ required: true ,  message: 'Будьласка введіть свій заговолок!' }]}   labelAlign={"left"} >
                <Input />
            </Form.Item>
            <Form.Item name={['job', 'description']} label="Опис" rules={[{
                required: true,
                message: 'Будьласка введіть опис як мінімум на 50 символів!',
                whitespace: true,
                min: 50,

            }]}    labelAlign={"left"}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['job', 'hourlyRate']} label="Почасова ставка"
                       rules={[{
                           type: 'number',
                           min: 0,
                           message:'Напишіть скільки платите погодинно',
                           required: true
                       }]}    labelAlign={"left"}  >
                <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['job', 'duration']} label="Час на виконання"    labelAlign={"left"}   rules={[{
                type: 'string',
                required: true,
                message: 'Напишіть скільки часу потрібно щоб закінчити роботу!',
            }]}   >
             <Input placeholder="для прикладу '2 дні'"/>
            </Form.Item>
            <Form.Item name={['job', 'englishLevel']} label="Рівень англійського"
                       rules={[{
                type: 'string',
                required: true,
                message: 'Будьласка виберіть рівень англійського!',
            }]}    labelAlign={"left"}>
                <Select>
                    <Option value="Elementary">Elementary</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Advanced">Advanced</Option>
                </Select>
            </Form.Item>
                <Form.Item name={['job', 'tags']} label="Теги"
                        rules={[{
                            type: 'array',
                            required: true,
                            message: 'Будьласка виберіть мінимум 1 тег!',
                        }]} labelAlign={"left"}>
                <Select
                    mode="tags"
                        placeholder="Виберіть мінимум 1 тег "
                    style={{width: '100%'}}
                >
                    {getNameTags(tags)}
                </Select>
            </Form.Item>
                {/* <Form.Item name={['job', 'file']} label='File' labelAlign={"left"}>
                    <Dragger {...props} >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
            </Form.Item> */}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" style={forButton}>
                    Створити
                </Button>
            </Form.Item>
        </Form>
        </>

    );
}

export default CreateJob;