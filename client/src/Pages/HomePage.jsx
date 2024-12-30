import Wave from '../assets/bg.png'
import TextField from '@mui/material/TextField';
import Button from '../components/common/Button';
import ProductCard from '../components/product/ProductCard';
import FeaturedProduct from '../components/product/FeaturedProduct';
import useFetch from '../hooks/useFetch'

const HomePage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl)

    const { data, loading, error } = useFetch(`${apiUrl}/api/product/getLatestProduct`)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return ( 
        <div>
            <section
                id="hero-section"
                className="relative flex flex-col items-center justify-center h-[500px] md:h-[700px] bg-cover bg-center text-white text-center"
                style={{ backgroundImage: `url(${Wave})`, backgroundAttachment: 'fixed' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

                <div className="text-center relative z-20 flex flex-col leading-none">
                    <h1 className="text-3xl mb-3 sm:text-6xl md:text-7xl font-AbrilFatface">Embrace Your Style</h1>
                    <h6 className="text-sm sm:text-2xl">Discover the latest trends in women's fashion</h6>
                    
                    <a className="mt-6 sm:mt-14 self-center" href='/products'>
                        <Button text='SHOP NOW'/>
                    </a>
                </div>
            </section>
            

            <section className="p-8 sm:p-14 bg-gray-50 flex items-center justify-center">
                <FeaturedProduct data={data}/>
            </section>
  
            <section className=" bg-cover bg-center text-white text-center"
            style={{ backgroundImage: `url(${Wave})`, backgroundAttachment: 'fixed' }}>
          <div className=" bg-black bg-opacity-50 z-10 p-10">
                <div className="latest-product-container flex flex-col justify-center items-center relative">
                    <h2 className="text-4xl font-bold mb-6 text-white text-center">About Us</h2>
                <p className="text-lg text-white leading-relaxed text-center max-w-2xl mx-auto">
                    We are passionate about offering high-quality products that meet your needs and expectations. Our team is dedicated to providing excellent service and a seamless shopping experience.
                </p>
                </div>
                </div>

            </section>


            <section className="bg-white flex flex-col items-center p-10 rounded-lg w-full shadow-lg" id="contact-us">
                <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center" >Contact Us</h2>
                    <form className='flex flex-col w-full md:w-1/2 items-center justify-center gap-4'>
                        <TextField label="email" fullWidth />
                        <TextField
                        id="outlined-multiline-flexible"
                        label="message"
                        multiline
                        maxRows={4}
                        minRows={6} 
                        fullWidth
                        />
                        <Button type="submit" text='send'/>
                    </form>
            </section>
        </div>
    );
}
 
export default HomePage;