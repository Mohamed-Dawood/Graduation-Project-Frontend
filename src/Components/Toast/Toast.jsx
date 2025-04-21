'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'default', duration = 3000) => {
  toast(message, {
    type,
    autoClose: duration,
    position: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
};

function ToastContainerWrapper() {
  return <ToastContainer />;
}

export default ToastContainerWrapper;
