import { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
const FilterBar = ({ filters, onFilterChange }) => {
    const handleCategoryChange = (event) => {
        onFilterChange("category", event.target.value);
    };

    return (
        <div>
            <div className="hidden lg:flex lg:flex-col pl-14 w-80 pt-14 rounded-md">
                <h1 className="text-lg font-bold border-b-2 p-2 border-[#FF8A3E] w-full mb-4">
                    Filter Options
                </h1>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold">Category</h3>
                    {["All", "dress", "jacket"].map((cat) => (
                        <label key={cat} className="flex w-fit items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value={cat}
                                checked={filters.category === cat}
                                onChange={handleCategoryChange}
                                className="accent-[#FF8A3E] cursor-pointer"
                            />
                            <span
                                className={`text-left ${
                                    filters.category === cat ? "text-[#FF8A3E] font-semibold" : "text-gray-700"
                                }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="bg-white lg:hidden p-4 rounded-lg shadow-md">
                <h2 className="text-sm font-semibold mb-4">Filter Options</h2>
                <TextField
                    select
                    value={filters.category}
                    onChange={handleCategoryChange}
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="dress">Dress</MenuItem>
                    <MenuItem value="jacket">Jacket</MenuItem>
                </TextField>
            </div>
        </div>
    );
};

export default FilterBar;

