import * as httpRequest from '~/utils/httpRequest';

export const register = async (email, password) => {
    try {
        const res = await httpRequest.post('auth/register', {
            type: 'email',
            email: email,
            password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
