export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: "CLIENT" | "PROVIDER";
    specialty?: string;
}
