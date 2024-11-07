export default interface Menu{
    id ?: string;
    label ?: string;
    icon ?: string;
    link ?: string;
    idParent ?: number;
    routerLinkActiveOptions ?: boolean;
}