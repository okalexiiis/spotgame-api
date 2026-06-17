"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemove = exports.createUpdate = exports.createCreate = exports.createGetById = exports.createList = void 0;
const createList = (model) => async (req, res) => {
    res.json(await model.findMany());
};
exports.createList = createList;
const createGetById = (model, idField) => async (req, res) => {
    const item = await model.findUnique({ where: { [idField]: req.params.id } });
    if (!item)
        return res.status(404).json({ status: 'error', message: 'Item not found' });
    res.json(item);
};
exports.createGetById = createGetById;
const createCreate = (model) => async (req, res) => {
    res.status(201).json(await model.create({ data: req.body }));
};
exports.createCreate = createCreate;
const createUpdate = (model, idField) => async (req, res) => {
    res.json(await model.update({ where: { [idField]: req.params.id }, data: req.body }));
};
exports.createUpdate = createUpdate;
const createRemove = (model, idField) => async (req, res) => {
    await model.delete({ where: { [idField]: req.params.id } });
    res.status(204).send();
};
exports.createRemove = createRemove;
//# sourceMappingURL=catalogos.controller.js.map