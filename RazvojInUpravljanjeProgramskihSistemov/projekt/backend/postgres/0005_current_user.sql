create OR REPLACE function sistemi_public.current_user() returns sistemi_public.users as $$
  select *
  from sistemi_public.users
  where id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable;

comment on function sistemi_public.current_user() is 'Gets the person who was identified by our JWT.';
