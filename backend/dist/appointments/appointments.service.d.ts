import { PrismaService } from "../prisma.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateAppointmentDto): Promise<{
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    }>;
    findByUser(userId: string): Promise<({
        service: {
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                specialty: string | null;
                createdAt: Date;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            price: number;
            duration: number;
            userId: string;
        };
    } & {
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    })[]>;
    findAll(serviceId?: string): Promise<({
        service: {
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                specialty: string | null;
                createdAt: Date;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            price: number;
            duration: number;
            userId: string;
        };
        client: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    })[]>;
    findOne(id: string): Promise<{
        service: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            duration: number;
            userId: string;
        };
        client: {
            id: string;
            email: string;
            name: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            specialty: string | null;
            createdAt: Date;
        };
    } & {
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    }>;
}
