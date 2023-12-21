import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, message } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTask } from '../../api/ApiCalls';
import { refreshTaskAction } from '../../redux/AuthActions';

const AddTaskButton = ({ taskListId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [apiProgress, setApiProgress] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { userId } = useSelector((store) => {
    return {
      userId: store.id
    }
  });
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    if (values.private === undefined) {
      values.private = false;
    }
    const data = {
      Task: {
        taskListId: taskListId,
        name: values.name,
        description: values.description,
        createdDate: values.date[0].$d,
        endDate: values.date[1].$d
      }

    }
    try {
      setApiProgress(true);
      await addTask(data);
      messageApi.open({
        type: 'success',
        content: 'Görev eklendi',
      });
      onClose();
      form.resetFields();
      dispatch(refreshTaskAction(true));

    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Görev eklenirken hata meydana geldi',
      });

    }
    finally {
      setApiProgress(false);
    }


  };


  return (
    <>
      {contextHolder}

      <PlusOutlined style={{ position: 'absolute', top: 17, right: 50 }} onClick={showDrawer} />
      <Drawer title="Görev ekle" placement="right" onClose={onClose} open={open}>
        <div className='form'>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: 300, margin: '200px auto' }}
            form={form}
          >

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Lütfen boş bırakmayınız!',
                },
              ]}
            >
              <Input placeholder="Görev adı" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Lütfen boş bırakmayınız!',
                },
              ]}
            >
              <Input.TextArea
                placeholder="Açıklama"
                autoSize={{
                  minRows: 3,
                  maxRows: 6,
                }}
              />
            </Form.Item>

            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Lütfen boş bırakmayınız!',
                },
              ]}
            >
              <DatePicker.RangePicker placeholder={["Başlangıç tarihi", "Bitiş tarihi"]} />
            </Form.Item>




            <Form.Item>
              <Button style={{ background: '#1fc5b5', marginBottom: 20 }} type="primary" htmlType="submit" loading={apiProgress}>
                Oluştur
              </Button> <br />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  )
}

export default AddTaskButton