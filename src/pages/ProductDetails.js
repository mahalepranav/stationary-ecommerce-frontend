import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [ data, setData ] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })

  const params = useParams()
  const [ loading, setLoading ] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [ activeImage, setActiveImage ] = useState("")

  const [ zoomImageCoordinate, setZoomImageCoordinate ] = useState({
    x : 0,
    y : 0
  })

  const [ zoomImage, setZoomImage ] = useState(false)

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

        {/**product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/**product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div 
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150' 
                    style={{
                      backgroundImage : `url(${activeImage})`,
                      backgroundRepeat : "no-repeat",
                      backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                      }}>
                  </div>
                </div>
              )
            }
          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el,index) => {
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL,index) => {
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/**product image */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 rounded-full capitalize w-full'></p>
              <h2 className='text-3xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse rounded-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 animate-pulse h-6 rounded-full w-full'></p>
            
              <div className='text-purple-600 flex items-center gap-1 bg-slate-200 h-6 rounded-full w-full'>
              </div>
            
              <div className='items-center gap-2 text-2xl lg:text-3xl font-medium my-1 bg-slate-200 h-6 animate-pulse w-full rounded-full'>
              </div>
            
              <div className='items-center gap-3 my-2 w-full'>
                <button className='h-6 bg-slate-200 animate-pulse rounded-full w-full'></button>
                <button className='h-6 bg-slate-200 animate-pulse rounded-full w-full'></button>
              </div>
            
              <div>
                <p className='text-slate-600 font-medium my-1 bg-slate-200 h-6 animate-pulse rounded-full w-full'></p>
                <p className='bg-slate-200 h-6 animate-pulse rounded-full w-full'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-purple-200 text-purple-600 px-2 rounded-full capitalize w-fit'>{data?.brandName}</p>
              <h2 className='text-3xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
            
              <div className='text-purple-600 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
            
              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                <p className='text-green-600'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{displayINRCurrency(data.price)}</p>
              </div>
            
              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-purple-600 rounded px-3 py-1 min-w-[120px] text-purple-600 font-medium hover:bg-purple-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                <button className='border-2 border-purple-600 rounded px-3 py-1 min-w-[120px] bg-purple-600 font-medium text-white hover:bg-white hover:text-purple-600' onClick={(e)=>handleAddToCart(e,data._id)}>Add To Cart</button>
              </div>
            
              <div>
                <p className='text-slate-600 font-medium my-1'>Description : </p>
                <p>{data?.description}</p>
              </div>
            </div>  
          )
        }
      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data.category} heading={"Recommended Product"}/>
        )
      }  
    </div>
  )
}

export default ProductDetails