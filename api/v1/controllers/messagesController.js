import Messages from '../models/Message.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../../../errors/not-found.js';
import Users from '../models/User.js';
import BadRequestError from '../../../errors/bad-request.js';

export const getRoomMesseges = async (req, res, next) => {
    try {
        const {
            params: { roomID },
        } = req;
        const messages = await Messages.find({ roomID });
        return res
            .status(StatusCodes.OK)
            .json({ success: true, nbHits: messages.length, messages });
    } catch (error) {
        next(error);
    }
};
export const sendMessage = async (req, res, next) => {
    try {
        const {
            user: { userID: senderID },
            body: { url },
        } = req;
        if (url) {
            const tempUrl = {
                public_id: Date.now().toString(),
                source: url,
            };
            req.body.url = tempUrl;
        }
        const message = await Messages.create({ ...req.body, senderID });
        return res.status(StatusCodes.OK).json({ success: true, message });
    } catch (error) {
        next(error);
    }
};

export const testMesseges = async (req, res, next) => {
    const {
        body: { roomID },
    } = req;
    try {
        // const message = await Messages.find({ roomID });
        const message = await Messages.aggregate([
            { $match: { roomID: '65326c4cc86248d59dab3e84' } },
        ]);
        // const message = await Messages.aggregate([
        //     {
        //         $project: {
        //             dayOfWeek: { $dayOfWeek: '$createdAt' },
        //             month: { $month: '$createdAt' },
        //             date: { $dayOfMonth: '$createdAt' },
        //             title: 1,
        //         },
        //     },
        //     {
        //         $group: {
        //             _id: '$date',
        //             // title: 1,
        //             // total: { $sum: 1 },
        //         },
        //     },
        // ]);
        return res
            .status(StatusCodes.OK)
            .json({ success: true, nbHits: message.length, message });
    } catch (error) {
        next(error);
    }
};
