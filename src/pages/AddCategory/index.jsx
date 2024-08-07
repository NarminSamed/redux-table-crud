import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { addCategory } from '../../features/categories/categoriesSlice';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.categories);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    dispatch(addCategory(values))
      .then((result) => {
        if (addCategory.fulfilled.match(result)) {
          navigate('/'); 
        }
      });
  };

  return (
    <div>
      <h1>Add New Category</h1>
      {status === 'loading' && <Spin />}
      {status === 'failed' && <Alert message={error} type="error" />}
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
