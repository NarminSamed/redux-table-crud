import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
  addFavorite,
  addBasket
} from "../../features/categories/categoriesSlice";
import { Table, Spin, Alert, Button, Space, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const Categories = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    status,
    error,
    favorites,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <Alert message={error} type="error" />;
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleAddBasket = (id) => {
    dispatch(addBasket(id));
  };

  const handleFavorite = (id) => {
    dispatch(addFavorite(id));
  };
  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Link to={`/${record.id}`}>
              <Button type="primary" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/edit-category/${record.id}`}>
              <Button type="default" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
          <Tooltip title="Add Basket">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleAddBasket(record.id)}
            />
          </Tooltip>
          <Tooltip title="Favorite">
            <Button
              type="default"
              icon={
                isFavorite(record.id) ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onClick={() => handleFavorite(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={categories} columns={columns} />;
    </div>
  );
};

export default Categories;
