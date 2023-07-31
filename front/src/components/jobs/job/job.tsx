import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader, Layout, Button, Modal, Form, Input } from "antd";

import { useFinishJobFreelancerMutation, useGetJobQuery } from "../homeStore";
import { useCountBidsJobQuery, useCreateBidMutation } from "components/bid/bidStore";
import {
    container,
    content,
    siteHeader,
    forTags,
    forTagsItem,
    info,
    infoBot,
    infoTop,
    infoRow,
    forDescription,
    forButton,
    header
} from "./styles";

import { validateMessages } from "./jobHooks";
import { notify } from "services/hooks/notificationHook";
import { useSelector } from 'react-redux';
import { useCreateMutation } from 'components/notification/notificationStore';

const { Content } = Layout;
const Job = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const [bid] = useCreateBidMutation()
    const [notification] = useCreateMutation()
    const [finishFreelancer] = useFinishJobFreelancerMutation()

    const [isBidVisible, setIsBidVisible] = useState(false);
    const [isJobVisible, setIsJobVisible] = useState(false);
    const { data: job, isLoading } = useGetJobQuery(Number(id), {
        pollingInterval: 1000,
    })
    const { userRole, id:userId } = useSelector((state: any) => state.user.user);
    const freelancer = 'Freelancer'
    const { data: count } = useCountBidsJobQuery(Number(id))
    const handleCancel = (val) => {
        val === 'bid' ?
        setIsBidVisible(false)
        : setIsJobVisible(false)
    };
    const showModal = (val) => {
      
        val === 'bid' ?
        setIsBidVisible(true)
        : setIsJobVisible(true)
    };

    const createBid = async (vales) => {
        setIsBidVisible(false);
        await bid({ ...vales, jobId: id })
        notify("Успішно")
        navigate('/')
    }

    const finishJob = async (val) => {
        setIsJobVisible(false)
        await notification({ ...val, jobId: id })
        await finishFreelancer(Number(id))
        notify('Успішно')
        navigate('/')
    }

    return (
        isLoading ? <h1> Loading </h1>
            : <>
                <p style={header}><a href="/">головна сторінка</a> / детельний перегляд роботи</p>
                <div style={container}>
                    

                    <PageHeader
                        style={siteHeader}
                        onBack={() => navigate('/')}
                        title={job.title}
                    />
                    <Content style={content}>
                        <div style={infoRow}>
                            <div style={info}>
                                <div style={infoTop}>{job.hourlyRate}</div>
                                <div style={infoBot}>Оплата за годину</div>
                            </div>
                            <div style={info}>
                                <div style={infoTop}>{job.duration}</div>
                                <div style={infoBot}>Час на виконання</div>
                            </div>
                            <div style={info}>
                                <div style={infoTop}>{job.englishLevel}</div>
                                <div style={infoBot}>Рівень англійського</div>
                            </div>
                            <div style={info}>
                                <div style={infoTop}>{count}</div>
                                <div style={infoBot}>Кількість відгуків</div>
                            </div>
                        </div>
                        <p style={forDescription}>{job.description}</p>

                        <div>{job.tags
                            &&
                            <ul style={forTags}>
                                {job.tags.map((e: any) => <li key={e.name} style={forTagsItem}>{e.name}</li>)}
                            </ul>
                        }
                        </div>
                        {userRole === freelancer &&
                        <>
                            <Button type="primary" onClick={() => showModal('bid')}>Зробити ставку</Button>

                        </>
                            }
                        {(job.bids.length > 0 && job.bids[0].userId === userId) &&
                            <Button type="primary" style={forButton} onClick={() => showModal('job')}>Закінчити роботу</Button>
}

                    </Content>
                </div>

                <Modal title="Створення ставки" visible={isBidVisible} onCancel={() => handleCancel('bid')} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}>
                    <Form name="nest-messages" onFinish={createBid} validateMessages={validateMessages}>
                        <Form.Item name={'description'} label="Опис" rules={[{ required: true }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name={'price'} label="Ваша ціна" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Відправити
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="Відправка роботи" visible={isJobVisible} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}>
                    <Form name="nest-messages" onFinish={finishJob} validateMessages={validateMessages}>
                        <Form.Item name={'message'} label="Повідомлення" rules={[{ required: true }]}>
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

    );
};

export default Job;