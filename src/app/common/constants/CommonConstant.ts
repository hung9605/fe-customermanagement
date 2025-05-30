export default class CommonConstant{
    public static EXAMINED = "Examined";
    public static NO_EXAMINED = "No Examined";
    public static NOT_EXAMINED = "Not Examined";
    public static QUANTITY_DEFAULT = "1";
    public static ZERO = "0";
    public static ERROR = "error";
    public static SUCCESS = "success";
    public static ERROR_TITLE = "Error";
    public static SUCCESS_TITLE = "Success";
    public static SAVE_SUCCESS = "Save successfully ";
    public static REJECTED_MESSAGE = "Reject";
    public static ACTIVE = "Active";
    public static NOT_ACTIVE = "Not Active";
}


export const STATUS_TEXT = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available'
};
  
export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
}
