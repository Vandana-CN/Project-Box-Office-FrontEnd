// import React from 'react'
import './Book.css';
import logo from './logo192.png'
import React, {useEffect, useState} from "react"
import MovieSelector from "./MovieSelector"
import SeatAvailability from "./SeatAvailability"
import SeatMatrix from "./SeatMatrix"


import MovieContext from '../contexts/MovieContext'
import { Router } from 'react-router-dom'

const Book = () => {

    const [movies, EditMovies] = useState({
		movieNames: {
			"Bloodshot": 10,
			"The girl on the Train": 8,
			"The invisible Man": 11,
			"Onward": 12,
			"My Spy": 9
		},
		moviePrice: 10,
		totalSeats: 0,
		seatNumbers: []
	})

    return (
      
        <>
        
        <div>
            <h1>Hello</h1>
        </div>
        
        <div className="main container">
			<MovieContext.Provider value={{ movies, changeState: EditMovies }}>
				
				<MovieSelector />
				<SeatMatrix />
				<SeatAvailability />
				{/* <PriceCalculator /> */}
			</MovieContext.Provider>
		</div>
       
        </>
       
    );

   
   
}

export default Book
