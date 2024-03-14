"use client"
import { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    positionId:'',
    photo: null,
    token: ''
  });

  const handleChange = (e: { target: { name: any; value: any; files: any; }; }) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'photo' ? files : value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('positionId', formData.positionId);
    formDataToSend.append('phone', formData.phone);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }
    formDataToSend.append('token', formData.token);

    console.log(`formDataToSend: ${JSON.stringify(formDataToSend, null, 2)}`)


    try {
      const response = await fetch('http://18.197.131.200:3000/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${formData.token}`
        },
        body: formDataToSend
      });
      if (response.ok) {
        alert('Данные успешно отправлены на сервер');
      } else {
        alert('Произошла ошибка при отправке данных');
      }
      console.log(`response: ${JSON.stringify(response.body, null, 2)}`)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your имя"/>
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange}
                 placeholder="Enter your email"/>
        </label>
      </div>
      <div>
        <label>
          Position:
          <input type="text" name="positionId" value={formData.positionId} onChange={handleChange}
                 placeholder="Enter your positionId "/>
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                 placeholder="Enter your phone (+380)"/>
        </label>
      </div>
      <div>
        <label>
          Photo:
          <input type="file" name="photo" onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Token:
          <input type="text" name="token" value={formData.token} onChange={handleChange}
                 placeholder="Enter your token"/>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

