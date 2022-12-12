PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `users` (`avatar` TEXT DEFAULT '', `created` TEXT DEFAULT '' NOT NULL, `email` TEXT DEFAULT '' NOT NULL, `emailVisibility` BOOLEAN DEFAULT FALSE NOT NULL, `id` TEXT PRIMARY KEY, `lastResetSentAt` TEXT DEFAULT '' NOT NULL, `lastVerificationSentAt` TEXT DEFAULT '' NOT NULL, `name` TEXT DEFAULT '', `passwordHash` TEXT NOT NULL, `tokenKey` TEXT NOT NULL, `updated` TEXT DEFAULT '' NOT NULL, `username` TEXT NOT NULL, `verified` BOOLEAN DEFAULT FALSE NOT NULL, "rows_limit" REAL DEFAULT 0, "rows_count" REAL DEFAULT 0);
INSERT INTO users VALUES('','2022-12-12 10:42:02.486Z','test.user@testperson.com',0,'edammizl0e0408j','','','Test User','$2a$13$WFnH8OxtF/g83SsxgiZeKe/UZ10h.CrRvfiHDHpUvZLkRlph5rRb6','a50NAjws46hMosaIaRFz3uwCcwLJU67JFhNqRGU7B9UsGczZ40','2022-12-12 10:42:02.486Z','users99375',1,10.0,0.0);
COMMIT;
