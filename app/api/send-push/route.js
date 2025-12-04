import webpush from "web-push";
import subscriptions from "../data/subscriptions";

const publicVapidKey = "BIraI_5nULdp6DFPsjsXwaASrF-5yR20CLytfqgIJiaHbSVOsaMQFj6Lta5-P_gfydVuDB0LrdKgveQvo--yukw";
const privateVapidKey = "NbaLeQXaIXNi7tF7ZQ9Edjt0JS7cBQ22_HRFYAmiyqk";

webpush.setVapidDetails(
  "mailto:ionutbarlaboi1988@gmail.com",
  publicVapidKey,
  privateVapidKey
);

export async function POST(req) {
  const { title, message } = await req.json();
  const payload = JSON.stringify({ title, body: message });

  try {
    for (const sub of subscriptions) {
      await webpush.sendNotification(sub, payload);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Eroare la trimitere:", err);
    return new Response(JSON.stringify({ error: "Nu s-a putut trimite notificarea." }), { status: 500 });
  }
}
