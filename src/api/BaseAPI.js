import axios from "axios";

class Api {
    constructor() {
      this.axiosInstance = axios.create({
        baseURL: "http://localhost:3000",
      });
  
      this.cancelSource = axios.CancelToken.source();
    }
    cancelPreviousRequest() {
      this.cancelSource.cancel("Canceled due to new request"); 
      this.cancelSource = axios.CancelToken.source(); 
    }
    async get(
      endpoint,
      needAuth = false,
      isCanceled = false,
      customHeaders = {}
    ) {
      return this.request(
        "get",
        endpoint,
        null,
        needAuth,
        isCanceled,
        customHeaders
      );
    }
  
    async delete(
      endpoint,
      needAuth = false,
      isCanceled = false,
      customHeaders = {}
    ) {
      return this.request(
        "delete",
        endpoint,
        null,
        needAuth,
        isCanceled,
        customHeaders
      );
    }
  
    async post(
      endpoint,
      data,
      needAuth = false,
      isCanceled = false,
      customHeaders = {}
    ) {
      return this.request(
        "post",
        endpoint,
        data,
        needAuth,
        isCanceled,
        customHeaders
      );
    }
    async put(
      endpoint,
      data,
      needAuth = false,
      isCanceled = false,
      customHeaders = {}
    ) {
      // this.cancelPreviousRequest(); // отменяем предыдущий запрос
      return this.request(
        "put",
        endpoint,
        data,
        needAuth,
        isCanceled,
        customHeaders
      );
    }
  
    // Добавьте другие HTTP-методы по аналогии
  
    async request(
      method,
      endpoint,
      data,
      needAuth = false,
      isCanceled = false,
      customHeaders = {},
      retries = 10
    ) {
      let headers = { ...customHeaders };
      if (needAuth) {
        const token = localStorage.getItem("token");
        if (token === null) {
          throw new AuthRequiredError("Auth required");
        }
        headers.Authorization = `Token ${token}`;
      }
  
      try {
        if (isCanceled) {
          this.cancelPreviousRequest(); // Отменяем предыдущий запрос, если нужно
        }
        const response = await this.axiosInstance({
          method,
          url: endpoint,
          data,
          headers,
          cancelToken: isCanceled ? this.cancelSource.token : undefined, // Используем cancelToken
        });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
          return; // Прерываем выполнение при отмене запроса
        } else if (retries > 0 && this.isNetworkError(error)) {
          setTimeout(() => {
            console.log("Retrying request, retries left:", retries);
            return this.request(
              method,
              endpoint,
              data,
              needAuth,
              customHeaders,
              isCanceled,
              retries - 1
            );
          }, 5000);
        } else {
          this.handleError(error);
        }
      }
    }
    isNetworkError(error) {
      return !error.response;
    }
    handleError(error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.replace("/login");
        } else {
          console.error("Server error:", error.response.data);
        }
      } else if (error.request) {
        console.error("No response:", error.request);
      } else {
        console.error("Request error:", error.message);
      }
  
      throw error;
    }
  }
  
  export default Api;
  