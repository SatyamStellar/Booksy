import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEntries = async () => {
    return await prisma.book.findMany({
        select: {
            id: true,
            reader: true,
            email: true,
            title: true,
            dueDate: true,
            status: true
        }
    });
};

export const createEntry = async (data) => {
    return await prisma.book.create({
        data: {
            reader: data.reader,
            email: data.email,
            title: data.title,
            dueDate: data.dueDate,
            status: data.status
        }
    });
};

export const updateEntry = async (id, data) => {
    try {
        return await prisma.book.update({
            where: { id },
            data: {
                reader: data.reader,
                email: data.email,
                title: data.title,
                dueDate: data.dueDate,
                status: data.status
            }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return null; // Record not found
        }
        throw error;
    }
};

export const deleteEntry = async (id) => {
    try {
        await prisma.book.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        if (error.code === 'P2025') {
            return false; // Record not found
        }
        throw error;
    }
};

export const searchEntries = async (searchTerm) => {
    return await prisma.book.findMany({
        where: {
            OR: [
                { reader: { contains: searchTerm, mode: 'insensitive' } },
                { email: { contains: searchTerm, mode: 'insensitive' } },
                { title: { contains: searchTerm, mode: 'insensitive' } }
            ]
        }
    });
};

export const disconnect = async () => {
    await prisma.$disconnect();
};
