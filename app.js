const { Worker } = require("worker_threads");

const urls = [
  "https://www.reuters.com/technology/elon-musks-x-plans-remove-headlines-links-news-articles-2023-08-22/",
  "https://www.reuters.com/world/europe/second-russian-plane-reportedly-linked-prigozhin-had-no-connection-wagner-group-2023-08-25/",
  "https://www.reuters.com/markets/commodities/russia-hopes-raise-fish-seafood-exports-china-after-japan-ban-2023-08-26/",
  "https://www.reuters.com/markets/us/"
  // Add more URLs to scrape
];

urls.forEach((url) => {
  const worker = new Worker('./worker.js');
  worker.postMessage(url);
  worker.on("message", (data) => {
    console.log(`Data from ${url}:`, data);
  });
  worker.on("error", (error) => {
    console.error(`Error in worker ${url}:`, error);
  });
  worker.on("exit", (code) => {
    if (code !== 0)
      console.log(`Worker stopped with exit code ${code}`);
  });
});
