import { Outlet } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <main className="flex justify-center items-center h-full w-full 
	bg-gradient-to-br from-teal-400 via-sky-500 to-indigo-500">
        <Outlet/>
    </main>
  )
}

export default App;
