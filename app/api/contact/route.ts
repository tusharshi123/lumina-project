import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = ContactFormSchema.parse(body);

    // Here you would typically:
    // 1. Send an email to yourself
    // 2. Store the message in a database
    // 3. Send a confirmation email to the user

    // For now, we'll just return a success response
    console.log('Contact form submission:', validatedData);

    // Example: You could integrate with an email service here
    // await sendEmail({
    //   to: 'your-email@example.com',
    //   subject: `New contact from ${validatedData.name}`,
    //   html: `...`,
    // });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message received successfully!',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation error',
          errors: error.errors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
