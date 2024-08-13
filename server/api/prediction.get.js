export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event)

    // Get a Replicate prediction
    // https://replicate.com/docs/reference/http#get-a-prediction
    const result = await fetch(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`
        }
      }
    )

    const json = await result.json()

    // Remove potentially long data
    // delete json.logs

    return { data: json }
  } catch (e) {
    console.log('--- error (api/prediction): ', e)

    return {
      error: e.message
    }
  }
})
