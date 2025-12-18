const ChipPackage=({packageId})=>{
    return <>
        {packageId===0&&<div className="py-1 px-4 bg-gradient-to-r from-gray-400 to-sky-500 rounded-full flex items-center justify-center text-white font-medium">
            Free Tire
        </div>}
        {packageId===1&&<div className="py-1 px-4 bg-gradient-to-r from-gray-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            Standard
        </div>}
        {packageId===2&&<div className="py-1 px-4 bg-gradient-to-r from-gray-400 to-orange-500 rounded-full flex items-center justify-center text-white font-medium">
            Premium
        </div>}
        {packageId===3&&<div className="py-1 px-4 bg-gradient-to-r from-gray-400 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
            Super Vip
        </div>}
    </>
}

export default ChipPackage