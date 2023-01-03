import React from "react";
import './Table.css'
import 'font-awesome/css/font-awesome.min.css';
import { CSVLink } from 'react-csv';
import TableData from "./TableData.tsx";
import { useState, useEffect } from 'react';

import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import Adduser from "./Adduser.tsx";
import { AiOutlineArrowDown } from 'react-icons/ai'
var url = "https://randomuser.me/api/?results=7";

const Table = () => {

  interface Datatype {
    name: String;
    registered: String;
    role: string;
    country: String;
    cell: String;
    picture: string;
    email: string;
  }


  const intialState = {
    name: "",
    string: "",
    registered: "",
    role: "",
    country: "",
    cell: "",
    email: "",
    picture: ""
  }
  const [Data, setData] = useState<Datatype[]>([intialState]);
  const [page, setPage] = useState('table');
  const [pageNumber, setpageNumber] = useState(1);
  

  const fetchData :React.FC= () => {
    let tmpArray: any[] = [];
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Here you need to use an temporary array to store NeededInfo only 
        for (var i = 0; i < data.results.length; i++) {
          tmpArray.push(data.results[i])
        }
        setData(tmpArray);
      });
  }

  const header = [
    {
      lable: "Name", key: "name"
    },
    {
      lable: "Title", key: "email"
    },

  ]
  const csvLink = {
    data: Data,
    headers: header,
    filename: "csvfile.csv",

  }

  function NextPage() {
    if(pageNumber < 25) {
      setpageNumber(pageNumber+1);
      fetchData();
   }
  }
  function PrvPage() {
     if(pageNumber > 1) {
        setpageNumber(pageNumber-1);
        fetchData();
     }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div>
        <div className="nav nav-pills navtabs">
          <li className="nav-item">
            <a className="nav-link tabborder font-style" aria-current="page" >
              Genral
            </a>
          </li>
          <li className="nav-item  ">
            <a className="nav-link  font-style" >
              user
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  font-style" >
              Plan
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link  font-style "

            >
              Billing
            </a>
          </li>
          <li className="nav-item ">
            <a className="nav-link  font-style" >
              Integration
            </a>
          </li>
        </div>

        <div className="header">
          <div className="header-first" >
            <div className="Useractivity">
              <span className="usertitle" >User</span>
              <span className="active-user" >48 Active</span>
            </div>
            <span >Manage Your team and their account permissions here</span>
          </div>
          <div className="Button-style">
            <button className="csv-button" >
              <BsFillCloudArrowDownFill />
              <CSVLink {...csvLink} className="CSVdownload"> Download CSV
              </CSVLink>
            </button>
            <button className="add-user" onClick={() => setPage('Adduser')}> <AiOutlinePlus />Add User</button>
          </div>

        </div>
      </div>

      {page === 'table' && <div>
        <div className="table-data">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name <AiOutlineArrowDown /></th>
                <th scope="col">Email <AiOutlineArrowDown /></th>
                <th scope="col">Mo NO <AiOutlineArrowDown /></th>
                <th scope="col">Last Login <AiOutlineArrowDown /></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Data && Data.length > 0 &&
                Data.map((element, index) => {
                  return <TableData picture={element.picture} name={element.name} Stause={element.registered} role={element.cell} email={element.email} Num={index} setData={setData} Data={Data} />
                })
              }
            </tbody>
          </table>
        </div>
        <div className="container1">
          <button type="button" className="prvbtn table-button"  onClick={PrvPage}> &laquo; Privious</button>
            <span className="pageRange"> {pageNumber} to 25 </span> 
          <button type="button" className="nextbtn table-button"  onClick={NextPage} >Next  &raquo;</button>

        </div>
      </div>}

      {
        page === "Adduser" && <Adduser setData={setData} setPage={setPage} Data={Data} />

      }
    </>
  );
};

export default Table;

