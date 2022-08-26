import { environment as ENV } from "src/environments/environment";
import { INTERNAL_ROUTES } from "./internal.routes";

export const API_ROUTES ={
    LOGIN: `${ENV.urlApi}/${INTERNAL_ROUTES.LOGIN}`,
    REGISTER: `${ENV.urlApi}/${INTERNAL_ROUTES.REGISTER}`,
    ISAUTHORIZATED: `${ENV.urlApi}/isAuthorizated`,
    
    CARROUSEL:{
        GETBANNERS : `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/getBanners`,
        GETBANNERSINDEX: `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/getBannersIndex`,
        UPLOADBANNER : `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/uploadBanner`,
        EDITBANNER : `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/editBanner`,
        DELETEBANNER : `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/deleteBanner`,
    },
    FOOD:{
        GETFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/getFood`,
        UPLOADFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/uploadFood`,
        EDITFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/editFood`,
        DELETEFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/deleteFood`,
    }
}