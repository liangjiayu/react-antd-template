import React, { useEffect } from 'react';
import { Form, Input, Modal, Select, Radio, DatePicker, message } from 'antd';
import moment from 'moment';

type UpdateModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const { current, visible, onSuccess, onCancel } = props;
  const [form] = Form.useForm();

  // 回显表单的字段
  useEffect(() => {
    if (!form) {
      return;
    }
    if (visible) {
      if (current) {
        const formData = { ...current, birthday: moment(current?.birthday) };
        form.setFieldsValue(formData);
      } else {
        form.resetFields();
      }
    }
  }, [visible]);

  // 初始化表单，通常做一些网络请求的操作
  useEffect(() => {}, []);

  const onFinish = (values: any) => {
    console.log(values);
    if (current) {
      // updateUser({ ...values, id: current.userId }).then(() => {
      //   onSuccess();
      // });
      message.success('编辑成功');
      onSuccess();
    } else {
      // addUser(values).then(() => {
      //   onSuccess();
      // });
      message.success('新增成功');
      onSuccess();
    }
  };

  return (
    <>
      <Modal
        title={current ? '编辑' : '新增'}
        visible={visible}
        onOk={() => {
          form.submit();
        }}
        onCancel={onCancel}
        width={680}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          onFinish={onFinish}
          initialValues={{
            sex: 1,
          }}
        >
          <Form.Item label="用户账号" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="用户姓名" name="realname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="性别" name="sex" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="生日" name="birthday" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="手机号码" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Select1" name="Select">
            <Select
              options={[
                { label: 'one', value: 'one' },
                { label: 'two', value: 'two' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateModal;
