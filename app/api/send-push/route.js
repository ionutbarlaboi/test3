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
  const payload = JSON.stringify({
    title,
    body: message,
    badge: "/icon-small.png" // pictograma mică
  });


  let validSubs = [];

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
      validSubs.push(sub); // păstrăm doar subscription-urile valide
    } catch (err) {
      console.log("Subscription invalid eliminat:", err.message);
    }
  }

  // Rescriem lista cu doar cele valide
  subscriptions.length = 0;
  subscriptions.push(...validSubs);

  return new Response(JSON.stringify({ success: true, sent: validSubs.length }), { status: 200 });
}
