import { ReactNode } from "react";
import { Dimensions, Platform, ViewStyle } from "react-native";
import { useNavigationMode } from "react-native-navigation-mode";
import { Linking } from "react-native";
import ReactNativeBlobUtil, {
  ReactNativeBlobUtilConfig,
} from "react-native-blob-util";

import { TSnackbarVariant } from "@/types";
// import RNFetchBlobUtil, { ReactNativeBlobUtil } from 'react-native-blob-util'
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid } from "react-native";
import { setMessage } from "@/redux/slices/AuthSlice";
import { store } from "@/redux/store/store";
import { API_BASE_URL } from "./api";
import dayjs from "dayjs";
// Avoid calling React hooks at module scope. Use the Redux store token when
// making non-component requests.

export const deviceHeight = Dimensions.get("screen").height;
export const deviceWidth = Dimensions.get("screen").width;
export const isMobile: boolean = deviceWidth <= 480 ? true : false;
export const isSmallDeviceWidth: boolean = deviceWidth <= 375 ? true : false;

export const isTablet: boolean = deviceWidth >= 600 ? true : false;

export const isSmallDevice = deviceWidth <= 375;

export const rs = (small: number, normal: number, tablet: number): number => {
  if (isTablet) return tablet;
  if (isSmallDevice) return small;
  return normal;
};

export const APP_URL = "https://appuat.sponsicore.com/API/App/Employee";

export enum ErrorMessage {
  NETWORK_ERROR = "Network Error!. Please try again later.",
  FRONTEND_ERROR = "Something went wrong. Please try again later.",
}

export const bytesToMB = (bytes: number, decimals = 2): string => {
  if (!bytes || bytes <= 0) return "0 MB";

  const mb = bytes / (1024 * 1024);

  if (mb < 1) {
    return `${(mb * 1024).toFixed(decimals)} KB`;
  }

  return `${mb.toFixed(decimals)} MB`;
};

export const openLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (err) {
    console.warn("Can't open URL:", url);
  }
};

export const openUrl = (url: string) => {
  if (!url) return "";
  const lower = url.toLowerCase();
  const isDoc =
    lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx");

  return isDoc ? `https://docs.google.com/gview?embedded=true&url=${url}` : url;
};

export const formatFileName = (name: string, limit = isTablet ? 50 : 20) => {
  if (!name) return "";

  const dotIndex = name.lastIndexOf(".");

  if (isTablet && name.length > 20) {
    return name.length > limit ? name.slice(0, limit + 80) : name;
  }

  if (dotIndex === -1) {
    return name.length > limit ? `${name.slice(0, limit)}...` : name;
  }

  const ext = name.slice(dotIndex);
  const base = name.slice(0, limit);

  return name.length > limit ? `${base}...${ext}` : name;
};

export const formatText = (name: string, limit?: number) => {
  if (!name) return "";

  if (!limit) return name;

  if (isTablet && name.length > 20) {
    return name.length > limit ? name.slice(0, limit + 80) : name;
  }

  const base = name.slice(0, limit);

  return name.length > limit ? `${base}...` : name;
};

export const getInitials = (name: string, singleCharacter: boolean = false) => {
  if (singleCharacter) {
    return name[0];
  } else {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
};

export const formatLargeNumber = (
  num: number | undefined,
  digits: number = 2,
) => {
  if (num === null || num === undefined || isNaN(num)) return "0";

  const n = Number(num);

  if (n < 1000000) {
    return Math.floor(n).toString();
  }

  const lookup = [
    { value: 1e6, symbol: " Million" },
    { value: 1e9, symbol: " Billion" },
    { value: 1e12, symbol: " Trillion" },
    { value: 1e15, symbol: " Quadrillion" },
    { value: 1e18, symbol: " Quintillion" },
    { value: 1e21, symbol: " Sextillion" },
    { value: 1e24, symbol: " Septillion" },
    { value: 1e27, symbol: " Octillion" },
    { value: 1e30, symbol: " Nonillion" },
    { value: 1e33, symbol: " Decillion" },
  ];

  let item = lookup.find((unit) => n / unit.value < 100);

  if (!item) {
    item = lookup[lookup.length - 1];
  }

  const rawValue = n / item.value;

  const result = parseFloat(rawValue.toFixed(digits)).toString();

  return `${result}${item.symbol}`;
};

export const minutesToHours = (minutes?: number): string => {
  if (!minutes || minutes <= 0) return "00:00";

  const totalMinutes = Math.floor(minutes);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

export const handleDate = (
  date: string | Date | number | undefined | null,
  format?: string,
  useBST: boolean = false,
  placeholder?: string,
) => {
  if (
    !date ||
    date === "0001-01-01T00:00:00" ||
    date === "0001-01-01T00:00:00Z"
  ) {
    return placeholder || "";
  }

  let dateObj: Date;

  if (typeof date === "string") {
    const hasTimezone = date.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(date);

    dateObj = new Date(hasTimezone ? date : `${date}Z`);
  } else {
    dateObj = new Date(date);
  }

  if (isNaN(dateObj.getTime())) {
    return placeholder || "";
  }

  if (useBST) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formatter.format(dateObj).toUpperCase();
  }

  return dayjs(dateObj).format(format);
};

export const DashboardFormatDuration = (second: number) => {
  const hours = Math.floor(second / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((second % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((second % 60) / 1)
    .toString()
    .padStart(2, "0");
  return { hours, minutes, seconds };
};

export const formatDuration = (
  minutes?: number | null,
  placeholder = "00:00:00",
) => {
  if (minutes === null || minutes === undefined || minutes <= 0) {
    return placeholder;
  }

  const totalSeconds = Math.floor(minutes * 60);

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const getNavigationBarHeight = () => {
  const { navigationMode } = useNavigationMode();
  return navigationMode?.navigationBarHeight || 0;
};

// export const SafeAreaProvider = ({ children, wrapperStyle, statusBar = true, navigationBar = true }: { statusBar?: boolean, navigationBar?: boolean, children: ReactNode, wrapperStyle?: ViewStyle }) => {
//     // <StatusBar barStyle={'dark-content'} />
//     const height = getNavigationBarHeight()
//     console.log(StatusBar?.currentHeight, height)
//     return (<View style={[wrapperStyle, { marginTop: statusBar ? Platform?.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) : 0, marginBottom: navigationBar ? Platform?.OS === 'ios' ? 20 : height : 0 }]}>
//         {children}
//     </View>)
// }

// export const SafeAreaProvider = ({
//     children,
//     wrapperStyle,
//     statusBar = true,
//     navigationBar = true,
// }: {
//     statusBar?: boolean;
//     navigationBar?: boolean;
//     children: ReactNode;
//     wrapperStyle?: ViewStyle;
// }) => {
//     return (
//         <SafeAreaView
//             style={[{}, wrapperStyle]}
//         // edges={[
//         //     ...(statusBar ? ["top"] : []),
//         //     ...(navigationBar ? ["bottom"] : []),
//         // ]}
//         >
//             {children}
//         </SafeAreaView>
//     );
// };

export const formatAddress = (address?: any) => {
  if (!address) return "-";

  const { addressLine1, addressLine2, city, postcode, country } = address;

  return [addressLine1, addressLine2, city, postcode, country]
    .filter(Boolean)
    .join(", ");
};

export const showMessage = (message: string, variant?: TSnackbarVariant) => {
  store.dispatch(
    setMessage({
      message: message,
      messageStatus: true,
      snackbarVariant: variant,
    }),
  );
  setTimeout(() => {
    store.dispatch(
      setMessage({
        message: "",
        messageStatus: false,
        snackbarVariant: "success",
      }),
    );
  }, 4000);
};

const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== "android") return true;

  const androidVersion = Platform.Version as number;

  try {
    if (androidVersion >= 33) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }

    if (androidVersion >= 29) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "App needs access to storage to download files.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
};

const saveToGallery = async (
  filePath: string,
  mimeType: string,
): Promise<boolean> => {
  const isImage = mimeType.startsWith("image/");

  if (!isImage) return false;

  try {
    await CameraRoll.saveAsset(`file://${filePath}`, {
      type: "photo",
      album: "Downloads",
    });
    return true;
  } catch (err) {
    console.warn("CameraRoll save failed:", err);
    return false;
  }
};

// export const downloadAttachment = async (
//   id: string,
//   file: any,
//   callback?: () => void,
// ) => {
//   const hasPermission = await requestStoragePermission();

//   if (!hasPermission) {
//     showMessage("Storage permission denied", "error");
//     callback?.();
//     return;
//   }

//   try {
//     const mimeType: string =
//       file?.docs?.contentType || "application/octet-stream";

//     const extension = mimeType.split("/")?.[1]?.toLowerCase() || "pdf";

//     const cleanName = (
//       file?.docs?.name ? `Sponsicore_${file.docs.name}` : "Sponsicore_file01"
//     )
//       .replace(/[^\w\s.-]/gi, "")
//       .replace(/\s+/g, "_");

//     const fileName = `${cleanName}.${extension}`;

//     const url = `${API_BASE_URL}/Profile/DownloadDocument/${id}`;

//     const isMedia =
//       mimeType.startsWith("image/") || mimeType.startsWith("video/");

//     const androidPath = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${fileName}`;

//     const configOptions: ReactNativeBlobUtilConfig = {
//       fileCache: true,

//       ...(Platform.OS === "android"
//         ? isMedia
//           ? {
//               path: androidPath,
//             }
//           : {
//               addAndroidDownloads: {
//                 useDownloadManager: true,
//                 notification: true,
//                 mediaScannable: true,
//                 title: fileName,
//                 description: "Downloading file",
//                 mime: mimeType,
//                 path: androidPath,
//               },
//             }
//         : {
//             path: `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`,
//           }),
//     };

//     // const token = store.getState()?.auth?.token || "";

//     const response = await ReactNativeBlobUtil.config(configOptions).fetch(
//       "GET",
//       url,
//       {
//         Authorization: `Bearer ${getToken}`,
//       },
//     );
//     console.log(response);
//     if (!response || !response.data) {
//       showMessage("Download failed", "error");
//       return;
//     }

//     const filePath = response.path();

//     if (isMedia) {
//       const saved = await saveToGallery(filePath, mimeType);

//       if (saved) {
//         if (Platform.OS === "android") {
//           await ReactNativeBlobUtil.fs.unlink(filePath).catch(() => {});
//         }
//         showMessage("Saved to gallery successfully", "success");
//       } else {
//         showMessage("Document downloaded successfully", "success");
//       }
//     } else {
//       showMessage("Document downloaded successfully", "success");
//     }
//   } catch (err: any) {
//     console.log("Download error:", err);
//     showMessage(err?.message || "Download failed", "error");
//   } finally {
//     callback?.();
//   }
// };
