ALTER TABLE "User" ADD COLUMN "userCode" TEXT;

-- Generate sequential readable codes for existing users
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "createdAt") AS rn
  FROM "User"
)
UPDATE "User"
SET "userCode" = 'U-' || LPAD(rn::text, 4, '0')
FROM ordered
WHERE ordered.id = "User".id;

ALTER TABLE "User"
ALTER COLUMN "userCode" SET NOT NULL;

ALTER TABLE "User"
ADD CONSTRAINT "User_userCode_key" UNIQUE ("userCode");
