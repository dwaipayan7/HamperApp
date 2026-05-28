import { showSnackbar } from "@/redux/slices/snackbarSlice";
import { store } from "@/redux/store/store";
import { useAuth } from "@clerk/expo";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";

// const API_BASE_URL = "http://192.168.1.50:3000/api";

export const API_BASE_URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

export interface IApiResponse<T = any> {
  status: boolean;
  result: T;
  message?: string;
  errors?: {
    number: number;
    message: string;
    suggestion: string;
    exception: any;
  }[];
}

// export const createApiClient = (getToken: any): AxiosInstance => {
//   const api = axios.create({
//     baseURL: API_BASE_URL!.trim(),
//   });

//   api.interceptors.request.use(async (config) => {
//     const token = await getToken();
//     console.log("TOKEN =>", token);
//     console.log("API REQUEST =>", config.baseURL, config.url, config.method);
//     console.log("AUTH HEADER =>", token ? `Bearer ${token}` : "no-token");

//     console.log("TOKEN => ", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log("FINAL HEADERS =>", config.headers);
//     }

//     return config;
//   });

//   return api;
// };

// export const useApiClient = (): AxiosInstance => {
//   const { getToken } = useAuth();
//   return createApiClient(getToken);
// };

export class ApiUtility {
  // dispatch = useDispatch();

  private static instance: ApiUtility;

  private api: AxiosInstance;

  // constructor(api: AxiosInstance) {
  //   this.api = api;
  // }

  private tokenGetter: (() => Promise<string | null>) | null = null;

  private constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL?.trim(),
      timeout: 30000,
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    //For Request
    this.api.interceptors.request.use(
      async (config) => {
        try {
          if (this.tokenGetter) {
            const token = await this.tokenGetter();

            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }

          console.log("API REQUEST =>", config.baseURL, config.url);

          return config;
        } catch (error) {
          return config;
        }
      },
      (error) => Promise.reject(error),
    );

    //For response
    this.api.interceptors.response.use(
      (response) => {
        // SUCCESS MESSAGE
        if (response?.data?.message) {
          store.dispatch(
            showSnackbar({
              message: response.data.message,
              variant: "success",
            }),
          );
        }

        return response;
      },

      async (error) => {
        let message = "Something went wrong";

        if (!error.response) {
          message = "Network error. Check internet connection.";
        } else {
          message =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error.message ||
            error;
        }

        store.dispatch(
          showSnackbar({
            message,
            variant: "error",
          }),
        );

        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): ApiUtility {
    if (!ApiUtility.instance) {
      ApiUtility.instance = new ApiUtility();
    }

    return ApiUtility.instance;
  }

  public setTokenGetter(getter: () => Promise<string | null>) {
    this.tokenGetter = getter;
  }

  syncUser() {
    return this.api.post("/users/sync");
  }

  getCurrentUser() {
    return this.api.get("/users/me");
  }

  updateProfile(data: any) {
    return this.api.put("/users/profile", data);
  }

  createPost(data: { content: string; image?: string }) {
    return this.api.post("/posts", data);
  }

  getPosts() {
    return this.api.get("/posts");
  }

  getUserPosts(username: string) {
    return this.api.get(`/posts/user/${username}`);
  }

  likePost(postId: string) {
    return this.api.post(`/posts/${postId}/like`);
  }

  deletePost(postId: string) {
    return this.api.delete(`/posts/${postId}`);
  }

  createComment(postId: string, content: string) {
    return this.api.post(`/comments/post/${postId}`, { content });
  }

  async get<T = IApiResponse>(
    endpoint: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.api.get<T>(endpoint, {
        params,
        ...config,
      });

      return response.data;
    } catch (error: any) {
      return error?.response?.data as T;
    }
  }

  async getResult<T = any>(endpoint: string, params?: any): Promise<T | null> {
    const data = await this.get<IApiResponse<T>>(endpoint, params);

    if (data?.status) {
      return data.result;
    }

    this.handleErrorResponse(data?.message, data?.errors);

    return null;
  }

  async post<T = IApiResponse>(
    endpoint: string,
    body: any,
    contentType?: string,
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};

      if (contentType) {
        config.headers = {
          "Content-Type": contentType,
        };
      }

      const response = await this.api.post<T>(endpoint, body, config);

      return response.data;
    } catch (error: any) {
      console.log(
        "API ERROR =>",
        error?.message,
        error?.code,
        error?.response?.status,
        error?.response?.data,
        error?.request,
      );
      return error?.response?.data as T;
    }
  }

  async delete<T = IApiResponse>(endpoint: string): Promise<T> {
    try {
      const response = await this.api.delete<T>(endpoint);

      return response.data;
    } catch (error: any) {
      return error?.response?.data as T;
    }
  }

  async postForm<T = IApiResponse>(endpoint: string, params: any): Promise<T> {
    const formData =
      params instanceof FormData
        ? params
        : (() => {
            const fd = new FormData();
            this.appendFormData(fd, params);
            return fd;
          })();

    try {
      const response = await this.api.post<T>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return error?.response?.data as T;
    }
  }

  private appendFormData(form: FormData, values: any, prefix = "") {
    if (typeof values !== "object" || values === null) {
      if (values && prefix) {
        form.append(prefix, values);
      }

      return;
    }

    for (const key in values) {
      const fieldName = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(values[key])) {
        values[key].forEach((el: any, i: number) => {
          this.appendFormData(form, el, `${fieldName}[${i}]`);
        });
      } else if (typeof values[key] === "object") {
        this.appendFormData(form, values[key], fieldName);
      } else if (values[key] != null) {
        form.append(fieldName, values[key]);
      }
    }
  }

  private handleErrorResponse(message: any, errors?: any) {
    console.warn("API Error:", message, errors);
  }
}

export default ApiUtility.getInstance();
