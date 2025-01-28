import { v4 as uuidv4 } from 'uuid';
import { findAll, create, findByPk } from '../models/gadget.js';

export async function getAllGadgets(req, res) {
    const { status } = req.query;
    const where = status ? { status } : {};
    const gadgets = await findAll({ where });

    const result = gadgets.map((gadget) => ({
        ...gadget.dataValues,
        successProbability: `${Math.floor(Math.random() * 100) + 1}%`,
    }));

    res.json(result);
}
export async function addGadget(req, res) {
    const { name } = req.body;
    const gadget = await create({
        id: uuidv4(),
        name,
    });

    res.status(201).json(gadget);
}
export async function updateGadget(req, res) {
    const { id } = req.params;
    const updates = req.body;

    const gadget = await findByPk(id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });

    await gadget.update(updates);
    res.json(gadget);
}
export async function decommissionGadget(req, res) {
    const { id } = req.params;

    const gadget = await findByPk(id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });

    await gadget.update({ status: 'Decommissioned', decommissionedAt: new Date() });
    res.json({ message: 'Gadget decommissioned', gadget });
}
export async function selfDestruct(req, res) {
    const { id } = req.params;
    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const gadget = await findByPk(id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });

    await gadget.update({ status: 'Destroyed' });
    res.json({ message: 'Self-destruct sequence initiated', confirmationCode });
}
