CREATE TABLE "jokes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jokes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" varchar(255) NOT NULL
);
