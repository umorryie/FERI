CREATE TABLE IF NOT EXISTS sistemi_private.refresh_tokens
(
    refresh_token	text primary key unique,
    user_payload    json,
    user_id     	uuid unique references sistemi_public.users (id) ON DELETE CASCADE
);

COMMENT ON TABLE sistemi_private.refresh_tokens is E'@omit create,update,delete\nRefresh token table';
COMMENT ON COLUMN sistemi_private.refresh_tokens.user_id is 'The primary unique identifier for the user';
COMMENT ON COLUMN sistemi_private.refresh_tokens.user_payload is 'Represents payload for token creation';
COMMENT ON COLUMN sistemi_private.refresh_tokens.refresh_token is 'Represents current refresh token';
