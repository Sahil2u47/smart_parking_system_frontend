export function getJwtPayload(token) {
  try {
    if (!token) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];

    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const paddedBase64 =
      base64 + "=".repeat((4 - (base64.length % 4)) % 4);

    const jsonPayload = decodeURIComponent(
      atob(paddedBase64)
        .split("")
        .map(
          (character) =>
            "%" +
            ("00" + character.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode failed:", error);
    return null;
  }
}

export function getRoleFromToken(token) {
  const payload = getJwtPayload(token);

  if (!payload) {
    return null;
  }

  let role =
    payload.role ??
    payload.roles ??
    payload.authority ??
    payload.authorities;

  if (Array.isArray(role)) {
    role = role[0];
  }

  if (typeof role === "object" && role !== null) {
    role =
      role.authority ??
      role.role ??
      role.name;
  }

  if (typeof role !== "string") {
    return null;
  }

  return role
    .replace(/^ROLE_/i, "")
    .toUpperCase();
}

