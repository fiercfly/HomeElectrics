import React, {useRef } from 'react';

import { useSelector } from 'react-redux';
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import {GrPrevious} from 'react-icons/gr'
import {GrNext} from 'react-icons/gr'
import AllProduct from '../component/AllProduct';
import switchImage from '../asset/switchImage.png'
function Home(){
  const productData= useSelector ((state)=>state.product.productList)
  // console.log(productData)
  const homeProductCartList= productData.slice(0,4)

  //change it as per requirements**************
  const homeProductCartListVegetables= productData.filter(el=>el.category === "Switches", [])

  const loadingArray= new Array(4).fill(null)
  const loadingArrayFeature= new Array(10).fill(null)

const slideProductRef= useRef()
  const nextProduct=()=>{
    slideProductRef.current.scrollLeft += 200
  }

  const preveProduct=()=>{
    slideProductRef.current.scrollLeft -= 200
  }
  
  return ( 
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2 '>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Appliances</p>
            <img src={switchImage} alt='cycleKiPhoto' className='h-7'/>
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>Home Electric is now a <span className='text-red-600 text-'> Registered Brand</span></h2>
          <p className='py-3 text-base'>
          Home Electric and Appliances has rapidly risen in the electrical manufacturing industry. Starting just two years ago with basic electrical holders and SS combined, we've expanded our product range to include switch and sockets, modular metal boxes, fan boxes, light boxes, MCBs, distribution boxes, modular, and non-modular items. Our vision is to be one of India's leading electrical manufacturers, offering quality at an affordable price. Driven by innovation and a customer-centric approach, we pride ourselves on our commitment to excellence and rapid growth. Join us in our journey towards excellence.</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>


        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        { 
          homeProductCartList[0]?
           homeProductCartList.map((el) =>{
            return ( 
              <HomeCard
                key= {el._id}
                id= {el._id}
                image={el.image}
                price={el.price}
                name={el.name}
                category={el.category}
              
              />
            );
          })
          :
          loadingArray.map((el,index)=>{
            return <HomeCard key= {index+ "loading"} loading= {"Loading..."}/>
          })}
        </div>  
      </div>



      <div className=''>
        <div className='flex w-full items-center'>

          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Switches
          </h2>

          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
          </div>

        </div>
        
        <div className='flex gap-5 overflow-scroll scroll-smooth scrollbar-none transition-all' ref={slideProductRef}>
          {
            homeProductCartListVegetables[0]? homeProductCartListVegetables.map(el=>{
              return(
                <CardFeature
                  key= {el._id+"Switches"}
                  id= {el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              );
            })

            :

            loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index+ "cartLoading"}/>)
          }
          
        </div>
      </div>

      <AllProduct heading={"Your Product"}/>
  
    </div>
  );
};

export default Home