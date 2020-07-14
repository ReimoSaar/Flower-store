import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchData(url) {
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: false
    })

    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                console.log(response)
                setRequest({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(error => {
                console.log(error.message)
                setRequest({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url])

    return request
}

export default FetchData