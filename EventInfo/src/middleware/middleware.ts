import { Request, Response, NextFunction } from 'express';

const removeIdField = (data: any): void => {
    if (Array.isArray(data)) {
        data.forEach(removeIdField);
    } else if (data && typeof data === 'object') {
        delete data._id;
        Object.values(data).forEach(removeIdField);
    }
};

export default function removeIdFromResponse(req: Request, res: Response, next: NextFunction): void {
    const originalJson = res.json;
    res.json = function (obj: any) {
        removeIdField(obj);
        return originalJson.call(this, obj);
    };
    next();
}
