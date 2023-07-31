import { Menu, Layout } from 'antd';
import EditContactsPage from "../settings-edit-contacts/editContacts";
import SettingsPassword from 'components/settings/settings-change-password';
import { useState } from 'react';

const { Content, Sider } = Layout;

function Settings() {
  const [content, setContent] = useState(1)
  return (<section>
    <Layout>
      <Sider style={{ backgroundColor: "none" }}>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline">
          <Menu.ItemGroup key="g1" title="Налаштування">
            <Menu.Item key="1" onClick={() => setContent(1)}>Налаштування даних</Menu.Item>
            <Menu.Item key="2" onClick={() => setContent(2)}>Зміна паролю</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {content === 1 ? <EditContactsPage /> : <SettingsPassword />}
        </Content>
      </Layout>
    </Layout>
  </section>);
}

export default Settings;
