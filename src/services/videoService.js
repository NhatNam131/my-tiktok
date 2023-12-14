import * as httpRequest from '~/utils/httpRequest';

export const getVideoForYou = async (type, page) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailVideo = async (uuidVideo) => {
    try {
        const res = await httpRequest.get('videos/' + uuidVideo, {});
        return res.data;
    } catch (error) {
        console.log('errorGet A Video: ', error);
    }
};
