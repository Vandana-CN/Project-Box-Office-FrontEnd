

//  import './styles.css';
 import './BookNew.css';
 import React, { useState,useEffect } from 'react'
 import {Routes, Route, useNavigate} from 'react-router-dom';
 import clsx from 'clsx' 
 import { useLocation } from "react-router-dom";
 import AuthService from "../Services/auth-service";
 import axios from "axios";
//  import Parser from 'html-react-parser';
 



 const movies = [
   {
     name: '',
     price: 500,
     occupied: [],
    
   }
   //,
  //  {
  //    name: 'Joker',
  //    price: 12,
  //    occupied: [9, 41, 35, 11, 65, 26],
  //  },
  //  {
  //    name: 'Toy story',
  //    price: 8,
  //    occupied: [37, 25, 44, 13, 2, 3],
  //  },
  //  {
  //    name: 'the lion king',
  //    price: 9,
  //    occupied: [10, 12, 50, 33, 28, 47],
  //  },
 ]
 

 const seats = Array.from({ length: 8 * 8 }, (_, i) => i)
 
 export default function App() {

 

  //get 
  const [Bookedseats,setBookedSeats]=useState([
    {
      movieName : "",
      price:'',
      date:'',
      seatno:''
    }
  ]);

  useEffect(() => {

    BookedSeats();

  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const currentmovie = location.state.currentmoviename;
  // let currentmovie = location.state.currentmoviename;
  
  
   const BookedSeats = async () => {
    axios.get('http://localhost:8080/api/test/booking/allbookings').then((response)=>{
      setBookedSeats(response.data);
  // movies[0].name=response.data[0].movieName;
      movies[0].name=currentmovie;
      console.log(movies[0].name);
      console.log(response.data);
      movies[0].occupied=[];
    for(let i=0; i<response.data.length;i++)
    {
      if(currentmovie==response.data[i].movieName)
      {
        movies[0].occupied.push(response.data[i].seatno)
      }
      
    }
   })}
      
   
   

  
  console.log(currentmovie);
  const dynamicStringSpan = `${currentmovie}`
  // const dynamicStringSpan = <span> {`${currentmovie}`} </span>
   const [selectedMovie, setSelectedMovie] = useState(movies[0])
   const [selectedSeats, setSelectedSeats] = useState([])
   //const [selectedDate, setSelectedDate] = useState()
   //console.log(selectedDate);

  console.log(selectedSeats);
  // get userId
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser.username);
 //Date
 const pastdate=new Date();
 var tdate;
 var tmonth;
 var tyear=pastdate.getFullYear();
 if(pastdate.getDate()<10){
   tdate="0"+pastdate.getDate()
 }
 else{
   tdate=pastdate.getDate()
 }
 if(pastdate.getMonth()<10){
   tmonth="0"+(pastdate.getMonth()+1)
 }
 else{
   tmonth=pastdate.getMonth()+1
 }

  const currdate=tyear+"-"+tmonth+"-"+tdate;
  const [NewDate, setUser] = useState({
  date:''});
const { date } = NewDate;
console.log(date);

const onInputChange = (e) => {

setUser({ ...NewDate, [e.target.name]: e.target.value });

};

  // const [bookmovie] = [
  //   {
  //     username: currentUser.username,
  //     movieName: currentmovie,
  //     price: 100,
  //     seatno: selectedSeats,
  //     //seatno: 63,
  //     date:Date.date
  //   }
  //   ];
    // console.log(bookmovie.seatno[0]);
    // console.log(bookmovie.seatno[1]);
    // console.log(bookmovie.seatno.length);
    

  


    const onSubmit = async (e) => {
      e.preventDefault();
      for(let i=0; i<selectedSeats.length; i++)
      {
        const [singleseat] = [
          {
            username: currentUser.username,
            movieName: currentmovie,
            price: 100,
            seatno: selectedSeats[i],
            //seatno: 63,
            date:NewDate.date
          }
          ];
       await axios.post("http://localhost:8080/api/test/booking", singleseat);
       
      }
      alert("Ticket Booked Successfully");
       navigate("/")
     };

    // get 
    //  const [Bookedseats,setBookedSeats]=useState([
    //   {
    //     movieName : "",
    //     price:'',
    //     date:'',
    //     seatno:''
    //   }
    // ]);

    // useEffect(() => {

    //   BookedSeats();
  
    // }, []);

    //  const BookedSeats = async () => {
    //   axios.get('http://localhost:8080/api/test/booking/allbookings').then((response)=>{
    //     setBookedSeats(response.data);
    //      console.log(response.data);
    //  })}

 

 
 
   return (
     <div className="App">
       <Movies
         movie={selectedMovie}
         onChange={movie => {
           setSelectedSeats([])
           setSelectedMovie(movie)
         }}
       />

        <p>{dynamicStringSpan}</p>

        

       <div className="form-outline mb-4">
        <input type="date" name="date" min={currdate} value={date} onChange={(e) => onInputChange(e)} class="form-control form-control-lg"/>
       </div>

       
      
       <Cinema
         movie={selectedMovie}
         selectedSeats={selectedSeats}
         onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
       />
        <ShowCase />
       <p className="info">
         You have selected <span className="count">{selectedSeats.length}</span>{' '}
         seats for the price of{' '}
         <span className="total">
           {selectedSeats.length * selectedMovie.price} ₹ 
         </span>
       </p>

       <div className="d-flex justify-content-end pt-3">

                  {/* <button type="button" class="btn btn-light btn-lg">Reset all</button> */}

                  <button type="submit" onClick={(e) => onSubmit(e)} class="btn btn-warning btn-lg ms-2" 
                  style={{'backgroundColor':'#7bc47f','border':'none',width:'150px'}}>Book</button>

                </div>
     </div>

   )
 }
 
 function Movies({ movie, onChange }) {
 
   return (
     <div className="Movies">
       {/* <label htmlFor="movie">Pick a movie</label> */}
       <div></div>
       {/* <select
         id="movie"
         value={movie.name}
         onChange={e => {
           onChange(movies.find(movie => movie.name === e.target.value))
         }}
       >
         {movies.map(movie => (
           <option key={movie.name} value={movie.name}>
             {movie.name} - {movie.price} ₹
           </option>
         ))}
       </select> */}
     </div>
   )
 }




 
 function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
   function handleSelectedState(seat) {
     const isSelected = selectedSeats.includes(seat)
     if (isSelected) {
       onSelectedSeatsChange(
         selectedSeats.filter(selectedSeat => selectedSeat !== seat),
       )
     } else {
       onSelectedSeatsChange([...selectedSeats, seat])
     }
   }
 
   return (
     <div className="Cinema">
       <div className="screen" style={{marginLeft:0}} />
 
       <div className="seats">
         {seats.map(seat => {
           const isSelected = selectedSeats.includes(seat)
           const isOccupied = movie.occupied.includes(seat)
           return (
             <span
               tabIndex="0"
               key={seat}
               className={clsx(
                 'seat',
                 isSelected && 'selected',
                 isOccupied && 'occupied',
               )}
               onClick={isOccupied ? null : () => handleSelectedState(seat)}
               onKeyPress={
                 isOccupied
                   ? null
                   : e => {
                       if (e.key === 'Enter') {
                         handleSelectedState(seat)
                       }
                     }
               }
             />
           )
         })}
       </div>
     </div>
   )

 }
 


 function ShowCase() {
    return (
      <ul className="ShowCase">
        <li>
          <span className="seat" /> <small>N/A</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    )
  }