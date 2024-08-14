export default defineEventHandler(async (event) => {
  try {
    const { input } = await readBody(event)

    // Create a Replicate prediction
    // https://replicate.com/docs/reference/http#create-a-prediction
    const result = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`
      },
      body: JSON.stringify({
        // Model: https://replicate.com/zsxkib/sam-2-video
        version:
          '7aaeb672847f5ac28a4136639b12f9838b8b4d9e8f24341bcc07eab6c646fc72',
        input
      })
    })

    const json = await result.json()

    return { data: json }
  } catch (e) {
    console.log('--- error (api/prediction): ', e)

    return {
      error: e.message
    }
  }
})
