import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Layout, Menu } from 'antd';
import Search from "antd/es/input/Search";
import { SettingOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

import { forButton, forHeader, forItem, forLink, forMenu, forSearch, forSing, logo } from "./styleNavbar";
import { HOME_ROUTE, SIGNIN_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, BID_ROUTE, FREELANCER_JOB_ROUTE, EMPLOYER_JOB_ROUTE, NOTIFICATION_ROUTE } from "utils/consts";
import { useAppDispatch } from "services/hooks/reduxHooks";
import { removeUser } from "services/userSlice";
import { useGetBidsByStatusQuery } from '../bid/bidStore'
import { useGetJobByTitleQuery } from '../jobs/homeStore'

const { Header } = Layout;
const { SubMenu } = Menu;

export const Navbar = () => {
    const dispatch = useAppDispatch()
    const { isAuth } = useSelector((state: any) => state.user);
    const { userRole } = useSelector((state: any) => state.user.user);
    const [title, setTitle] = useState('')
    const { data } = useGetJobByTitleQuery(title)

    const navigate = useNavigate();

    const { data: bids } = useGetBidsByStatusQuery(undefined, {
        pollingInterval: 60000,
    })

    const onSearch = () => {
        if (data) {
            setTitle('')
            navigate(`/job/${data.id}`)
        }

    }
    return (
        <Layout>
            <Header style={forHeader} className="header">
                <div style={logo} className="logo"><Link to={HOME_ROUTE}>T2</Link></div>
                <Menu theme="dark" mode="horizontal" style={forMenu}>
                    <Menu.Item key="1" style={{ background: " none" }}>
                        <Search
                            style={forSearch}
                            placeholder={'Пошук по заговолку'}
                            enterButton="Знайти"
                            size="large"
                            onSearch={onSearch}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </Menu.Item>
                    {
                        isAuth ?
                            <>
                                <SubMenu key="sub1" title="Меню" style={forSing} icon={<SettingOutlined />}>
                                    <Menu.ItemGroup key="g1">
                                        <Menu.Item key="settings" style={forItem}>
                                            <Link to={SETTINGS_ROUTE}>Налаштування</Link>
                                        </Menu.Item>
                                        {
                                            userRole === "Employer" ?
                                                <>
                                                    <Menu.Item key="bids" style={forItem}>
                                                        <Badge count={bids} offset={[15, 5]}>
                                                            <Link to={BID_ROUTE} style={forLink}>Відгуки на роботи</Link>
                                                        </Badge>
                                                    </Menu.Item>
                                                    <Menu.Item key="myJobs" style={forItem}>
                                                        <Link to={EMPLOYER_JOB_ROUTE}>Мої роботи</Link>
                                                    </Menu.Item>
                                                    <Menu.Item key='notification' style={forItem}>
                                                        <Link to={NOTIFICATION_ROUTE}> Надіслані роботи </Link>
                                                    </Menu.Item>
                                                </>
                                                :
                                                <Menu.Item key="freelancer" style={forItem}>
                                                        <Link style={forLink} to={FREELANCER_JOB_ROUTE}>Прийняті роботи</Link>
                                                </Menu.Item>
                                        }


                                        <Menu.Item key="logout" style={forItem}>
                                            <Button style={forButton} onClick={() => dispatch(removeUser())}>Вийти</Button>
                                        </Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>
                            </>
                            :
                            <><Menu.Item key="2" style={forSing}>
                                <Link to={SIGNIN_ROUTE}>Війти</Link></Menu.Item>
                                <Menu.Item key="3"><Link to={REGISTRATION_ROUTE}>Зареєструватись</Link></Menu.Item>
                            </>

                    }
                </Menu>
            </Header>
        </Layout>
    );
}
