import React from 'react'
import BannerCard from '../P2P/components/BannerCard'
import {NewsUpdate} from "../../components/NewsUpdate/NewsUpdate";
import NewsScroller from "./components/NewsScroller";

export default function page():React.ReactElement{
  return (
    <>
  
    <div>
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '10px',
        // display: 'flex',
        // flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    <BannerCard/>
    <NewsUpdate/>
      </div>
    <NewsScroller/>
    </div>
    </>
  )
};
