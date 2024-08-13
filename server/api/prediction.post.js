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
          '2d7219877ca847f463d749d9b224e62f7b078fe035d60a74b58889b455d5cbad',
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
