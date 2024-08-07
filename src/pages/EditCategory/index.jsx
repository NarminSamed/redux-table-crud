import { useEffect } from "react";
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, editCategory } from "../../features/categories/categoriesSlice";
import { Form, Input, Button, Spin, Alert } from "antd";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCategory, status, error } = useSelector((state) => state.categories);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory.name,
        description: selectedCategory.description,
      });
    }
  }, [selectedCategory, form]);

  const handleSave = (values) => {
    dispatch(editCategory({ id, category: values })).then(() => {
    });
  };

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      <h1>Edit Category</h1>
      <Form
        form={form}
        onFinish={handleSave}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCategory;
