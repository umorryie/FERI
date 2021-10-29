DO
$do$
BEGIN
  IF NOT EXISTS (
        SELECT * FROM pg_type t
        LEFT JOIN pg_namespace p ON t.typnamespace=p.oid
        WHERE t.typname='jwt_token' AND p.nspname='sistemi_public'
      ) THEN
          create type sistemi_public.jwt_token as (
            role text,
            user_id uuid,
            exp bigint
          );
  END IF;
END
$do$;

CREATE OR REPLACE FUNCTION sistemi_private.generate_token(
  user_id uuid
) returns sistemi_public.jwt_token as $$
begin
    return ('sistemi_user', user_id, extract(epoch from (now() + interval '2 days')))::sistemi_public.jwt_token;
end;
$$ language plpgsql strict security definer;

comment on function sistemi_private.generate_token(uuid) is 'Creates a JWT token that will securely identify a person and give them certain permissions. This token expires in 2 days.';

revoke all on function sistemi_private.generate_token(uuid) FROM PUBLIC, sistemi_user;

grant execute on function sistemi_private.generate_token(uuid) to sistemi_anonymous;