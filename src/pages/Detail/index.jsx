import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../../features/categories/categoriesSlice";
import { Spin, Alert } from "antd";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCategory, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <Alert message={error} type="error" />;
  }

  if (!selectedCategory) {
    return <p>No category found</p>;
  }

  return (
    <div>
      <h1>{selectedCategory.name}</h1>
      <p>{selectedCategory.description}</p>
    </div>
  );
};

export default Detail;
