import { useState } from "react";

const SideFilterBar = ({category}) => {
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div className="hidden bg-gray-50 lg:flex lg:flex-col p-3 w-80 md:p-14 shadow-md rounded-md">
            <h1 className="text-lg font-bold border-b-2 p-2 border-[#FF8A3E] w-full mb-4">Filter Options</h1>
            <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="all"
                        checked={category === "all"}
                        onChange={handleCategoryChange}
                        className="accent-[#FF8A3E] cursor-pointer"
                    />
                    <span
                        className={`text-left ${
                            category === "all" ? "text-[#FF8A3E] font-semibold" : "text-gray-700"
                        }`}
                    >
                        All Categories
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="dress"
                        checked={category === "dress"}
                        onChange={handleCategoryChange}
                        className="accent-[#FF8A3E] cursor-pointer"
                    />
                    <span
                        className={`text-left ${
                            category === "dress" ? "text-[#FF8A3E] font-semibold" : "text-gray-700"
                        }`}
                    >
                        Dress
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="jacket"
                        checked={category === "jacket"}
                        onChange={handleCategoryChange}
                        className="accent-[#FF8A3E] cursor-pointer"
                    />
                    <span
                        className={`text-left ${
                            category === "jacket" ? "text-[#FF8A3E] font-semibold" : "text-gray-700"
                        }`}
                    >
                        Jacket
                    </span>
                </label>
            </div>
        </div>
    );
};

export default SideFilterBar;
