import toast from "react-hot-toast";

export const toastOptions = {
  duration: 6000,
  style: {
    background: "#353434",
    color: "#fff",
  },
};

export const promiseErrorFunction = (error: any) => {
  if (error?.response?.data?.detail[0].msg) {
    return toast.error(`${error?.response?.data?.detail[0].msg}`, toastOptions);
  } else if (error?.response?.data?.detail) {
    return toast.error(`${error?.response?.data?.detail}`, toastOptions);
  } else if (error.message) {
    return toast.error(`${error.message}`, toastOptions);
  } else {
    return toast.error(`Internal Server Error! Contact support`, toastOptions);
  }
};
