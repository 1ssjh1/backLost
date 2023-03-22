/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-16 18:42:43
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Table,
  PageHeader,
  Pagination,
  Button,
  Popconfirm,
  message,
  Modal,
} from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Approve = (props) => {
  const { approveDispatch, approveList } = props;
  const history = useHistory();
  useEffect(() => {
    // Info()
    if (approveList.loginFlag) {
      approveDispatch.changeloginFlag(false);
      approveDispatch.changethevisibal(false);
      history.push("/");
    }
    //
  }, [approveList.loginFlag]);
  // useEffect(() => {

  useEffect(() => {
    approveDispatch.getApproveList(approveList.page);
  }, [approveList.state]);

  const JumpMessage = () => {
    const handleCancel = () => {
      approveDispatch.changethevisibal(false);
      message.info("已取消");
    };

    return (
      <Modal
        visible={approveList.thevisibal}
        title="提示信息"
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          approveDispatch.changeloginFlag(true);
        }}
      >
        <div>{approveList.error}</div>
        <div>点击确定可以跳转到登录页面</div>
      </Modal>
    );
  };

  const Head = () => {
    const summit = () => {
      var fin_arr=[];
      var count = 0;  
      var i=1;
      //对象长度
    for (var key in approveList.selectedRowKeys) {         
            count++;  
    }  
      for(i=1;i<=count;i++){
        fin_arr = fin_arr.concat(approveList.selectedRowKeys[approveList.pages[i-1]]);
      }
      approveDispatch.submitregister(fin_arr);
      message.success("提交成功");
    };
    const cancel = () => {
      message.info("已取消");
    };
    return (
      <PageHeader
        backIcon={<MenuFoldOutlined />}
        className="site-page-header"
        title="待审批成员"
        extra={
          <Popconfirm
            key="1"
            title="确定批准吗?"
            onConfirm={summit}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
            style={{ marginRight: "200px" }}
          >
            <Button>批量同意</Button>
          </Popconfirm>
        }
      />
    );
  };

  const Numbernav = () => {
    const changepage = (page) => {
      approveDispatch.changepage(page);
    };
    return (
      <Pagination
        style={{ textAlign: "center" }}
        responsive
        defaultCurrent={1}
        total={approveList.total}
        pageSize={10}
        showSizeChanger={false}
        current={approveList.page}
        onChange={changepage}
      />
    );
  };

  const Memberlist = () => {
    const { Column } = Table;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const list = {}
        list[approveList.page]=selectedRowKeys
        let pages = approveList.pages
        pages.push(approveList.page)
        approveDispatch.changepages(Array.from(new Set(pages)));
        approveDispatch.changeRowKeys(list);
      },
    };
    return (
      <Table
        dataSource={approveList.list}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: approveList.selectedRowKeys[approveList.page],
          ...rowSelection,
        }}
        rowKey={(record) => record.id}
        style={{ height: "600px" }}
        size="small"
        locale={{ emptyText: "暂无数据" }}
        bordered
        pagination={{ position: ["none", "none"] }}
      >
        <Column title="id" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="学号" dataIndex="studentId" key="studentId" />
        <Column title="密码" dataIndex="password" key="password" />
        <Column title="电话" dataIndex="phoneNumber" key="phoneNumber" />
      </Table>
    );
  };

  return (
    <div>
      <Head></Head>
      <Memberlist></Memberlist>
      <Numbernav></Numbernav>
      <JumpMessage></JumpMessage>
    </div>
  );
};

const mapState = (state) => ({
  approveList: state.approve,
});

const mapDispatch = (dispatch) => ({
  approveDispatch: dispatch.approve,
});
const ApproveContainer = connect(mapState, mapDispatch)(Approve);
export default ApproveContainer;
