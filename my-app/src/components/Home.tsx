import { CiSearch } from "react-icons/ci";
import { useState, useEffect, ChangeEvent } from "react";
import { optionType } from "../types";

const Home = (): JSX.Element => {
    const [location, setLocation] = useState<optionType>({properties:{name:'',
        coordinates:{latitude:'', longitude:''}}})
    const [options, setOptions] = useState<any>({features:[{properties:{name:'',
        coordinates:{latitude:'', longitude:''}}}]})
    
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation({properties:{name: `${e.target.value}`,
            coordinates:{latitude:'', longitude:''}}})
        console.log('name: ' + location.properties.name)
        console.log('lat: ' + location.properties.coordinates.latitude)
        console.log('long: ' + location.properties.coordinates.longitude)
    }
    
    //get auto-complete search options from API call
    useEffect(() => {
        const fetchSearchOptions = async (value:string) => {
            const res = await 
            fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=`
                  + `${value}&limt=5&access_token=pk.eyJ1IjoiamFjb2JpcmVsYW`
                  + `5kIiwiYSI6ImNsemhyYmt3YTA4YW4ycXE4Mm81cm5tc2UifQ.4QHayx7B`
                  + `zuL4AYXv2HDXtg`
            )
            const data = await res.json()
            console.log(data)
            setOptions(data)
        }

        if (location.properties.name.trim() !== '') {
            fetchSearchOptions(location.properties.name.trim());
        } else {
            setOptions({features:[{properties:{name:'',
                coordinates:{latitude:'', longitude:''}}}]})
        }
    }, [location]);

    const onOptionSelect = (option:optionType) => {
        console.log(option)
        setLocation({properties:{name: option.properties.name,
            coordinates:{latitude:option.properties.coordinates.latitude,
            longitude:option.properties.coordinates.longitude}}})
    }

    const onSearchEnter = () => {

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
            p-[5px] relative">
                <input
                    type="text"
                    value={location.properties.name}
                    onChange={onInputChange}
                    className="h-[3vh] w-[60vw] md:max-w-[500px] z-auto pl-[4px]
                    mr-[4px]"
                />
                {location.properties.name ?
                    <ul className="absolute top-9 left-0 bg-white 
                    rounded-b-md">
                        {options['features'].map((option: optionType,
                        index : number) => (
                            <li key={option.properties.name + '-' + index}>
                                <button className="text-left text-sm w-full 
                                cursor-pointer hover:text-white 
                                hover:bg-slate-500 px-2 py-1" 
                                onClick={() => onOptionSelect(option)}>
                                    {option.properties.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                : <div/>}
                <button className="">
                    <CiSearch className="text-blue-700 text-[1rem] 
                    md:text-[2vh] hover:scale-125" onClick={() => 
                    onSearchEnter()}/>
                </button>
            </div>

        </section>
    )
  }
  
  export default Home;