import { getCurrentInstance } from "vue";
import {useGlobalStore} from "../stores/globalStore.ts";

export enum Method {
  Get = "get",
  Post = "post",
  Delete = "delete",
  Patch = "patch",
  Put = "put",
}

export default class ApiFetchService {
  static async fetch<T>(
    method: Method,
    path: string,
    body?: object
  ): Promise<T> {
    let headers = new Headers();
    const globalStore = useGlobalStore()

    headers.set("player-id", globalStore.socketId);

    if (!!body) {
      headers.set("Content-Type", "application/json");
    }
    return fetch(`/api${path}`, {
      method,
      body: JSON.stringify(body),
      headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json();
          let err = new Error("HTTP status code: " + res.status);
          err.name = body.name;
          err.message = body.message;
          err.stack = res.status.toString();
          throw err;
        }
        return res;
      })
      .then((res) => res.json())
      .catch((error: Error) => {
        const instance = getCurrentInstance();
        if (!instance) {
          //TODO: add proper way of communicating failure with user
          console.log("no instance");
          console.warn(error);
          return null;
        }
        instance.appContext.config.globalProperties.$vuelize.notify(error.name);
        return null;
      });
  }
}
