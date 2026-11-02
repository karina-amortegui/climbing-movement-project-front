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
  queryBy?: string[];
  orderBy?: string;
  order?: "ASC" | "DESC";
}

export const getAdminMovementsList = async (
  payload?: IGetMovementsListPayload,
) => {
  // const { currentPage = 1 } = payload;

  // const {
  //   currentPage = 1,
  //   nextOrPrev = "next",
  //   queryBy = null,
  //   orderBy = null,
  //   order = "DESC"

  // } = payload

  const endpoint = payload ? "/movements/admin/all" : `/movements/admin/all`;

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
