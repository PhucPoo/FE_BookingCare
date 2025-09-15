import axios from 'axios';
import React, { useEffect, useState } from "react";


const TestApi = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get("http://localhost:8080/api/v1/accounts?page=1&size=10&sort=createAt,desc")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

   

    return (
        
    );
};

export default TestApi;