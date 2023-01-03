import React, { useState } from 'react';

function Adduser(props) {
    const{setData , setPage , Data} = props;

    function handleSubmit(event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const newData = {
        name: formData.get('name'),
        email: formData.get('email'),
         Phone: formData.get('phone'),
      };
  
      setData([...Data, newData]);
    
    }
  
    return (
      <form onSubmit={handleSubmit} style={{margin : "50px"}}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <br />
        <button type="submit" onClick={() => setPage('table')} style ={{margin:"10px"}}>Add User</button>
        <br />
       
      </form>
    );
}

export default Adduser;
