
export interface EmailService {
    sendVerificationMail(email: string, token: string): Promise<void>;
}