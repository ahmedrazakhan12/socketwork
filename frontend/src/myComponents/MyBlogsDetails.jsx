import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { baseUrlImage, baseurl } from '../Api/BaseApi'
import Footer from '../components/Footer'
import Header from '../components/Header'

import axios from 'axios'
import { placeHolderImage } from '../utils/constants'
import './blogs.css'
const image = ''
export default function BlogDetails() {
    const [Blog, setBlog] = useState([])
    const [Busy, setBusy] = useState(false)
    const params = useParams();
    const searchParams = useSearchParams();



    useEffect(() => {
        axios.get(baseurl + '/view-blog/' + params?.id).then(_ => {
            // console.log(_?.data?.blog)
            console.log('params', params?.id, searchParams, 'params')
            setBlog(_?.data?.blog)
        })

    }, [])

    return (
        <>
            <Header />

            <div className="container" >
                <div className=" row">

                    <div className="col-lg-12">


                        <div class="container" style={{display: "flex", flexDirection: "column" }}>
                            <div className='mt-4' >

                                <img
                                    alt="Featured Post"
                                    className="w-full h-[400px] object-cover rounded-lg rounded"
                                    height={600}

                                    onError={(e) => e.target.src = placeHolderImage} src={`${baseUrlImage + Blog?.image || "https://dummyimage.com/600x400/c4c4c4/fff&text=No+Image+found"}`}

                                    style={{
                                        aspectRatio: "1200/600",
                                        objectFit: "cover",
                                    }}
                                    width={1200}
                                />

                            </div>

                            <div className="mt-5">

                                <h1 onClick={() => {
                                    axios.get(baseurl + '/view-blog/' + 8).then(_ => {
                                        console.log(_?.data?.blog)
                                    })
                                }}>{Blog && Blog?.title}</h1>

                                <p className='post-description' style={{height:'auto'}} dangerouslySetInnerHTML={{ __html:  Blog?.content }}></p>
                            </div>

                        </div>
                    </div>
                   

                </div>
            </div>
            <Footer />
        </>
    )
}
