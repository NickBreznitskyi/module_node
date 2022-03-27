import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to My App',
        html: 'This is welcome email',
    },
    [emailActionEnum.CHANGE_PASSWORD]: {
        subject: 'Change password',
        html: 'Your password has been successfully changed',
    },
    [emailActionEnum.ACCOUNT_DELETE]: {
        subject: 'Account deleted',
        html: 'Your account has been successfully deleted',
    },
};
