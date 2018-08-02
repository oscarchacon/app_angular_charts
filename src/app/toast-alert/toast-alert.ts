export class ToastAlert {
    type: ToastAlertType;
    title: string;
    message: string;
    close: boolean = false;
    autoClosable: boolean;
}
 
export enum ToastAlertType {
    Success,
    Error,
    Info,
    Warning
}