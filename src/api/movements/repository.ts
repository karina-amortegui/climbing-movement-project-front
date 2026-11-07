import { request } from "../api";

export const getMovementsList = async () => {
  try {
    const response = await request("GET", "/movements");
    return response;
  } catch (error) {
    console.error("api/movements/repository: getMovementsList: error =", error);
  }
};

export interface IGetMovementsListPayload {
  currentPage?: number;
  nextOrPrev?: "next" | "prev";
  queryBy?: object;
  orderBy?: string;
  order?: "ASC" | "DESC";
}

export const getAdminMovementsList = async (
  payload?: IGetMovementsListPayload,
) => {
  const currentPage = payload?.currentPage ?? 1;

  /**
   * payload
   * {
   *  orderBy: "Movement"
   * }
   */

  let endpoint = `/movements/admin/all?page=${currentPage}&limit=10`;

  for (const key in payload) {
    const typedKey = key as keyof typeof payload;
    // payload["orderBy"] = "movement"
    if (typedKey === "queryBy") {
      /**
       * {
       *  movementExecution: "static"
       * }
       */
      const entries = Object.entries(payload["queryBy"]!);
      endpoint += `&${entries[0][0]}=${entries[0][1]}`;
    } else {
      endpoint += `&${key}=${payload[typedKey]}`;
    }
  }

  // const { currentPage = 1 } = payload;

  // const {
  //   currentPage = 1,
  //   nextOrPrev = "next",
  //   queryBy = null,
  //   orderBy = null,
  //   order = "DESC"

  // } = payload

  return await request("GET", endpoint);
};

export const getFeaturedMovement = async () => {
  try {
    // const response = await request("GET", `/movements/${movementId}`);
    const response = await request("GET", "/movements/get-featured");
    return response;
  } catch (error) {
    console.error(
      "api/movements/repository: getFeaturedMovement: error =",
      error,
    );
    return null;
  }
};

// sends the API request
export const setFeaturedMovement = async (id: string) => {
  try {
    const response = await request("PATCH", `/movements/set-featured/${id}`);
    return response;
  } catch (error) {
    console.error(
      "api/movements/repository: setFeaturedMovement: error =",
      error,
    );

    throw error;
  }
};

// get movement by id ( switch request in useEffect in MovementForm with this )
// export const getMovementById = async (id) => {
// }
