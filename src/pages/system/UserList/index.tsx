import React, { useState, useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import { getUserList } from './service';
import UpdateModal from './components/UpdateModal';

const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // UpdateModal
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();

  const columns: ProColumns[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户账号',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: '用户姓名',
      dataIndex: 'realname',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div>
            <img src={record.avatar} style={{ width: 50, height: 50, objectFit: 'cover' }} alt="" />
          </div>
        );
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      filters: true,
      onFilter: true,
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '男',
        },
        2: {
          text: '女',
        },
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '正常',
          status: 'success',
        },
        2: {
          text: '冻结',
          status: 'default',
        },
        3: {
          text: '删除',
          status: 'error',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <a
          key="update"
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <TableDropdown
          key="actionGroup"
          menus={[
            {
              key: 'delete',
              name: '删除',
              onClick: () => {
                Modal.confirm({
                  title: '确认删除该记录?',
                  content: 'Some descriptions',
                  onOk() {
                    console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              },
            },
            {
              key: 'cool',
              name: '冻结',
            },
          ]}
        />,
      ],
    },
  ];

  const fetchList = async (params = {}, sort: any, filter: any) => {
    // TODO 根据后端协议做对应的调整
    console.log(params, sort, filter);
    const result = await getUserList({ ...params, ...sort, ...filter });
    const { data } = result;

    return { data: data.records, success: true, total: data.total };
  };

  return (
    <div>
      <ProTable
        headerTitle={'用户管理'}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="addUser"
            onClick={() => {
              setCurrentRow(undefined);
              setUpdateModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
        request={fetchList}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          defaultCollapsed: false,
        }}
      ></ProTable>

      <UpdateModal
        visible={updateModalVisible}
        onSuccess={() => {
          actionRef.current?.reload();
          setUpdateModalVisible(false);
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
        current={currentRow}
      ></UpdateModal>
    </div>
  );
};

export default UserList;
