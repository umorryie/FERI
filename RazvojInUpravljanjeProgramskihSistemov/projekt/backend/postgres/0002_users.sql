CREATE TABLE IF NOT EXISTS sistemi_public.users
(
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username    text default null,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

COMMENT ON TABLE sistemi_public.users is E'@omit create,update,delete\nA user';
COMMENT ON COLUMN sistemi_public.users.id is 'The primary unique identifier for the user';
COMMENT ON COLUMN sistemi_public.users.username is 'The user’s username';


alter table sistemi_public.users
    enable row level security;
grant select on table sistemi_public.users to sistemi_user;

DO
$do$
    BEGIN
        IF NOT EXISTS(SELECT * FROM pg_policies WHERE policyname = 'update_user') THEN
            create policy update_user on sistemi_public.users for update to sistemi_user
                using (false);
        END IF;
    END
$do$;

DO
$do$
    BEGIN
        IF NOT EXISTS(SELECT * FROM pg_policies WHERE policyname = 'delete_user') THEN
            create policy delete_user on sistemi_public.users for delete to sistemi_user
                using (false);
        END IF;
    END
$do$;

DO
$do$
    BEGIN
        IF NOT EXISTS(SELECT * FROM pg_policies WHERE policyname = 'select_user') THEN
            create policy select_user on sistemi_public.users for select to sistemi_user
                using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);
        END IF;
    END
$do$;
