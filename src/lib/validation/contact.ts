export function validateContact(data: any) {
  const errors: string[] = [];

  const nameRegex = /^[A-Za-z][A-Za-z\s.-]*$/;
  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || name.length < 3) {
    errors.push("Name must be at least 3 characters");
  } else if (!nameRegex.test(name)) {
    errors.push("Name should not contain numbers or special characters");
  }

  if (name && name.length > 100) {
    errors.push("Name too long");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email address");
  }

  // Message validation
  if (!message || message.length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  if (message.length > 1000) {
    errors.push("Message too long");
  }
  if (message && /<script.*?>.*?<\/script>/gi.test(message)) {
    errors.push("Invalid content in message");
  }
  return errors;
}
