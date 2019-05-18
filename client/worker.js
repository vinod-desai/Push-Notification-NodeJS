console.log("Service Worker loaded");

self.addEventListener("push", e => {
  const data = e.data.json();
  // console.log(`Data: ${data}`);
  self.registration.showNotification(data.title, {
    body: "This Push Notification is using Node JS",
    icon: "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png"
  });
});
