//成员列表界面
import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Button, Form, Tag, Radio, Pagination, Modal, Table, PageHeader, Input, Space,Popconfirm, message } from 'antd';
import {
  MenuFoldOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import style from "./index.module.less";
// import { info } from "console";
const TeamMember = (props) => {
  const { memberDispatch, member } = props
  const { Search } = Input
  const history = useHistory()
  
  useEffect(()=>{
    // Info()
    if(member.loginFlag){
      memberDispatch.changeloginFlag(false);
      memberDispatch.changethevisibal(false);
      history.push("/")
    }
  },[member.loginFlag])
  // useEffect(() => {
  //    memberDispatch.judgerole();
  // }, []);

  useEffect(() => {
    
    if(!member.insearch){
    memberDispatch.getList(member.page);
  }
    if(member.insearch){
      memberDispatch.searchrole({
        field:member.inputvalue, 
        currPage:member.page
       });
    }
  }, [member.state]);
  

  const Head = () => {
    // const showaddrole = () => {
    //   memberDispatch.changeaddvisibal(true);
    // };
  const search= (value) => {
    memberDispatch.saveinputvalue(value);
    memberDispatch.changeinsearch(true)
     memberDispatch.searchrole({
      field:value, 
      currPage:1
     });
     memberDispatch.changepage(1)
  }

  const showall= (value) => {
     memberDispatch.changeinsearch(false);
     memberDispatch.getList(member.page);
 }

    return (
      <PageHeader
        backIcon={<MenuFoldOutlined />}
        className="site-page-header"
        title="所有成员"
        extra={
          [<Search key='1' style={{ width: '700px', }} placeholder='输入学号或者姓名进行快速查询' onSearch={search} ></Search>,
          <Button  className={member.insearch ? style.show: style.hidden}  key='2'  style={{marginLeft:'50px', marginRight: '200px'}} onClick={showall} >显示全部</Button>,
          // <Button style={{ marginLeft: '100px', marginRight: '150px' }} onClick={showaddrole} >新增成员</Button>
          ]
        }
      />
    )
  }

  const Jumpmessage = () => {

    const handleCancel = () => {
      memberDispatch.changethevisibal(false);
      message.info('已取消');
    };

    return (
      <Modal
        visible={member.thevisibal}
        title="提示信息"
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          memberDispatch.changeloginFlag(true);
        }}
      >
        <div>{member.error}</div>
        <div>点击确定可以跳转到登录界面</div>
        {/* <p>登录已过期，请重新登录</p> */}
        {/* <div>点击确定可以跳转到登录页面</div> */}
      </Modal>
    );
  };

  const Message = () => {
    const [form] = Form.useForm();
    const handleOk = (values) => {
      memberDispatch.modifyrole({
        ...values,
        id: member.id
      })
      memberDispatch.changevisibal(false);
    };

    const handleCancel = () => {
      memberDispatch.changevisibal(false);
      message.info('已取消');
    };

    return (
      <Modal
        visible={member.visibal}
        title="修改成员"
        okText="确定修改"
        cancelText="取消修改"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleOk(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item name="role" className="collection-create-form_last-form-item">
            <Radio.Group>
              <Radio key='1' value='管理员'>管理员</Radio>
              <Radio key='2' value='干部'>干部</Radio>
              <Radio key='3' value='干事'>干事</Radio>
              <Radio key='4' value='成员'>成员</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const Numbernav = () => {
    const changepage = (page) => {
      memberDispatch.changepage(page);
      if(!member.insearch){
        memberDispatch.savestate();
      }
      else{
        memberDispatch.searchrole({
          field:member.inputvalue, 
          currPage:page
         });
      }
    }
    return (
      <Pagination
        style={{ textAlign: "center" }}
        responsive
        defaultCurrent={1}
        total={member.total}
        pageSize={10}
        showSizeChanger={false}
        current={member.page}
        onChange={changepage}
      />
    )
  }

  const Memberlist = () => {
    const { Column } = Table;
    const delrole = (id) => {
      memberDispatch.deleterole(id)
    }
    const modifyrole = (id, role) => {
      memberDispatch.changeid(id)
      memberDispatch.changerole(role);
      memberDispatch.changevisibal(true);
    }
    const cancel=()=> {
      message.error('已取消');
    }
    
    return (
      <Table dataSource={member.list}
        style={{ height: "600px" }}
        size="small"
        locale={{ emptyText: "暂无数据" }}
        bordered
        rowKey={record=>record.id}
        pagination={{ position: ['none', 'none'] }}>
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="学号" dataIndex="studentId" key="studentId" />
        <Column title="电话" dataIndex="phoneNumber" key="phoneNumber" />
        <Column
          title="权限"
          dataIndex="role"
          key="role"
          render={(text, record) => (
            <Tag color="blue">
              {text}
            </Tag>
          )}
        />
        <Column
          title="操作"
          key="action"
          width='15vw'
          render={(text, record) => (
            <Space size='large'>
              <Button type='primary' key='1' style={{ backgroundColor: "white", color: "black", border: "1px" }}
                onClick={() => { modifyrole(record.id, record.role) }}  >
                编辑
                </Button>
                <Popconfirm
                       title="确定删除此成员吗?"
                       onConfirm={() => { delrole(record.id) }}
                       onCancel={cancel}
                       okText="确定"
                       cancelText="取消"
                       >
                           <Button type='primary' key='2' style={{ backgroundColor: "red", color: "white", border: "1px" }}
                            >
                              删除
                           </Button>
               </Popconfirm>
              
            </Space>
          )}
        />
      </Table>
    )
  }


  return (
    <div key={props.location.key}>
      <Head  ></Head>
      <Memberlist></Memberlist>
      <div className='Numbernav'>
        <Numbernav></Numbernav>
      </div>
      <Message></Message >
      <Jumpmessage></Jumpmessage>
    </div>
  )

};

const mapState = (state) => ({
  member: state.member
});

const mapDispatch = (dispatch) => ({
  memberDispatch: dispatch.member,
});
const Member = connect(mapState, mapDispatch)(withRouter(TeamMember));
export default Member;
// export default withRouter(About);
