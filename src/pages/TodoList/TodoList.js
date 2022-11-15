import React, { useEffect, useState } from 'react';
import request from '../../utils/api/request';


const TodoList = () => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const resp = await request('GET', '/todos');
            const { data } = resp;
            setList(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
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
                    {list?.map((item, i) => (
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