import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [ scroll, SetScroll ] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("Fetched Data:", categoryProduct.data);

        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto px-10 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button className='bg-white rounded-full shadow-md m-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
        <button className='bg-white shadow-md rounded-full m-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
        
            { loading ? (
                loadingList.map((product, index)=>{
                    return(
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200'></p>
                                <div className='flex gap-3'>
                                    <p className='text-green-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                </div>
                                <button className='text-sm  text-white px-6 py-0.5 rounded-full p-1 animate-pulse bg-slate-200'></button>
                            </div>
                        </div>
                        ) 
                    })            
                ) : (
                data.map((product, index)=>{
                return(
                    <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex border border-slate-400'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                            <img src={product.productImage[0]} className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' alt=''/>
                        </div>
                        <div className='p-4 grid'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-green-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                            </div>
                            <button className='text-sm bg-purple-600 hover:bg-purple-700 text-white px-6 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                        </div>
                    </Link>
                    ) 
                })
                )
            }
        </div>
    </div>

  )
}

export default HorizontalCardProduct;