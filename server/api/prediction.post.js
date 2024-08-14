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
        // Model: https://replicate.com/meta/sam-2-video
        version:
          '33432afdfc06a10da6b4018932893d39b0159f838b6d11dd1236dff85cc5ec1d',
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
