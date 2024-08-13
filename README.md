# 🖱️ SAM-2 Clicker

Try it out at [replicate-sam-2-clicker.vercel.app](https://replicate-sam-2-clicker.vercel.app)

## How it works

This app is powered by:

🚀 [Replicate](https://replicate.com/?utm_source=project&utm_campaign=sam-2-clicker), a platform for running machine learning models in the cloud.

🖍️ [SAM-2](https://replicate.com/meta/sam-2?utm_source=project&utm_campaign=sam-2-clicker), an open-source machine learning model that segments images and video.

▲ [Vercel](https://vercel.com/), a platform for running web apps.

⚡️ Nuxt.js [server-side API routes](server/api), for talking to the Replicate API.

🍃 [Tailwind CSS](https://tailwindcss.com/), for styles.

## Development

1. Install a recent version of [Node.js](https://nodejs.org/)
2. Copy your [Replicate API token](https://replicate.com/account?utm_source=project&utm_campaign=scribblediffusion) and set it in your environment:

```
echo "REPLICATE_API_TOKEN=<your-token-here>" > .env.local
```

3. Install dependencies and run the server:

```
npm install
npm run dev
```

4. Open [localhost:3000](http://localhost:3000) in your browser. That's it!
