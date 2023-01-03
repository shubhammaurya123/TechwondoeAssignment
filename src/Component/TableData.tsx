import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiEdit2 } from 'react-icons/fi'
import './TableData.css'
const TableData :React.FC = (props) => {
  let { name, Stause, role, email, picture  , Num , setData , Data } = props;
  
  const handleDelete = (email: String) => {
    setData(Data.filter((value) => value.email !== email));
    alert("Successfully Deleted")
  }
 
   console.log(Num);
  return (
    <tr className={`${Num%2===0 ? "":"TableDataeven"}`} >
      <td className='wrapper'> <img className="profile-img" src={picture.medium} alt="Profile pic" />{name.first} </td>
      <td>{email}</td>
      <td>{role}  </td>
      <td>{Stause.date}</td>
      <td onClick={() => handleDelete(email)}><RiDeleteBinLine className='deletIcon'/></td>
      <td><FiEdit2  className='deletIcon'/> </td>
    </tr>

  )
}

export default TableData