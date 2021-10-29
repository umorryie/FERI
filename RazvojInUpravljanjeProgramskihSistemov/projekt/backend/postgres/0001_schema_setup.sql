CREATE SCHEMA IF NOT EXISTS sistemi_public;
CREATE SCHEMA IF NOT EXISTS sistemi_private;

DO
$do$
    BEGIN
        IF NOT EXISTS(
                SELECT
                FROM pg_catalog.pg_roles 
                WHERE rolname = 'sistemi_admin') THEN
            CREATE ROLE sistemi_admin;
        END IF;
        IF NOT EXISTS(
                SELECT
                FROM pg_catalog.pg_roles 
                WHERE rolname = 'sistemi_anonymous') THEN
            CREATE ROLE sistemi_anonymous;
        END IF;

        IF NOT EXISTS(
                SELECT
                FROM pg_catalog.pg_roles 
                WHERE rolname = 'sistemi_user') THEN
            CREATE ROLE sistemi_user;
        END IF;
    END
$do$;

grant sistemi_anonymous to sistemi_admin;
grant sistemi_user to sistemi_admin;

