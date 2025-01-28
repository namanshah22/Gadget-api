import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define the Gadget Schema
const GadgetSchema = new Schema({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    status: { type: String, enum: ["Available", "Deployed", "Destroyed", "Decommissioned"], default: "Available" },
    decommissionedAt: { type: Date, default: null },
});

// Export the model
const Gadget = model("Gadget", GadgetSchema);

// Add custom methods for easier access
const findAll = async () => {
  return await Gadget.find();
};

const create = async (gadgetData) => {
  const gadget = new Gadget(gadgetData);
  return await gadget.save();
};

const findByPk = async (id) => {
  return await Gadget.findOne({ id });
};

// Export the methods
export { Gadget, findAll, create, findByPk };
