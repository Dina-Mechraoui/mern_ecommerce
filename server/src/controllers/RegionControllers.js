import Region from '../models/Region.js';

const addRegion = async (req, res) => {
    try {
        const { name, shippingRate } = req.body;
        const newRegion = new Region({ name, shippingRate });

        await newRegion.save();

        res.status(201).json({ message: 'Region added successfully', newRegion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();

    if (!regions) {
      return res.status(404).json({ message: 'No regions found' });
    }
    res.status(200).json({ regions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const calculateShippingRate = async (regionId, shippingMethod) => {
  try {
    const region = await Region.findById(regionId);

    if (!region) {
      throw new Error('Region not found');
    }

    const shippingOption = region.shippingRate.find(option => option.type === shippingMethod);

    if (!shippingOption) {
      throw new Error('Invalid shipping method');
    }

    return shippingOption.price;
  } catch (error) {
    throw new Error(`Error calculating shipping rate: ${error.message}`);
  }
};

export {addRegion, getRegions, calculateShippingRate}