import { toast } from 'react-toastify';

const notifySetting = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const notifySuccess = message => toast.success(`${message}`, notifySetting);
export const notifyError = error => toast.error(`${error}`, notifySetting);
