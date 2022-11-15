import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Pagination, Alert } from "../../components";
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
  const [formErrors, setFormErrors] = useState({
    description: null
  });
  const [alert, setAlert] = useState({
    title: "",
    msg: "",
    type: "",
    showAlert: false,
  });

  const { currentPage, pageSize, totalCount } = pagination;
  const { description } = formValues;
  const { title, msg, type, showAlert } = alert;

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
      setError(true);
      setAlert((values) => ({
        ...values,
        title: "Error!",
        msg: error.message + '.',
        type: "error",
        showAlert: true,
      }));
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

  const onChange = (e) => {
    setFormValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));

    validateForm(e);
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

    setAlert((values) => ({
      ...values,
      title: "Success!",
      msg: "New item added with the description: " + description + ".",
      type: "success",
      showAlert: true,
    }));

    setTimeout(function () {
      setAlert((values) => ({
        ...values,
        showAlert: false,
      }));
    }, 3000);

    if (
      currentPage === Math.ceil(totalCount / pageSize) &&
      alterList.length < 10
    ) {
      setAlterList((values) => [...values, newItem]);
    }
  };

  const validateForm = ({target}) => {
    if (!target.value) {
      setFormErrors((values) => ({
        ...values,
        [target.name]: 'true',
      }))
    } else {
      setFormErrors((values) => ({
        ...values,
        [target.name]: null,
      }))
    }
  }

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
         {showAlert && <Alert title={title} msg={msg} type={type} />}
      </div>
    );
  }

  const placeholder = !!formErrors.description ? "" : "Your awesome description";

  return (
    <div className="todo-list">
      {showAlert && <Alert title={title} msg={msg} type={type} />}
      <div className="todo-list__header">
        <div className="add-item">
          <div className="input-container">
            <input
              type="text"
              name="description"
              placeholder={placeholder}
              value={description}
              onChange={onChange}
              onBlur={validateForm}
              className={classnames({
                'input-error': !!formErrors.description
              })}
            />
            {formErrors.description && <p>This field is required</p>}
          </div>
          <button onClick={onAddItem} className="add" disabled={!description}>
            Add
          </button>
        </div>
        <button onClick={onRefresh} className="refresh">
          Refresh
        </button>
      </div>
      <Pagination
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalCount={totalCount}
        currentPage={currentPage}
      />
      <div className="todo-list__body">
        <table cellSpacing="0">
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
              const status = classnames({
                completed: item.completed,
                "not-completed": !item.completed,
              });
              return (
                <tr key={i}>
                  <th>{item.id}</th>
                  <th>{item.userId}</th>
                  <th>{item.title}</th>
                  <th>
                    <p className={status}>
                      {item.completed ? "True" : "False"}
                    </p>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
