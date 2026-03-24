export function validateVolunteer(data: any) {
  const errors: string[] = [];

  const nameRegex = /^[A-Za-z][A-Za-z\s.-]*$/;
  const name = data.name?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.replace(/\D/g, "");
  const interest = data.interest?.trim();

  if (!name || name.length < 3) {
    errors.push("Name must be at least 3 characters");
  } else if (!nameRegex.test(name)) {
    errors.push("Name should not contain numbers or special characters");
  }

  if (name && name.length > 100) {
    errors.push("Name too long");
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid email");
  }
  if (email && email.length > 254) {
    errors.push("Email too long");
  }
  // Phone (India format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.push("Invalid phone number");
  }

  // Interest
  if (!interest || interest.length < 5) {
    errors.push("Interest must be meaningful");
  }
  if (interest && /<script.*?>.*?<\/script>/gi.test(interest)) {
    errors.push("Invalid content in the message field");
  }

  return errors;
}
