import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const ProductDetailsPage = () => {
    const {id} = useParams()
    console.log(id)
    const {data, loading, error} = useFetch(`http://localhost:3000/api/product/getProduct/${id}`)
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No product found.</div>;
    }
    console.log(data)
    return ( 
        <div>
            {data.name}
        </div>
     );
}
 
export default ProductDetailsPage;