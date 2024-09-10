import toast from "react-hot-toast";
import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

import Cookies from "universal-cookie";

export const createAuthCookie = (
  cookieName: string,
  cookieValue: any
): void => {
  const cookies = new Cookies();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  cookies.set(cookieName, cookieValue, {
    expires,
    path: "/",
    sameSite: "strict",
    secure: true,
  });
};

export const readAuthCookie = (cookieName: string): any => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
};

export const clearAuthClear = (cookieName: string): void => {
  const cookies = new Cookies();
  cookies.remove(cookieName);
};

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

export const Capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function numberWithCommas(x: number | string) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const goBack = () => {
  window.history.back();
};

export const formatCreatedAt = (date: Date): string => {
  const createdAt = date;
  const now = new Date();

  const hoursDiff = differenceInHours(now, createdAt);
  const minutesDiff = differenceInMinutes(now, createdAt);
  const daysDiff = differenceInDays(now, createdAt);
  const weeksDiff = differenceInWeeks(now, createdAt);

  if (hoursDiff < 1) {
    if (minutesDiff < 1) {
      return "Just now";
    } else if (minutesDiff < 2 && minutesDiff >= 1) {
      return `${minutesDiff} m`;
    } else {
      return `${minutesDiff} m`;
    }
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  } else if (daysDiff <= 7) {
    return `${daysDiff}d`;
  } else {
    return `${weeksDiff}w`;
  }
};

export function dataURLtoFile(dataUrl: string): File {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const fileName = "profile_picture";
  return new File([u8arr], fileName, { type: mime });
}
