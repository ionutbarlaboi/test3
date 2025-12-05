import subscriptions from "../data/subscriptions";

export async function POST(req) {
  try {
    const subscription = await req.json();
    console.log("Subscription primit:", subscription);

    // Verificăm dacă există deja
    const exists = subscriptions.some(
      (sub) => sub.endpoint === subscription.endpoint
    );

    if (!exists) {
      subscriptions.push(subscription);
      console.log("Subscription nou adăugat.");
    } else {
      console.log("Subscription deja există, nu îl mai adaug.");
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 201 });

  } catch (err) {
    console.error("Eroare la save-subscription:", err);
    return new Response(JSON.stringify({ error: "Nu s-a putut salva subscription." }), { status: 500 });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ subscriptions }), { status: 200 });
}
