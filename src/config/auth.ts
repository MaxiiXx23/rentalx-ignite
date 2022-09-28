export default {
    secret_token: process.env.SECRET_KEY_JWT,
    expires_in_token: "15h",
    secret_refresh_token: process.env.SECRET_KEY_REFRESH_TOKEN,
    expires_in_refresh_token: "30d",
    expires_in_refresh_token_day: 30,
};
