import Home from './components/Home'
import Forecast from './components/Forecast';
import { fetchWeatherApi } from 'openmeteo';
import { useState } from "react";
import { Outlet } from 'react-router-dom';




const App = (): JSX.Element => {

  return (
    <main className="flex justify-center items-center h-[100vh] w-full 
	bg-gradient-to-br from-teal-400 via-sky-500 to-indigo-500">
        <Outlet/>
    </main>
  )
}

export default App;
