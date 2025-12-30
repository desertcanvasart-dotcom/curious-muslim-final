interface NewsletterResult {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(
  email: string,
  firstName?: string
): Promise<NewsletterResult> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    // If ConvertKit isn't configured, just return success for now
    console.log("ConvertKit not configured. Email would be subscribed:", email);
    return {
      success: true,
      message: "Thank you for subscribing! We'll keep you updated.",
    };
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          first_name: firstName || "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ConvertKit API error: ${response.status}`);
    }

    return {
      success: true,
      message: "Thank you for subscribing! We'll keep you updated.",
    };
  } catch (error) {
    console.error("ConvertKit subscription error:", error);
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
}
