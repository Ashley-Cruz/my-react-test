import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import request from '../../utils/api/request';

const TodoList = () => {
    const [list, setList] = useState([]);
    const [alterList, setAlterList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalCount: null
    });
    const [formValues, setFormValues] = useState({
        description: ''
    });

    const { currentPage, pageSize, totalCount } = pagination;

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const resp = await request('GET', '/todos');
            const { data } = resp;
            setList(data);
            setAlterList(data.slice(0,10));
            setPagination(values => ({
                ...values,
                totalCount: data?.length
            }));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const onPageChange = (page) => {
        const to = page * pageSize;
        const from = to - pageSize;
        setAlterList(list.slice(from, to));
        setPagination(values => ({
            ...values,
            currentPage: page
        }));
    }

    const onChange = ({target}) => {
        setFormValues(values => ({
            ...values,
            [target.name]: target.value
        }))
    }

    const onAddItem = (e) => {
        e.preventDefault();

        const newItem = {
            completed: false,
            id: list?.length + 1,
            title: formValues.description,
            userId: 11
        }
        setList(values => ([
            ...values,
            newItem
        ]));
        setFormValues(values => ({
            ...values,
            description: ''
        }))
        setPagination(values => ({
            ...values,
            totalCount: list.length + 1
        }));

        
    }

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        )
    }
    
  return (
    <div>
        <div>
            <div>
                <input type="text" name="description" placeholder="Your awesome description" values={formValues.description}  onChange={onChange} />
                <button onClick={onAddItem}>Add</button>
            </div>
        </div>
        <Pagination 
            onPageChange={onPageChange}
            pageSize={pageSize}
            totalCount={totalCount}
            currentPage={currentPage}
        />
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Description</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {alterList?.map((item, i) => (
                        <tr key={i}>
                            <th>{item.id}</th>
                            <th>{item.userId}</th>
                            <th>{item.title}</th>
                            <th>{item.completed ? 'True' : 'False'}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TodoList;