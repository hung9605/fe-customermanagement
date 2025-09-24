import { environment } from "../../../environments/environment"

export  const ApiConstants = {
    URL_SCHEDULE_MEDICAL: `${environment.urlApi}/schedulemedical`,
    URL_CUSTOMER: `${environment.urlApi}/customer`,
    URL_ADMIN: `${environment.urlApi}/admin`,
    URL_MENU: `${environment.urlApi}/menu`,
    URL_CONFIG: `${environment.urlApi}/config`,
    URL_EXAM: `${environment.urlApi}/medicalexam`,
    URL_SUPPLIES: `${environment.urlApi}/medicalsupplies`,
    URL_PRESCRIPTION: `${environment.urlApi}/prescription`,
    URL_UPLOAD: `${environment.urlApi}/upload`,
    URL_IMAGE: `${environment.urlApi}/image`,
    URL_INVENTORY: `${environment.urlApi}/inventory`,
    URL_MASTERDATA: `${environment.urlApi}/masterdata`,
    URL_OGRANIZATION: `${environment.urlApi}/ogranization`,
    URL_OAUTH: `${environment.urlApiOAuth}`,
    URL_ROOT: environment.urlApi,
    URL_USER: `${environment.urlApiUser}/user`
}