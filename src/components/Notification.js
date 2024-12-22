import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message, type, trigger }) => {
  // Function to display the toast notification
  const notify = () => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'warning':
        toast.warn(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      default:
        break;
    }
  };

  // Trigger the notification every time `trigger` changes
  React.useEffect(() => {
    if (message && type) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Notification;
