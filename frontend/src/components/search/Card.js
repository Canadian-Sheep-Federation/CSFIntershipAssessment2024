

export default function Card({ track }) {
    return(
        <div className="flex flex-col items-center mx-4 my-4 bg-white rounded-lg shadow-lg">
            <img src={track.album.images[0].url} className="w-full h-auto rounded-t-lg" alt={track.name} />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{track.name}</h3>
                <p className="text-sm text-gray-700">{track.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
        </div>
    )
  }