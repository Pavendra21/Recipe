import React from 'react';
import Category from './Category_Data';
import {Link} from 'react-router-dom'
 
const Cards = () => {
 
  return (
    <>
    
      <div className='container  py-1 ' id='categories'>
       
        <section className="text-gray-900 body-font my-5">
        <p className=' centre Link' >Categories</p>
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {Category.map((item) => (
                <div className="p-4 md:w-1/3" key={item.id}>
                  <Link to={`/Cards/${item.id}/${item.title}`}>
                  <div className="h-full border-2 border-gray-900   rounded-lg overflow-hidden">
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.imageUrl} alt={item.title} />
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3 Link">{item.title}</h1>
                      <p className="leading-relaxed mb-3">{item.description}</p>
                      <div className="flex items-center flex-wrap">
                         
                        <p className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" to="Allrecipes">  Visit Category</p> 
                          
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                          
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Cards;
