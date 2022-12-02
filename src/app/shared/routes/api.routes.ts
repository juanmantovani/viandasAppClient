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
        GETFOODBYCATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/getFoodByCategory`,
        UPLOADFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/uploadFood`,
        EDITFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/editFood`,
        DELETEFOOD : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/deleteFood`,
        GETIMAGEBYCATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/getImageByCategory`,

    },
    CATEGORY:{
        GETCATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/getCategory`,
        UPLOADCATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/uploadCategory`,
        EDITCATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/editCategory`,
        DELETECATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/deleteCategory`,
    },
    MENU: {
        UPLOADMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/uploadMenu`,
        EDITMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/editMenu`,
        GETDAYMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getDayMenu`,
        GETMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenu`,
        VALIDATEDATEMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/validateDateMenu`,
        GETALLMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getAllMenu`,
        DELETEMENU : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/deleteMenu`,
        GETMENUBYCATEGORY : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuByCategory`,
        GETMENUBYID : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuByID`,
        GETMENUBYCATEGORIES : `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuByCategories`,

    },
    CLIENT :{
        REGISTERCLIENT : `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/registerClient`,
        UPDATECLIENT : `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/updateClient`,
        GETCLIENTBYIDUSER : `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/getClientByIdUser`,
    },
    PATHOLOGY:{
        GETPATHOLOGY : `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/getPathology`,
        UPLOADPATHOLOGY : `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/uploadPathology`,
        EDITPATHOLOGY : `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/editPathology`,
        DELETEPATHOLOGY : `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/deletePathology`,
    },
    CITY : {
        GETCITY:`${ENV.urlApi}/${INTERNAL_ROUTES.CITY}/getCity`,
    },
    ORDER : {
        UPLOADORDER:`${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/uploadOrder`,
    }
}