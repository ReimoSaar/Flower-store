import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

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
    axios.get('https://192.168.8.102:8443/products')
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
  }, [])

  let content = null

  if (request.data) {
      content =
      request.data.map((product, key) =>
        <img key={product.name} src={product.image_url} width="350" height="200"/>
      )
  }

  return (
    <ul>
    {content}
    </ul>
  );
}

export default App;
