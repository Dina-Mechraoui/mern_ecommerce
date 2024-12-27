const Button = ({ text, type }) => {
    return ( 
        <button 
            type={type} 
            className="px-10 py-3 bg-[#FF8A3E] rounded-md self-end text-white transition-all duration-300 ease-in-out hover:bg-[#ff822f] hover:shadow-lg"
        >
            {text}
        </button>
    );
}

export default Button;
