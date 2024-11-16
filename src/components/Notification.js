import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message, type }) => {
  // Function to trigger the toast notification
  const notify = () => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'warning') {
      toast.warn(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type ==="info"){
      toast.info(message)
    }
  };

  // Call notify to display the toast
  React.useEffect(() => {
    notify();
    // eslint-disable-next-line
  }, [message, type]);

  return (
    <div>
      <ToastContainer   position="top-right"
  autoClose={3000} // Auto-close after 3 seconds
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHove />
    </div>
  );
};

export default Notification;
