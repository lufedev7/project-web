export const searchMarket = async (Search: string) => {
  if (Search === '') return null
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_FECHS_SEARCH + '=' + Search,
    )
    const json = await response.json()
    // console.log(json.data.content)

    return json.data.content
  } catch (e) {
    throw new Error('Error searching in Market')
  }
}
