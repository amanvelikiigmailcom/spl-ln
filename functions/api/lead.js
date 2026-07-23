export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  if (!data.email) {
    return new Response('Email is required', { status: 400 });
  }

  const resendRes = await fetch('https://api.resend.com/events/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'lead_submitted',
      email: data.email,
      payload: { name: data.name, message: data.message },
    }),
  });

  if (!resendRes.ok) {
    return new Response('Error', { status: 502 });
  }

  return new Response('OK', { status: 200 });
}
