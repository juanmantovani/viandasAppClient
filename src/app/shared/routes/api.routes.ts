import { environment as ENV } from "src/environments/environment";
import { INTERNAL_ROUTES } from "./internal.routes";

export const API_ROUTES = {
    LOGIN: `${ENV.urlApi}/${INTERNAL_ROUTES.LOGIN}`,
    REGISTER: `${ENV.urlApi}/${INTERNAL_ROUTES.REGISTER}`,
    ISAUTHORIZATED: `${ENV.urlApi}/isAuthorizated`,

    CARROUSEL: {
        GETBANNERS: `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/getBanners`,
        GETBANNERSINDEX: `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/getBannersIndex`,
        ADDBANNER: `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/uploadBanner`,
        EDITBANNER: `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/editBanner`,
        DELETEBANNER: `${ENV.urlApi}/${INTERNAL_ROUTES.CARROUSEL}/deleteBanner`,
    },
    FOOD: {
        GETFOOD: `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/getFood`,
        GETFOODBYCATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/getFoodByCategory`,
        ADDFOOD: `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/uploadFood`,
        EDITFOOD: `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/editFood`,
        DELETEFOOD: `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/deleteFood`,
        GETIMAGEBYCATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.FOOD}/getImageByCategory`,

    },
    CATEGORY: {
        GETCATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/getCategory`,
        ADDCATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/uploadCategory`,
        EDITCATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/editCategory`,
        DELETECATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.CATEGORY}/deleteCategory`,
    },
    MENU: {
        ADDMENU: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/uploadMenu`,
        EDITMENU: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/editMenu`,
        GETDAYMENU: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getDayMenu`,
        GETMENUVIEWER: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuViewer`,
        VALIDATEDATEMENU: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/validateDateMenu`,
        GETALLMENU: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getAllMenu`,
        DELETEMENU: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/deleteMenu`,
        GETMENUBYCATEGORY: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuByCategory`,
        GETMENUBYID: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuByID`,
        GETMENUBYCATEGORIES: `${ENV.urlApi}/${INTERNAL_ROUTES.MENU}/getMenuByCategories`,

    },
    CLIENT: {
        GETCLIENT: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/getClient`,
        REGISTERCLIENT: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/registerClient`,
        EDITCLIENT: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/updateClient`,
        GETCLIENTBYIDUSER: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/getClientByIdUser`,
        GETCLIENTBYTANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/getClientByTanda`,
    },
    PATHOLOGY: {
        GETPATHOLOGY: `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/getPathology`,
        ADDPATHOLOGY: `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/uploadPathology`,
        EDITPATHOLOGY: `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/editPathology`,
        DELETEPATHOLOGY: `${ENV.urlApi}/${INTERNAL_ROUTES.PATHOLOGY}/deletePathology`,
    },
    CITY: {
        GETCITY: `${ENV.urlApi}/${INTERNAL_ROUTES.CITY}/getCity`,
    },
    ADDRESS: {
        ADDADDRESS: `${ENV.urlApi}/${INTERNAL_ROUTES.ADDRESS}/addAddress`,
        EDITADDRESS: `${ENV.urlApi}/${INTERNAL_ROUTES.ADDRESS}/editAddress`,
        DELETEADDRESS: `${ENV.urlApi}/${INTERNAL_ROUTES.ADDRESS}/deleteAddress`,
        SETFAVOURITEADDRESS: `${ENV.urlApi}/${INTERNAL_ROUTES.ADDRESS}/setFavouriteAddress`,
    },
    ORDER: {
        GETORDERS : `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/getOrders`, 
        ADDORDER: `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/uploadOrder`,
        GETORDERVIEWER: `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/getOrderViewer`,
        GETORDERBYID: `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/getOrderByID`,
        EDITDAYORDERADDRESS: `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/updateDayOrderAddress`,
        GETORDERSBYCLIENT : `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/getOrderByIdClient`,
        GETALLORDERS : `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/getAllOrders`,
        PAIDORDER: `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/paid`,
        CANCELORDER: `${ENV.urlApi}/${INTERNAL_ROUTES.ORDER}/cancel`,

    },
    DELIVERYDRIVER: {
        GETDELIVERYDRIVER: `${ENV.urlApi}/${INTERNAL_ROUTES.DELIVERYDRIVER}/getDeliveryDriver`,
        ADDDELIVERYDRIVER: `${ENV.urlApi}/${INTERNAL_ROUTES.DELIVERYDRIVER}/addDeliveryDriver`,
        EDITDELIVERYDRIVER: `${ENV.urlApi}/${INTERNAL_ROUTES.DELIVERYDRIVER}/editDeliveryDriver`,
        DELETEDELIVERYDRIVER: `${ENV.urlApi}/${INTERNAL_ROUTES.DELIVERYDRIVER}/deleteDeliveryDriver`,
    },
    TANDA: {
        GETTANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.TANDA}/getTanda`,
        ADDTANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.TANDA}/addTanda`,
        EDITTANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.TANDA}/editTanda`,
        DELETETANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.TANDA}/deleteTanda`,
        ASSIGNADDRESSTOTANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.TANDA}/assignAddressToTanda`,
        REMOVEADDRESSTOTANDA: `${ENV.urlApi}/${INTERNAL_ROUTES.TANDA}/removeAddressToTanda`,
    },
    NOTE:{
        ADDNOTE: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/addNote`,
        EDITNOTE: `${ENV.urlApi}/${INTERNAL_ROUTES.CLIENT}/editNote`
    },
    SETTING:{
        ADDZONE: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/addZone`,
        EDITZONE: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/editZone`,
        DELETEZONE: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/deleteZone`,
        GETZONE: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/getZone`,
        ADDDISCOUNT: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/addDiscount`,
        EDITDISCOUNT: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/editDiscount`,
        DELETEDISCOUNT: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/deleteDiscount`,
        GETDISCOUNT: `${ENV.urlApi}/${INTERNAL_ROUTES.SETTING}/getDiscount`
    }

}