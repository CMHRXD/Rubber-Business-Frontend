
export const GloablFilter = ({ filter, setFilter, placeholder }) => {
    
    return (
        <input type="text" placeholder={placeholder} name="filter" id="filter"
            className="bg-white text-black focus:outline-none rounded-lg w-full border-2 border-gray-300 hover:border-gray-900  text-center  p-2 text-lg" value={filter || ''} onChange={e => setFilter(e.target.value)} />

    )
}