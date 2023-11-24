import { createContext, useContext, useState } from 'react';

import * as LoginService from '~/services/loginService';
import { ModalContext } from '~/components/ModalProvider';

export const LoginContext = createContext();

function LoginProvider({ children }) {
    const [data, setData] = useState();
    const [showError, setShowError] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showErrorRegister, setShowErrorRegister] = useState(false);

    const contentModal = useContext(ModalContext);

    //data random user
    const [dataUser, setDataUser] = useState();

    const handleDeleteData = () => {
        setData(null);
    };

    const handleSetData = (data) => {
        setData(data);
    };

    const handleSetDataUser = (data) => {
        setDataUser(data);
    };

    const fetchApi = async (email, password) => {
        setLoading(true);
        const result = await LoginService.login(email, password);

        if (result) {
            setData(result.data);
            localStorage.setItem('token', result.meta.token);

            setShowError(false);
            setTimeout(() => {
                setLoading(false);
                contentModal.handleHideModal();
                setIsNotify(true);
            }, 2500);
            setTimeout(() => {
                setIsNotify(false);
            }, 2200);
        } else {
            setLoading(false);
            setShowError(true);
        }
    };

    const value = {
        data,
        dataUser,
        showError,
        isNotify,
        loading,
        showErrorRegister,
        setShowErrorRegister,
        setShowError,
        fetchApi,
        handleSetData,
        handleDeleteData,
        handleSetDataUser,
    };

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default LoginProvider;
