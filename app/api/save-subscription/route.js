import subscriptions from "../data/subscriptions";

export async function POST(req) {
  try {
    const subscription = await req.json();
    console.log("Subscription primit:", subscription);

    subscriptions.push(subscription);

    return new Response(JSON.stringify({ message: "Subscription salvat." }), { status: 201 });
  } catch (err) {
    console.error("Eroare la save-subscription:", err);
    return new Response(JSON.stringify({ error: "Nu s-a putut salva subscription." }), { status: 500 });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ subscriptions }), { status: 200 });
}
