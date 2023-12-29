import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

function App() {
	const [loading, setLoading] = useState(true)
	const [tours, setTours] = useState([])
	const [isError, setIsError] = useState(false)

	const removeTour = id => {
		const newTours = tours.filter(tour => tour.id !== id)
		setTours(newTours)
	}

	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await fetch(url)
			if (!response.ok) {
				// case for 'fetch' to handle '400th' & '500th' errors!
				setIsError(true)
				setIsFetching(false)
				return
			}
			const tours = await response.json()
			setLoading(false)
			setTours(tours)
			console.log(tours)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		)
	}
	if (isError) {
		return <h3>There was an error!</h3>
	}
	if (tours.length === 0) {
		return (
			<main>
				<div className='title'>
					<h2>no tours left</h2>
					<button className='btn' onClick={fetchData}>refresh</button>
				</div>
			</main>
		)
	}
	return (
		<main className='main'>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	)
}

export default App
