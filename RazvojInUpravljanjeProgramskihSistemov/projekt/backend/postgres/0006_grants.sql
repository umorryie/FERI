-- after schema creation and before function creation
alter default privileges revoke execute on functions from public;

grant usage on schema sistemi_public to sistemi_anonymous, sistemi_user;

revoke all on function sistemi_public.register_social_media_user(text, text, text) FROM PUBLIC;
revoke all on function sistemi_public.current_user() FROM PUBLIC;

grant execute on function sistemi_public.current_user() to sistemi_user;

grant execute on function sistemi_public.register_social_media_user(text, text, text) to sistemi_anonymous;