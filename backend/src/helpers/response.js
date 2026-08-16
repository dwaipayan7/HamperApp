/**
 * Standard success response helper.
 * Shape: { success: true, data: {...} }
 */
export const ok = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });

/**
 * Standard error response helper.
 * Shape: { success: false, error: "message", code: "ERROR_CODE" }
 */
export const fail = (res, message, status = 400, code = "BAD_REQUEST") =>
  res.status(status).json({ success: false, error: message, code });
