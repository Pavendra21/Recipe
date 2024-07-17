 import { Link, useParams, useNavigate } from 'react-router-dom';
import Category from './Category_Data';
import { useEffect,useState } from 'react';
import axios from 'axios'



const Allrecipes = () => {
  const navigate = useNavigate();

  const { rcategory } = useParams();
  const [data, setData] = useState( [])
  const [recipeData, setRecipeData] = useState([])
  const [loading,setLoading]=useState( true)
const {id} = useParams()
 
 
 

useEffect(() => {
  const foundProduct = Category.find(p => p.id === id);
  
  setData(foundProduct);
 
  
}, [id]);


useEffect(() =>{
 
  
  const fetchData  = async () => {
    
    await axios.get(`http://localhost:8000/Allrecipes/${rcategory}`)
    .then((response) =>{
      
 
      setRecipeData(response.data)

      setLoading(false)
      
      
    }, [])

.catch((error) =>{
  console.log(error)
  
})

}
fetchData();

}, [rcategory])

const handleDelete = async (recipeId) => {
  try {
    await axios.delete(`http://localhost:8000/Allrecipes/${recipeId}`);
    setRecipeData(recipeData.filter(recipe => recipe._id !== recipeId));
    setLoading(true)
    navigate(`/`);
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

 

 
if (!Category) {
  return <div>Loading...</div>;
}

if (loading) {
  return <div>loading...</div>
}

 

  return (
     <>
     
     
     <section className="text-gray-600 body-font  bg">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font my-5 text-gray-900 Link">{ data.title} Recipes</h1>
        <Link to={`/Cards/${id}/Form`}>  
        <button type="button" className="btn btn-success">Add +</button>
        </Link>
      </div>
       
    </div>



    <div className="flex flex-wrap -m-4">
      { recipeData.map(recipe => (
              <Link to={`/allrecipes/${rcategory}/${recipe._id}`} key={recipe._id} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src={recipe.image} alt="content"/>
           <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{recipe.title}</h2>
           
 
                  <button onClick={() => handleDelete(recipe._id)} className="btn btn-danger ml-2">Delete</button>
        </div>
       
</Link>
      )) }
       
    </div>
  </div>
</section>
     
     
     </>
  )
}

export default Allrecipes
