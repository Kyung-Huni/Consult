-- DropForeignKey
ALTER TABLE "ContactInfo" DROP CONSTRAINT "ContactInfo_studentId_fkey";

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
