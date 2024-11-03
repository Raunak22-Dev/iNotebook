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
  }, [message, type]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
