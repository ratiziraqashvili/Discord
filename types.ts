import { Server as NetServer, Socket } from "net"
//@ts-ignore
import { NextApiResponse } from "next"
//@ts-ignore
import { Server as SocketIOServer } from "socket.io"
//@ts-ignore
import { Server, Member, Profile } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

export type NextApiResponceServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};