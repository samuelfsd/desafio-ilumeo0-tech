/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `tb_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tb_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'default_email@example.com',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Default Name',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'default_password';

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");
