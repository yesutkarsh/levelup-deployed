import React from 'react'
import BannerCard from '../P2P/components/BannerCard'
import {NewsUpdate} from "../../components/NewsUpdate/NewsUpdate";


export default function page():React.ReactElement{
  return (
    <>
  
    <div>
    <BannerCard/>
    <NewsUpdate/>
    </div>
    </>
  )
};
