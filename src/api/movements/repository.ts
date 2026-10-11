import { request } from '../api';

export const getMovementsList = async () => {
  try {
    const response = await request("GET", "/movements");
    return response;
  } catch (error) {
    console.error("api/movements/repository: getMovementsList: error =", error);
  }
}

export const getFeaturedMovement = async () => {
  try {
    // const response = await request("GET", `/movements/${movementId}`);
    const response = await request("GET", "/movements/get-featured");
    return response;
  } catch (error) {
    console.error("api/movements/repository: getFeaturedMovement: error =", error);
    return null
  }
}

export const setFeaturedMovement = async () => {
  try {
    const response = await request("PATCH", "/movements/set-featured");
    return response;
  } catch (error) {
    console.error("api/movements/repository: setFeaturedMovement: error =", error);
  }
}

