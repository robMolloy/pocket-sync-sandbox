import PocketBase from "pocketbase";

// const safeJsonParse = (x?: string | null) => {
//   try {
//     const data = JSON.parse(x as string);
//     return { success: true, data } as const;
//   } catch (error) {
//     return { success: false, error } as const;
//   }
// };

// const createPocketBase = () => {
//   if (typeof window === "undefined") return new PocketBase("http://127.0.0.1:8090");

//   const configStr = window.localStorage.getItem("pocketbaseConfig");
//   const configResp = safeJsonParse(configStr);

//   return new PocketBase("http://127.0.0.1:8090", configResp.success ? configResp.data : null);
// };

// export const pb = createPocketBase();

export const pb = new PocketBase("http://127.0.0.1:8090");
