import { useEffect, useState } from "react"
import CardBanner from "../../components/user/CardBanner"
import StoryCard from "../../components/user/story/StoryCard"
import { getTopTenView, getTopThreeView } from "../../services/api/user/Ranking"

const HomePage=()=>{ 
    return <div className="text-left"> 
        <div className="w-full grid md:grid-cols-3 sm:grid-col-2 grid-col-1   gap-10 mt-5 overflow-auto">
            <TopBanner /> 
        </div>
        <p className="mt-5 mb-5 text-xl text-violet-500 font-bold">🔥 Top view</p>
        <div className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid gap-5">
            <TopTenView/>
        </div>
         
    </div>
}


const TopBanner=()=>{
    const [topTenView,setTopTenView]=useState([])
    useEffect(()=>{
        getTopThreeView().then(v=>{
            setTopTenView(v)
        })
    },[])
    return <>
        {topTenView.map((v,index)=><CardBanner rank={index+1} story={v}/>)}
    </>
}


const TopTenView=()=>{
    const [topTenView,setTopTenView]=useState([])
    useEffect(()=>{
        getTopTenView().then(v=>{
            setTopTenView(v)
        })
    },[])
    return <>
        {topTenView.map(v=><StoryCard story={v}/>)}
    </>
}

export default HomePage