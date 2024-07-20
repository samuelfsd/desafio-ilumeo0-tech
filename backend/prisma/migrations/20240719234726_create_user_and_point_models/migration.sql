-- CreateEnum
CREATE TYPE "PointType" AS ENUM ('ENTRY', 'EXIT');

-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_points" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "PointType" DEFAULT 'ENTRY',
    "hour" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tb_points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_code_key" ON "tb_users"("code");

-- AddForeignKey
ALTER TABLE "tb_points" ADD CONSTRAINT "tb_points_id_fkey" FOREIGN KEY ("id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
