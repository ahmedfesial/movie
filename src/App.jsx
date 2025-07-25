import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import MovieDetails from './Components/movieDetails/movieDetails'

function App() {



  let data = createBrowserRouter([
    {path : '' , element : <Layout/> , children : [
      {path : '' , element : <Home/>},
      {path : 'MovieDetails/:movieId' , element : <MovieDetails/>},
    ]}
  ])


  return  <RouterProvider router={data}></RouterProvider>



}

export default App
