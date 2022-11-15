import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Pagination } from "../../components";
import request from "../../utils/api/request";
import "./styles.scss";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [alterList, setAlterList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: null,
  });
  const [formValues, setFormValues] = useState({
    description: "",
  });

  const { currentPage, pageSize, totalCount } = pagination;
  const { description } = formValues;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await request("GET", "/todos");
      const { data } = resp;
      setList(data);
      setAlterList(data.slice(0, 10));
      setPagination((values) => ({
        ...values,
        totalCount: data?.length,
      }));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const onPageChange = (page) => {
    const to = page * pageSize;
    const from = to - pageSize;
    setAlterList(list.slice(from, to));
    setPagination((values) => ({
      ...values,
      currentPage: page,
    }));
  };

  const onChange = ({ target }) => {
    setFormValues((values) => ({
      ...values,
      [target.name]: target.value,
    }));
  };

  const onAddItem = () => {
    const newItem = {
      completed: false,
      id: list?.length + 1,
      title: description,
      userId: 11,
    };

    setList((values) => [...values, newItem]);
    setFormValues((values) => ({
      ...values,
      description: "",
    }));
    setPagination((values) => ({
      ...values,
      totalCount: list.length + 1,
    }));

    if (currentPage === Math.ceil(totalCount/pageSize) && alterList.length < 10) {
        setAlterList(values => ([
            ...values,
            newItem
        ]));
    }
  };

  const onRefresh = () => {
    window.location.reload(false);
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <div className="input-container">
          <input
            type="text"
            name="description"
            placeholder="Your awesome description"
            value={description}
            onChange={onChange}
          />
          <button onClick={onAddItem} className="add" disabled={!description}>Add</button>
        </div>
        <button onClick={onRefresh} className="refresh">Refresh</button>
      </div>
      <Pagination
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalCount={totalCount}
        currentPage={currentPage}
      />
      <div className="todo-list__body">
        <table cellspacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Description</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {alterList?.map((item, i) => {
              const status = classnames({'completed': item.completed, 'not-completed': !item.completed});
              return (
                <tr key={i}>
                  <th>{item.id}</th>
                  <th>{item.userId}</th>
                  <th>{item.title}</th>
                  <th><p className={status}>{item.completed ? "True" : "False"}</p></th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
