import React, {useState, useEffect} from 'react';

function Datafetch() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://applicationpublicinterface")
                if (!response.ok) throw new Error('Network error');
                const result = await response.json();
                setData(result);
            }
            catch(err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData()
    }, [])
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    )
}