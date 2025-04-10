-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BORROWED', 'RETURNED', 'OVERDUE');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "reader" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
