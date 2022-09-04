interface SearchResults {
  title: string
  videoId: string
  videoUrl: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
}

interface SearchProps {
  results: SearchResults[]
}

export function ProcessRaw(raw) {
  return raw.map((value) => {
    return {
      title:value.title,
      videoId: value.id.videoId,
      videoUrl: value.url,
      thumbnail: {
        url: value.snippet.thumbnails.url,
        width: value.snippet.thumbnails.width,
        height: value.snippet.thumbnails.height
      }
    }
  })
}

export function SearchResults({results}: SearchProps) {
  const components = results.map((value, index) => {
    
    return (
      <a className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={value.thumbnail.url} alt={value.title}/>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{value.title}</h5>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        </div>
    </a>
  )})

  return (
    <ul className="text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {components}
    </ul>
  )
}