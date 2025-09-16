Auth simplification:
- Consolidated signUp, signIn, signOut into src/lib/auth/index.ts alongside session helpers.
- Removed separate actions file to reduce indirection.
- Kept AUTH_COOKIE_NAME in src/lib/auth/constants.ts to avoid TS71011 in server module.
