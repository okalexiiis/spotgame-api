"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const errorHandler = (err, req, res, next) => {
    if (res.headersSent)
        return next(err);
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            return res.status(409).json({
                status: 'error',
                message: 'A record with this value already exists (Unique constraint failed)',
                target: err.meta?.target,
            });
        }
        if (err.code === 'P2025') {
            return res.status(404).json({
                status: 'error',
                message: 'Record not found',
            });
        }
    }
    console.error(`[Error] ${req.method} ${req.path}:`, err.message || err);
    if (process.env.NODE_ENV !== 'production' && err.stack)
        console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map