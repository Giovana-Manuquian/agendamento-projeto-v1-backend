import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto, req: any): Promise<{
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    }>;
    findMy(req: any): Promise<({
        service: {
            user: {
                id: string;
                name: string;
                email: string;
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
    findAll(req: any, serviceId?: string): Promise<({
        service: {
            user: {
                id: string;
                name: string;
                email: string;
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
            name: string;
            email: string;
        };
    } & {
        id: string;
        date: Date;
        status: string;
        serviceId: string;
        clientId: string;
    })[]>;
}
