/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-15 20:32:16
 */
import {  MailOutlined, SettingOutlined,TeamOutlined} from '@ant-design/icons';
 const configMenu = [
  {
    key: 'sub1',
    icon: <MailOutlined />,
    title: '失物管理',
    children: [
      {
        key: 'add',
        title:'新增失物'
      },
      {
        key: 'record',
        title:'失物记录'
      }
    ]
  },
  {
    key: 'sub2',
    icon: <TeamOutlined />,
    title: '成员管理',
    children: [
      {
        key: 'member',
        title:'成员列表'
      },
      {
        key:'approve',
        title:'注册审批'
      }
    ]
  },{
    key: 'sub3',
    icon: <SettingOutlined />,
    title: '系统设置',
    children: [
      {
        key: 'information',
        title:'个人信息'
      },{
        key:'about',
        title:'关于我们'
      }
    ]
  }
];
export default configMenu;