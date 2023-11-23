import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post('auth/login', {
            email: email,
            password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    try {
        const res = await httpRequest.post('auth/logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
