
const token = 'BQDSnhN0P-5BL_QKITaVrMAwwdV1yGGi5fS_LIqrijCtlR3gD5ZgZxp1_PCt4mARAWRtsRlMckOwVRB0HdBe7jo02Oz9UrP9k6sRuYGAszeVjqwNfQbgT6Ci3ZUluL3hKj3KW822M9fypj42SrDQ3mp_ui3jpkN_eAnGFM1o2Y75h4_EEaXN5yUbKXnuiTviH5z_UXdu-0VEkYDUrWk44ynNmfkoYMQzqSrGdpSMHYg1uxC4_YUmkePzHxwQBIb6YLCs';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function search(q, type){
    if (type == "genre"){
        //return searchArtist(q);
    }
    else if (type == "artist"){
        return searchArtist(q);
    }
    else{
        return searchTrack(q);
    }
}

async function searchArtist(q){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/search
//   q = "taylor swift"
  let qencoded = encodeURI(q);
  return (await fetchWebApi(
    `v1/search?q=${qencoded}&type=artist&limit=1`, 'GET'
  )).artists.items.at(0).uri;
}

async function searchTrack(q){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/search
    let qencoded = encodeURI(q);
    return (await fetchWebApi(
      `v1/search?q=${qencoded}&type=track&limit=1`, 'GET'
    )).tracks.items.at(0).uri;
}

async function getSeedsGAT(seeds){
    let genres_seed = "";
    let artists_seed = "";
    let tracks_seed = "";
    for (let seed in seeds){
        if (seeds.at(seed).type == "genre"){
            if (genres_seed != ""){
                genres_seed += ",";
            } 
            genres_seed += seeds.at(seed).code;
        }
        else if (seeds.at(seed).type == "artist"){
            if (artists_seed != ""){
                artists_seed += ",";
            }
            artists_seed += seeds.at(seed).code;
        }
        else{
            if (tracks_seed != ""){
                tracks_seed += ",";
            }
            tracks_seed += seeds.at(seed).code;
        }
    }
    return [genres_seed, artists_seed, tracks_seed];
}

async function createPlaylist(seeds, min_bpm, max_bpm){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/search
    console.log(seeds);
    const seeds_gat = await getSeedsGAT(seeds);
    console.log(seeds_gat);
    let genres_encoded = "";
    let artists_encoded = "";
    let tracks_encoded = "";
    if (seeds_gat.at(0) != ""){
        genres_encoded = `&seed_genres=${encodeURI(seeds_gat.at(0))}`;
    }
    if (seeds_gat.at(1) != ""){
        artists_encoded = `&seed_artists=${encodeURI(seeds_gat.at(1))}`;
    }
    if (seeds_gat.at(2) != ""){
        tracks_encoded = `&seed_tracks=${encodeURI(seeds_gat.at(2))}`;
    }
    // console.log(`v1/recommendations?limit=20${artists_encoded}${genres_encoded}${tracks_encoded}&min_tempo=${min_bpm}&max_tempo=${max_bpm}'`);
    return (await fetchWebApi(
      `v1/recommendations?limit=20${artists_encoded}${genres_encoded}${tracks_encoded}&min_tempo=${min_bpm}&max_tempo=${max_bpm}`, 'GET'
    )).tracks;
}

// (async () => {
//     try {
//         var seedsTest = [
//             {code: "0kbYTNQb4Pb1rPbbaF0pT4", type: "artist"},
//             {code: "pop", type: "genre"},
//             {code: "0c6xIDDpzE81m2q797ordA", type: "track"},
//             {code: "rock", type: "genre"}
//         ];
//         // console.log("function called");
//         const recommendedTracks = await createPlaylist(seedsTest, 120, 140);
//         // console.log(recommendedTracks);
//         console.log(
//             recommendedTracks.map(
//             ({name, artists}) =>
//               `${name} by ${artists.map(artist => artist.name).join(', ')}`
//           )
//         );
//     } catch (e) {
//         // Deal with the fact the chain failed
//     }
// })();

