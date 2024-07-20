/*
  Warnings:

  - You are about to drop the column `userId` on the `tb_points` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `tb_points` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_points" DROP CONSTRAINT "tb_points_id_fkey";

-- AlterTable
ALTER TABLE "tb_points" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_points" ADD CONSTRAINT "tb_points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
