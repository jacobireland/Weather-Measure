import { CiSearch } from "react-icons/ci";
import { useState, ChangeEvent } from "react";

const Home = (): JSX.Element => {

    const [location, setLocation] = useState('')

    const inputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value)
        
    }

    return (
        <section className="flex flex-col w-full max-w-[350px] md:max-w-[700px]
        xl:max-w-[800px] h-full justify-center items-center
        text-center px-[4vh]">
            <h1 className="text-neutral-100 text-[2.5rem]/8 
            md:text-[5rem]/[4.5rem] 2xl:text-[6rem] text-center font-light">
                Weather<span className="font-bold">Measure</span>
            </h1>
            <p className="text-sm md:text-xl text-neutral-200 
            my-[2rem]">
                Enter a location to see the current weather forecast, and
                how it's changed over the years.
            </p>
            <div className="flex flex-row items-center bg-white rounded
            p-[5px]">
                <input
                type="text"
                value={location}
                onChange={inputChange}
                className="h-[3vh] w-[60vw] md:max-w-[500px] z-auto pl-[4px]
                mr-[4px]"
                />
                <button className="">
                    <CiSearch className="text-blue-700 text-[1rem] 
                    md:text-[2vh] hover:scale-125"/>
                </button>
            </div>

        </section>
    )
  }
  
  export default Home;