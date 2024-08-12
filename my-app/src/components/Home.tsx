import { CiSearch } from "react-icons/ci";
import { useState, useEffect, ChangeEvent } from "react";
import { optionType } from "../types";
import { useNavigate } from 'react-router-dom';
import { features } from "process";

const Home = (): JSX.Element => {
    const [location, setLocation] = useState<optionType>({properties:{name:'',
        full_address:'', coordinates:{latitude:'', longitude:''}}})
    const [options, setOptions] = useState<any>({features:[{properties:{name:'',
        full_address:'', coordinates:{latitude:'', longitude:''}}}]})
    
    // update location variable upon user input
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation({properties:{name: `${e.target.value}`, 
            full_address:`${e.target.value}`,
            coordinates:{latitude:'', longitude:''}}})
    }

    // for routing
    const navigate = useNavigate()
    
    // get auto-complete search options from API call
    useEffect(() => {
        const fetchSearchOptions = async (value:string) => {
            const res = await 
            fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=`
                  + `${value}&limt=5&access_token=pk.eyJ1IjoiamFjb2JpcmVsYW`
                  + `5kIiwiYSI6ImNsemhyYmt3YTA4YW4ycXE4Mm81cm5tc2UifQ.4QHayx7B`
                  + `zuL4AYXv2HDXtg`
            )
            const data = await res.json()
            setOptions(data)
        }

        // don't call API if input is empty
        if (location.properties.name.trim() !== '') {
            fetchSearchOptions(location.properties.name.trim());
        } else {
            setOptions({features:[{properties:{name:'',
                coordinates:{latitude:'', longitude:''}}}]})
        }

    }, [location]);

    // update location variable upon user selecting autofill option
    const onOptionSelect = (option:optionType) => {
        setLocation({properties:{name: option.properties.name,
            full_address: option.properties.full_address,
            coordinates:{latitude:option.properties.coordinates.latitude,
            longitude:option.properties.coordinates.longitude}}})
        
        setOptions({features:[{properties:{name:'', address:'',
            coordinates:{latitude:'', longitude:''}}}]})
    }

    // route to forecast page when user enters search
    const onSearchEnter = () => {
        if (options.features[0].properties.name === '') {
            console.log("Search bar empty")
            return
        }
        else if (location.properties.coordinates.latitude === '') {
            console.log("Nothing selected, choosing first option")
            let tLoc = {properties:{name:options.features[0].properties.name,
                full_address:options.features[0].properties.full_address,
                coordinates:{latitude:options.features[0].properties.coordinates
                .latitude, longitude:options.features[0].properties.coordinates.
                longitude}
            }}
            navigate('forecast', {state:{location:tLoc}})
        } else {
            navigate('forecast', {state:{location}})
        }
    }

    // allow user to enter search with 'Enter' key
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (location.properties.name !== '')
            onSearchEnter()
        }
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
                    value={location.properties.full_address}
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    className="h-[3vh] w-[60vw] md:max-w-[500px] z-auto pl-[4px]
                    mr-[4px]"
                />
                {location.properties.name.trim() ?
                    <ul className="absolute top-9 left-0 bg-white 
                    rounded-b-md">
                        {options['features'].map((option: optionType,
                        index : number) => (
                            <li key={option.properties.name + '-' + index}>
                                <button className="text-left text-sm w-full 
                                cursor-pointer hover:text-white 
                                hover:bg-slate-500 px-2 py-1" 
                                onClick={() => onOptionSelect(option)}>
                                    {option.properties.full_address}
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