import React, { useState } from "react";
import { Button, Card, Form, Image, Input, Modal, Pagination, Radio, Select } from 'antd';

import { useGetQuery, useLazyGenerateQrQuery, useSendMarkMutation, useUpdateMutation } from "./notificationStore";
import {
    paginationPage,
    forPagination,
    forButton, forFilters
} from "./styles";

import { onDescription, infoTop, infoBot, info, forCard } from "components/jobs/card/styles";
import { notify } from "services/hooks/notificationHook";
import { useFinishJobOwnerMutation } from "components/jobs/homeStore";
import { validateMessages } from "components/jobs/job/jobHooks";


function NotificationComponent() {
    const [form] = Form.useForm();
    const [page, setPage] = React.useState(1);
    const [status, setStatus] = React.useState('waiting')
    const [image, setImage] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [qrVisible, setQrVisible] = useState(false);
    const [complaintVisible, setComplaintVisible] = useState(false);
    const [complaint, setComplaint] = useState({})
    const [trigger] = useLazyGenerateQrQuery()
    const [data, setData] = useState({});
    const [marks, setMark] = useState(5);


    const { data: notifications, isLoading, error } = useGetQuery({ page, status }, {
        pollingInterval: 1000,
    });



    const [update] = useUpdateMutation()
    const [job] = useFinishJobOwnerMutation()
    const [sendMark] = useSendMarkMutation()
    const optionData = [
        {
            "value": 'waiting',
            "label": 'В процесі'
        },
        {
            "value": 'approved',
            "label": 'Виконанні'
        },
        {
            "value": 'rejected',
            "label": 'Відхилені'
        },
    ]

    const approve = async (data, mark) => {

     
        notify('Успішно')
  
        const result: any = await trigger(2)

        setImage(result.error.data)

        setModalVisible(false)
    
        form.resetFields()
   
        setQrVisible(true)
    
        await update(data)
 
        await job(data.jobId)
  
        console.log(mark)
      const test=  await sendMark({ id: data.userId, mark: mark })
      console.log(test)
    }

    const complaintReject = async (data) => {
        await update(data)
        setComplaint({})
        setComplaintVisible(false)
        form.resetFields()
        notify('Успішно') 
    }

    return (
        isLoading ? <h1>Loading</h1>
            : <>
                <p style={paginationPage}><a href="/">головна сторінка</a>/ надіслані роботи</p>

                
                        <div style={forFilters}>
                            <Select
                                placeholder="Фільтр для робіт"
                                style={{ width: "80%" }}
                                onChange={setStatus}
                                options={optionData}
                            />
                        </div>


                {notifications.notifications.length < 1 ?
                    <h1 style={paginationPage}>Список надісланих робіт пустий</h1> :
                    <>
                        <div style={paginationPage}>
                            {notifications.notifications.map(item =>
                                <Card title={
                                    <a href={`job/${item.notification_jobId}`}>Посилання на роботу</a>
                                } hoverable key={item.notification_id} style={forCard}>
                                    <div style={onDescription}>
                                        <div style={info}>
                                            <div style={infoTop}>{item.user_phoneNumber}</div>
                                            <div style={infoBot}>Номер телефону</div>
                                        </div>
                                        <div style={info}>
                                            <div style={infoTop}>{item.user_email}</div>
                                            <div style={infoBot}>Емейл</div>
                                        </div>
                                        <div style={info}>
                                            <div style={infoTop}>{item.user_firstName}</div>
                                            <div style={infoBot}>Ім&lsquo;я</div>
                                        </div>
                                    </div>
                                    <p>{item.notification_message}</p>
                                    {
                                        item.notification_status != 'waiting' ? <></> : <><Button type="primary" shape="round" onClick={() =>{ 
                                            setComplaint({ id: item.notification_id, status: 'complaint' })
                                            setComplaintVisible(true)}
                                            } danger style={forButton}>
                                            Скарга
                                        </Button>
                                            <Button type="primary" onClick={() => complaintReject({ id: item.notification_id, status: 'rejected' })} shape="round" style={forButton}>
                                                Відхилити
                                            </Button>
                                            <Button type="primary" shape="round" style={forButton} onClick={() => {
                                                setData({ id: item.notification_id, status: 'approved', jobId: item.notification_jobId, userId: item.user_id })
                                                setModalVisible(true)
                                            }} >
                                                Підтвердити
                                            </Button></>
                                    }

                                </Card>
                            )}
                        </div>

                        <Pagination simple defaultCurrent={1} total={notifications[1]} onChange={setPage} style={forPagination} />

                        <Modal title="Оцініть якість виконаной роботи" visible={modalVisible} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} closable={false}>
                            <Form name="nest-messages" onFinish={  () => approve(data, marks)
                                } validateMessages={validateMessages}>
                                <Form.Item name={'message'} label="Оцінки" rules={[{ required: true }]}>
                                    <Radio.Group onChange={(e) => setMark(e.target.value)}>
                                        <Radio.Button value="1">1</Radio.Button>
                                        <Radio.Button value="2">2</Radio.Button>
                                        <Radio.Button value="3">3</Radio.Button>
                                        <Radio.Button value="4">4</Radio.Button>
                                        <Radio.Button value="5">5</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Відправити
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>

                        <Modal title="Qr код для оплати" visible={qrVisible} width={250} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} onCancel={() => setQrVisible(false)}>
                            <Image
                                width={200}
                                src={`${image}`}
                            />
                        </Modal>

                        <Modal title="Напишіть вашу скаргу" visible={complaintVisible} width={500} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} onCancel={() => setComplaintVisible(false)}>
                            <Form name="nest-messages" onFinish={(e) => 
                                complaintReject({ ...complaint, complaintMessage: e.complaintMessage })
                            } validateMessages={validateMessages} form={form}>
                                <Form.Item name={'complaintMessage'} label="Message" rules={[{ required: true }]} >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Відправити
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
                }
            </>
    )
}

export default NotificationComponent;
