import moment from 'moment';
import React, { useEffect,useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Appointment from '../Appointment/Appointment';
import "./style.css"
import { nextSunday } from 'date-fns/fp';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import { AiFillCalendar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { BiTime } from 'react-icons/bi';



function Booking() {
  const [bookData, setBookData] = useState([]);
  const [startdate, setStartdate] = useState(new Date());
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  
  const emailId = window.localStorage.getItem("EmailID");
 const ID =  localStorage.getItem('meetingId')
 console.log(ID,"12121212");

  useEffect(() => {
    fetch(`https://fitpro.stackroute.io/appointmentservice/api/appointment/expertId/${emailId}`)
    .then(res=>res.json())
    .then(response=>{
      setCurrentItems(response)
    })
    .catch(err=>console.log(err));
  }, []);

  const customStyles = {
		iconsize:{
			height:"25px"
		}
	}

  useEffect(() => {      
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(bookData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(bookData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage , bookData]);

  var resultDate = moment(startdate).format("MM/DD/YYYY"); 
 console.log(resultDate,"111");

 const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % bookData.length;
  setItemOffset(newOffset);
};
 
   
  return (
    <div>
    <Card cd className='p-5'>
    <div style={{display:"flex" , justifyContent:"space-between" , alignItems:"end"}} className='mx-3'>
    <Card.Title >Booking Appoinment</Card.Title>
    <div>
   
    <ReactDatePicker selected={startdate} onChange={(date)=>setStartdate(date)}/>
    </div>
    </div>
  
    <Card.Body>
    
    <ListGroup as="ol" numbered>
    {resultDate && currentItems.map((data,index)=>(

      data.appointmentDate == resultDate ? 
      console.log(data.appointmentDate , resultDate,"11111") :
      <ListGroup.Item id={index}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
          
          <div className="ms-2 me-auto">
          <div className="fw-bold">{data.expertName}</div>
          <div  style={{marginLeft:"200px", marginTop:"-18px"}}><BiTime style={customStyles.iconsize}/>{data.startTime.substring(11, 19)} - {data.endTime.substring(11, 19)}</div>

        </div>
     
      
        <p className='mx-3' style={{"background":"none" , "color":"black"}} ><AiFillCalendar style={customStyles.iconsize}/>
        {data.appointmentDate}
        </p>
       <Link to="/videocall">
        <Button className='mx-3' variant='outline-primary'>
        Connect Now 
        </Button>
        </Link>
      </ListGroup.Item> 
     
      ))}

    </ListGroup>
    </Card.Body>
    <div>
    <ReactPaginate
    breakLabel="..."
    nextLabel="NEXT>"
    onPageChange={handlePageClick}
    pageRangeDisplayed={3}
    pageCount={pageCount}
    previousLabel="<PREV"
    renderOnZeroPageCount={null}
    containerClassName="pagination"
    pageLinkClassName='page-num'
    previousLinkClassName='page-num'
    nextLinkClassName='page-num'
    activeLinkClassName='active'
  />
    </div>
    </Card>
    </div>
  )
}

export default Booking;




// {bookData.map((data , index)=>   
//   {

// })}


 //   {data.appointment_Date === resultDate ?    <p className='mx-3' style={{"background":"none" , "color":"black"}} >
      //  {console.log(data.appointment_Date)}
      //   </p>:console.log(resultDate)  }