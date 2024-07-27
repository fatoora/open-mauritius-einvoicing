export function isMraError(Message) {
  if (!Message) return false;

  var parsedError = JSON.parse(Message);
  if (parsedError && parsedError.status === "ERROR") {
    return true;
  }
  return false;
}

export function getMraErrorMessage(Message) {
  if (!Message) return "";

  var parsedError = JSON.parse(Message);
  var errors = parsedError.fiscalisedInvoices[0].errorMessages;

  if (errors && Array.isArray(errors)) {
    var descriptions = errors.map((error) => error.description);
    return descriptions.join(". ");
  }

  return "";
}
