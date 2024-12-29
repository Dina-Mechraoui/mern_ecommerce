const Button = ({ text, type, py, px, onclick, disabled }) => {
    return ( 
        <button 
            type={type || ''}
            onClick={onclick}
            disabled={disabled}
            className={` ${px || 'px-10' } ${py || 'py-3' } bg-[#FF8A3E] rounded-md self-end text-white transition-all duration-300 ease-in-out hover:bg-[#ff822f] hover:shadow-lg`}
        >
            {text}
        </button>
    );
}

export default Button;
