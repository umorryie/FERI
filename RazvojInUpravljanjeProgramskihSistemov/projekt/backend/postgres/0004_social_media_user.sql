CREATE TABLE IF NOT EXISTS sistemi_private.social_media_users (
   user_id    uuid primary key references sistemi_public.users (id) ON DELETE CASCADE,
   profile_id VARCHAR(255) UNIQUE NOT NULL
);

COMMENT ON TABLE sistemi_private.social_media_users IS E'@omit create,update,delete\nProfile ids for users registered over social media platforms';

COMMENT ON COLUMN sistemi_private.social_media_users.profile_id IS 'Unique identifier for each user on social media platform';

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

create or replace function sistemi_private.register_social_media_user(
  new_username text,
  profile_id_identifier text,
  email_address text
) RETURNS sistemi_public.jwt_token as $$
declare 
  num_users integer;
  user_id_number uuid;
begin
	select count(*) into num_users
  from sistemi_private.social_media_users
  where profile_id = profile_id_identifier;

  if num_users = 0
  then
    if new_username != '' then
      insert into sistemi_public.users (username) values (new_username) returning id into user_id_number;
    else
      insert into sistemi_public.users (username) values (null) returning id into user_id_number;
    end if;
    if email_address = '' then
        insert into sistemi_private.social_media_users (user_id, profile_id) values (user_id_number, profile_id_identifier);
    else
        insert into sistemi_private.social_media_users (user_id, profile_id, email) values (user_id_number, profile_id_identifier, email_address);
    end if;
  else
    select user_id into user_id_number
    from sistemi_private.social_media_users
    where profile_id = profile_id_identifier;
  end if;

  return sistemi_private.generate_token(user_id_number);
end;
$$ language plpgsql strict security definer;

comment on function sistemi_private.register_social_media_user(text, text, text) is 'Registers not registered user from social media and returns token';

-- No unique, email checker, not null because the same user can login with multiple social media accounts and include the same email 
ALTER TABLE sistemi_private.social_media_users ADD COLUMN IF NOT EXISTS email text default null;

-- For frontend flow to know where to redirect after signup 
ALTER TABLE sistemi_private.social_media_users ADD COLUMN IF NOT EXISTS registered boolean default false;

COMMENT ON COLUMN sistemi_private.social_media_users.email IS 'Users email. The same user can login with different social media strategies and apply the same email address';
