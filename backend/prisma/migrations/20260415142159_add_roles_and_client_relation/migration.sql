/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'PROVIDER');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "clientEmail",
DROP COLUMN "clientName",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT',
ALTER COLUMN "specialty" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
