import { CiSearch } from "react-icons/ci";
import { useState, ChangeEvent } from "react";

const Home = (): JSX.Element => {

    const [location, setLocation] = useState<string>('')
    const [options, setOptions] = useState<[]>([])
    const [results, setResults] = useState<any>({})

    let limit = 5
    const fetchSearchOptions = (value:string) => {
        fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${value}
            &limit=${limit}&access_token=pk.eyJ1IjoiamFjb2JpcmVsYW5kIiwiYSI6ImNsemhyYmt3YTA4YW4ycXE4Mm81cm5tc2UifQ.4QHayx7BzuL4AYXv2HDXtg`
        )
        .then((res) => res.json())
        .then((data) => setResults(data))

    }

    const inputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const loc = e.target.value
        setLocation(loc)
        if (loc.trim() === '') return
        console.log('search: ' + loc)
        fetchSearchOptions(loc)
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