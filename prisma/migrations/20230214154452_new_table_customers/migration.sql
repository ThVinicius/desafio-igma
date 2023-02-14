-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "dateOfBirth" VARCHAR(10) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");
