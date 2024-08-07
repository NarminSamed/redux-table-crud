import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Space } from 'antd';
import { addBasket, removeBasket } from "../../features/categories/categoriesSlice";

const Basket = () => {
  const dispatch = useDispatch();
  const { basket = [], data = [] } = useSelector((state) => state.categories);

  const basketItems = data.filter((item) => basket.find((basketItem) => basketItem.id === item.id));

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => {
        const basketItem = basket.find((item) => item.id === record.id);
        return basketItem ? basketItem.quantity : 0;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => dispatch(addBasket(record.id))}
          >
            Add
          </Button>
          <Button
            type="default"
            onClick={() => dispatch(removeBasket(record.id))}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Basket</h1>
      <Table dataSource={basketItems} columns={columns} />
    </div>
  );
};

export default Basket;
